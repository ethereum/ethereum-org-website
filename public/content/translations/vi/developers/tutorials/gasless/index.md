---
title: "Tài trợ phí Gas: Cách chi trả chi phí giao dịch cho người dùng của bạn"
description: "Việc tạo một khóa riêng tư và một địa chỉ rất dễ dàng; đó chỉ là vấn đề chạy đúng phần mềm. Nhưng có nhiều nơi trên thế giới mà việc có được ETH để gửi giao dịch lại khó khăn hơn nhiều. Trong hướng dẫn này, bạn sẽ học cách chi trả chi phí Gas trên chuỗi (onchain) để thực thi dữ liệu có cấu trúc ngoài chuỗi (offchain) được người dùng ký trong hợp đồng thông minh của bạn. Bạn yêu cầu người dùng ký một cấu trúc chứa thông tin giao dịch, sau đó mã ngoài chuỗi của bạn sẽ gửi nó lên chuỗi khối dưới dạng một giao dịch."
author: Ori Pomerantz
tags: ["không cần gas", "Solidity", "eip-712", "giao dịch meta"]
skill: intermediate
breadcrumb: "Tài trợ Gas"
lang: vi
published: 2026-02-27
---

## Giới thiệu {#introduction}

Nếu chúng ta muốn Ethereum phục vụ [thêm một tỷ người nữa](https://blog.ethereum.org/category/next-billion), chúng ta cần loại bỏ các rào cản và làm cho nó dễ sử dụng nhất có thể. Một trong những rào cản này là việc cần có ETH để trả phí Gas.

Nếu bạn có một ứng dụng phi tập trung (dapp) kiếm tiền từ người dùng, có thể hợp lý khi cho phép người dùng gửi các giao dịch thông qua máy chủ của bạn và tự bạn trả phí giao dịch. Bởi vì người dùng vẫn ký một [thông điệp ủy quyền EIP-712](https://eips.ethereum.org/EIPS/eip-712) trong Ví của họ, họ vẫn giữ được các đảm bảo về tính toàn vẹn của Ethereum. Tính khả dụng phụ thuộc vào máy chủ chuyển tiếp các giao dịch, do đó nó bị giới hạn hơn. Tuy nhiên, bạn có thể thiết lập để người dùng cũng có thể truy cập trực tiếp vào hợp đồng thông minh (nếu họ có ETH), và cho phép những người khác thiết lập máy chủ của riêng họ nếu họ muốn tài trợ cho các giao dịch.

Kỹ thuật trong hướng dẫn này chỉ hoạt động khi bạn kiểm soát hợp đồng thông minh. Có những kỹ thuật khác, bao gồm [trừu tượng hóa tài khoản](https://eips.ethereum.org/EIPS/eip-4337) cho phép bạn tài trợ các giao dịch cho các hợp đồng thông minh khác, mà tôi hy vọng sẽ đề cập trong một bài hướng dẫn tương lai.

Lưu ý: Đây _không phải_ là mã cấp độ sản xuất (production-level). Nó dễ bị tấn công nghiêm trọng và thiếu các tính năng chính. Tìm hiểu thêm trong [phần lỗ hổng bảo mật của hướng dẫn này](#vulnerabilities).

### Điều kiện tiên quyết {#prerequisites}

Để hiểu hướng dẫn này, bạn cần phải làm quen với:

- Solidity
- JavaScript
- React và WAGMI. Nếu bạn chưa quen với các công cụ giao diện người dùng này, [chúng tôi có một bài hướng dẫn cho việc đó](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## Ứng dụng mẫu {#sample-app}

Ứng dụng mẫu ở đây là một biến thể của hợp đồng `Greeter` của Hardhat. Bạn có thể xem nó [trên GitHub](https://github.com/qbzzt/260301-gasless). Hợp đồng thông minh đã được triển khai trên [Sepolia](https://sepolia.dev/), tại địa chỉ [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Để xem nó hoạt động như thế nào, hãy làm theo các bước sau.

1. Sao chép (clone) kho lưu trữ và cài đặt phần mềm cần thiết.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Chỉnh sửa `.env` để thiết lập `PRIVATE_KEY` thành một Ví có ETH trên Sepolia. Nếu bạn cần Sepolia ETH, [hãy sử dụng một vòi](/developers/docs/networks/#sepolia). Lý tưởng nhất là khóa riêng tư này nên khác với khóa bạn có trong Ví trình duyệt của mình.

3. Khởi động máy chủ.

   ```sh
   npm run dev
   ```

4. Duyệt đến ứng dụng tại URL [`http://localhost:5173`](http://localhost:5173).

5. Nhấp vào **Connect with Injected** để kết nối với một Ví. Chấp thuận trong Ví và chấp thuận việc chuyển sang Sepolia nếu cần.

6. Viết một lời chào mới và nhấp vào **Update greeting via sponsor**.

7. Ký thông điệp.

8. Đợi khoảng 12 giây (thời gian tạo khối trên Sepolia). Trong khi chờ đợi, bạn có thể nhìn vào URL trong bảng điều khiển của máy chủ để xem giao dịch.

9. Thấy rằng lời chào đã thay đổi và giá trị địa chỉ cập nhật lần cuối hiện là địa chỉ Ví trình duyệt của bạn.

Để hiểu cách thức hoạt động của nó, chúng ta cần xem xét cách thông điệp được tạo ra trong giao diện người dùng, cách nó được chuyển tiếp bởi máy chủ và cách hợp đồng thông minh xử lý nó.

### Giao diện người dùng {#ui-changes}

Giao diện người dùng dựa trên [WAGMI](https://wagmi.sh/); bạn có thể đọc về nó [trong hướng dẫn này](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Đây là cách chúng ta ký thông điệp:

```js
const signGreeting = useCallback(
```

React hook [`useCallback`](https://react.dev/reference/react/useCallback) cho phép chúng ta cải thiện hiệu suất bằng cách tái sử dụng cùng một hàm khi thành phần (component) được vẽ lại.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Nếu không có Tài khoản, hãy đưa ra lỗi. Điều này không bao giờ nên xảy ra vì nút giao diện người dùng bắt đầu quá trình gọi `signGreeting` đã bị vô hiệu hóa trong trường hợp đó. Tuy nhiên, các lập trình viên trong tương lai có thể loại bỏ biện pháp bảo vệ đó, vì vậy việc kiểm tra điều kiện này ở đây cũng là một ý tưởng tốt.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Các tham số cho [bộ phân tách miền (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Giá trị này là hằng số, vì vậy trong một triển khai được tối ưu hóa tốt hơn, chúng ta có thể tính toán nó một lần thay vì tính toán lại mỗi khi hàm được gọi.

- `name` là một tên mà người dùng có thể đọc được, chẳng hạn như tên của dapp mà chúng ta đang tạo chữ ký cho nó.
- `version` là phiên bản. Các phiên bản khác nhau không tương thích với nhau.
- `chainId` là Chuỗi mà chúng ta đang sử dụng, được cung cấp [bởi WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` là địa chỉ hợp đồng sẽ xác minh chữ ký này. Chúng ta không muốn cùng một chữ ký áp dụng cho nhiều hợp đồng, trong trường hợp có một vài hợp đồng `Greeter` và chúng ta muốn chúng có những lời chào khác nhau.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Kiểu dữ liệu mà chúng ta ký. Ở đây, chúng ta có một tham số duy nhất, `greeting`, nhưng các hệ thống thực tế thường có nhiều hơn.

```js
        const message = { greeting }
```

Thông điệp thực tế mà chúng ta muốn ký và gửi. `greeting` vừa là tên trường vừa là tên của biến điền vào nó.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Thực sự lấy chữ ký. Hàm này là bất đồng bộ vì người dùng mất nhiều thời gian (từ góc độ của máy tính) để ký dữ liệu.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

Hàm trả về một giá trị thập lục phân duy nhất. Ở đây chúng ta chia nó thành các trường.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Nếu bất kỳ biến nào trong số này thay đổi, hãy tạo một phiên bản mới của hàm. Các tham số `account` và `chainId` có thể được thay đổi bởi người dùng trong Ví. `contractAddr` là một hàm của ID Chuỗi. `signTypedDataAsync` không nên thay đổi, nhưng chúng ta nhập nó từ [một hook](https://wagmi.sh/react/api/hooks/useSignTypedData), vì vậy chúng ta không thể chắc chắn, và tốt nhất là thêm nó vào đây.

Bây giờ lời chào mới đã được ký, chúng ta cần gửi nó đến máy chủ.

```js
  const sponsoredGreeting = async () => {
    try {
```

Hàm này nhận một chữ ký và gửi nó đến máy chủ.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Gửi đến đường dẫn `/server/sponsor` trong máy chủ mà chúng ta xuất phát.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Sử dụng `POST` để gửi thông tin được mã hóa JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Xuất phản hồi. Trên một hệ thống sản xuất, chúng ta cũng sẽ hiển thị phản hồi cho người dùng.

### Máy chủ {#server}

Tôi thích sử dụng [Vite](https://vite.dev/) làm front-end của mình. Nó tự động phục vụ các thư viện React và cập nhật trình duyệt khi mã front-end thay đổi. Tuy nhiên, Vite không bao gồm các công cụ backend.

Giải pháp nằm trong [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Hãy để Vite xử lý mọi thứ khác
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Đầu tiên, chúng ta đăng ký một trình xử lý cho các yêu cầu mà chúng ta tự xử lý (`POST` đến `/server/sponsor`). Sau đó, chúng ta tạo và sử dụng một máy chủ Vite để xử lý tất cả các URL khác.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Đây chỉ là một lệnh gọi Chuỗi khối [viem](https://viem.sh/) tiêu chuẩn.

### Hợp đồng thông minh {#smart-contract}

Cuối cùng, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) cần xác minh chữ ký.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Hàm khởi tạo tạo ra [bộ phân tách miền](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), tương tự như mã giao diện người dùng ở trên. Việc thực thi trên Chuỗi khối tốn kém hơn nhiều, vì vậy chúng ta chỉ tính toán nó một lần.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Đây là cấu trúc được ký. Ở đây chúng ta chỉ có một trường.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Đây là [định danh cấu trúc](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Nó được tính toán mỗi lần trong giao diện người dùng.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Hàm này nhận một yêu cầu đã ký và cập nhật lời chào.

```solidity
        // Tính toán bản tóm tắt EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Tạo bản tóm tắt (digest) theo [EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Khôi phục người ký
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Sử dụng [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) để lấy Địa chỉ người ký. Lưu ý rằng một chữ ký sai vẫn có thể tạo ra một Địa chỉ hợp lệ, chỉ là một địa chỉ ngẫu nhiên.

```solidity
        // Áp dụng lời chào như thể người ký đã gọi nó
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Cập nhật lời chào.

## Lỗ hổng bảo mật {#vulnerabilities}

Đây _không phải_ là mã cấp độ sản xuất. Nó dễ bị tấn công nghiêm trọng và thiếu các tính năng chính. Dưới đây là một số lỗ hổng, cùng với cách giải quyết chúng.

Để xem một số cuộc tấn công này, hãy nhấp vào các nút dưới tiêu đề _Attacks_ và xem điều gì xảy ra. Đối với nút **Invalid signature**, hãy kiểm tra bảng điều khiển máy chủ để xem phản hồi giao dịch.

### Từ chối dịch vụ trên máy chủ {#dos-on-server}

Cuộc tấn công dễ nhất là tấn công [từ chối dịch vụ (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) trên máy chủ. Máy chủ nhận các yêu cầu từ bất kỳ đâu trên Internet và dựa trên các yêu cầu đó để gửi các giao dịch. Hoàn toàn không có gì ngăn cản kẻ tấn công phát hành một loạt các chữ ký, hợp lệ hoặc không hợp lệ. Mỗi chữ ký sẽ gây ra một giao dịch. Cuối cùng, máy chủ sẽ hết ETH để trả cho Gas.

Một giải pháp cho vấn đề này là giới hạn tỷ lệ ở mức một giao dịch mỗi khối. Nếu mục đích là hiển thị lời chào cho [các tài khoản thuộc sở hữu bên ngoài (externally owned accounts)](/developers/docs/accounts/#key-differences), thì dù sao lời chào ở giữa khối là gì cũng không quan trọng.

Một giải pháp khác là theo dõi các Địa chỉ và chỉ cho phép chữ ký từ các khách hàng hợp lệ.

### Chữ ký lời chào sai {#wrong-greeting-sigs}

Khi bạn nhấp vào **Signature for wrong greeting**, bạn gửi một chữ ký hợp lệ cho một Địa chỉ cụ thể (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) và lời chào (`Hello`). Nhưng nó lại gửi với một lời chào khác. Điều này làm rối `ecrecover`, khiến nó thay đổi lời chào nhưng lại có Địa chỉ sai.

Để giải quyết vấn đề này, hãy thêm Địa chỉ vào [cấu trúc được ký](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). Bằng cách này, Địa chỉ ngẫu nhiên của `ecrecover` sẽ không khớp với Địa chỉ trong chữ ký và hợp đồng thông minh sẽ từ chối thông điệp.

### Tấn công phát lại (Replay attacks) {#replay-attack}

Khi bạn nhấp vào **Replay attack**, bạn gửi cùng một chữ ký "Tôi là 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e, và tôi muốn lời chào là `Hello`", nhưng với lời chào chính xác. Kết quả là, hợp đồng thông minh tin rằng Địa chỉ (không phải của bạn) đã thay đổi lời chào trở lại thành `Hello`. Thông tin để thực hiện việc này có sẵn công khai trong [thông tin giao dịch](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Nếu đây là một vấn đề, một giải pháp là thêm một [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Có một [ánh xạ (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) giữa các Địa chỉ và các con số, và thêm một trường nonce vào chữ ký. Nếu trường nonce khớp với ánh xạ cho Địa chỉ, hãy chấp nhận chữ ký và tăng ánh xạ cho lần tiếp theo. Nếu không, hãy từ chối giao dịch.

Một giải pháp khác là thêm dấu thời gian (timestamp) vào dữ liệu được ký và chỉ chấp nhận chữ ký là hợp lệ trong vài giây sau dấu thời gian đó. Cách này đơn giản và rẻ hơn, nhưng chúng ta có nguy cơ bị tấn công phát lại trong khoảng thời gian đó, và sự thất bại của các giao dịch hợp pháp nếu vượt quá khoảng thời gian.

## Các tính năng còn thiếu khác {#other-missing-features}

Có những tính năng bổ sung mà chúng ta sẽ thêm vào trong môi trường sản xuất.

### Truy cập từ các máy chủ khác {#other-servers}

Hiện tại, chúng ta cho phép bất kỳ Địa chỉ nào gửi một `sponsorSetGreeting`. Đây có thể chính xác là những gì chúng ta muốn, vì lợi ích của sự phi tập trung. Hoặc có thể chúng ta muốn đảm bảo rằng các giao dịch được tài trợ đi qua máy chủ của _chúng ta_, trong trường hợp đó chúng ta sẽ kiểm tra `msg.sender` trong hợp đồng thông minh.

Dù bằng cách nào, đây nên là một quyết định thiết kế có ý thức, chứ không chỉ là kết quả của việc không suy nghĩ về vấn đề này.

### Xử lý lỗi {#error-handling}

Một người dùng gửi một lời chào. Có thể nó được cập nhật ở khối tiếp theo. Có thể không. Các lỗi là vô hình. Trên một hệ thống sản xuất, người dùng sẽ có thể phân biệt giữa các trường hợp này:

- Lời chào mới chưa được gửi
- Lời chào mới đã được gửi và đang trong quá trình xử lý
- Lời chào mới đã bị từ chối

## Kết luận {#conclusion}

Đến đây, bạn đã có thể tạo ra một trải nghiệm không cần Gas cho người dùng ứng dụng phi tập trung (dapp) của mình, với cái giá là một chút sự tập trung hóa.

Tuy nhiên, điều này chỉ hoạt động với các hợp đồng thông minh hỗ trợ ERC-712. Ví dụ, để chuyển một token ERC-20, cần phải có giao dịch được ký bởi chủ sở hữu thay vì chỉ một thông điệp. Giải pháp đơn giản nhất là để tài sản được sở hữu không phải bởi Địa chỉ EOA, mà bởi một hợp đồng riêng biệt (một hình thức đơn giản của [trừu tượng hóa tài khoản](/roadmap/account-abstraction/)). Bạn có thể đọc thêm về nó [trong bài hướng dẫn tiếp theo](/developers/tutorials/gasless-token).

[Xem thêm các bài viết khác của tôi tại đây](https://cryptodocguy.pro/).
