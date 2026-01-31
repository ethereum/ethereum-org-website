---
title: "Sử dụng Địa chỉ ẩn"
description: "Địa chỉ ẩn cho phép người dùng chuyển tài sản một cách ẩn danh. Sau khi đọc bài viết này, bạn sẽ có thể: Giải thích địa chỉ ẩn là gì và cách chúng hoạt động, hiểu cách sử dụng địa chỉ ẩn để bảo toàn tính ẩn danh và viết một ứng dụng dựa trên web sử dụng địa chỉ ẩn."
author: Ori Pomerantz
tags:
  [
    "Địa chỉ ẩn",
    "quyền riêng tư",
    "mật mã học",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: vi
sidebarDepth: 3
---

Bạn là Bill. Vì những lý do chúng tôi sẽ không đi sâu vào, bạn muốn quyên góp cho chiến dịch "Alice cho Nữ hoàng Thế giới" và để Alice biết bạn đã quyên góp để cô ấy sẽ thưởng cho bạn nếu cô ấy thắng. Thật không may, chiến thắng của cô ấy không được đảm bảo. Có một chiến dịch cạnh tranh, "Carol cho Nữ hoàng Hệ mặt trời". Nếu Carol thắng và cô ấy phát hiện ra bạn đã quyên góp cho Alice, bạn sẽ gặp rắc rối. Vì vậy, bạn không thể chỉ chuyển 200 ETH từ tài khoản của bạn sang tài khoản của Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) có giải pháp. ERC này giải thích cách sử dụng [địa chỉ ẩn](https://nerolation.github.io/stealth-utils) để chuyển tiền ẩn danh.

**Cảnh báo**: Kỹ thuật mật mã học đằng sau các địa chỉ ẩn, theo những gì chúng tôi biết, là hợp lý. Tuy nhiên, có những cuộc tấn công kênh bên tiềm ẩn. [Bên dưới](#go-wrong), bạn sẽ thấy những gì bạn có thể làm để giảm rủi ro này.

## Cách hoạt động của địa chỉ ẩn {#how}

Bài viết này sẽ cố gắng giải thích địa chỉ ẩn theo hai cách. Đầu tiên là [cách sử dụng chúng](#how-use). Phần này là đủ để hiểu phần còn lại của bài viết. Sau đó, có [lời giải thích về toán học đằng sau nó](#how-math). Nếu bạn quan tâm đến mật mã học, hãy đọc cả phần này.

### Phiên bản đơn giản (cách sử dụng địa chỉ ẩn) {#how-use}

Alice tạo hai khóa riêng tư và xuất bản các khóa công khai tương ứng (có thể được kết hợp thành một siêu địa chỉ có độ dài gấp đôi). Bill cũng tạo một khóa riêng tư và xuất bản khóa công khai tương ứng.

Sử dụng khóa công khai của một bên và khóa riêng tư của bên kia, bạn có thể suy ra một bí mật chung mà chỉ Alice và Bill biết (nó không thể được suy ra chỉ từ các khóa công khai). Sử dụng bí mật chung này, Bill có được địa chỉ ẩn và có thể gửi tài sản đến đó.

Alice cũng nhận được địa chỉ từ bí mật chung, nhưng vì cô ấy biết các khóa riêng tư cho các khóa công khai mà cô ấy đã xuất bản, cô ấy cũng có thể nhận được khóa riêng tư cho phép cô ấy rút tiền từ địa chỉ đó.

### Toán học (tại sao địa chỉ ẩn hoạt động như thế này) {#how-math}

Các địa chỉ ẩn tiêu chuẩn sử dụng [mật mã học đường cong elip (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) để có được hiệu suất tốt hơn với ít bit khóa hơn, trong khi vẫn giữ nguyên mức độ bảo mật. Nhưng phần lớn chúng ta có thể bỏ qua điều đó và giả vờ rằng chúng ta đang sử dụng số học thông thường.

Có một con số mà mọi người đều biết, _G_. Bạn có thể nhân với _G_. Nhưng do bản chất của ECC, thực tế không thể chia cho _G_. Cách thức hoạt động chung của mật mã học khóa công khai trong Ethereum là bạn có thể sử dụng khóa riêng tư, _P<sub>priv</sub>_, để ký các giao dịch sau đó được xác minh bằng khóa công khai, _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alice tạo hai khóa riêng tư, _K<sub>priv</sub>_ và _V<sub>priv</sub>_. _K<sub>priv</sub>_ sẽ được sử dụng để chi tiêu tiền từ địa chỉ ẩn, và _V<sub>priv</sub>_ để xem các địa chỉ thuộc về Alice. Alice sau đó xuất bản các khóa công khai: _K<sub>pub</sub> = GK<sub>priv</sub>_ và _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill tạo khóa riêng tư thứ ba, _R<sub>priv</sub>_, và xuất bản _R<sub>pub</sub> = GR<sub>priv</sub>_ lên một sổ đăng ký trung tâm (Bill cũng có thể đã gửi nó cho Alice, nhưng chúng ta giả định rằng Carol đang nghe lén).

Bill tính toán _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, mà anh ta mong đợi Alice cũng biết (được giải thích bên dưới). Giá trị này được gọi là _S_, bí mật chung. Điều này cho Bill một khóa công khai, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hàm băm(S)_. Từ khóa công khai này, anh ta có thể tính toán một địa chỉ và gửi bất kỳ tài nguyên nào anh ta muốn đến đó. Trong tương lai, nếu Alice thắng, Bill có thể nói cho cô ấy biết _R<sub>priv</sub>_ để chứng minh các tài nguyên đến từ anh ta.

Alice tính toán _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Điều này cho cô ấy cùng một bí mật chung, _S_. Bởi vì cô ấy biết khóa riêng tư, _K<sub>priv</sub>_, cô ấy có thể tính toán _P<sub>priv</sub> = K<sub>priv</sub>+hàm băm(S)_. Khóa này cho phép cô ấy truy cập tài sản trong địa chỉ kết quả từ _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hàm băm(S) = K<sub>pub</sub>+G\*hàm băm(S)_.

Chúng tôi có một khóa xem riêng để cho phép Alice ký hợp đồng phụ với Dịch vụ Chiến dịch Thống trị Thế giới của Dave. Alice sẵn sàng cho Dave biết các địa chỉ công khai và thông báo cho cô ấy khi có thêm tiền, nhưng cô ấy không muốn anh ta tiêu tiền chiến dịch của mình.

Bởi vì việc xem và chi tiêu sử dụng các khóa riêng biệt, Alice có thể cung cấp cho Dave _V<sub>priv</sub>_. Sau đó, Dave có thể tính toán _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ và bằng cách đó nhận được các khóa công khai (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hàm băm(S)_). Nhưng không có _K<sub>priv</sub>_ Dave không thể nhận được khóa riêng tư.

Tóm lại, đây là những giá trị mà những người tham gia khác nhau biết.

| Alice                                                                     | Đã xuất bản       | Bill                                                                      | Dave                                                                        |                                                 |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                 |
| _K<sub>priv</sub>_                                                        | –                 | –                                                                         | –                                                                           |                                                 |
| _V<sub>priv</sub>_                                                        | –                 | –                                                                         | _V<sub>priv</sub>_                                                          |                                                 |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                 |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                 |
| –                                                                         | –                 | _R<sub>priv</sub>_                                                        | –                                                                           |                                                 |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                 |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | –                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                 |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hàm băm(S)_      | –                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hàm băm(S)_      | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hàm băm(S)_        |                                                 |
| _Địa chỉ=f(P<sub>pub</sub>)_                           | –                 | _Địa chỉ=f(P<sub>pub</sub>)_                           | _Địa chỉ=f(P<sub>pub</sub>)_                             | _Địa chỉ=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hàm băm(S)_       | –                 | –                                                                         | –                                                                           |                                                 |

## Khi địa chỉ ẩn gặp sự cố {#go-wrong}

_Không có bí mật nào trên chuỗi khối_. Mặc dù địa chỉ ẩn có thể cung cấp cho bạn quyền riêng tư, nhưng quyền riêng tư đó dễ bị phân tích lưu lượng. Để lấy một ví dụ nhỏ, hãy tưởng tượng rằng Bill cấp tiền cho một địa chỉ và ngay lập tức gửi một giao dịch để xuất bản giá trị _R<sub>pub</sub>_. Nếu không có _V<sub>priv</sub>_ của Alice, chúng tôi không thể chắc chắn rằng đây là một địa chỉ ẩn, nhưng đó là cách để đặt cược. Sau đó, chúng ta thấy một giao dịch khác chuyển toàn bộ ETH từ địa chỉ đó đến địa chỉ quỹ chiến dịch của Alice. Chúng ta có thể không chứng minh được điều đó, nhưng có khả năng Bill vừa quyên góp cho chiến dịch của Alice. Carol chắc chắn sẽ nghĩ như vậy.

Bill có thể dễ dàng tách việc xuất bản _R<sub>pub</sub>_ khỏi việc cấp vốn cho địa chỉ ẩn (thực hiện chúng vào các thời điểm khác nhau, từ các địa chỉ khác nhau). Tuy nhiên, điều đó là không đủ. Mô hình mà Carol tìm kiếm là Bill cấp vốn cho một địa chỉ, và sau đó quỹ chiến dịch của Alice rút tiền từ đó.

Một giải pháp là chiến dịch của Alice không rút tiền trực tiếp mà dùng nó để trả cho bên thứ ba. Nếu chiến dịch của Alice gửi 10 ETH đến Dịch vụ Chiến dịch Thống trị Thế giới của Dave, Carol chỉ biết rằng Bill đã quyên góp cho một trong những khách hàng của Dave. Nếu Dave có đủ khách hàng, Carol sẽ không thể biết liệu Bill đã quyên góp cho Alice, người cạnh tranh với cô ấy, hay cho Adam, Albert hoặc Abigail mà Carol không quan tâm. Alice có thể bao gồm một giá trị đã được băm trong khoản thanh toán, và sau đó cung cấp cho Dave tiền ảnh để chứng minh rằng đó là khoản quyên góp của cô ấy. Ngoài ra, như đã lưu ý ở trên, nếu Alice đưa cho Dave _V<sub>priv</sub>_ của mình, anh ta đã biết khoản thanh toán đến từ ai.

Vấn đề chính với giải pháp này là nó yêu cầu Alice phải quan tâm đến bí mật khi bí mật đó mang lại lợi ích cho Bill. Alice có thể muốn duy trì danh tiếng của mình để bạn của Bill là Bob cũng sẽ quyên góp cho cô ấy. Nhưng cũng có khả năng cô ấy sẽ không ngại vạch trần Bill, bởi vì khi đó anh ta sẽ sợ những gì sẽ xảy ra nếu Carol thắng. Bill có thể cuối cùng sẽ hỗ trợ Alice nhiều hơn nữa.

### Sử dụng nhiều lớp ẩn {#multi-layer}

Thay vì dựa vào Alice để bảo vệ quyền riêng tư của Bill, Bill có thể tự làm điều đó. Anh ta có thể tạo nhiều siêu địa chỉ cho những người hư cấu, Bob và Bella. Bill sau đó gửi ETH cho Bob, và "Bob" (thực chất là Bill) gửi nó cho Bella. "Bella" (cũng là Bill) gửi nó cho Alice.

Carol vẫn có thể phân tích lưu lượng và thấy đường ống Bill-đến-Bob-đến-Bella-đến-Alice. Tuy nhiên, nếu "Bob" và "Bella" cũng sử dụng ETH cho các mục đích khác, sẽ không có vẻ như Bill đã chuyển bất cứ thứ gì cho Alice, ngay cả khi Alice ngay lập tức rút tiền từ địa chỉ ẩn đến địa chỉ chiến dịch đã biết của cô ấy.

## Viết một ứng dụng địa chỉ ẩn {#write-app}

Bài viết này giải thích một ứng dụng địa chỉ ẩn [có sẵn trên GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### Công cụ {#tools}

Có [một thư viện địa chỉ ẩn typescript](https://github.com/ScopeLift/stealth-address-sdk) mà chúng ta có thể sử dụng. Tuy nhiên, các hoạt động mật mã có thể tốn nhiều CPU. Tôi thích triển khai chúng bằng một ngôn ngữ biên dịch, chẳng hạn như [Rust](https://rust-lang.org/) và sử dụng [WASM](https://webassembly.org/) để chạy mã trong trình duyệt.

Chúng tôi sẽ sử dụng [Vite](https://vite.dev/) và [React](https://react.dev/). Đây là những công cụ tiêu chuẩn ngành; nếu bạn không quen thuộc với chúng, bạn có thể sử dụng [hướng dẫn này](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Để sử dụng Vite, chúng ta cần Node.

### Xem địa chỉ ẩn hoạt động {#in-action}

1. Cài đặt các công cụ cần thiết: [Rust](https://rust-lang.org/tools/install/) và [Node](https://nodejs.org/en/download).

2. Nhân bản kho lưu trữ GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Cài đặt các điều kiện tiên quyết và biên dịch mã Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Khởi động máy chủ web.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Duyệt đến [ứng dụng](http://localhost:5173/). Trang ứng dụng này có hai khung: một cho giao diện người dùng của Alice và một cho giao diện của Bill. Hai khung không giao tiếp với nhau; chúng chỉ ở trên cùng một trang để thuận tiện.

6. Với vai trò là Alice, nhấp vào **Tạo một Siêu địa chỉ ẩn**. Thao tác này sẽ hiển thị địa chỉ ẩn mới và các khóa riêng tư tương ứng. Sao chép siêu địa chỉ ẩn vào bảng nhớ tạm.

7. Với vai trò là Bill, dán siêu địa chỉ ẩn mới và nhấp vào **Tạo một địa chỉ**. Thao tác này cung cấp cho bạn địa chỉ để cấp vốn cho Alice.

8. Sao chép địa chỉ và khóa công khai của Bill và dán chúng vào khu vực "Khóa riêng tư cho địa chỉ do Bill tạo" của giao diện người dùng của Alice. Sau khi các trường đó được điền, bạn sẽ thấy khóa riêng tư để truy cập tài sản tại địa chỉ đó.

9. Bạn có thể sử dụng [máy tính trực tuyến](https://iancoleman.net/ethereum-private-key-to-address/) để đảm bảo khóa riêng tư tương ứng với địa chỉ.

### Cách chương trình hoạt động {#how-the-program-works}

#### Thành phần WASM {#wasm}

Mã nguồn biên dịch thành WASM được viết bằng [Rust](https://rust-lang.org/). Bạn có thể xem nó trong [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Mã này chủ yếu là một giao diện giữa mã JavaScript và [thư viện `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) trong Rust tương tự như [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) trong JavaScript. Nó chứa thông tin gói, khai báo phụ thuộc, v.v.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

Gói [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) cần tạo ra các giá trị ngẫu nhiên. Điều đó không thể được thực hiện bằng các phương tiện thuật toán thuần túy; nó đòi hỏi quyền truy cập vào một quy trình vật lý như một nguồn entropy. Định nghĩa này chỉ định rằng chúng ta sẽ nhận được entropy đó bằng cách yêu cầu trình duyệt mà chúng ta đang chạy.

```toml
console_error_panic_hook = "0.1.7"
```

[Thư viện này](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) cung cấp cho chúng tôi các thông báo lỗi có ý nghĩa hơn khi mã WASM bị panic và không thể tiếp tục.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Loại đầu ra cần thiết để tạo mã WASM.

**`lib.rs`**

Đây là mã Rust thực tế.

```rust
use wasm_bindgen::prelude::*;
```

Các định nghĩa để tạo một gói WASM từ Rust. Chúng được ghi lại [tại đây](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Các hàm chúng tôi cần từ [thư viện `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust thường sử dụng các [mảng](https://doc.rust-lang.org/std/primitive.array.html) byte (`[u8; <size>]`) cho các giá trị. Nhưng trong JavaScript, chúng ta thường sử dụng các chuỗi thập lục phân. [Thư viện `hex`](https://docs.rs/hex/latest/hex/) dịch cho chúng ta từ dạng biểu diễn này sang dạng khác.

```rust
#[wasm_bindgen]
```

Tạo các ràng buộc WASM để có thể gọi hàm này từ JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Cách dễ nhất để trả về một đối tượng có nhiều trường là trả về một chuỗi JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

Hàm [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) trả về ba trường:

- Siêu địa chỉ (_K<sub>pub</sub>_ và _V<sub>pub</sub>_)
- Khóa xem riêng tư (_V<sub>priv</sub>_)
- Khóa chi tiêu riêng tư (_K<sub>priv</sub>_)

Cú pháp [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) cho phép chúng ta tách các giá trị đó ra một lần nữa.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Sử dụng macro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) để tạo chuỗi được mã hóa JSON. Sử dụng [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) để thay đổi các mảng thành chuỗi hex.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Hàm này biến một chuỗi hex (do JavaScript cung cấp) thành một mảng byte. Chúng tôi sử dụng nó để phân tích cú pháp các giá trị được cung cấp bởi mã JavaScript. Hàm này phức tạp vì cách Rust xử lý các mảng và vectơ.

Biểu thức `<const N: usize>` được gọi là một [generic](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` là một tham số điều khiển độ dài của mảng được trả về. Hàm này thực sự được gọi là `str_to_array::<n>`, trong đó `n` là độ dài mảng.

Giá trị trả về là `Option<[u8; N]>`, có nghĩa là mảng được trả về là [tùy chọn](https://doc.rust-lang.org/std/option/). Đây là một mẫu điển hình trong Rust cho các hàm có thể thất bại.

Ví dụ: nếu chúng ta gọi `str_to_array::10("bad060a7")`, hàm được cho là sẽ trả về một mảng mười giá trị, nhưng đầu vào chỉ có bốn byte. Hàm cần phải thất bại và nó làm như vậy bằng cách trả về `None`. Giá trị trả về cho `str_to_array::4("bad060a7")` sẽ là `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Hàm [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) trả về một `Result<Vec<u8>, FromHexError>`. Loại [`Result`](https://doc.rust-lang.org/std/result/) có thể chứa kết quả thành công (`Ok(value)`) hoặc lỗi (`Err(error)`).

Phương thức `.ok()` biến `Result` thành một `Option`, có giá trị là giá trị `Ok()` nếu thành công hoặc `None` nếu không. Cuối cùng, [toán tử dấu hỏi](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) sẽ hủy bỏ các hàm hiện tại và trả về `None` nếu `Option` trống. Nếu không, nó sẽ mở gói giá trị và trả về giá trị đó (trong trường hợp này, để gán một giá trị cho `vec`).

Đây có vẻ là một phương pháp xử lý lỗi phức tạp một cách kỳ lạ, nhưng `Result` và `Option` đảm bảo rằng tất cả các lỗi đều được xử lý, bằng cách này hay cách khác.

```rust
    if vec.len() != N { return None; }
```

Nếu số lượng byte không chính xác, đó là một lỗi và chúng tôi trả về `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust có hai loại mảng. [Mảng](https://doc.rust-lang.org/std/primitive.array.html) có kích thước cố định. [Vectơ](https://doc.rust-lang.org/std/vec/index.html) có thể phát triển và thu nhỏ. `hex::decode` trả về một vectơ, nhưng thư viện `eth_stealth_addresses` muốn nhận các mảng. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) chuyển đổi một giá trị thành một loại khác, ví dụ, một vectơ thành một mảng.

```rust
    Some(array)
}
```

Rust không yêu cầu bạn sử dụng từ khóa [`return`](https://doc.rust-lang.org/std/keyword.return.html) khi trả về một giá trị ở cuối hàm.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Hàm này nhận một siêu địa chỉ công khai, bao gồm cả _V<sub>pub</sub>_ và _K<sub>pub</sub>_. Nó trả về địa chỉ ẩn, khóa công khai để xuất bản (_R<sub>pub</sub>_) và giá trị quét một byte giúp tăng tốc độ xác định địa chỉ đã xuất bản nào có thể thuộc về Alice.

Giá trị quét là một phần của bí mật chung (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Giá trị này có sẵn cho Alice, và việc kiểm tra nó nhanh hơn nhiều so với việc kiểm tra xem _f(K<sub>pub</sub>+G\*hàm băm(S))_ có bằng địa chỉ đã xuất bản hay không.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Chúng tôi sử dụng hàm [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) của thư viện.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Chuẩn bị chuỗi đầu ra được mã hóa JSON.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

Hàm này sử dụng [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) của thư viện để tính toán khóa riêng tư để rút khỏi địa chỉ (_R<sub>priv</sub>_). Phép tính này yêu cầu các giá trị sau:

- Địa chỉ (_Địa chỉ=f(P<sub>pub</sub>)_)
- Khóa công khai do Bill tạo (_R<sub>pub</sub>_)
- Khóa xem riêng tư (_V<sub>priv</sub>_)
- Khóa chi tiêu riêng tư (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) chỉ định rằng hàm được thực thi khi mã WASM được khởi tạo.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Mã này chỉ định rằng đầu ra panic được gửi đến bảng điều khiển JavaScript. Để xem nó hoạt động, hãy sử dụng ứng dụng và cung cấp cho Bill một siêu địa chỉ không hợp lệ (chỉ cần thay đổi một chữ số thập lục phân). Bạn sẽ thấy lỗi này trong bảng điều khiển JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Theo sau là một dấu vết ngăn xếp. Sau đó, cung cấp cho Bill siêu địa chỉ hợp lệ và cung cấp cho Alice một địa chỉ không hợp lệ hoặc một khóa công khai không hợp lệ. Bạn sẽ thấy lỗi này:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Một lần nữa, theo sau là một dấu vết ngăn xếp.

#### Giao diện người dùng {#ui}

Giao diện người dùng được viết bằng [React](https://react.dev/) và được phục vụ bởi [Vite](https://vite.dev/). Bạn có thể tìm hiểu về chúng bằng cách sử dụng [hướng dẫn này](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Không cần [WAGMI](https://wagmi.sh/) ở đây vì chúng tôi không tương tác trực tiếp với chuỗi khối hoặc ví.

Phần duy nhất không rõ ràng của giao diện người dùng là kết nối WASM. Đây là cách nó hoạt động.

**`vite.config.js`**

Tệp này chứa [cấu hình Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Chúng ta cần hai plugin Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) và [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Tệp này là thành phần chính của ứng dụng. Nó là một bộ chứa bao gồm hai thành phần: `Alice` và `Bill`, giao diện người dùng cho những người dùng đó. Phần liên quan cho WASM là mã khởi tạo.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Khi chúng tôi sử dụng [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), nó tạo ra hai tệp chúng tôi sử dụng ở đây: một tệp wasm với mã thực tế (ở đây là `src/rust-wasm/pkg/rust_wasm_bg.wasm`) và một tệp JavaScript với các định nghĩa để sử dụng nó (ở đây là `src/rust_wasm/pkg/rust_wasm.js`). Xuất mặc định của tệp JavaScript đó là mã cần chạy để khởi tạo WASM.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Lỗi khi tải wasm:', err)
        alert("Lỗi Wasm: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[Hook `useEffect`](https://react.dev/reference/react/useEffect) cho phép bạn chỉ định một hàm được thực thi khi các biến trạng thái thay đổi. Ở đây, danh sách các biến trạng thái trống (`[]`), vì vậy hàm này chỉ được thực thi một lần khi trang tải.

Hàm hiệu ứng phải trả về ngay lập tức. Để sử dụng mã không đồng bộ, chẳng hạn như `init` của WASM (phải tải tệp `.wasm` và do đó mất thời gian), chúng tôi xác định một hàm [`async`](https://en.wikipedia.org/wiki/Async/await) nội bộ và chạy nó mà không có `await`.

**`Bill.jsx`**

Đây là giao diện người dùng cho Bill. Nó có một hành động duy nhất, tạo một địa chỉ dựa trên siêu địa chỉ ẩn do Alice cung cấp.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Ngoài việc xuất mặc định, mã JavaScript được tạo bởi `wasm-pack` còn xuất một hàm cho mọi hàm trong mã WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Để gọi các hàm WASM, chúng ta chỉ cần gọi hàm được xuất bởi tệp JavaScript do `wasm-pack` tạo ra.

**`Alice.jsx`**

Mã trong `Alice.jsx` tương tự, ngoại trừ việc Alice có hai hành động:

- Tạo một siêu địa chỉ
- Lấy khóa riêng tư cho một địa chỉ do Bill xuất bản

## Kết luận {#conclusion}

Địa chỉ ẩn không phải là thuốc chữa bách bệnh; chúng phải được [sử dụng đúng cách](#go-wrong). Nhưng khi được sử dụng đúng cách, chúng có thể kích hoạt quyền riêng tư trên một chuỗi khối công khai.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).