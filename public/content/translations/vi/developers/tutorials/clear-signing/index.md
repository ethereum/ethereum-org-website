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

Hầu hết các vụ khai thác Ethereum lớn đều có cùng một bước cuối cùng: người dùng chấp thuận một giao dịch mà họ không thể hiểu rõ ý nghĩa. Ví phần cứng hiển thị dữ liệu lệnh gọi (calldata) dạng hex thô, và tệ hơn là buộc bạn phải bật tính năng ký mù (blind signing). Ví phần mềm hiển thị các trường đã được giải mã, nhưng chỉ khi chúng nhận diện được hợp đồng. Khi chúng không nhận diện được, cho dù vì giao thức còn mới, ứng dụng bị xâm phạm hay thiết bị đang ngoại tuyến, người dùng đều phải ký mù.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) định nghĩa một định dạng JSON tiêu chuẩn để mô tả *ý nghĩa* của các lệnh gọi hàm trong hợp đồng của bạn. 

Một ví hỗ trợ ERC-7730 sẽ đọc bộ mô tả của bạn và hiển thị:

> **Hoán đổi**  
> Gửi: 1.000 USDC  
> Nhận tối thiểu: 0,42 WETH  
> Giao thức: Uniswap V3

Hoặc một câu hoàn chỉnh dễ đọc cho cả con người và các tác nhân (agent):

> Hoán đổi 1.000 USDC để lấy ít nhất 0,42 WETH

Thay vì một bộ chọn hàm (function selector) và một danh sách các giá trị số nguyên thô.

Đây là [việc ký rõ ràng](https://clearsigning.org/) — "Những gì bạn thấy là những gì bạn ký" (What You See Is What You Sign). Hướng dẫn này sẽ dẫn dắt bạn qua quá trình viết một bộ mô tả cho hợp đồng của riêng bạn, xác thực nó bằng công cụ CLI chính thức và gửi nó lên sổ đăng ký mở (open registry).

## Điều kiện tiên quyết {#prerequisites}

- Làm quen với Solidity và ABI của hợp đồng thông minh
- Một hợp đồng thông minh đã được triển khai với ABI đã được xác minh (yêu cầu xác minh trên [Sourcify](https://sourcify.dev) trước khi bộ mô tả được chấp nhận vào sổ đăng ký) 
- Python 3.12+ cho CLI xác thực 
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

Tạo một tệp có tên `calldata-<contractname>-<descriptorversion>.json`. Tiền tố `calldata-` cho sổ đăng ký biết rằng bộ mô tả này bao gồm các lệnh gọi hàm của hợp đồng, trái ngược với `eip712-` dành cho các tin nhắn dữ liệu có kiểu (typed-data). `descriptorversion` cho sổ đăng ký biết phiên bản của tệp mô tả, mặc định là 0 nếu không có phiên bản nào được cung cấp.


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

## Bước 2: Viết phần ngữ cảnh (context) {#step-2-write-the-context-section}

Phần `context` liên kết bộ mô tả với một hoặc nhiều đợt triển khai hợp đồng. Các ví sử dụng phần này để khớp một giao dịch đến với bộ mô tả chính xác.

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Các trường ngữ cảnh {#context-fields}

- `context.$id` — Một định danh duy nhất cho tài liệu mô tả hoặc cấu hình triển khai này.
- `contract.deployments` — Tập hợp các đợt triển khai mà bộ mô tả này áp dụng.
- `deployments[].chainId` — ID chuỗi EVM cho một đợt triển khai. Bao gồm mọi chuỗi nơi hợp đồng của bạn được triển khai.
- `deployments[].address` — Địa chỉ hợp đồng mà các ví nên liên kết với bộ mô tả này. Sử dụng địa chỉ triển khai (implementation address) chứa logic thực thi.

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
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
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
- **`interpolatedIntent`** — **(Được khuyến nghị)** Một mẫu câu phong phú hơn nhúng các giá trị trường đã được định dạng, chẳng hạn như `"Swap {amountIn} for at least {amountOutMin}"`. Bao gồm trường này cùng với `intent` để cung cấp một bộ mô tả thân thiện với người dùng hơn nữa mà các ví có thể chọn hiển thị tùy thuộc vào bất kỳ ràng buộc hiển thị nào.
- **`fields`** — **(Bắt buộc)** Danh sách có thứ tự các trường giao dịch mà ví nên hiển thị cho người dùng.
  - **`path`** — **(Bắt buộc)** Một tham chiếu đến dữ liệu giao dịch. `#.fieldName` trỏ đến một tham số dữ liệu lệnh gọi đã được giải mã theo tên trong ABI. `@.value` đề cập đến giá trị ETH được gửi kèm theo giao dịch.
  - **`label`** — **(Bắt buộc)** Nhãn dễ đọc được hiển thị bên cạnh giá trị.
  - **`format`** — **(Được khuyến nghị)** Kiểm soát cách giá trị sẽ được hiển thị. Các định dạng phổ biến bao gồm:
    - `tokenAmount`
    - `addressName`
    - `date`

    Sử dụng `raw` khi không cần định dạng bổ sung. Một số định dạng chấp nhận cấu hình **`params`** bổ sung. Ví dụ:

    - `tokenAmount` có thể sử dụng `tokenPath` để xác định địa chỉ token nào cung cấp số thập phân và siêu dữ liệu mã giao dịch (ticker).
    - `date` có thể sử dụng `encoding` để mô tả cách dấu thời gian được mã hóa.

    Nếu định dạng được chọn không yêu cầu thông tin bổ sung, hãy bỏ qua `params`.

## Bộ mô tả hoàn chỉnh {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
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
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
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

[Sổ đăng ký ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) là một kho lưu trữ mở được lưu trữ bởi [Tổ chức Ethereum](/foundation/) với tư cách là một người quản lý trung lập. Bất kỳ ai cũng có thể tự do sao chép (clone) và tự lưu trữ nó — các ví sẽ độc lập quyết định phiên bản sổ đăng ký nào mà họ tin tưởng.

1. Fork kho lưu trữ trên GitHub  
2. Tạo một thư mục tại `registry/<your-project-name>/`  
3. Đặt tệp của bạn vào bên trong đó: `registry/myproject/calldata-mycontract-0_0.json`  
4. Cập nhật trường `$schema` thành đường dẫn tương đối được sử dụng trong kho lưu trữ: `"../../specs/erc7730-v2.schema.json"`  
5. Mở một pull request

Khi bạn mở PR, CI sẽ tự động chạy xác thực lược đồ (schema validation), kiểm tra xem các chữ ký hàm có tạo ra các bộ chọn hợp lệ hay không, xác nhận địa chỉ hợp đồng đã được xác minh trên Sourcify và gắn cờ các điểm không nhất quán của ABI. Kết quả kiểm tra xuất hiện trực tiếp trên PR. Những người bảo trì sổ đăng ký sẽ sàng lọc các nội dung gửi lên để tìm các bộ mô tả bị lỗi định dạng hoặc có khả năng gây hại. Việc được đưa vào sổ đăng ký không ngụ ý rằng bộ mô tả đã được kiểm toán hoặc chứng thực.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Lưu ý:** Hợp đồng của bạn phải được xác minh trên <a href="https://repo.sourcify.dev">Sourcify</a> trước khi PR của bạn có thể được chấp nhận. Nếu nó chưa được xác minh, hãy <a href="https://verify.sourcify.dev/">gửi xác minh</a> trước.
</AlertDescription>
</AlertContent>
</Alert>

## Điều gì xảy ra sau khi hợp nhất (merge)? {#what-happens-after-merging}

Tất cả các bộ mô tả trong sổ đăng ký đều mở cho các kiểm toán viên. Sau khi PR của bạn được hợp nhất, bất kỳ kiểm toán viên nào cũng có thể xem xét bộ mô tả của bạn và xuất bản một chứng thực mật mã (theo [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) để xác nhận tính chính xác của nó. 

Các tín hiệu chứng thực này cho phép các ví áp dụng các chính sách tin cậy của riêng họ — một bộ mô tả có nhiều chứng thực độc lập sẽ có sức nặng hơn một bộ mô tả không có chứng thực nào. Bạn có thể tiếp cận cộng đồng kiểm toán viên thông qua [clearsigning.org](https://clearsigning.org).

Các ví sẽ chọn sổ đăng ký nào mà họ sẽ hỗ trợ. Khi bộ mô tả của bạn nằm trong sổ đăng ký, các ví hỗ trợ ERC-7730 sẽ bắt đầu tìm nạp nó nếu nó nằm trong sổ đăng ký của họ và sẽ hiển thị dữ liệu dễ đọc khi người dùng tương tác với hợp đồng của bạn.

## Đọc thêm {#further-reading}

- [Đặc tả ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Sổ đăng ký ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — công cụ, trạng thái hệ sinh thái và Quản trị  
- [Xác minh hợp đồng Sourcify](https://sourcify.dev)  
- [Sáng kiến Bảo mật Nghìn tỷ Đô la (Trillion Dollar Security initiative)](https://trilliondollarsecurity.org)