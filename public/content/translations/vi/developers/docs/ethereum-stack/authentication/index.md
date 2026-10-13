---
title: Xác thực trên Ethereum
description: Tìm hiểu cách thức hoạt động của việc xác thực người dùng trong các ứng dụng Ethereum—không cần mật khẩu, chỉ cần ví và chữ ký.
lang: vi
---

Nếu bạn đến từ lĩnh vực phát triển web truyền thống, bạn đã quen với việc đăng nhập bằng tên người dùng/mật khẩu, các luồng OAuth và cookie phiên. Việc xác thực trên Ethereum hoạt động theo một cách khác—và ở nhiều khía cạnh, đơn giản hơn.

Trên Ethereum, người dùng chứng minh danh tính của họ bằng **việc ký một thông điệp bằng ví của họ**. Không có mật khẩu nào cần lưu trữ. Không có cơ sở dữ liệu thông tin xác thực nào để rò rỉ. Chỉ có mật mã học.

## Nó khác với Web2 như thế nào? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Tên người dùng + mật khẩu         | Địa chỉ ví + chữ ký                              |
| Máy chủ lưu trữ thông tin xác thực| Người dùng giữ khóa riêng tư                     |
| Phiên được quản lý bằng cookie / JWT | Phiên bắt đầu bằng chữ ký ví ngoài chuỗi      |
| "Đăng nhập bằng Google"           | "Đăng nhập bằng Ethereum"                        |
| Các luồng đặt lại mật khẩu        | Khôi phục bằng cụm từ hạt giống                  |

Sự thay đổi cơ bản: trong Web2, một máy chủ tập trung xác thực bạn. Trên Ethereum, **bạn tự xác thực chính mình** bằng cách chứng minh bạn kiểm soát một địa chỉ cụ thể—và bất kỳ ai cũng có thể xác minh điều đó một cách độc lập.

## Điều kiện tiên quyết {#prerequisites}

Đảm bảo bạn hiểu rõ:

- [Tài khoản Ethereum và cách chúng hoạt động](/developers/docs/accounts/)
- [Ví là gì và cách kết nối ví](/wallets/)
- [Cơ bản về mật mã học khóa công khai-riêng tư](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Cách thức hoạt động của xác thực dựa trên ví {#how-wallet-auth-works}

Luồng cốt lõi rất đơn giản:

1. **Ứng dụng phi tập trung (dapp) của bạn yêu cầu người dùng kết nối ví của họ** (thông qua MetaMask, Rainbow, WalletConnect, v.v.)
2. **Ví chia sẻ địa chỉ Ethereum của người dùng** - đây là định danh công khai của họ
3. **Dapp của bạn tạo ra một thông điệp duy nhất** (một nonce hoặc thử thách)
4. **Người dùng ký thông điệp** bằng khóa riêng tư của họ (diễn ra bên trong ví)
5. **Backend của bạn xác minh chữ ký** so với địa chỉ được yêu cầu
6. **Nếu hợp lệ, người dùng được xác thực**

Không có mật khẩu nào từng được nhập, lưu trữ hoặc truyền đi.

## Đăng nhập bằng Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) định nghĩa một định dạng thông điệp tiêu chuẩn cho việc đăng nhập Ethereum, thường được gọi là **SIWE** (Sign-In with Ethereum). Nó thay thế việc ký thông điệp đặc tả (ad-hoc) bằng một tiêu chuẩn có cấu trúc và an toàn.

Một thông điệp SIWE trông như thế này:

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

Các tính năng chính của SIWE:

- **Ràng buộc tên miền (Domain binding)** - thông điệp bao gồm tên miền, giúp ngăn chặn lừa đảo (phishing)
- **ID Chuỗi (Chain ID)** - chỉ định mạng lưới nào mà chữ ký có hiệu lực
- **Nonce** - ngăn chặn các cuộc tấn công phát lại (replay attacks)
- **Hết hạn (Expiration)** - dấu thời gian tùy chọn giới hạn khoảng thời gian có hiệu lực
- **Tài nguyên (Resources)** - các URI tùy chọn cho quyền truy cập theo phạm vi

### Các thư viện SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Bản triển khai TypeScript chính thức bởi Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Bản triển khai Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Bản triển khai Go

### Ví dụ: đăng nhập phía máy khách (client-side) với siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Lấy một nonce từ backend của bạn
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Tạo và ký thông điệp SIWE
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. Gửi đến backend để xác minh
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Ví dụ: xác minh phía máy chủ (server-side) (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Cấp một nonce và lưu nó vào phiên để /verify có thể kiểm tra sau
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address là địa chỉ Ethereum đã được xác minh
      // Tạo một phiên hoặc JWT cho người dùng
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Các thư viện kết nối ví {#wallet-connection-libraries}

Trước khi xác thực, bạn cần người dùng kết nối ví của họ. Các thư viện này giúp việc đó trở nên dễ dàng:

- **[RainbowKit](https://www.rainbowkit.com/)** - Thành phần React sẵn sàng sử dụng với giao diện người dùng đẹp mắt
- **[ConnectKit](https://docs.family.co/connectkit)** - Modal kết nối ví có thể thả vào (drop-in)
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Kết nối ví đa chuỗi với SIWE được tích hợp sẵn
- **[wagmi](https://wagmi.sh)** - Thư viện React Hooks với `useAccount`, `useConnect`

## Xác minh chữ ký theo cách thủ công {#verifying-manually}

Nếu bạn không muốn sử dụng SIWE, bạn có thể xác minh chữ ký trực tiếp:

```ts
import { verifyMessage } from 'ethers'

// Thông điệp mà người dùng đã ký
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Khôi phục địa chỉ của người ký từ chữ ký
const recoveredAddress = verifyMessage(message, signature)

// So sánh với địa chỉ đã khai báo
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Xác thực thành công
}
```

### Các lưu ý bảo mật quan trọng {#security-notes}

- **Luôn sử dụng một nonce** - ngăn chặn các cuộc tấn công phát lại nơi một chữ ký cũ bị sử dụng lại
- **Bao gồm tên miền** - ngăn chặn chữ ký có hiệu lực trên các trang web khác nhau
- **Kiểm tra thời gian hết hạn** - chữ ký nên có một khoảng thời gian hiệu lực giới hạn
- **Sử dụng SIWE (EIP-4361) khi có thể** - nó xử lý tất cả những điều trên cho bạn
- **Không bao giờ để lộ khóa riêng tư** - việc ký diễn ra bên trong ví; ứng dụng của bạn chỉ nhìn thấy kết quả

## Quản lý phiên {#session-management}

Sau khi được xác thực, bạn vẫn cần các phiên—giống như Web2. Các mẫu phổ biến:

- **Token JWT** - cấp phát một JWT sau khi xác minh chữ ký, sử dụng cho các yêu cầu API
- **Phiên phía máy chủ (Server-side sessions)** - lưu trữ địa chỉ đã được xác minh trong một cookie phiên
- **SIWE với tài nguyên** - định nghĩa các token truy cập theo phạm vi được liên kết với các URI cụ thể

Điểm khác biệt chính so với Web2: địa chỉ Ethereum của người dùng là danh tính lâu dài của họ. Họ có thể sử dụng nó trên bất kỳ dapp nào mà không cần tạo tài khoản mới.

## Danh tính phi tập trung {#decentralized-identity}

Xác thực Ethereum là một phần của phong trào rộng lớn hơn hướng tới **danh tính tự chủ (self-sovereign identity)**. Các tiêu chuẩn và dự án trong không gian này bao gồm:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Các tên dễ đọc cho con người (ví dụ: `vitalik.eth`) phân giải thành các địa chỉ
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Các chứng thực trên chuỗi về danh tính và thông tin xác thực
- **[W3C Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/)** - Tiêu chuẩn toàn cầu cho danh tính phi tập trung (DID) có thể xác minh
- **[Ceramic Network](https://ceramic.network/)** - Các luồng dữ liệu phi tập trung được gắn với một DID

## Đọc thêm {#further-reading}

- [EIP-4361: Đăng nhập bằng Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Tài liệu SIWE](https://docs.login.xyz/)
- [Đăng nhập bằng Ethereum trên Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Tài liệu xác thực Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Tài liệu ENS](https://docs.ens.domains/)

## Các chủ đề liên quan {#related-topics}

- [Tài khoản Ethereum](/developers/docs/accounts/)
- [Các thư viện API JavaScript](/developers/docs/apis/javascript/)
- [Các thư viện API Backend](/developers/docs/apis/backend/)
- [Ví](/wallets/)