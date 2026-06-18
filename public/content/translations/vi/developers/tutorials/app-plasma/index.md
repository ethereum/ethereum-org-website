---
title: Viết một Plasma dành riêng cho ứng dụng giúp bảo vệ quyền riêng tư
description: Trong hướng dẫn này, chúng ta sẽ xây dựng một ngân hàng bán bí mật để gửi tiền. Ngân hàng là một thành phần tập trung; nó biết số dư của từng người dùng. Tuy nhiên, thông tin này không được lưu trữ trên chuỗi. Thay vào đó, ngân hàng đăng một mã băm của trạng thái. Mỗi khi một giao dịch xảy ra, ngân hàng đăng mã băm mới, cùng với một bằng chứng không kiến thức rằng nó có một giao dịch đã ký làm thay đổi trạng thái mã băm sang trạng thái mới. Sau khi đọc hướng dẫn này, bạn sẽ không chỉ hiểu cách sử dụng bằng chứng không kiến thức, mà còn hiểu tại sao bạn sử dụng chúng và cách thực hiện điều đó một cách an toàn.
author: Ori Pomerantz
tags:
  - không tri thức
  - máy chủ
  - ngoài chuỗi
  - quyền riêng tư
skill: advanced
breadcrumb: Plasma dành riêng cho ứng dụng
lang: vi
published: 2025-10-15
---
## Giới thiệu {#introduction}

Trái ngược với [bản cuộn](/developers/docs/scaling/zk-rollups/), [Plasma](/developers/docs/scaling/plasma) sử dụng Mạng chính Ethereum cho tính toàn vẹn, nhưng không phải cho tính khả dụng. Trong bài viết này, chúng ta sẽ viết một ứng dụng hoạt động giống như một Plasma, với Ethereum đảm bảo tính toàn vẹn (không có thay đổi trái phép) nhưng không đảm bảo tính khả dụng (một thành phần tập trung có thể ngừng hoạt động và vô hiệu hóa toàn bộ hệ thống).

Ứng dụng mà chúng ta viết ở đây là một ngân hàng bảo vệ quyền riêng tư. Các địa chỉ khác nhau có các tài khoản với số dư, và họ có thể gửi tiền (ETH) đến các tài khoản khác. Ngân hàng đăng các mã băm của trạng thái (các tài khoản và số dư của chúng) và các giao dịch, nhưng giữ các số dư thực tế ngoài chuỗi nơi chúng có thể được giữ riêng tư.

## Thiết kế {#design}

Đây không phải là một hệ thống sẵn sàng cho sản xuất, mà là một công cụ giảng dạy. Do đó, nó được viết với một số giả định đơn giản hóa.

- Nhóm tài khoản cố định. Có một số lượng tài khoản cụ thể và mỗi tài khoản thuộc về một địa chỉ được xác định trước. Điều này tạo ra một hệ thống đơn giản hơn nhiều vì rất khó để xử lý các cấu trúc dữ liệu có kích thước thay đổi trong các bằng chứng không kiến thức. Đối với một hệ thống sẵn sàng cho sản xuất, chúng ta có thể sử dụng [gốc Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) làm mã băm trạng thái và cung cấp các bằng chứng Merkle cho các số dư được yêu cầu.

- Lưu trữ bộ nhớ. Trên một hệ thống sản xuất, chúng ta cần ghi tất cả số dư tài khoản vào ổ đĩa để bảo toàn chúng trong trường hợp khởi động lại. Ở đây, việc thông tin bị mất đi cũng không sao.

- Chỉ chuyển khoản. Một hệ thống sản xuất sẽ yêu cầu một cách để nạp tài sản vào ngân hàng và rút chúng ra. Nhưng mục đích ở đây chỉ là để minh họa khái niệm, vì vậy ngân hàng này chỉ giới hạn ở việc chuyển khoản.

### Bằng chứng không kiến thức {#zero-knowledge-proofs}

Ở mức độ cơ bản, một bằng chứng không kiến thức cho thấy trình chứng minh biết một số dữ liệu, _Data<sub>private</sub>_ sao cho có một mối quan hệ _Relationship_ giữa một số dữ liệu công khai, _Data<sub>public</sub>_ và _Data<sub>private</sub>_. Trình xác minh biết _Relationship_ và _Data<sub>public</sub>_.

Để bảo vệ quyền riêng tư, chúng ta cần các trạng thái và các giao dịch phải ở chế độ riêng tư. Nhưng để đảm bảo tính toàn vẹn, chúng ta cần [mã băm mật mã](https://en.wikipedia.org/wiki/Cryptographic_hash_function) của các trạng thái phải được công khai. Để chứng minh cho những người gửi giao dịch rằng các giao dịch đó thực sự đã xảy ra, chúng ta cũng cần đăng các mã băm giao dịch.

Trong hầu hết các trường hợp, _Data<sub>private</sub>_ là đầu vào cho chương trình bằng chứng không kiến thức và _Data<sub>public</sub>_ là đầu ra.

Các trường này trong _Data<sub>private</sub>_:

- _State<sub>n</sub>_, trạng thái cũ
- _State<sub>n+1</sub>_, trạng thái mới
- _Transaction_, một giao dịch thay đổi từ trạng thái cũ sang trạng thái mới. Giao dịch này cần bao gồm các trường sau:
  - _Destination address_ (Địa chỉ đích) nhận khoản chuyển
  - _Amount_ (Số lượng) được chuyển
  - _Nonce_ để đảm bảo mỗi giao dịch chỉ có thể được xử lý một lần.
    Địa chỉ nguồn không cần phải có trong giao dịch, vì nó có thể được khôi phục từ chữ ký.
- _Signature_, một chữ ký được ủy quyền để thực hiện giao dịch. Trong trường hợp của chúng ta, địa chỉ duy nhất được ủy quyền để thực hiện giao dịch là địa chỉ nguồn. Vì hệ thống không tri thức của chúng ta hoạt động theo cách của nó, chúng ta cũng cần khóa công khai của tài khoản, ngoài chữ ký Ethereum.

Đây là các trường trong _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ mã băm của trạng thái cũ
- _Hash(State<sub>n+1</sub>)_ mã băm của trạng thái mới
- _Hash(Transaction)_ mã băm của giao dịch làm thay đổi trạng thái từ _State<sub>n</sub>_ sang _State<sub>n+1</sub>_.

Mối quan hệ này kiểm tra một số điều kiện:

- Các mã băm công khai thực sự là các mã băm chính xác cho các trường riêng tư.
- Giao dịch, khi được áp dụng cho trạng thái cũ, sẽ dẫn đến trạng thái mới.
- Chữ ký đến từ địa chỉ nguồn của giao dịch.

Do các thuộc tính của hàm băm mật mã, việc chứng minh các điều kiện này là đủ để đảm bảo tính toàn vẹn.

### Cấu trúc dữ liệu {#data-structures}

Cấu trúc dữ liệu chính là trạng thái được lưu giữ bởi máy chủ. Đối với mỗi tài khoản, máy chủ theo dõi số dư tài khoản và một [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), được sử dụng để ngăn chặn [các cuộc tấn công phát lại](https://en.wikipedia.org/wiki/Replay_attack).

### Các thành phần {#components}

Hệ thống này yêu cầu hai thành phần:

- _Máy chủ_ nhận các giao dịch, xử lý chúng và đăng các mã băm lên chuỗi cùng với các bằng chứng không kiến thức.
- Một _hợp đồng thông minh_ lưu trữ các mã băm và xác minh các bằng chứng không kiến thức để đảm bảo các quá trình chuyển đổi trạng thái là hợp lệ.

### Luồng dữ liệu và điều khiển {#flows}

Đây là những cách mà các thành phần khác nhau giao tiếp để chuyển từ tài khoản này sang tài khoản khác.

1. Một trình duyệt web gửi một giao dịch đã ký yêu cầu chuyển từ tài khoản của người ký sang một tài khoản khác.

2. Máy chủ xác minh rằng giao dịch là hợp lệ:

   - Người ký có một tài khoản trong ngân hàng với số dư đủ.
   - Người nhận có một tài khoản trong ngân hàng.

3. Máy chủ tính toán trạng thái mới bằng cách trừ số tiền đã chuyển khỏi số dư của người ký và cộng nó vào số dư của người nhận.

4. Máy chủ tính toán một bằng chứng không kiến thức rằng sự thay đổi trạng thái là hợp lệ.

5. Máy chủ gửi đến Ethereum một giao dịch bao gồm:

   - Mã băm trạng thái mới
   - Mã băm giao dịch (để người gửi giao dịch có thể biết nó đã được xử lý)
   - Bằng chứng không kiến thức chứng minh quá trình chuyển đổi sang trạng thái mới là hợp lệ

6. Hợp đồng thông minh xác minh bằng chứng không kiến thức.

7. Nếu bằng chứng không kiến thức được kiểm tra thành công, hợp đồng thông minh sẽ thực hiện các hành động sau:
   - Cập nhật mã băm trạng thái hiện tại thành mã băm trạng thái mới
   - Phát ra một mục nhật ký với mã băm trạng thái mới và mã băm giao dịch

### Công cụ {#tools}

Đối với mã phía máy khách, chúng ta sẽ sử dụng [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) và [Wagmi](https://wagmi.sh/). Đây là các công cụ tiêu chuẩn của ngành; nếu bạn chưa quen với chúng, bạn có thể sử dụng [hướng dẫn này](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Phần lớn máy chủ được viết bằng JavaScript sử dụng [Node](https://nodejs.org/en). Phần không tri thức được viết bằng [Noir](https://noir-lang.org/). Chúng ta cần phiên bản `1.0.0-beta.10`, vì vậy sau khi bạn [cài đặt Noir theo hướng dẫn](https://noir-lang.org/docs/getting_started/quick_start), hãy chạy:

```
noirup -v 1.0.0-beta.10
```

Chuỗi khối chúng ta sử dụng là `anvil`, một chuỗi khối thử nghiệm cục bộ là một phần của [Foundry](https://getfoundry.sh/introduction/installation).

## Triển khai {#implementation}

Vì đây là một hệ thống phức tạp, chúng ta sẽ triển khai nó theo từng giai đoạn.

### Giai đoạn 1 - Không tri thức thủ công {#stage-1}

Trong giai đoạn đầu tiên, chúng ta sẽ ký một giao dịch trên trình duyệt và sau đó cung cấp thông tin theo cách thủ công cho bằng chứng không kiến thức. Mã không tri thức mong đợi nhận được thông tin đó trong `server/noir/Prover.toml` (được tài liệu hóa [tại đây](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Để xem nó hoạt động:

1. Đảm bảo bạn đã cài đặt [Node](https://nodejs.org/en/download) và [Noir](https://noir-lang.org/install). Tốt nhất là cài đặt chúng trên hệ thống UNIX như macOS, Linux hoặc [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Tải xuống mã của giai đoạn 1 và khởi động máy chủ web để phục vụ mã máy khách.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Lý do bạn cần một máy chủ web ở đây là để ngăn chặn một số loại gian lận, nhiều ví (chẳng hạn như MetaMask) không chấp nhận các tệp được phục vụ trực tiếp từ ổ đĩa

3. Mở trình duyệt có ví.

4. Trong ví, nhập một cụm mật khẩu mới. Lưu ý rằng điều này sẽ xóa cụm mật khẩu hiện tại của bạn, vì vậy _hãy đảm bảo bạn đã sao lưu_.

   Cụm mật khẩu là `test test test test test test test test test test test junk`, cụm mật khẩu thử nghiệm mặc định cho anvil.

5. Duyệt đến [mã phía máy khách](http://localhost:5173/).

6. Kết nối với ví và chọn tài khoản đích cũng như số tiền của bạn.

7. Nhấp vào **Sign** và ký giao dịch.

8. Dưới tiêu đề **Prover.toml**, bạn sẽ tìm thấy văn bản. Thay thế `server/noir/Prover.toml` bằng văn bản đó.

9. Thực thi bằng chứng không kiến thức.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Đầu ra sẽ tương tự như

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. So sánh hai giá trị cuối cùng với mã băm bạn thấy trên trình duyệt web để xem liệu thông điệp có được băm chính xác hay không.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Tệp này](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) hiển thị định dạng thông tin mà Noir mong đợi.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Thông điệp ở định dạng văn bản, giúp người dùng dễ hiểu (điều này cần thiết khi ký) và để mã Noir phân tích cú pháp. Số tiền được tính bằng finney để một mặt cho phép chuyển các phần lẻ, mặt khác dễ đọc. Số cuối cùng là [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Chuỗi dài 100 ký tự. Các bằng chứng không kiến thức không xử lý tốt dữ liệu có kích thước thay đổi, vì vậy thường cần phải đệm dữ liệu.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Ba tham số này là các mảng byte có kích thước cố định.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Đây là cách để chỉ định một mảng các cấu trúc. Đối với mỗi mục nhập, chúng ta chỉ định địa chỉ, số dư (tính bằng milliETH hay còn gọi là [finney](https://cryptovalleyjournal.com/glossary/finney/)) và giá trị nonce tiếp theo.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Tệp này](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) triển khai quá trình xử lý phía máy khách và tạo tệp `server/noir/Prover.toml` (tệp bao gồm các tham số không tri thức).

Dưới đây là giải thích về các phần thú vị hơn.

```tsx
export default attrs =>  {
```

Hàm này tạo thành phần React `Transfer`, mà các tệp khác có thể nhập vào.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Đây là các địa chỉ tài khoản, các địa chỉ được tạo bởi cụm mật khẩu `test ... test junk`. Nếu bạn muốn sử dụng địa chỉ của riêng mình, chỉ cần sửa đổi định nghĩa này.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Các [hook Wagmi](https://wagmi.sh/react/api/hooks) này cho phép chúng ta truy cập thư viện [Viem](https://viem.sh/) và ví.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Đây là thông điệp, được đệm bằng các khoảng trắng. Mỗi khi một trong các biến [`useState`](https://react.dev/reference/react/useState) thay đổi, thành phần sẽ được vẽ lại và `message` được cập nhật.

```tsx
  const sign = async () => {
```

Hàm này được gọi khi người dùng nhấp vào nút **Sign**. Thông điệp được cập nhật tự động, nhưng chữ ký yêu cầu sự chấp thuận của người dùng trong ví và chúng ta không muốn yêu cầu điều đó trừ khi cần thiết.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Yêu cầu ví [ký thông điệp](https://viem.sh/docs/accounts/local/signMessage). 

```tsx
    const hash = hashMessage(message)
```

Lấy mã băm thông điệp. Việc cung cấp nó cho người dùng để gỡ lỗi (mã Noir) là rất hữu ích. 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Lấy khóa công khai](https://viem.sh/docs/utilities/recoverPublicKey). Điều này là bắt buộc đối với hàm [`ecrecover` của Noir](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Thiết lập các biến trạng thái. Việc này sẽ vẽ lại thành phần (sau khi hàm `sign` thoát) và hiển thị cho người dùng các giá trị đã cập nhật.

```tsx
    let proverToml = `
```

Văn bản cho `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem cung cấp cho chúng ta khóa công khai dưới dạng chuỗi thập lục phân 65 byte. Byte đầu tiên là `0x04`, một điểm đánh dấu phiên bản. Tiếp theo là 32 byte cho `x` của khóa công khai và sau đó là 32 byte cho `y` của khóa công khai.

Tuy nhiên, Noir mong đợi nhận được thông tin này dưới dạng hai mảng byte, một cho `x` và một cho `y`. Việc phân tích cú pháp nó ở đây trên máy khách sẽ dễ dàng hơn thay vì là một phần của bằng chứng không kiến thức.

Lưu ý rằng đây là một thực tiễn tốt trong không tri thức nói chung. Mã bên trong một bằng chứng không kiến thức rất tốn kém, vì vậy bất kỳ quá trình xử lý nào có thể được thực hiện bên ngoài bằng chứng không kiến thức _nên_ được thực hiện bên ngoài bằng chứng không kiến thức.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Chữ ký cũng được cung cấp dưới dạng chuỗi thập lục phân 65 byte. Tuy nhiên, byte cuối cùng chỉ cần thiết để khôi phục khóa công khai. Vì khóa công khai sẽ được cung cấp cho mã Noir, chúng ta không cần nó để xác minh chữ ký và mã Noir cũng không yêu cầu nó.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Cung cấp các tài khoản.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Đây là định dạng HTML (chính xác hơn là [JSX](https://react.dev/learn/writing-markup-with-jsx)) của thành phần.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Tệp này](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) là mã không tri thức thực tế.

```
use std::hash::pedersen_hash;
```

[Hàm băm Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) được cung cấp cùng với [thư viện tiêu chuẩn Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Các bằng chứng không kiến thức thường sử dụng hàm băm này. Nó dễ tính toán hơn nhiều bên trong [các mạch số học](https://rareskills.io/post/arithmetic-circuit) so với các hàm băm tiêu chuẩn.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Hai hàm này là các thư viện bên ngoài, được định nghĩa trong [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Chúng thực hiện chính xác những gì được đặt tên, một hàm tính toán [mã băm keccak256](https://emn178.github.io/online-tools/keccak_256.html) và một hàm xác minh chữ ký Ethereum và khôi phục địa chỉ Ethereum của người ký.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir được lấy cảm hứng từ [Rust](https://www.rust-lang.org/). Các biến, theo mặc định, là các hằng số. Đây là cách chúng ta định nghĩa các hằng số cấu hình toàn cục. Cụ thể, `ACCOUNT_NUMBER` là số lượng tài khoản mà chúng ta lưu trữ.

Các kiểu dữ liệu có tên `u<number>` là số lượng bit đó, không dấu. Các kiểu duy nhất được hỗ trợ là `u8`, `u16`, `u32`, `u64` và `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Biến này được sử dụng cho mã băm Pedersen của các tài khoản, như được giải thích bên dưới.

```
global MESSAGE_LENGTH : u32 = 100;
```

Như đã giải thích ở trên, độ dài thông điệp là cố định. Nó được chỉ định ở đây.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Chữ ký EIP-191](https://eips.ethereum.org/EIPS/eip-191) yêu cầu một bộ đệm có tiền tố 26 byte, theo sau là độ dài thông điệp bằng ASCII và cuối cùng là chính thông điệp đó.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Thông tin chúng ta lưu trữ về một tài khoản. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) là một số, thường lên đến 253 bit, có thể được sử dụng trực tiếp trong [mạch số học](https://rareskills.io/post/arithmetic-circuit) triển khai bằng chứng không kiến thức. Ở đây chúng ta sử dụng `Field` để lưu trữ một địa chỉ Ethereum 160 bit.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Thông tin chúng ta lưu trữ cho một giao dịch chuyển.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Một định nghĩa hàm. Tham số là thông tin `Account`. Kết quả là một mảng các biến `Field`, có độ dài là `FLAT_ACCOUNT_FIELDS`

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Giá trị đầu tiên trong mảng là địa chỉ tài khoản. Giá trị thứ hai bao gồm cả số dư và nonce. Các lệnh gọi `.into()` thay đổi một số thành kiểu dữ liệu mà nó cần. `account.nonce` là một giá trị `u32`, nhưng để cộng nó vào `account.balance << 32`, một giá trị `u128`, nó cần phải là một `u128`. Đó là `.into()` đầu tiên. Lệnh gọi thứ hai chuyển đổi kết quả `u128` thành một `Field` để nó vừa với mảng.

```
flat
}
```

Trong Noir, các hàm chỉ có thể trả về một giá trị ở cuối (không có trả về sớm). Để chỉ định giá trị trả về, bạn đánh giá nó ngay trước dấu ngoặc đóng của hàm.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Hàm này biến mảng tài khoản thành một mảng `Field`, có thể được sử dụng làm đầu vào cho Hàm băm Petersen.

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Đây là cách bạn chỉ định một biến có thể thay đổi, tức là _không phải_ là một hằng số. Các biến trong Noir phải luôn có một giá trị, vì vậy chúng ta khởi tạo biến này với toàn số không.

```
for i in 0..ACCOUNT_NUMBER {
```

Đây là một vòng lặp `for`. Lưu ý rằng các ranh giới là các hằng số. Các vòng lặp Noir phải có ranh giới được biết tại thời điểm biên dịch. Lý do là các mạch số học không hỗ trợ kiểm soát luồng. Khi xử lý một vòng lặp `for`, trình biên dịch chỉ cần đặt mã bên trong nó nhiều lần, một lần cho mỗi vòng lặp.

```
let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Cuối cùng, chúng ta đã đến hàm băm mảng tài khoản.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Hàm này tìm tài khoản có một địa chỉ cụ thể. Hàm này sẽ cực kỳ kém hiệu quả trong mã tiêu chuẩn vì nó lặp qua tất cả các tài khoản, ngay cả sau khi nó đã tìm thấy địa chỉ.

Tuy nhiên, trong các bằng chứng không kiến thức, không có kiểm soát luồng. Nếu chúng ta cần kiểm tra một điều kiện, chúng ta phải kiểm tra nó mọi lúc.

Một điều tương tự xảy ra với các câu lệnh `if`. Câu lệnh `if` trong vòng lặp ở trên được dịch thành các câu lệnh toán học này.

_condition<sub>result</sub> = accounts[i].address == address_ // bằng một nếu chúng bằng nhau, bằng không nếu ngược lại

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Hàm [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) khiến bằng chứng không kiến thức gặp sự cố nếu xác nhận là sai. Trong trường hợp này, nếu chúng ta không thể tìm thấy tài khoản có địa chỉ liên quan. Để báo cáo địa chỉ, chúng ta sử dụng một [chuỗi định dạng](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Hàm này áp dụng một giao dịch chuyển và trả về mảng tài khoản mới.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Chúng ta không thể truy cập các phần tử cấu trúc bên trong một chuỗi định dạng trong Noir, vì vậy chúng ta tạo một bản sao có thể sử dụng được.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Đây là hai điều kiện có thể khiến một giao dịch không hợp lệ.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Tạo mảng tài khoản mới và sau đó trả về nó.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Hàm này đọc địa chỉ từ thông điệp. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Địa chỉ luôn dài 20 byte (hay còn gọi là 40 chữ số thập lục phân) và bắt đầu ở ký tự số 7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Đọc số tiền và nonce từ thông điệp. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Trong thông điệp, số đầu tiên sau địa chỉ là số lượng finney (hay còn gọi là một phần nghìn của một ETH) để chuyển. Số thứ hai là nonce. Bất kỳ văn bản nào giữa chúng đều bị bỏ qua.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Chúng tôi vừa tìm thấy nó
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Trả về một [tuple](https://noir-lang.org/docs/noir/concepts/data_types/tuples) là cách của Noir để trả về nhiều giá trị từ một hàm.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Hàm này chuyển đổi thông điệp thành byte, sau đó chuyển đổi số tiền thành một `TransferTxn`.

```rust
// Tương đương với hashMessage của Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Chúng ta có thể sử dụng Hàm băm Pedersen cho các tài khoản vì chúng chỉ được băm bên trong bằng chứng không kiến thức. Tuy nhiên, trong mã này, chúng ta cần kiểm tra chữ ký của thông điệp, được tạo bởi trình duyệt. Để làm điều đó, chúng ta cần tuân theo định dạng ký Ethereum trong [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Điều này có nghĩa là chúng ta cần tạo một bộ đệm kết hợp với một tiền tố tiêu chuẩn, độ dài thông điệp bằng ASCII và chính thông điệp đó, đồng thời sử dụng keccak256 tiêu chuẩn của Ethereum để băm nó.

```rust
    // Tiền tố ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Để tránh các trường hợp một ứng dụng yêu cầu người dùng ký một thông điệp có thể được sử dụng như một giao dịch hoặc cho một số mục đích khác, EIP-191 chỉ định rằng tất cả các thông điệp đã ký đều bắt đầu bằng ký tự 0x19 (không phải là ký tự ASCII hợp lệ) theo sau là `Ethereum Signed Message:` và một dòng mới.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Xử lý độ dài thông điệp lên đến 999 và thất bại nếu nó lớn hơn. Tôi đã thêm mã này, mặc dù độ dài thông điệp là một hằng số, vì nó giúp việc thay đổi dễ dàng hơn. Trên một hệ thống sản xuất, bạn có thể chỉ cần giả định `MESSAGE_LENGTH` không thay đổi vì lợi ích của hiệu suất tốt hơn.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Sử dụng hàm `keccak256` tiêu chuẩn của Ethereum.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // Địa chỉ, 16 byte đầu tiên của Mã băm, 16 byte cuối cùng của Mã băm        
{
```

Hàm này xác minh chữ ký, yêu cầu mã băm thông điệp. Sau đó, nó cung cấp cho chúng ta địa chỉ đã ký nó và mã băm thông điệp. Mã băm thông điệp được cung cấp trong hai giá trị `Field` vì chúng dễ sử dụng hơn trong phần còn lại của chương trình so với một mảng byte.

Chúng ta cần sử dụng hai giá trị `Field` vì các phép tính trường được thực hiện [modulo](https://en.wikipedia.org/wiki/Modulo) một số lớn, nhưng số đó thường nhỏ hơn 256 bit (nếu không sẽ khó thực hiện các phép tính đó trong EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Chỉ định `hash1` và `hash2` làm các biến có thể thay đổi và ghi mã băm vào chúng theo từng byte.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Điều này tương tự như [`ecrecover` của Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), với hai điểm khác biệt quan trọng:

- Nếu chữ ký không hợp lệ, lệnh gọi sẽ thất bại một `assert` và chương trình bị hủy bỏ.
- Mặc dù khóa công khai có thể được khôi phục từ chữ ký và mã băm, đây là quá trình xử lý có thể được thực hiện bên ngoài và do đó, không đáng để thực hiện bên trong bằng chứng không kiến thức. Nếu ai đó cố gắng lừa dối chúng ta ở đây, việc xác minh chữ ký sẽ thất bại.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Mã băm của mảng Tài khoản cũ
        Field,  // Mã băm của mảng Tài khoản mới
        Field,  // 16 byte đầu tiên của Mã băm thông điệp
        Field,  // 16 byte cuối cùng của Mã băm thông điệp
    )
```

Cuối cùng, chúng ta đến hàm `main`. Chúng ta cần chứng minh rằng chúng ta có một giao dịch thay đổi hợp lệ mã băm của các tài khoản từ giá trị cũ sang giá trị mới. Chúng ta cũng cần chứng minh rằng nó có mã băm giao dịch cụ thể này để người đã gửi nó biết giao dịch của họ đã được xử lý.

```rust
{
    let mut txn = readTransferTxn(message);
```

Chúng ta cần `txn` có thể thay đổi vì chúng ta không đọc địa chỉ gửi từ thông điệp, chúng ta đọc nó từ chữ ký. 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Giai đoạn 2 - Thêm một máy chủ {#stage-2}

Trong giai đoạn thứ hai, chúng ta thêm một máy chủ nhận và triển khai các giao dịch chuyển từ trình duyệt.

Để xem nó hoạt động:

1. Dừng Vite nếu nó đang chạy.

2. Tải xuống nhánh bao gồm máy chủ và đảm bảo bạn có tất cả các mô-đun cần thiết.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Không cần phải biên dịch mã Noir, nó giống như mã bạn đã sử dụng cho giai đoạn 1.

3. Khởi động máy chủ.

   ```sh
   npm run start
   ```

4. Trong một cửa sổ dòng lệnh riêng biệt, chạy Vite để phục vụ mã trình duyệt.

   ```sh
   cd client
   npm run dev
   ```

5. Duyệt đến mã máy khách tại [http://localhost:5173](http://localhost:5173)

6. Trước khi bạn có thể phát hành một giao dịch, bạn cần biết nonce, cũng như số tiền bạn có thể gửi. Để lấy thông tin này, hãy nhấp vào **Update account data** và ký thông điệp.

   Chúng ta có một tình thế tiến thoái lưỡng nan ở đây. Một mặt, chúng ta không muốn ký một thông điệp có thể được sử dụng lại (một [cuộc tấn công phát lại](https://en.wikipedia.org/wiki/Replay_attack)), đó là lý do tại sao chúng ta muốn có một nonce ngay từ đầu. Tuy nhiên, chúng ta chưa có nonce. Giải pháp là chọn một nonce chỉ có thể được sử dụng một lần và chúng ta đã có ở cả hai bên, chẳng hạn như thời gian hiện tại.

   Vấn đề với giải pháp này là thời gian có thể không được đồng bộ hóa hoàn hảo. Vì vậy, thay vào đó, chúng ta ký một giá trị thay đổi mỗi phút. Điều này có nghĩa là khoảng thời gian dễ bị tấn công phát lại của chúng ta nhiều nhất là một phút. Xem xét rằng trong sản xuất, yêu cầu đã ký sẽ được bảo vệ bởi TLS và phía bên kia của đường hầm---máy chủ---đã có thể tiết lộ số dư và nonce (nó phải biết chúng để hoạt động), đây là một rủi ro có thể chấp nhận được.

7. Khi trình duyệt nhận lại số dư và nonce, nó sẽ hiển thị biểu mẫu chuyển. Chọn địa chỉ đích và số tiền rồi nhấp vào **Transfer**. Ký yêu cầu này.

8. Để xem việc chuyển, hãy **Update account data** hoặc nhìn vào cửa sổ nơi bạn chạy máy chủ. Máy chủ ghi nhật ký trạng thái mỗi khi nó thay đổi.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Tệp này](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) chứa quy trình máy chủ và tương tác với mã Noir tại [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Dưới đây là giải thích về các phần thú vị.

```js
import { Noir } from '@noir-lang/noir_js'
```

Thư viện [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) giao tiếp giữa mã JavaScript và mã Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Tải mạch số học---chương trình Noir đã biên dịch mà chúng ta đã tạo ở giai đoạn trước---và chuẩn bị thực thi nó.

```js
// Chúng tôi chỉ cung cấp thông tin Tài khoản để phản hồi lại một yêu cầu đã được ký
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Để cung cấp thông tin tài khoản, chúng ta chỉ cần chữ ký. Lý do là chúng ta đã biết thông điệp sẽ là gì và do đó là mã băm thông điệp.

```js
const processMessage = async (message, signature) => {
```

Xử lý một thông điệp và thực thi giao dịch mà nó mã hóa.

```js
    // Lấy khóa công khai
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Bây giờ chúng ta chạy JavaScript trên máy chủ, chúng ta có thể truy xuất khóa công khai ở đó thay vì trên máy khách.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` chạy chương trình Noir. Các tham số tương đương với các tham số được cung cấp trong [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Lưu ý rằng các giá trị dài được cung cấp dưới dạng một mảng các chuỗi thập lục phân (`["0x60", "0xA7"]`), không phải là một giá trị thập lục phân duy nhất (`0x60A7`), theo cách Viem thực hiện.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Nếu có lỗi, hãy bắt lỗi đó và sau đó chuyển tiếp một phiên bản đơn giản hóa cho máy khách.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Áp dụng giao dịch. Chúng ta đã làm điều đó trong mã Noir, nhưng việc thực hiện lại ở đây sẽ dễ dàng hơn thay vì trích xuất kết quả từ đó.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Cấu trúc `Accounts` ban đầu.

### Giai đoạn 3 - Hợp đồng thông minh Ethereum {#stage-3}

1. Dừng các quy trình máy chủ và máy khách.

2. Tải xuống nhánh có các hợp đồng thông minh và đảm bảo bạn có tất cả các mô-đun cần thiết.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Chạy `anvil` trong một cửa sổ dòng lệnh riêng biệt.

4. Tạo khóa xác minh và trình xác minh Solidity, sau đó sao chép mã trình xác minh vào dự án Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Đi tới các hợp đồng thông minh và thiết lập các biến môi trường để sử dụng chuỗi khối `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Triển khai `Verifier.sol` và lưu trữ địa chỉ trong một biến môi trường.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Triển khai hợp đồng `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Giá trị `0x199..67b` là mã băm Pederson của trạng thái ban đầu của `Accounts`. Nếu bạn sửa đổi trạng thái ban đầu này trong `server/index.mjs`, bạn có thể chạy một giao dịch để xem mã băm ban đầu được báo cáo bởi bằng chứng không kiến thức.

8. Khởi động máy chủ.

   ```sh
   cd ../server
   npm run start
   ```

9. Chạy máy khách trong một cửa sổ dòng lệnh khác.

   ```sh
   cd client
   npm run dev
   ```

10. Chạy một số giao dịch.

11. Để xác minh rằng trạng thái đã thay đổi trên chuỗi, hãy khởi động lại quy trình máy chủ. Xem rằng `ZkBank` không còn chấp nhận các giao dịch nữa, vì giá trị mã băm ban đầu trong các giao dịch khác với giá trị mã băm được lưu trữ trên chuỗi.

    Đây là loại lỗi được mong đợi.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Các thay đổi trong tệp này chủ yếu liên quan đến việc tạo bằng chứng thực tế và gửi nó trên chuỗi.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Chúng ta cần sử dụng [gói Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) để tạo bằng chứng thực tế để gửi trên chuỗi. Chúng ta có thể sử dụng gói này bằng cách chạy giao diện dòng lệnh (`bb`) hoặc bằng cách sử dụng [thư viện JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Thư viện JavaScript chậm hơn nhiều so với việc chạy mã nguyên bản, vì vậy chúng ta sử dụng [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ở đây để sử dụng dòng lệnh.

Lưu ý rằng nếu bạn quyết định sử dụng `bb.js`, bạn cần sử dụng phiên bản tương thích với phiên bản Noir mà bạn đang sử dụng. Tại thời điểm viết bài, phiên bản Noir hiện tại (1.0.0-beta.11) sử dụng `bb.js` phiên bản 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Địa chỉ ở đây là địa chỉ bạn nhận được khi bắt đầu với một `anvil` sạch và làm theo các hướng dẫn ở trên.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Khóa riêng tư này là một trong những tài khoản được cấp vốn trước mặc định trong `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

Tạo một bằng chứng bằng cách sử dụng tệp thực thi `bb`.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Ghi bằng chứng dữ liệu vào một tệp.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Thực sự tạo bằng chứng. Bước này cũng tạo một tệp với các biến công khai, nhưng chúng ta không cần điều đó. Chúng ta đã lấy các biến đó từ `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Bằng chứng là một mảng JSON gồm các giá trị `Field`, mỗi giá trị được biểu diễn dưới dạng một giá trị thập lục phân. Tuy nhiên, chúng ta cần gửi nó trong giao dịch dưới dạng một giá trị `bytes` duy nhất, mà Viem biểu diễn bằng một chuỗi thập lục phân lớn. Ở đây chúng ta thay đổi định dạng bằng cách nối tất cả các giá trị, loại bỏ tất cả các `0x` và sau đó thêm một cái ở cuối.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Dọn dẹp và trả về bằng chứng.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Các trường công khai cần phải là một mảng các giá trị 32 byte. Tuy nhiên, vì chúng ta cần chia mã băm giao dịch giữa hai giá trị `Field`, nó xuất hiện dưới dạng một giá trị 16 byte. Ở đây chúng ta thêm các số không để Viem sẽ hiểu nó thực sự là 32 byte.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Mỗi địa chỉ chỉ sử dụng mỗi nonce một lần để chúng ta có thể sử dụng kết hợp `fromAddress` và `nonce` làm mã định danh duy nhất cho tệp bằng chứng dữ liệu và thư mục đầu ra.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Gửi giao dịch lên chuỗi.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Đây là mã trên chuỗi nhận giao dịch.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Mã trên chuỗi cần theo dõi hai biến: trình xác minh (một hợp đồng riêng biệt được tạo bởi `nargo`) và mã băm trạng thái hiện tại.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Mỗi khi trạng thái thay đổi, chúng ta phát ra một sự kiện `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Hàm này xử lý các giao dịch. Nó lấy bằng chứng (dưới dạng `bytes`) và các đầu vào công khai (dưới dạng một mảng `bytes32`), theo định dạng mà trình xác minh yêu cầu (để giảm thiểu quá trình xử lý trên chuỗi và do đó là chi phí Gas).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Bằng chứng không kiến thức cần phải là giao dịch thay đổi từ mã băm hiện tại của chúng ta sang một mã băm mới.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Gọi hợp đồng trình xác minh để xác minh bằng chứng không kiến thức. Bước này hoàn tác giao dịch nếu bằng chứng không kiến thức bị sai.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Nếu mọi thứ đều ổn, hãy cập nhật mã băm trạng thái thành giá trị mới và phát ra một sự kiện `TransactionProcessed`.

## Các hành vi lạm dụng bởi thành phần tập trung {#abuses}

Bảo mật thông tin bao gồm ba thuộc tính:

- _Tính bảo mật_, người dùng không thể đọc thông tin mà họ không được phép đọc.
- _Tính toàn vẹn_, thông tin không thể bị thay đổi ngoại trừ bởi những người dùng được ủy quyền theo cách được ủy quyền.
- _Tính khả dụng_, người dùng được ủy quyền có thể sử dụng hệ thống.

Trên hệ thống này, tính toàn vẹn được cung cấp thông qua các bằng chứng không kiến thức. Tính khả dụng khó đảm bảo hơn nhiều và tính bảo mật là không thể, bởi vì ngân hàng phải biết số dư của mỗi tài khoản và tất cả các giao dịch. Không có cách nào để ngăn chặn một thực thể có thông tin chia sẻ thông tin đó.

Có thể tạo ra một ngân hàng thực sự bảo mật bằng cách sử dụng [các địa chỉ ẩn danh](https://vitalik.eth.limo/general/2023/01/20/stealth.html), nhưng điều đó nằm ngoài phạm vi của bài viết này.

### Thông tin sai lệch {#false-info}

Một cách mà máy chủ có thể vi phạm tính toàn vẹn là cung cấp thông tin sai lệch khi [dữ liệu được yêu cầu](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Để giải quyết vấn đề này, chúng ta có thể viết một chương trình Noir thứ hai nhận các tài khoản làm đầu vào riêng tư và địa chỉ mà thông tin được yêu cầu làm đầu vào công khai. Đầu ra là số dư và nonce của địa chỉ đó, cùng với mã băm của các tài khoản.

Tất nhiên, bằng chứng này không thể được xác minh trên chuỗi, bởi vì chúng ta không muốn đăng các nonce và số dư trên chuỗi. Tuy nhiên, nó có thể được xác minh bằng mã máy khách chạy trong trình duyệt.

### Các giao dịch bắt buộc {#forced-txns}

Cơ chế thông thường để đảm bảo tính khả dụng và ngăn chặn kiểm duyệt trên các L2 là [các giao dịch bắt buộc](https://docs.optimism.io/stack/transactions/forced-transaction). Nhưng các giao dịch bắt buộc không kết hợp với các bằng chứng không kiến thức. Máy chủ là thực thể duy nhất có thể xác minh các giao dịch.

Chúng ta có thể sửa đổi `smart-contracts/src/ZkBank.sol` để chấp nhận các giao dịch bắt buộc và ngăn máy chủ thay đổi trạng thái cho đến khi chúng được xử lý. Tuy nhiên, điều này khiến chúng ta dễ bị tấn công từ chối dịch vụ đơn giản. Điều gì sẽ xảy ra nếu một giao dịch bắt buộc không hợp lệ và do đó không thể xử lý được?

Giải pháp là có một bằng chứng không kiến thức rằng một giao dịch bắt buộc là không hợp lệ. Điều này cung cấp cho máy chủ ba tùy chọn:

- Xử lý giao dịch bắt buộc, cung cấp một bằng chứng không kiến thức rằng nó đã được xử lý và mã băm trạng thái mới.
- Từ chối giao dịch bắt buộc và cung cấp một bằng chứng không kiến thức cho hợp đồng rằng giao dịch đó không hợp lệ (địa chỉ không xác định, nonce sai hoặc số dư không đủ).
- Bỏ qua giao dịch bắt buộc. Không có cách nào để buộc máy chủ thực sự xử lý giao dịch, nhưng điều đó có nghĩa là toàn bộ hệ thống không khả dụng.

#### Tiền ký quỹ đảm bảo tính khả dụng {#avail-bonds}

Trong một triển khai thực tế, có lẽ sẽ có một số loại động cơ lợi nhuận để giữ cho máy chủ hoạt động. Chúng ta có thể củng cố động lực này bằng cách yêu cầu máy chủ gửi một khoản tiền ký quỹ đảm bảo tính khả dụng mà bất kỳ ai cũng có thể đốt nếu một giao dịch bắt buộc không được xử lý trong một khoảng thời gian nhất định.

### Mã Noir tồi {#bad-noir-code}

Thông thường, để khiến mọi người tin tưởng vào một hợp đồng thông minh, chúng ta tải mã nguồn lên một [trình khám phá khối](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Tuy nhiên, trong trường hợp của các bằng chứng không kiến thức, điều đó là không đủ.

`Verifier.sol` chứa khóa xác minh, là một hàm của chương trình Noir. Tuy nhiên, khóa đó không cho chúng ta biết chương trình Noir là gì. Để thực sự có một giải pháp đáng tin cậy, bạn cần tải lên chương trình Noir (và phiên bản đã tạo ra nó). Nếu không, các bằng chứng không kiến thức có thể phản ánh một chương trình khác, một chương trình có cửa sau.

Cho đến khi các trình khám phá khối bắt đầu cho phép chúng ta tải lên và xác minh các chương trình Noir, bạn nên tự làm điều đó (tốt nhất là lên [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Sau đó, những người dùng am hiểu kỹ thuật sẽ có thể tải xuống mã nguồn, tự biên dịch nó, tạo `Verifier.sol` và xác minh rằng nó giống hệt với mã trên chuỗi.

## Kết luận {#conclusion}

Các ứng dụng kiểu Plasma yêu cầu một thành phần tập trung để lưu trữ thông tin. Điều này mở ra các lỗ hổng tiềm ẩn nhưng đổi lại, cho phép chúng ta bảo vệ quyền riêng tư theo những cách không có sẵn trên chính chuỗi khối. Với các bằng chứng không kiến thức, chúng ta có thể đảm bảo tính toàn vẹn và có thể tạo ra lợi thế kinh tế cho bất kỳ ai đang chạy thành phần tập trung để duy trì tính khả dụng.

[Xem thêm các dự án của tôi tại đây](https://cryptodocguy.pro/).

## Lời cảm ơn {#acknowledgements}

- Josh Crites đã đọc bản nháp của bài viết này và giúp tôi giải quyết một vấn đề hóc búa về Noir.

Mọi sai sót còn lại đều là trách nhiệm của tôi.