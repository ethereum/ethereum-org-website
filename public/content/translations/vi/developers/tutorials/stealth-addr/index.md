---
title: "Sử dụng địa chỉ ẩn danh"
description: "Địa chỉ ẩn danh cho phép người dùng chuyển tài sản một cách ẩn danh. Sau khi đọc bài viết này, bạn sẽ có thể: Giải thích địa chỉ ẩn danh là gì và cách chúng hoạt động, hiểu cách sử dụng địa chỉ ẩn danh theo cách bảo vệ quyền riêng tư, và viết một ứng dụng trên nền web sử dụng địa chỉ ẩn danh."
author: Ori Pomerantz
tags: ["địa chỉ ẩn danh", "quyền riêng tư", "mật mã học", "Rust", "wasm"]
skill: intermediate
breadcrumb: Địa chỉ ẩn danh
published: 2025-11-30
lang: vi
sidebarDepth: 3
---

Bạn là Bill. Vì một số lý do mà chúng ta sẽ không đi sâu vào, bạn muốn quyên góp cho chiến dịch "Alice cho Nữ hoàng Thế giới" và muốn Alice biết bạn đã quyên góp để cô ấy sẽ trao phần thưởng cho bạn nếu cô ấy thắng. Thật không may, chiến thắng của cô ấy không được đảm bảo. Có một chiến dịch cạnh tranh là "Carol cho Nữ hoàng Hệ Mặt trời". Nếu Carol thắng và phát hiện ra bạn đã quyên góp cho Alice, bạn sẽ gặp rắc rối. Vì vậy, bạn không thể chỉ chuyển 200 ETH từ tài khoản của mình sang tài khoản của Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) có giải pháp cho vấn đề này. ERC này giải thích cách sử dụng [địa chỉ ẩn danh](https://nerolation.github.io/stealth-utils) để chuyển ẩn danh.

**Cảnh báo**: Mật mã học đằng sau các địa chỉ ẩn danh, theo như chúng ta biết, là an toàn. Tuy nhiên, vẫn có những cuộc tấn công kênh kề (side-channel attacks) tiềm ẩn. [Bên dưới](#go-wrong), bạn sẽ thấy những gì bạn có thể làm để giảm thiểu rủi ro này.

## Cách địa chỉ ẩn danh hoạt động {#how}

Bài viết này sẽ cố gắng giải thích địa chỉ ẩn danh theo hai cách. Cách đầu tiên là [cách sử dụng chúng](#how-use). Phần này là đủ để hiểu phần còn lại của bài viết. Sau đó, có [một lời giải thích về toán học đằng sau nó](#how-math). Nếu bạn quan tâm đến mật mã học, hãy đọc cả phần này. 

### Phiên bản đơn giản (cách sử dụng địa chỉ ẩn danh) {#how-use}

Alice tạo hai khóa riêng tư và công bố các khóa công khai tương ứng (có thể được kết hợp thành một địa chỉ meta có độ dài gấp đôi). Bill cũng tạo một khóa riêng tư và công bố khóa công khai tương ứng.

Bằng cách sử dụng khóa công khai của một bên và khóa riêng tư của bên kia, bạn có thể tạo ra một bí mật chung (shared secret) mà chỉ Alice và Bill biết (nó không thể được tạo ra nếu chỉ có các khóa công khai). Sử dụng bí mật chung này, Bill lấy được địa chỉ ẩn danh và có thể gửi tài sản vào đó.

Alice cũng nhận được địa chỉ từ bí mật chung, nhưng vì cô ấy biết các khóa riêng tư của các khóa công khai mà cô ấy đã công bố, cô ấy cũng có thể lấy được khóa riêng tư cho phép cô ấy rút tiền từ địa chỉ đó.

### Toán học (tại sao địa chỉ ẩn danh hoạt động như thế này) {#how-math}

Các địa chỉ ẩn danh tiêu chuẩn sử dụng [mật mã học đường cong elliptic (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) để có hiệu suất tốt hơn với ít bit khóa hơn, trong khi vẫn giữ nguyên mức độ bảo mật. Nhưng phần lớn chúng ta có thể bỏ qua điều đó và giả vờ như chúng ta đang sử dụng số học thông thường.

Có một con số mà mọi người đều biết, *G*. Bạn có thể nhân với *G*. Nhưng do bản chất của ECC, việc chia cho *G* là điều gần như không thể. Cách mật mã học khóa công khai thường hoạt động trong Ethereum là bạn có thể sử dụng một khóa riêng tư, *P<sub>priv</sub>*, để ký các giao dịch sau đó được xác minh bằng một khóa công khai, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice tạo hai khóa riêng tư, *K<sub>priv</sub>* và *V<sub>priv</sub>*. *K<sub>priv</sub>* sẽ được sử dụng để tiêu tiền từ địa chỉ ẩn danh, và *V<sub>priv</sub>* để xem các địa chỉ thuộc về Alice. Sau đó, Alice công bố các khóa công khai: *K<sub>pub</sub> = GK<sub>priv</sub>* và *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill tạo một khóa riêng tư thứ ba, *R<sub>priv</sub>*, và công bố *R<sub>pub</sub> = GR<sub>priv</sub>* lên một sổ đăng ký trung tâm (Bill cũng có thể đã gửi nó cho Alice, nhưng chúng ta giả định rằng Carol đang nghe lén).

Bill tính toán *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, mà anh ấy mong đợi Alice cũng biết (được giải thích bên dưới). Giá trị này được gọi là *S*, bí mật chung. Điều này cung cấp cho Bill một khóa công khai, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. Từ khóa công khai này, anh ấy có thể tính toán một địa chỉ và gửi bất kỳ tài nguyên nào anh ấy muốn vào đó. Trong tương lai, nếu Alice thắng, Bill có thể nói cho cô ấy biết *R<sub>priv</sub>* để chứng minh các tài nguyên đó đến từ anh ấy.

Alice tính toán *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Điều này cung cấp cho cô ấy cùng một bí mật chung, *S*. Vì cô ấy biết khóa riêng tư, *K<sub>priv</sub>*, cô ấy có thể tính toán *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. Khóa này cho phép cô ấy truy cập tài sản trong địa chỉ là kết quả từ *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

Chúng ta có một khóa xem (viewing key) riêng biệt để cho phép Alice ký hợp đồng phụ với Dịch vụ Chiến dịch Thống trị Thế giới của Dave. Alice sẵn sàng cho Dave biết các địa chỉ công khai và thông báo cho cô ấy khi có thêm tiền, nhưng cô ấy không muốn anh ta tiêu tiền chiến dịch của mình.

Vì việc xem và chi tiêu sử dụng các khóa riêng biệt, Alice có thể đưa cho Dave *V<sub>priv</sub>*. Sau đó, Dave có thể tính toán *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* và bằng cách đó lấy được các khóa công khai (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). Nhưng nếu không có *K<sub>priv</sub>*, Dave không thể lấy được khóa riêng tư.

Tóm lại, đây là các giá trị được biết bởi những người tham gia khác nhau.

| Alice | Đã công bố | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Address=f(P<sub>pub</sub>)* | - | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## Khi địa chỉ ẩn danh gặp sự cố {#go-wrong}

*Không có bí mật nào trên Chuỗi khối*. Mặc dù các địa chỉ ẩn danh có thể cung cấp cho bạn quyền riêng tư, nhưng quyền riêng tư đó dễ bị phân tích lưu lượng (traffic analysis). Lấy một ví dụ đơn giản, hãy tưởng tượng rằng Bill nạp tiền vào một địa chỉ và ngay lập tức gửi một giao dịch để công bố giá trị *R<sub>pub</sub>*. Nếu không có *V<sub>priv</sub>* của Alice, chúng ta không thể chắc chắn rằng đây là một địa chỉ ẩn danh, nhưng đó là khả năng cao nhất. Sau đó, chúng ta thấy một giao dịch khác chuyển toàn bộ ETH từ địa chỉ đó sang địa chỉ quỹ chiến dịch của Alice. Chúng ta có thể không chứng minh được điều đó, nhưng rất có thể Bill vừa quyên góp cho chiến dịch của Alice. Carol chắc chắn sẽ nghĩ như vậy.

Rất dễ để Bill tách biệt việc công bố *R<sub>pub</sub>* khỏi việc nạp tiền vào địa chỉ ẩn danh (thực hiện chúng vào các thời điểm khác nhau, từ các địa chỉ khác nhau). Tuy nhiên, điều đó là chưa đủ. Mô hình mà Carol tìm kiếm là Bill nạp tiền vào một địa chỉ, và sau đó quỹ chiến dịch của Alice rút tiền từ đó. 

Một giải pháp là chiến dịch của Alice không rút tiền trực tiếp mà sử dụng nó để trả cho một bên thứ ba. Nếu chiến dịch của Alice gửi 10 ETH cho Dịch vụ Chiến dịch Thống trị Thế giới của Dave, Carol chỉ biết rằng Bill đã quyên góp cho một trong những khách hàng của Dave. Nếu Dave có đủ khách hàng, Carol sẽ không thể biết liệu Bill đã quyên góp cho Alice, người đang cạnh tranh với cô ấy, hay cho Adam, Albert, hoặc Abigail mà Carol không quan tâm. Alice có thể bao gồm một giá trị đã được băm (hashed value) cùng với khoản thanh toán, và sau đó cung cấp cho Dave tiền ảnh (preimage), để chứng minh rằng đó là khoản quyên góp của cô ấy. Ngoài ra, như đã lưu ý ở trên, nếu Alice đưa cho Dave *V<sub>priv</sub>* của cô ấy, anh ta đã biết khoản thanh toán đến từ ai.

Vấn đề chính với giải pháp này là nó yêu cầu Alice phải quan tâm đến sự bí mật khi sự bí mật đó mang lại lợi ích cho Bill. Alice có thể muốn duy trì danh tiếng của mình để bạn của Bill là Bob cũng sẽ quyên góp cho cô ấy. Nhưng cũng có khả năng cô ấy sẽ không ngại tiết lộ Bill, bởi vì khi đó anh ấy sẽ sợ hãi về những gì sẽ xảy ra nếu Carol thắng. Bill cuối cùng có thể cung cấp cho Alice nhiều sự hỗ trợ hơn nữa.

### Sử dụng nhiều lớp ẩn danh {#multi-layer}

Thay vì dựa vào Alice để bảo vệ quyền riêng tư của Bill, Bill có thể tự làm điều đó. Anh ấy có thể tạo nhiều địa chỉ meta cho những người hư cấu, Bob và Bella. Sau đó, Bill gửi ETH cho Bob, và "Bob" (thực ra là Bill) gửi nó cho Bella. "Bella" (cũng là Bill) gửi nó cho Alice.

Carol vẫn có thể thực hiện phân tích lưu lượng và thấy đường ống từ Bill đến Bob đến Bella đến Alice. Tuy nhiên, nếu "Bob" và "Bella" cũng sử dụng ETH cho các mục đích khác, sẽ không có vẻ như Bill đã chuyển bất cứ thứ gì cho Alice, ngay cả khi Alice ngay lập tức rút tiền từ địa chỉ ẩn danh sang địa chỉ chiến dịch đã biết của cô ấy.

## Viết một ứng dụng địa chỉ ẩn danh {#write-app}

Bài viết này giải thích một ứng dụng địa chỉ ẩn danh [có sẵn trên GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Công cụ {#tools}

Có [một thư viện địa chỉ ẩn danh bằng TypeScript](https://github.com/ScopeLift/stealth-address-sdk) mà chúng ta có thể sử dụng. Tuy nhiên, các hoạt động mật mã học có thể tiêu tốn nhiều CPU. Tôi thích triển khai chúng bằng một ngôn ngữ biên dịch, chẳng hạn như [Rust](https://rust-lang.org/), và sử dụng [WASM](https://webassembly.org/) để chạy mã trong trình duyệt.

Chúng ta sẽ sử dụng [Vite](https://vite.dev/) và [React](https://react.dev/). Đây là những công cụ tiêu chuẩn trong ngành; nếu bạn không quen thuộc với chúng, bạn có thể sử dụng [hướng dẫn này](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Để sử dụng Vite, chúng ta cần Node.

### Xem địa chỉ ẩn danh hoạt động {#in-action}

1. Cài đặt các công cụ cần thiết: [Rust](https://rust-lang.org/tools/install/) và [Node](https://nodejs.org/en/download).

2. Sao chép (clone) kho lưu trữ GitHub.

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

5. Duyệt đến [ứng dụng](http://localhost:5173/). Trang ứng dụng này có hai khung: một cho giao diện người dùng của Alice và một cho của Bill. Hai khung này không giao tiếp với nhau; chúng chỉ nằm trên cùng một trang cho thuận tiện.

6. Với tư cách là Alice, nhấp vào **Generate a Stealth Meta-Address** (Tạo một địa chỉ meta ẩn danh). Thao tác này sẽ hiển thị địa chỉ ẩn danh mới và các khóa riêng tư tương ứng. Sao chép địa chỉ meta ẩn danh vào khay nhớ tạm (clipboard).

7. Với tư cách là Bill, dán địa chỉ meta ẩn danh mới và nhấp vào **Generate an address** (Tạo một địa chỉ). Điều này cung cấp cho bạn địa chỉ để nạp tiền cho Alice. 

8. Sao chép địa chỉ và khóa công khai của Bill rồi dán chúng vào khu vực "Private key for address generated by Bill" (Khóa riêng tư cho địa chỉ do Bill tạo) trên giao diện người dùng của Alice. Khi các trường đó được điền, bạn sẽ thấy khóa riêng tư để truy cập tài sản tại địa chỉ đó.

9. Bạn có thể sử dụng [một máy tính trực tuyến](https://iancoleman.net/ethereum-private-key-to-address/) để đảm bảo khóa riêng tư tương ứng với địa chỉ.

### Cách chương trình hoạt động {#how-the-program-works}

#### Thành phần WASM {#wasm}

Mã nguồn biên dịch thành WASM được viết bằng [Rust](https://rust-lang.org/). Bạn có thể xem nó trong [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Mã này chủ yếu là một giao diện giữa mã JavaScript và [Thư viện `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

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

Gói [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) cần tạo các giá trị ngẫu nhiên. Điều đó không thể được thực hiện bằng các phương tiện thuật toán thuần túy; nó yêu cầu quyền truy cập vào một quá trình vật lý như một nguồn entropy. Định nghĩa này chỉ định rằng chúng ta sẽ lấy entropy đó bằng cách yêu cầu trình duyệt mà chúng ta đang chạy.

```toml
console_error_panic_hook = "0.1.7"
```

[Thư viện này](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) cung cấp cho chúng ta các thông báo lỗi có ý nghĩa hơn khi mã WASM gặp lỗi nghiêm trọng (panic) và không thể tiếp tục.

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

Các định nghĩa để tạo một gói WASM từ Rust. Chúng được ghi chép [tại đây](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Các hàm chúng ta cần từ [Thư viện `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust thường sử dụng các [mảng](https://doc.rust-lang.org/std/primitive.array.html) byte (`[u8; <size>]`) cho các giá trị. Nhưng trong JavaScript, chúng ta thường sử dụng các chuỗi thập lục phân. [Thư viện `hex`](https://docs.rs/hex/latest/hex/) dịch cho chúng ta từ biểu diễn này sang biểu diễn khác.

```rust
#[wasm_bindgen]
```

Tạo các ràng buộc (bindings) WASM để có thể gọi hàm này từ JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Cách dễ nhất để trả về một đối tượng có nhiều trường là trả về một chuỗi JSON. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) trả về ba trường:

- Địa chỉ meta (*K<sub>pub</sub>* và *V<sub>pub</sub>*)
- Khóa riêng tư để xem (*V<sub>priv</sub>*)
- Khóa riêng tư để chi tiêu (*K<sub>priv</sub>*)

Cú pháp [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) cho phép chúng ta tách các giá trị đó ra một lần nữa.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Sử dụng macro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) để tạo chuỗi được mã hóa JSON. Sử dụng [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) để thay đổi các mảng thành chuỗi thập lục phân.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Hàm này biến một chuỗi thập lục phân (do JavaScript cung cấp) thành một mảng byte. Chúng ta sử dụng nó để phân tích cú pháp các giá trị do mã JavaScript cung cấp. Hàm này phức tạp vì cách Rust xử lý các mảng và vector.

Biểu thức `<const N: usize>` được gọi là một [generic](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` là một tham số kiểm soát độ dài của mảng được trả về. Hàm thực sự được gọi là `str_to_array::<n>`, trong đó `n` là độ dài mảng.

Giá trị trả về là `Option<[u8; N]>`, có nghĩa là mảng được trả về là [tùy chọn (optional)](https://doc.rust-lang.org/std/option/). Đây là một mô hình điển hình trong Rust cho các hàm có thể thất bại.

Ví dụ, nếu chúng ta gọi `str_to_array::10("bad060a7")`, hàm được cho là sẽ trả về một mảng mười giá trị, nhưng đầu vào chỉ có bốn byte. Hàm cần phải thất bại, và nó làm như vậy bằng cách trả về `None`. Giá trị trả về cho `str_to_array::4("bad060a7")` sẽ là `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode trả về Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Hàm [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) trả về một `Result<Vec<u8>, FromHexError>`. Loại [`Result`](https://doc.rust-lang.org/std/result/) có thể chứa một kết quả thành công (`Ok(value)`) hoặc một lỗi (`Err(error)`).

Phương thức `.ok()` biến `Result` thành một `Option`, có giá trị là giá trị `Ok()` nếu thành công hoặc `None` nếu không. Cuối cùng, [toán tử dấu chấm hỏi](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) hủy bỏ các hàm hiện tại và trả về một `None` nếu `Option` trống. Nếu không, nó sẽ mở gói (unwrap) giá trị và trả về giá trị đó (trong trường hợp này, để gán một giá trị cho `vec`).

Điều này có vẻ giống như một phương pháp phức tạp một cách kỳ lạ để xử lý lỗi, nhưng `Result` và `Option` đảm bảo rằng tất cả các lỗi đều được xử lý, theo cách này hay cách khác.

```rust
    if vec.len() != N { return None; }
```

Nếu số lượng byte không chính xác, đó là một sự thất bại, và chúng ta trả về `None`.

```rust
    // try_into tiêu thụ vec và cố gắng tạo ra [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust có hai loại mảng. [Mảng](https://doc.rust-lang.org/std/primitive.array.html) có kích thước cố định. [Vector](https://doc.rust-lang.org/std/vec/index.html) có thể tăng và giảm kích thước. `hex::decode` trả về một vector, nhưng thư viện `eth_stealth_addresses` muốn nhận các mảng. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) chuyển đổi một giá trị thành một loại khác, ví dụ, một vector thành một mảng.

```rust
    Some(array)
}
```

Rust không yêu cầu bạn sử dụng từ khóa [`return`](https://doc.rust-lang.org/std/keyword.return.html) khi trả về một giá trị ở cuối một hàm.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Hàm này nhận một địa chỉ meta công khai, bao gồm cả *V<sub>pub</sub>* và *K<sub>pub</sub>*. Nó trả về địa chỉ ẩn danh, khóa công khai để công bố (*R<sub>pub</sub>*), và một giá trị quét (scan value) một byte giúp tăng tốc độ xác định các địa chỉ đã công bố nào có thể thuộc về Alice.

Giá trị quét là một phần của bí mật chung (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Giá trị này có sẵn cho Alice, và việc kiểm tra nó nhanh hơn nhiều so với việc kiểm tra xem *f(K<sub>pub</sub>+G\*hash(S))* có bằng địa chỉ đã công bố hay không.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Chúng ta sử dụng [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) của thư viện.

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

Hàm này sử dụng [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) của thư viện để tính toán khóa riêng tư nhằm rút tiền từ địa chỉ (*R<sub>priv</sub>*). Tính toán này yêu cầu các giá trị sau:

- Địa chỉ (*Address=f(P<sub>pub</sub>)*)
- Khóa công khai do Bill tạo (*R<sub>pub</sub>*)
- Khóa riêng tư để xem (*V<sub>priv</sub>*)
- Khóa riêng tư để chi tiêu (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) chỉ định rằng hàm được thực thi khi mã WASM được khởi tạo.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Mã này chỉ định rằng đầu ra lỗi nghiêm trọng (panic) sẽ được gửi đến bảng điều khiển (console) JavaScript. Để xem nó hoạt động, hãy sử dụng ứng dụng và cung cấp cho Bill một địa chỉ meta không hợp lệ (chỉ cần thay đổi một chữ số thập lục phân). Bạn sẽ thấy lỗi này trong bảng điều khiển JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Theo sau là một dấu vết ngăn xếp (stack trace). Sau đó, cung cấp cho Bill địa chỉ meta hợp lệ, và cung cấp cho Alice một địa chỉ không hợp lệ hoặc một khóa công khai không hợp lệ. Bạn sẽ thấy lỗi này:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Một lần nữa, theo sau là một dấu vết ngăn xếp.

#### Giao diện người dùng {#ui}

Giao diện người dùng được viết bằng [React](https://react.dev/) và được phục vụ bởi [Vite](https://vite.dev/). Bạn có thể tìm hiểu về chúng bằng cách sử dụng [hướng dẫn này](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Không cần [Wagmi](https://wagmi.sh/) ở đây vì chúng ta không tương tác trực tiếp với một Chuỗi khối hoặc một Ví.

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

Tệp này là thành phần chính của ứng dụng. Nó là một vùng chứa (container) bao gồm hai thành phần: `Alice` và `Bill`, giao diện người dùng cho những người dùng đó. Phần liên quan đến WASM là mã khởi tạo.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Khi chúng ta sử dụng [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), nó tạo ra hai tệp mà chúng ta sử dụng ở đây: một tệp wasm với mã thực tế (ở đây là `src/rust-wasm/pkg/rust_wasm_bg.wasm`) và một tệp JavaScript với các định nghĩa để sử dụng nó (ở đây là `src/rust_wasm/pkg/rust_wasm.js`). Xuất mặc định (default export) của tệp JavaScript đó là mã cần chạy để khởi tạo WASM.

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
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[Hook `useEffect`](https://react.dev/reference/react/useEffect) cho phép bạn chỉ định một hàm được thực thi khi các biến trạng thái thay đổi. Ở đây, danh sách các biến trạng thái trống (`[]`), vì vậy hàm này chỉ được thực thi một lần khi trang tải.

Hàm effect phải trả về ngay lập tức. Để sử dụng mã bất đồng bộ, chẳng hạn như `init` của WASM (phải tải tệp `.wasm` và do đó cần thời gian), chúng ta định nghĩa một hàm [`async`](https://en.wikipedia.org/wiki/Async/await) nội bộ và chạy nó mà không có `await`.

**`Bill.jsx`**

Đây là giao diện người dùng cho Bill. Nó có một hành động duy nhất, tạo một địa chỉ dựa trên địa chỉ meta ẩn danh do Alice cung cấp.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Ngoài xuất mặc định, mã JavaScript do `wasm-pack` tạo ra sẽ xuất một hàm cho mọi hàm trong mã WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Để gọi các hàm WASM, chúng ta chỉ cần gọi hàm được xuất bởi tệp JavaScript do `wasm-pack` tạo ra.

**`Alice.jsx`**

Mã trong `Alice.jsx` cũng tương tự, ngoại trừ việc Alice có hai hành động:

- Tạo một địa chỉ meta
- Lấy khóa riêng tư cho một địa chỉ do Bill công bố

## Kết luận {#conclusion}

Địa chỉ ẩn danh không phải là thuốc chữa bách bệnh; chúng phải được [sử dụng đúng cách](#go-wrong). Nhưng khi được sử dụng đúng cách, chúng có thể kích hoạt quyền riêng tư trên một Chuỗi khối công khai.

[Xem thêm các bài viết khác của tôi tại đây](https://cryptodocguy.pro/).