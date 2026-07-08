---
title: "Tìm hiểu các chủ đề nền tảng của Ethereum bằng SQL"
description: "Hướng dẫn này giúp người đọc hiểu các khái niệm cơ bản về Ethereum bao gồm giao dịch, khối và gas bằng cách truy vấn dữ liệu trên chuỗi với Ngôn ngữ truy vấn có cấu trúc (SQL)."
author: "Paul Apivat"
tags: ["SQL", "Truy vấn", "Giao dịch", "dữ liệu và phân tích"]
skill: beginner
breadcrumb: "Ethereum với SQL"
lang: vi
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Nhiều hướng dẫn về Ethereum nhắm đến các nhà phát triển, nhưng lại thiếu các tài nguyên giáo dục dành cho các nhà phân tích dữ liệu hoặc cho những người muốn xem dữ liệu trên chuỗi mà không cần chạy một client hoặc nút.

Hướng dẫn này giúp người đọc hiểu các khái niệm cơ bản về Ethereum bao gồm giao dịch, khối và Gas bằng cách truy vấn dữ liệu trên chuỗi với ngôn ngữ truy vấn có cấu trúc (SQL) thông qua một giao diện được cung cấp bởi [Dune Analytics](https://dune.com/).

Dữ liệu trên chuỗi có thể giúp chúng ta hiểu về Ethereum, mạng lưới, và như một nền kinh tế cho sức mạnh tính toán và nên đóng vai trò là cơ sở để hiểu các thách thức mà Ethereum đang phải đối mặt hiện nay (ví dụ: giá Gas tăng) và quan trọng hơn là các cuộc thảo luận xung quanh các giải pháp mở rộng quy mô.

### Giao dịch {#transactions}

Hành trình của người dùng trên Ethereum bắt đầu bằng việc khởi tạo một tài khoản do người dùng kiểm soát hoặc một thực thể có số dư ETH. Có hai loại tài khoản - do người dùng kiểm soát hoặc hợp đồng thông minh (xem [ethereum.org](/developers/docs/accounts/)).

Bất kỳ tài khoản nào cũng có thể được xem trên một trình khám phá khối như [Etherscan](https://etherscan.io/) hoặc [Blockscout](https://eth.blockscout.com/). Trình khám phá khối là một cổng thông tin vào dữ liệu của Ethereum. Chúng hiển thị, theo thời gian thực, dữ liệu về các khối, giao dịch, thợ đào, tài khoản và các hoạt động trên chuỗi khác (xem [tại đây](/developers/docs/data-and-analytics/block-explorers/)).

Tuy nhiên, người dùng có thể muốn truy vấn dữ liệu trực tiếp để đối chiếu thông tin được cung cấp bởi các trình khám phá khối bên ngoài. [Dune Analytics](https://dune.com/) cung cấp khả năng này cho bất kỳ ai có chút kiến thức về SQL.

Để tham khảo, tài khoản hợp đồng thông minh của Tổ chức Ethereum (EF) có thể được xem trên [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Một điều cần lưu ý là tất cả các tài khoản, bao gồm cả của EF, đều có một địa chỉ công khai có thể được sử dụng để gửi và nhận các giao dịch.

Số dư tài khoản trên Etherscan bao gồm các giao dịch thông thường và các giao dịch nội bộ. Các giao dịch nội bộ, mặc dù có tên như vậy, không phải là các giao dịch _thực sự_ làm thay đổi trạng thái của chuỗi. Chúng là các giao dịch chuyển giá trị được khởi tạo bằng cách thực thi một hợp đồng ([nguồn](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Vì các giao dịch nội bộ không có chữ ký, chúng **không** được đưa vào chuỗi khối và không thể được truy vấn bằng Dune Analytics.

Do đó, hướng dẫn này sẽ tập trung vào các giao dịch thông thường. Điều này có thể được truy vấn như sau:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Điều này sẽ mang lại thông tin giống như được cung cấp trên trang giao dịch của Etherscan. Để so sánh, đây là hai nguồn:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Trang hợp đồng của EF trên Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Bạn có thể tìm thấy bảng điều khiển [tại đây](https://dune.com/paulapivat/Learn-Ethereum). Nhấp vào bảng để xem truy vấn (cũng xem ở trên).

### Phân tích chi tiết các giao dịch {#breaking-down-transactions}

Một giao dịch được gửi bao gồm một số thông tin bao gồm ([nguồn](/developers/docs/transactions/)):

- **Người nhận**: Địa chỉ nhận (được truy vấn là "to")
- **Chữ ký**: Mặc dù khóa riêng tư của người gửi ký một giao dịch, những gì chúng ta có thể truy vấn bằng SQL là địa chỉ công khai của người gửi ("from").
- **Giá trị**: Đây là số lượng ETH được chuyển (xem cột `ether`).
- **Dữ liệu**: Đây là dữ liệu tùy ý đã được băm (xem cột `data`)
- **gasLimit** – giới hạn gas tối đa có thể được tiêu thụ bởi giao dịch. Các đơn vị Gas đại diện cho các bước tính toán
- **maxPriorityFeePerGas** - lượng Gas tối đa được bao gồm như một khoản phí ưu tiên cho thợ đào
- **maxFeePerGas** - lượng Gas tối đa sẵn sàng trả cho giao dịch (bao gồm cả baseFeePerGas và maxPriorityFeePerGas)

Chúng ta có thể truy vấn các thông tin cụ thể này cho các giao dịch đến địa chỉ công khai của Tổ chức Ethereum:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Khối {#blocks}

Mỗi giao dịch sẽ thay đổi trạng thái của Máy ảo Ethereum ([EVM](/developers/docs/evm/)) ([nguồn](/developers/docs/transactions/)). Các giao dịch được phát sóng lên mạng lưới để được xác minh và đưa vào một khối. Mỗi giao dịch được liên kết với một số khối. Để xem dữ liệu, chúng ta có thể truy vấn một số khối cụ thể: 12396854 (khối gần đây nhất trong số các giao dịch của Tổ chức Ethereum tính đến thời điểm viết bài này, 11/5/21).

Hơn nữa, khi chúng ta truy vấn hai khối tiếp theo, chúng ta có thể thấy rằng mỗi khối chứa mã băm của khối trước đó (tức là mã băm cha), minh họa cách chuỗi khối được hình thành.

Mỗi khối chứa một tham chiếu đến khối cha của nó. Điều này được hiển thị bên dưới giữa các cột `hash` và `parent_hash` ([nguồn](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Đây là [truy vấn](https://dune.com/queries/44856/88292) trên Dune Analytics:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Chúng ta có thể kiểm tra một khối bằng cách truy vấn thời gian, số khối, độ khó, mã băm, mã băm cha và nonce.

Điều duy nhất mà truy vấn này không bao gồm là _danh sách giao dịch_ vốn yêu cầu một truy vấn riêng biệt bên dưới và _gốc trạng thái_ (state root). Một nút đầy đủ (full node) hoặc nút lưu trữ (archival node) sẽ lưu trữ tất cả các giao dịch và các chuyển đổi trạng thái, cho phép các client truy vấn trạng thái của chuỗi bất cứ lúc nào. Vì điều này đòi hỏi không gian lưu trữ lớn, chúng ta có thể tách dữ liệu chuỗi khỏi dữ liệu trạng thái:

- Dữ liệu chuỗi (danh sách các khối, giao dịch)
- Dữ liệu trạng thái (kết quả của quá trình chuyển đổi trạng thái của mỗi giao dịch)

Gốc trạng thái thuộc về loại sau và là dữ liệu _ngầm định_ (không được lưu trữ trên chuỗi), trong khi dữ liệu chuỗi là rõ ràng và được lưu trữ trên chính chuỗi đó ([nguồn](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Đối với hướng dẫn này, chúng ta sẽ tập trung vào dữ liệu trên chuỗi _có thể_ được truy vấn bằng SQL thông qua Dune Analytics.

Như đã nêu ở trên, mỗi khối chứa một danh sách các giao dịch, chúng ta có thể truy vấn điều này bằng cách lọc theo một khối cụ thể. Chúng ta sẽ thử với khối gần đây nhất, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Đây là đầu ra SQL trên Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Khối duy nhất này được thêm vào chuỗi sẽ thay đổi trạng thái của Máy ảo Ethereum ([EVM](/developers/docs/evm/)). Hàng chục, đôi khi hàng trăm giao dịch được xác minh cùng một lúc. Trong trường hợp cụ thể này, 222 giao dịch đã được bao gồm.

Để xem có bao nhiêu giao dịch thực sự thành công, chúng ta sẽ thêm một bộ lọc khác để đếm các giao dịch thành công:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

Đối với khối 12396854, trong tổng số 222 giao dịch, 204 giao dịch đã được xác minh thành công:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Các yêu cầu giao dịch xảy ra hàng chục lần mỗi giây, nhưng các khối được cam kết khoảng 15 giây một lần ([nguồn](/developers/docs/blocks/)).

Để thấy rằng có một khối được tạo ra khoảng mỗi 15 giây, chúng ta có thể lấy số giây trong một ngày (86400) chia cho 15 để có được số lượng khối trung bình ước tính mỗi ngày (~ 5760).

Biểu đồ cho các khối Ethereum được tạo ra mỗi ngày (2016 - nay) là:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Số lượng khối trung bình được tạo ra hàng ngày trong khoảng thời gian này là ~5.874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Các truy vấn là:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

Số lượng khối trung bình được tạo ra mỗi ngày kể từ năm 2016 cao hơn một chút so với con số đó ở mức 5.874. Ngoài ra, chia 86400 giây cho 5874 khối trung bình sẽ ra 14,7 giây hoặc xấp xỉ một khối mỗi 15 giây.

### Gas {#gas}

Các khối bị giới hạn về kích thước. Kích thước khối tối đa là động và thay đổi theo nhu cầu của mạng lưới từ 12.500.000 đến 25.000.000 đơn vị. Các giới hạn là cần thiết để ngăn chặn kích thước khối lớn tùy ý gây áp lực lên các nút đầy đủ về không gian đĩa và yêu cầu tốc độ ([nguồn](/developers/docs/blocks/)).

Một cách để khái niệm hóa giới hạn gas của khối là coi nó như **nguồn cung** không gian khối có sẵn để gộp các giao dịch. Giới hạn gas của khối có thể được truy vấn và trực quan hóa từ năm 2016 đến nay:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Sau đó là lượng Gas thực tế được sử dụng hàng ngày để trả cho việc tính toán được thực hiện trên chuỗi Ethereum (ví dụ: gửi giao dịch, gọi một hợp đồng thông minh, việc đúc một NFT). Đây là **nhu cầu** đối với không gian khối Ethereum có sẵn:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Chúng ta cũng có thể đặt hai biểu đồ này cạnh nhau để xem **cung và cầu** tương quan như thế nào:

![gas_demand_supply](./gas_demand_supply.png)

Do đó, chúng ta có thể hiểu giá Gas như một hàm của nhu cầu đối với không gian khối Ethereum, dựa trên nguồn cung có sẵn.

Cuối cùng, chúng ta có thể muốn truy vấn giá Gas trung bình hàng ngày cho chuỗi Ethereum, tuy nhiên, làm như vậy sẽ dẫn đến thời gian truy vấn đặc biệt dài, vì vậy chúng ta sẽ lọc truy vấn của mình theo lượng Gas trung bình được trả cho mỗi giao dịch bởi Tổ chức Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Chúng ta có thể thấy giá Gas được trả cho tất cả các giao dịch được thực hiện đến địa chỉ của Tổ chức Ethereum trong những năm qua. Đây là truy vấn:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Tóm tắt {#summary}

Với hướng dẫn này, chúng ta hiểu các khái niệm nền tảng của Ethereum và cách chuỗi khối Ethereum hoạt động bằng cách truy vấn và cảm nhận dữ liệu trên chuỗi.

Bảng điều khiển chứa tất cả mã được sử dụng trong hướng dẫn này có thể được tìm thấy [tại đây](https://dune.com/paulapivat/Learn-Ethereum).

Để biết thêm về việc sử dụng dữ liệu để khám phá Web3, [hãy tìm tôi trên Twitter](https://twitter.com/paulapivat).