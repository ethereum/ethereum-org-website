---
title: Giới thiệu về Ethereum dành cho nhà phát triển Python, phần 1
description: Giới thiệu về phát triển Ethereum, đặc biệt hữu ích cho những người có kiến thức về ngôn ngữ lập trình Python
author: Marc Garreau
lang: vi
tags:
  - python
  - web3.py
skill: beginner
breadcrumb: Ethereum với Python
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Vậy là bạn đã nghe nói về Ethereum và sẵn sàng khám phá sâu hơn? Bài viết này sẽ nhanh chóng đề cập đến một số kiến thức cơ bản về chuỗi khối, sau đó hướng dẫn bạn tương tác với một nút Ethereum mô phỏng – đọc dữ liệu khối, kiểm tra số dư tài khoản và gửi giao dịch. Trong quá trình đó, chúng tôi sẽ làm nổi bật sự khác biệt giữa các cách xây dựng ứng dụng truyền thống và mô hình phi tập trung mới này.

## Các điều kiện tiên quyết (cơ bản) {#soft-prerequisites}

Bài viết này mong muốn có thể tiếp cận được với nhiều nhà phát triển. [Các công cụ Python](/developers/docs/programming-languages/python/) sẽ được sử dụng, nhưng chúng chỉ là phương tiện để truyền tải ý tưởng – không vấn đề gì nếu bạn không phải là nhà phát triển Python. Tuy nhiên, tôi sẽ đưa ra một vài giả định về những gì bạn đã biết, để chúng ta có thể nhanh chóng chuyển sang các phần dành riêng cho Ethereum.

Các giả định:

- Bạn có thể sử dụng thành thạo terminal,
- Bạn đã viết một vài dòng mã Python,
- Python phiên bản 3.6 trở lên đã được cài đặt trên máy của bạn (chúng tôi đặc biệt khuyến khích sử dụng [môi trường ảo](https://realpython.com/effective-python-environment/#virtual-environments)), và
- bạn đã sử dụng `pip`, trình cài đặt gói của Python.
  Một lần nữa, nếu bất kỳ điều nào trong số này không đúng, hoặc bạn không định chạy lại mã trong bài viết này, bạn có thể vẫn theo dõi tốt.

## Tóm tắt về chuỗi khối {#blockchains-briefly}

Có nhiều cách để mô tả Ethereum, nhưng cốt lõi của nó là một chuỗi khối. Các chuỗi khối được tạo thành từ một chuỗi các khối, vì vậy hãy bắt đầu từ đó. Nói một cách đơn giản nhất, mỗi khối trên chuỗi khối Ethereum chỉ là một số siêu dữ liệu và một danh sách các giao dịch. Ở định dạng JSON, nó trông giống như thế này:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Mỗi [khối](/developers/docs/blocks/) có một tham chiếu đến khối đứng trước nó; `parentHash` đơn giản là mã băm của khối trước đó.

<FeaturedText>Lưu ý: Ethereum thường xuyên sử dụng <a href="https://wikipedia.org/wiki/Hash_function">các hàm băm</a> để tạo ra các giá trị có kích thước cố định (“mã băm”). Mã băm đóng vai trò quan trọng trong Ethereum, nhưng hiện tại bạn có thể coi chúng như các ID duy nhất.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_Chuỗi khối về cơ bản là một danh sách liên kết; mỗi khối có một tham chiếu đến khối trước đó._

Cấu trúc dữ liệu này không có gì mới mẻ, nhưng các quy tắc (tức là các giao thức ngang hàng) chi phối mạng lưới thì có. Không có cơ quan trung ương nào; mạng lưới các nút ngang hàng phải cộng tác để duy trì mạng lưới và cạnh tranh để quyết định giao dịch nào sẽ được đưa vào khối tiếp theo. Vì vậy, khi bạn muốn gửi một số tiền cho bạn bè, bạn sẽ cần phát giao dịch đó lên mạng lưới, sau đó đợi nó được đưa vào một khối sắp tới.

Cách duy nhất để chuỗi khối xác minh rằng tiền đã thực sự được gửi từ người dùng này sang người dùng khác là sử dụng một loại tiền tệ bản địa của (tức là được tạo ra và quản lý bởi) chuỗi khối đó. Trong Ethereum, loại tiền tệ này được gọi là ether và chuỗi khối Ethereum chứa bản ghi chính thức duy nhất về số dư tài khoản.

## Một mô hình mới {#a-new-paradigm}

Ngăn xếp công nghệ phi tập trung mới này đã tạo ra các công cụ mới cho nhà phát triển. Các công cụ như vậy tồn tại trong nhiều ngôn ngữ lập trình, nhưng chúng ta sẽ xem xét qua lăng kính Python. Xin nhắc lại: ngay cả khi Python không phải là ngôn ngữ bạn chọn, bạn cũng sẽ không gặp nhiều khó khăn khi theo dõi.

Các nhà phát triển Python muốn tương tác với Ethereum có khả năng sẽ tìm đến [Web3.py](https://web3py.readthedocs.io/). Web3.py là một thư viện giúp đơn giản hóa đáng kể cách bạn kết nối với một nút Ethereum, sau đó gửi và nhận dữ liệu từ nó.

<FeaturedText>Lưu ý: “Nút Ethereum” và “máy khách Ethereum” được sử dụng thay thế cho nhau. Trong cả hai trường hợp, nó đề cập đến phần mềm mà một người tham gia trong mạng lưới Ethereum chạy. Phần mềm này có thể đọc dữ liệu khối, nhận bản cập nhật khi các khối mới được thêm vào chuỗi, phát các giao dịch mới và hơn thế nữa. Về mặt kỹ thuật, máy khách là phần mềm, nút là máy tính chạy phần mềm đó.</FeaturedText>

[Các máy khách Ethereum](/developers/docs/nodes-and-clients/) có thể được cấu hình để có thể truy cập bằng [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP hoặc Websockets, vì vậy Web3.py sẽ cần phản ánh cấu hình này. Web3.py gọi các tùy chọn kết nối này là **nhà cung cấp (providers)**. Bạn sẽ muốn chọn một trong ba nhà cung cấp để liên kết phiên bản Web3.py với nút của bạn.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_Cấu hình nút Ethereum và Web3.py để giao tiếp qua cùng một giao thức, ví dụ: IPC trong sơ đồ này._

Khi Web3.py được cấu hình đúng cách, bạn có thể bắt đầu tương tác với chuỗi khối. Dưới đây là một vài ví dụ về cách sử dụng Web3.py như một bản xem trước cho những gì sắp tới:

```python
# đọc dữ liệu khối:
w3.eth.get_block('latest')

# gửi một giao dịch:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Cài đặt {#installation}

Trong hướng dẫn này, chúng ta sẽ chỉ làm việc trong trình thông dịch Python. Chúng ta sẽ không tạo bất kỳ thư mục, tệp, lớp hoặc hàm nào.

<FeaturedText>Lưu ý: Trong các ví dụ bên dưới, các lệnh bắt đầu bằng `$` được thiết kế để chạy trong terminal. (Đừng gõ `$`, nó chỉ biểu thị sự bắt đầu của dòng.)</FeaturedText>

Đầu tiên, hãy cài đặt [IPython](https://ipython.org/) để có một môi trường thân thiện với người dùng để khám phá. IPython cung cấp tính năng tự động hoàn thành bằng phím tab, cùng với các tính năng khác, giúp bạn dễ dàng xem những gì có thể thực hiện được trong Web3.py.

```bash
pip install ipython
```

Web3.py được xuất bản dưới tên `web3`. Cài đặt nó như sau:

```bash
pip install web3
```

Một điều nữa – chúng ta sẽ mô phỏng một chuỗi khối sau, điều này yêu cầu thêm một vài phần phụ thuộc. Bạn có thể cài đặt chúng thông qua:

```bash
pip install 'web3[tester]'
```

Bạn đã thiết lập xong và sẵn sàng bắt đầu!

Lưu ý: Gói `web3[tester]` hoạt động với Python lên đến phiên bản 3.10.xx

## Khởi chạy môi trường thử nghiệm (sandbox) {#spin-up-a-sandbox}

Mở một môi trường Python mới bằng cách chạy `ipython` trong terminal của bạn. Điều này tương tự như chạy `python`, nhưng đi kèm với nhiều tính năng bổ sung hơn.

```bash
ipython
```

Thao tác này sẽ in ra một số thông tin về các phiên bản Python và IPython mà bạn đang chạy, sau đó bạn sẽ thấy một dấu nhắc chờ nhập liệu:

```python
In [1]:
```

Bây giờ bạn đang xem một shell Python tương tác. Về cơ bản, nó là một môi trường thử nghiệm để bạn vọc vạch. Nếu bạn đã làm đến bước này, đã đến lúc nhập Web3.py:

```python
In [1]: from web3 import Web3
```

## Giới thiệu mô-đun Web3 {#introducing-the-web3-module}

Bên cạnh việc là một cổng kết nối với Ethereum, mô-đun [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) còn cung cấp một vài hàm tiện ích. Hãy cùng khám phá một vài hàm trong số đó.

Trong một ứng dụng Ethereum, bạn sẽ thường xuyên cần chuyển đổi các mệnh giá tiền tệ. Mô-đun Web3 cung cấp một vài phương thức trợ giúp dành riêng cho việc này: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) và [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Lưu ý: Máy tính nổi tiếng là kém trong việc xử lý toán học thập phân. Để khắc phục điều này, các nhà phát triển thường lưu trữ số tiền đô la dưới dạng xu (cent). Ví dụ: một mặt hàng có giá $5.99 có thể được lưu trữ trong cơ sở dữ liệu là 599.

Một mô hình tương tự được sử dụng khi xử lý các giao dịch bằng <b>ether</b>. Tuy nhiên, thay vì hai chữ số thập phân, ether có tới 18! Mệnh giá nhỏ nhất của ether được gọi là <b>Wei</b>, vì vậy đó là giá trị được chỉ định khi gửi giao dịch.

1 ether = 1000000000000000000 Wei

1 Wei = 0.000000000000000001 ether

</FeaturedText>

Hãy thử chuyển đổi một số giá trị sang và từ Wei. Lưu ý rằng [có tên gọi cho nhiều mệnh giá](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) nằm giữa ether và Wei. Một trong những mệnh giá được biết đến nhiều nhất trong số đó là **Gwei**, vì nó thường là cách biểu thị phí giao dịch.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Các phương thức tiện ích khác trên mô-đun Web3 bao gồm các bộ chuyển đổi định dạng dữ liệu (ví dụ: [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), các trình trợ giúp địa chỉ (ví dụ: [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) và các hàm băm (ví dụ: [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Nhiều phương thức trong số này sẽ được đề cập sau trong loạt bài viết. Để xem tất cả các phương thức và thuộc tính có sẵn, hãy sử dụng tính năng tự động hoàn thành của IPython bằng cách gõ `Web3`. và nhấn phím tab hai lần sau dấu chấm.

## Giao tiếp với chuỗi {#talk-to-the-chain}

Các phương thức tiện ích rất tuyệt vời, nhưng hãy chuyển sang chuỗi khối. Bước tiếp theo là cấu hình Web3.py để giao tiếp với một nút Ethereum. Ở đây chúng ta có tùy chọn sử dụng các nhà cung cấp IPC, HTTP hoặc Websocket.

Chúng ta sẽ không đi theo con đường này, nhưng một ví dụ về quy trình làm việc hoàn chỉnh sử dụng Nhà cung cấp HTTP có thể trông giống như thế này:

- Tải xuống một nút Ethereum, ví dụ: [Geth](https://geth.ethereum.org/).
- Khởi động Geth trong một cửa sổ terminal và đợi nó đồng bộ hóa mạng lưới. Cổng HTTP mặc định là `8545`, nhưng có thể cấu hình được.
- Yêu cầu Web3.py kết nối với nút qua HTTP, trên `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Sử dụng phiên bản `w3` để tương tác với nút.

Mặc dù đây là một cách “thực tế” để thực hiện, nhưng quá trình đồng bộ hóa mất hàng giờ và không cần thiết nếu bạn chỉ muốn một môi trường phát triển. Web3.py cung cấp nhà cung cấp thứ tư cho mục đích này, **EthereumTesterProvider**. Nhà cung cấp thử nghiệm này liên kết với một nút Ethereum mô phỏng với các quyền được nới lỏng và tiền giả để thử nghiệm.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider kết nối với một nút mô phỏng và rất tiện lợi cho các môi trường phát triển nhanh._

Nút mô phỏng đó được gọi là [eth-tester](https://github.com/ethereum/eth-tester) và chúng ta đã cài đặt nó như một phần của lệnh `pip install web3[tester]`. Việc cấu hình Web3.py để sử dụng nhà cung cấp thử nghiệm này đơn giản như sau:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Bây giờ bạn đã sẵn sàng lướt trên chuỗi! Đó không phải là điều mọi người thường nói. Tôi chỉ bịa ra thôi. Hãy cùng tham quan nhanh nhé.

## Tham quan nhanh {#the-quick-tour}

Việc đầu tiên, hãy kiểm tra tính hợp lệ:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Vì chúng ta đang sử dụng nhà cung cấp thử nghiệm, đây không phải là một bài kiểm tra có giá trị lắm, nhưng nếu nó thất bại, rất có thể bạn đã gõ sai điều gì đó khi khởi tạo biến `w3`. Hãy kiểm tra kỹ xem bạn đã bao gồm các dấu ngoặc đơn bên trong chưa, tức là `Web3.EthereumTesterProvider()`.

## Điểm dừng chân số 1: [tài khoản](/developers/docs/accounts/) {#tour-stop-1-accounts}

Để thuận tiện, nhà cung cấp thử nghiệm đã tạo một số tài khoản và nạp sẵn ether thử nghiệm vào đó.

Đầu tiên, hãy xem danh sách các tài khoản đó:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Nếu bạn chạy lệnh này, bạn sẽ thấy một danh sách gồm mười chuỗi bắt đầu bằng `0x`. Mỗi chuỗi là một **địa chỉ công khai** và theo một số cách, tương tự như số tài khoản trên tài khoản thanh toán. Bạn sẽ cung cấp địa chỉ này cho người muốn gửi ether cho bạn.

Như đã đề cập, nhà cung cấp thử nghiệm đã nạp sẵn một số ether thử nghiệm vào mỗi tài khoản này. Hãy tìm hiểu xem có bao nhiêu trong tài khoản đầu tiên:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Thật là nhiều số không! Trước khi bạn vui mừng chạy đến ngân hàng giả, hãy nhớ lại bài học về các mệnh giá tiền tệ trước đó. Các giá trị ether được biểu thị bằng mệnh giá nhỏ nhất, Wei. Hãy chuyển đổi nó sang ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Một triệu ether thử nghiệm — cũng không tồi chút nào.

## Điểm dừng chân số 2: dữ liệu khối {#tour-stop-2-block-data}

Hãy cùng xem qua trạng thái của chuỗi khối mô phỏng này:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Rất nhiều thông tin được trả về về một khối, nhưng chỉ có một vài điều cần chỉ ra ở đây:

- Số khối là 0 — bất kể bạn đã cấu hình nhà cung cấp thử nghiệm từ bao lâu trước đây. Không giống như mạng lưới Ethereum thực, thêm một khối mới mỗi 12 giây, mô phỏng này sẽ đợi cho đến khi bạn giao cho nó một số công việc để làm.
- `transactions` là một danh sách trống, vì cùng một lý do: chúng ta chưa làm gì cả. Khối đầu tiên này là một **khối trống**, chỉ để khởi động chuỗi.
- Lưu ý rằng `parentHash` chỉ là một loạt các byte trống. Điều này biểu thị rằng đây là khối đầu tiên trong chuỗi, còn được gọi là **khối nguyên thủy**.

## Điểm dừng chân số 3: [giao dịch](/developers/docs/transactions/) {#tour-stop-3-transactions}

Chúng ta đang bị kẹt ở khối 0 cho đến khi có một giao dịch đang chờ xử lý, vì vậy hãy tạo một giao dịch. Gửi một vài ether thử nghiệm từ tài khoản này sang tài khoản khác:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Đây thường là lúc bạn sẽ đợi vài giây để giao dịch của mình được đưa vào một khối mới. Toàn bộ quá trình diễn ra như sau:

1. Gửi một giao dịch và giữ lại mã băm giao dịch. Cho đến khi khối chứa giao dịch được tạo và phát sóng, giao dịch sẽ ở trạng thái “đang chờ xử lý”.
   `tx_hash = w3.eth.send_transaction({ … })`
2. Đợi giao dịch được đưa vào một khối:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Tiếp tục logic ứng dụng. Để xem giao dịch thành công:
   `w3.eth.get_transaction(tx_hash)`

Môi trường mô phỏng của chúng ta sẽ thêm giao dịch vào một khối mới ngay lập tức, vì vậy chúng ta có thể xem giao dịch ngay:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Bạn sẽ thấy một số chi tiết quen thuộc ở đây: các trường `from`, `to` và `value` phải khớp với các đầu vào của lệnh gọi `send_transaction` của chúng ta. Một điểm đáng yên tâm khác là giao dịch này đã được đưa vào làm giao dịch đầu tiên (`'transactionIndex': 0`) trong khối số 1.

Chúng ta cũng có thể dễ dàng xác minh sự thành công của giao dịch này bằng cách kiểm tra số dư của hai tài khoản liên quan. Ba ether đáng lẽ đã được chuyển từ tài khoản này sang tài khoản kia.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Tài khoản sau có vẻ ổn! Số dư đã tăng từ 1.000.000 lên 1.000.003 ether. Nhưng chuyện gì đã xảy ra với tài khoản đầu tiên? Nó dường như đã mất nhiều hơn ba ether một chút. Than ôi, không có gì trên đời là miễn phí và việc sử dụng mạng lưới công khai Ethereum yêu cầu bạn phải bồi thường cho các nút ngang hàng vì vai trò hỗ trợ của họ. Một khoản phí giao dịch nhỏ đã được khấu trừ từ tài khoản đã gửi giao dịch - khoản phí này là lượng Gas đã đốt (21000 đơn vị Gas cho một lần chuyển ETH) nhân với phí cơ sở thay đổi theo hoạt động của mạng lưới cộng với phí ưu tiên dành cho trình xác thực đưa giao dịch vào một khối.

Tìm hiểu thêm về [Gas](/developers/docs/gas/#post-london)

<FeaturedText>Lưu ý: Trên mạng lưới công khai, phí giao dịch có thể thay đổi dựa trên nhu cầu của mạng lưới và tốc độ bạn muốn giao dịch được xử lý. Nếu bạn quan tâm đến bảng phân tích chi tiết về cách tính phí, hãy xem bài viết trước của tôi về <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">cách các giao dịch được đưa vào một khối</a>.</FeaturedText>

## Và thư giãn {#and-breathe}

Chúng ta đã làm việc này được một lúc rồi, vì vậy đây có vẻ là một điểm dừng chân lý tưởng để nghỉ ngơi. Hành trình khám phá vẫn còn tiếp tục và chúng ta sẽ tiếp tục tìm hiểu trong phần hai của loạt bài này. Một số khái niệm sắp tới: kết nối với một nút thực, hợp đồng thông minh và token. Bạn có câu hỏi nào tiếp theo không? Hãy cho tôi biết! Phản hồi của bạn sẽ ảnh hưởng đến hướng đi tiếp theo của chúng ta. Rất hoan nghênh các yêu cầu qua [Twitter](https://twitter.com/wolovim).