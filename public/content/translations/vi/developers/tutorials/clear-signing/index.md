---
title: "Thêm việc ký rõ ràng vào giao thức của bạn với ERC-7730"
description: "Tìm hiểu cách viết bộ mô tả ERC-7730 để các tương tác hợp đồng thông minh của bạn hiển thị chi tiết dễ đọc trong ví trước khi người dùng ký."
author: Hester Bruikman
lang: vi
tags: ["ERC-7730", "bảo mật", "việc ký", "hợp đồng thông minh", "ví"]
skill: intermediate
breadcrumb: "Việc ký rõ ràng"
published: 2026-05-11
---

Hầu hết các vụ khai thác Ethereum lớn đều có cùng một bước cuối cùng: người dùng chấp thuận một giao dịch mà họ không thể hiểu rõ ý nghĩa. Các ví phần cứng hiển thị dữ liệu lệnh gọi (calldata) dạng hex thô, và tệ hơn là buộc bạn phải bật tính năng ký mù (blind signing). Các ví phần mềm hiển thị các trường đã được giải mã, nhưng chỉ khi chúng nhận diện được hợp đồng. Khi chúng không nhận diện được, cho dù vì giao thức còn mới, ứng dụng bị xâm phạm, hay thiết bị đang ngoại tuyến, người dùng đều phải ký mù.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) định nghĩa một định dạng JSON tiêu chuẩn để mô tả *ý nghĩa* của các lệnh gọi hàm trong hợp đồng của bạn.

Một ví hỗ trợ ERC-7730 sẽ đọc bộ mô tả của bạn và hiển thị:

> **Hoán đổi**  
> Gửi: 1.000 USDC  
> Nhận tối thiểu: 0,42 WETH  
> Giao thức: Uniswap V2

Hoặc một câu hoàn chỉnh duy nhất mà cả con người và các tác nhân (agent) đều có thể đọc được:

> Hoán đổi 1.000 USDC để lấy ít nhất 0,42 WETH

Thay vì một bộ chọn hàm (function selector) và một danh sách các giá trị số nguyên thô.

Đây là [việc ký rõ ràng (clear signing)](https://clearsigning.org/) — "Những gì bạn thấy là những gì bạn ký." Hướng dẫn này sẽ dẫn dắt bạn qua quá trình viết một bộ mô tả cho hợp đồng của riêng bạn, xác thực nó bằng công cụ CLI chính thức và gửi nó lên sổ đăng ký mở.

## Điều kiện tiên quyết {#prerequisites}

- Làm quen với Solidity và ABI của hợp đồng thông minh
- Một hợp đồng thông minh đã được triển khai với ABI đã được xác minh (yêu cầu xác minh trên [Sourcify](https://sourcify.dev) trước khi bộ mô tả được chấp nhận vào sổ đăng ký)
- Python 3.12 cho CLI xác thực (gói `erc7730` được ghim không thể cài đặt trên Python 3.13 trở lên). Nếu Python trên hệ thống của bạn là một phiên bản khác, [uv](https://docs.astral.sh/uv/) có thể tải xuống và chạy Python 3.12 cho bạn
- Kiến thức cơ bản về JSON

## Bộ mô tả ERC-7730 là gì? {#what-is-an-erc-7730-descriptor}

Bộ mô tả là một tệp JSON duy nhất gồm ba phần:

| Phần | Mục đích |
| :---- | :---- |
| `context` | Liên kết bộ mô tả với các đợt triển khai hợp đồng cụ thể theo ID chuỗi và địa chỉ |
| `metadata` | Đặt tên cho dự án và định nghĩa các hằng số có thể tái sử dụng |
| `display` | Ánh xạ từng chữ ký hàm với các nhãn và định dạng trường dễ đọc |

Vì bộ mô tả tách biệt với bản thân hợp đồng, bạn có thể thêm hỗ trợ việc ký rõ ràng vào bất kỳ giao thức hiện có nào mà không cần triển khai lại. Các ví sẽ truy xuất bộ mô tả từ sổ đăng ký và sử dụng chúng tại thời điểm ký.

## Bước 1: Tạo bộ khung tệp {#step-1-create-the-file-skeleton}

Tạo một tệp có tên `calldata-<ContractName>.json`, ví dụ `calldata-SwapRouter.json`. Tiền tố `calldata-` cho sổ đăng ký biết rằng bộ mô tả này bao gồm các lệnh gọi hàm của hợp đồng, trái ngược với `eip712-` dành cho các tin nhắn dữ liệu có kiểu (typed-data). Nếu bạn cần mô tả nhiều phiên bản của một hợp đồng, hãy đưa phiên bản hợp đồng vào tên, như trong `calldata-UniswapV3Router02.json` của sổ đăng ký.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## Bước 2: Viết phần ngữ cảnh {#step-2-write-the-context-section}

Phần `context` liên kết bộ mô tả với một hoặc nhiều đợt triển khai hợp đồng. Các ví sử dụng điều này để khớp một giao dịch đến với bộ mô tả chính xác.

```json
"context": {
  "$id": "example-swap-router",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Các trường ngữ cảnh {#context-fields}

- `context.$id` — Một định danh duy nhất cho tài liệu bộ mô tả hoặc cấu hình triển khai này.
- `contract.deployments` — Tập hợp các đợt triển khai mà bộ mô tả này áp dụng.
- `deployments[].chainId` — ID chuỗi EVM cho một đợt triển khai. Bao gồm mọi chuỗi nơi hợp đồng của bạn được triển khai.
- `deployments[].address` — Địa chỉ hợp đồng mà các ví nên liên kết với bộ mô tả này. Đây là địa chỉ mà người dùng thực sự gửi giao dịch đến. Nếu hợp đồng của bạn có thể nâng cấp, đó là địa chỉ proxy, không phải địa chỉ triển khai (implementation), trong khi các chữ ký hàm trong `display.formats` đến từ ABI của bản triển khai.

## Bước 3: Viết phần siêu dữ liệu {#step-3-write-the-metadata-section}

Phần siêu dữ liệu cung cấp thông tin dễ đọc về dự án và hợp đồng được mô tả bởi tệp này. Các ví có thể sử dụng thông tin này để hiển thị tên giao thức, liên kết và các chi tiết ngữ cảnh khác trong quá trình ký.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Các trường siêu dữ liệu {#metadata-fields}

- `owner` — Dự án, giao thức, tổ chức hoặc người bảo trì chịu trách nhiệm cho bộ mô tả này.
- `info.url` — Một URL dự án hoặc tài liệu chính thức mà các ví có thể hiển thị cho người dùng để có thêm ngữ cảnh.
- `contractName` — Tên hợp đồng hoặc bản triển khai được mô tả bởi tệp này, thường khớp với mã nguồn hoặc ABI đã được xác minh.

Nếu tệp ERC-7730 của bạn mô tả một hợp đồng ERC-20, bạn cũng nên thêm một đối tượng token. 

## Bước 4: Viết phần định dạng hiển thị {#step-4-write-the-displayformats-section}

Đối tượng `display.formats` ánh xạ các chữ ký hàm với các hướng dẫn ký dễ đọc. Đây là cách các ví hiển thị hàm của bạn cho người dùng trước khi họ chấp thuận một giao dịch!

Mỗi khóa (key) là một đoạn ABI dễ đọc — chữ ký hàm bao gồm cả tên tham số và kiểu tham số chính xác như chúng xuất hiện trong ABI của bạn.


### Ví dụ: Mô tả một giao dịch hoán đổi token {#eg-describing-token-swap}

Ví dụ này mô tả `swapExactTokensForTokens` từ hợp đồng `Router02` của Uniswap V2. Token đầu vào là phần tử đầu tiên của `path`, và token đầu ra là phần tử cuối cùng (`path` có thể có nhiều hơn hai phần tử cho một giao dịch hoán đổi nhiều bước (multi-hop)).

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}
```

### Các trường hiển thị {#display-fields}

- **`intent`** — **(Bắt buộc)** Một mô tả ngắn gọn, thân thiện với người dùng về hành động, chẳng hạn như "Hoán đổi".
- **`interpolatedIntent`** — **(Được khuyến nghị)** Một mẫu câu phong phú hơn nhúng các giá trị trường đã được định dạng, chẳng hạn như `"Swap {amountIn} for at least {amountOutMin}"`. Bao gồm điều này cùng với `intent` để cung cấp một bộ mô tả thân thiện với người dùng hơn nữa mà các ví có thể chọn hiển thị tùy thuộc vào bất kỳ ràng buộc hiển thị nào.
- **`fields`** — **(Bắt buộc)** Danh sách có thứ tự các trường giao dịch mà các ví nên hiển thị cho người dùng.
  - **`path`** — **(Bắt buộc)** Một tham chiếu đến dữ liệu giao dịch. `#.fieldName` trỏ đến một tham số dữ liệu lệnh gọi đã được giải mã theo tên trong ABI. `@.value` đề cập đến giá trị ETH được gửi kèm theo giao dịch. Các phần tử mảng được viết với một `.` trước dấu ngoặc vuông: `#.path.[0]` là phần tử đầu tiên và `#.path.[-1]` là phần tử cuối cùng. `#.path[0]` (không có dấu chấm) sẽ bị linter từ chối.
  - **`label`** — **(Bắt buộc)** Nhãn dễ đọc được hiển thị bên cạnh giá trị.
  - **`format`** — **(Được khuyến nghị)** Kiểm soát cách giá trị nên được hiển thị. Các định dạng phổ biến bao gồm:
    - `tokenAmount`
    - `addressName`
    - `date`

    Sử dụng `raw` khi không cần định dạng bổ sung. Một số định dạng chấp nhận cấu hình **`params`** bổ sung. Ví dụ:

    - `tokenAmount` có thể sử dụng `tokenPath` để xác định địa chỉ token nào cung cấp số thập phân và siêu dữ liệu mã giao dịch (ticker).
    - `date` có thể sử dụng `encoding` để mô tả cách dấu thời gian được mã hóa.

    Nếu định dạng được chọn không yêu cầu thông tin bổ sung, hãy bỏ qua `params`.

## Bộ mô tả hoàn chỉnh {#the-complete-descriptor}

Thay thế các địa chỉ giữ chỗ bằng các địa chỉ của hợp đồng đã được triển khai của bạn. Linter sẽ kiểm tra bộ mô tả dựa trên ABI đã được xác minh tại các địa chỉ đó, vì vậy nó sẽ báo lỗi cho đến khi bạn thực hiện việc này.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## Bước 5: Gửi lên sổ đăng ký {#step-5-submit-to-the-registry}

[Sổ đăng ký ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) là một kho lưu trữ mở được lưu trữ bởi [Tổ chức Ethereum](/foundation/) với tư cách là một người quản lý trung lập. Bất kỳ ai cũng có thể tự do sao chép (clone) và tự lưu trữ nó — các ví sẽ độc lập quyết định các phiên bản sổ đăng ký nào mà họ tin tưởng.

1. Phân nhánh (fork) kho lưu trữ trên GitHub
2. Tạo một thư mục tại `registry/<your-project-name>/`
3. Đặt tệp của bạn vào bên trong nó: `registry/myproject/calldata-SwapRouter.json`
4. Cập nhật trường `$schema` thành đường dẫn tương đối được sử dụng trong kho lưu trữ: `"../../specs/erc7730-v2.schema.json"`. CI sẽ từ chối một URL ở đây.
5. Thêm một tệp kiểm thử (xem bên dưới)
6. Xác thực các tệp của bạn cục bộ (xem bên dưới)
7. Mở một yêu cầu kéo (pull request). Mỗi yêu cầu kéo chỉ có thể thay đổi một thư mục dưới `registry/`

### Thêm một tệp kiểm thử {#add-a-test-file}

Mỗi bộ mô tả bạn thêm hoặc thay đổi đều cần một tệp kiểm thử, để các bản triển khai việc ký rõ ràng có thể được kiểm tra dựa trên nó. Tạo `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` với ít nhất một trường hợp kiểm thử cho mỗi hàm trong `display.formats`. CI sẽ trích xuất bộ chọn hàm của mỗi định dạng và báo lỗi nếu không có giao dịch kiểm thử nào gọi nó.

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx` là toàn bộ giao dịch **chưa ký** đã được tuần tự hóa (được rút gọn ở đây), không chỉ là dữ liệu lệnh gọi. Các giao dịch thực tế đến hợp đồng của bạn là những trường hợp kiểm thử tốt nhất.
- `dataProvider` cung cấp siêu dữ liệu token (và tùy chọn là địa chỉ và tên ENS) để các bài kiểm thử không cần truy cập mạng lưới.
- `expected` là những gì một ví nên hiển thị. CI sẽ kết xuất (render) từng trường hợp kiểm thử với các bản triển khai việc ký rõ ràng và báo cáo bất kỳ sự khác biệt nào trên yêu cầu kéo.

Xem [Các trường hợp kiểm thử tham chiếu](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) trong README của sổ đăng ký để biết định dạng đầy đủ, bao gồm các tệp kiểm thử cho các bộ mô tả EIP-712.

### Xác thực cục bộ {#validate-locally}

Sổ đăng ký kiểm tra các bộ mô tả bằng công cụ dòng lệnh [`erc7730`](https://github.com/sourcifyeth/python-erc7730), được ghim trong `.github/requirements.txt`. Chạy nó từ thư mục gốc của bản phân nhánh của bạn, trong môi trường Python 3.12:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Nếu bạn sử dụng [uv](https://docs.astral.sh/uv/), bạn có thể bỏ qua môi trường ảo và uv sẽ tải xuống Python 3.12 nếu cần:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Linter sẽ kiểm tra bộ mô tả dựa trên lược đồ (schema) và dựa trên ABI đã được xác minh của hợp đồng của bạn. Hãy sửa mọi lỗi. Các cảnh báo như `Missing display format` có nghĩa là hợp đồng có các hàm mà bộ mô tả của bạn chưa mô tả. Để cũng kiểm tra các đường dẫn `$schema` và tệp kiểm thử theo cách CI thực hiện, hãy xem [Cách xác thực](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) trong README của sổ đăng ký.

Khi bạn mở PR, CI sẽ tự động chạy xác thực lược đồ, kiểm tra xem các chữ ký hàm có tạo ra các bộ chọn hợp lệ hay không, xác nhận địa chỉ hợp đồng đã được xác minh trên Sourcify và gắn cờ các điểm không nhất quán của ABI. Kết quả kiểm tra sẽ xuất hiện trực tiếp trên PR. Những người bảo trì sổ đăng ký sẽ sàng lọc các nội dung gửi lên để tìm các bộ mô tả bị lỗi định dạng hoặc có khả năng gây hại. Việc được đưa vào sổ đăng ký không ngụ ý rằng đã được kiểm toán hoặc chứng thực.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Lưu ý:** Hợp đồng của bạn phải được xác minh trên <a href="https://repo.sourcify.dev">Sourcify</a> trước khi PR của bạn có thể được chấp nhận. Nếu nó chưa được xác minh, hãy <a href="https://verify.sourcify.dev/">gửi xác minh</a> trước.
</AlertDescription>
</AlertContent>
</Alert>

## Điều gì xảy ra sau khi hợp nhất (merge)? {#what-happens-after-merging}

Tất cả các bộ mô tả trong sổ đăng ký đều mở cho các kiểm toán viên. Sau khi PR của bạn được hợp nhất, bất kỳ kiểm toán viên nào cũng có thể xem xét bộ mô tả của bạn và xuất bản một chứng thực mật mã (theo [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) để xác nhận tính chính xác của nó. 

Các tín hiệu chứng thực này cho phép các ví áp dụng các chính sách tin cậy của riêng họ — một bộ mô tả có nhiều chứng thực độc lập sẽ có sức nặng hơn một bộ mô tả không có chứng thực nào. Bạn có thể tiếp cận cộng đồng kiểm toán viên thông qua [clearsigning.org](https://clearsigning.org).

Các ví sẽ chọn sổ đăng ký nào mà họ sẽ hỗ trợ. Khi bộ mô tả của bạn nằm trong sổ đăng ký, các ví hỗ trợ ERC-7730 sẽ bắt đầu tìm nạp nó nếu nó nằm trong sổ đăng ký của họ và sẽ hiển thị dữ liệu dễ đọc khi người dùng tương tác với hợp đồng của bạn.

## Đọc thêm {#further-reading}

- [Đặc tả ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Sổ đăng ký ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — công cụ, trạng thái hệ sinh thái và Quản trị  
- [Xác minh hợp đồng Sourcify](https://sourcify.dev)  
- [Sáng kiến Bảo mật Nghìn tỷ Đô la (Trillion Dollar Security initiative)](https://trilliondollarsecurity.org)

