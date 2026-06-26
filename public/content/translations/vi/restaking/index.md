---
title: "Đặt cọc lại"
metaTitle: "Đặt cọc lại là gì? | Lợi ích và công dụng của việc đặt cọc lại"
description: "Sử dụng ETH đã đặt cọc để bảo mật các dịch vụ phi tập trung khác và kiếm thêm phần thưởng."
lang: vi
template: use-cases
image: /images/use-cases/restaking.png
alt: "Hình ảnh minh họa về việc đặt cọc lại trên Ethereum."
sidebarDepth: 2
summaryPoints:
  - "Sử dụng ETH đã đặt cọc để bảo mật các dịch vụ phi tập trung khác và kiếm thêm phần thưởng."
buttons:
  - content: Đặt cọc lại là gì?
    toId: what-is-restaking
  - content: Nó hoạt động như thế nào?
    toId: how-does-restaking-work
    isSecondary: false
---

Mạng lưới Ethereum bảo mật hàng tỷ đô la giá trị 24/7, 365 ngày. Bằng cách nào?

Mọi người trên khắp thế giới khóa (hoặc “đặt cọc”) [ether (ETH)](/what-is-ether/) trong các hợp đồng thông minh để chạy phần mềm xử lý các giao dịch Ethereum và bảo mật mạng lưới Ethereum. Đổi lại, họ nhận được phần thưởng là nhiều ETH hơn.

Đặt cọc lại là một công nghệ được xây dựng cho [người đặt cọc](/staking/) để mở rộng tính bảo mật này sang các dịch vụ, ứng dụng hoặc mạng lưới khác. Đổi lại, họ kiếm được thêm phần thưởng đặt cọc lại. Tuy nhiên, họ cũng đặt số ETH đã đặt cọc của mình vào nhiều rủi ro hơn.

**Giải thích về đặt cọc lại trong 18 phút**

<VideoWatch slug="restaking-explained" />

## Đặt cọc lại là gì? {#what-is-restaking}

Đặt cọc lại là khi người đặt cọc sử dụng ETH đã đặt cọc của họ để bảo mật các dịch vụ phi tập trung khác. Đổi lại, người đặt cọc lại có thể nhận thêm phần thưởng từ các dịch vụ khác đó bên cạnh phần thưởng đặt cọc ETH thông thường của họ.

Các dịch vụ phi tập trung được bảo mật bằng việc đặt cọc lại được gọi là "Dịch vụ được xác thực tích cực" (Actively Validated Services - AVS).
Tương tự như cách nhiều người đặt cọc ETH chạy phần mềm xác thực Ethereum, nhiều người đặt cọc lại chạy phần mềm AVS chuyên dụng.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Thông tin hữu ích</strong></p>
  <p className="mt-2">Mặc dù "Dịch vụ được xác thực tích cực" (AVS) là phổ biến nhất, các nền tảng đặt cọc lại khác nhau có thể sử dụng các tên gọi khác cho các dịch vụ phi tập trung mà chúng giúp bảo mật, chẳng hạn như "Dịch vụ được xác thực tự trị", "Dịch vụ bảo mật phân tán" hoặc "Mạng lưới".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Đặt cọc so với đặt cọc lại {#staking-vs-restaking}

| Đặt cọc | Đặt cọc lại |
| ------------------------------ | ------------------------------------------------- |
| Kiếm phần thưởng ETH | Kiếm phần thưởng ETH + phần thưởng AVS |
| Bảo mật mạng lưới Ethereum | Bảo mật mạng lưới Ethereum + AVS |
| Không có mức ETH tối thiểu | Không có mức ETH tối thiểu |
| Mức độ rủi ro thấp | Mức độ rủi ro từ thấp đến cao |
| Thời gian rút tiền phụ thuộc vào hàng đợi | Thời gian rút tiền phụ thuộc vào hàng đợi + thời gian chờ mở khóa (unbonding period) |

## Tại sao chúng ta cần đặt cọc lại? {#why-do-we-need-restaking}

Hãy hình dung hai thế giới; một thế giới có đặt cọc lại và một thế giới không có.

 <TabbedSection />

Trong thế giới có đặt cọc lại này, cả AVS và người đặt cọc đều được hưởng lợi từ việc có thể tìm thấy nhau và trao đổi bảo mật để lấy thêm phần thưởng.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Lợi ích bổ sung của việc đặt cọc lại</strong></p>
  <p className="mt-2">Các AVS có thể dồn toàn bộ nguồn lực của họ vào việc xây dựng và tiếp thị dịch vụ của mình, thay vì bị phân tâm bởi sự phi tập trung và bảo mật.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Đặt cọc lại hoạt động như thế nào? {#how-does-restaking-work}

Có một số thực thể tham gia vào việc đặt cọc lại — mỗi thực thể đều đóng một vai trò quan trọng.

| **Thuật ngữ** | **Mô tả** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nền tảng đặt cọc lại** | Nền tảng đặt cọc lại là một dịch vụ kết nối các AVS, người đặt cọc ETH và các nhà điều hành (operator). Họ xây dựng các ứng dụng phi tập trung để người đặt cọc có thể đặt cọc lại ETH của mình, và các thị trường nơi người đặt cọc, AVS và nhà điều hành có thể tìm thấy nhau. |
| **Người đặt cọc lại gốc (Native restaker)** | Những người đặt cọc ETH của họ bằng cách tự chạy các trình xác thực Ethereum có thể kết nối ETH đã đặt cọc của họ với một nền tảng đặt cọc lại, bao gồm EigenLayer và các nền tảng khác, để kiếm phần thưởng đặt cọc lại bên cạnh phần thưởng của trình xác thực ETH. |
| **Người đặt cọc lại thanh khoản (Liquid restaker)** | Những người đặt cọc ETH của họ thông qua một nhà cung cấp dịch vụ đặt cọc thanh khoản bên thứ ba, như Lido hoặc Rocket Pool, sẽ nhận được token staking thanh khoản (LST) đại diện cho ETH đã đặt cọc của họ. Họ có thể đặt cọc lại các LST này để kiếm phần thưởng đặt cọc lại trong khi vẫn giữ nguyên số ETH ban đầu đã đặt cọc. |
| **Nhà điều hành (Operator)** | Các nhà điều hành chạy phần mềm đặt cọc lại của AVS, thực hiện các tác vụ xác thực mà mỗi AVS yêu cầu. Các nhà điều hành thường là những nhà cung cấp dịch vụ chuyên nghiệp đảm bảo các yếu tố như thời gian hoạt động (uptime) và hiệu suất. Giống như những người đặt cọc lại không phải là nhà điều hành, các nhà điều hành sử dụng ETH đã đặt cọc để bảo mật các AVS, nhưng các nhà điều hành cũng nhận được thêm phần thưởng để đổi lấy công việc của họ. |
| **AVS** | Đây là các dịch vụ phi tập trung — như oracle giá, cầu nối token và hệ thống dữ liệu — nhận được sự bảo mật từ những người đặt cọc lại và cung cấp phần thưởng token để đổi lại. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Thông tin hữu ích</strong></p>
  <p className="mt-2">Những người đặt cọc lại gốc và thanh khoản thường ủy quyền ETH đã đặt cọc của họ cho một nhà điều hành, thay vì tự chạy phần mềm để bảo mật các AVS.</p>
  <p className="mt-2">Bằng cách này, họ không cần phải lo lắng về các yêu cầu kỹ thuật phức tạp từ các AVS, mặc dù họ nhận được tỷ lệ phần thưởng thấp hơn so với các nhà điều hành.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Một số ví dụ về đặt cọc lại là gì? {#what-are-some-examples-of-restaking}

Mặc dù là một ý tưởng mới mẻ, một vài dự án đã xuất hiện để khám phá các khả năng của việc đặt cọc lại.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Cảnh báo nhầm lẫn</strong></p>
  <p className="mt-2">Một số người nhầm lẫn "đặt cọc lại" với việc cho vay và vay mượn LST trong tài chính phi tập trung (DeFi). Cả hai đều đưa ETH đã đặt cọc vào hoạt động, nhưng đặt cọc lại có nghĩa là bảo mật các AVS, chứ không chỉ là kiếm lợi suất trên LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Tôi có thể kiếm được bao nhiêu từ việc đặt cọc lại? {#how-much-can-i-make-from-restaking}

Mặc dù các AVS cung cấp các mức tỷ lệ khác nhau, Token đặt cọc lại thanh khoản (Liquid Restaking Token - LRT) như eETH cho bạn ý tưởng về số tiền bạn có thể kiếm được. Tương tự như cách bạn nhận được LST như stETH khi đặt cọc ETH của mình, bạn có thể nhận được LRT như eETH khi đặt cọc lại stETH. Các token này kiếm được phần thưởng đặt cọc ETH và phần thưởng đặt cọc lại.

**Điều quan trọng là phải thừa nhận những rủi ro khi đặt cọc lại. Phần thưởng tiềm năng có thể hấp dẫn, nhưng chúng không hoàn toàn không có rủi ro.**

## Những rủi ro của việc đặt cọc lại là gì? {#what-are-the-risks-of-restaking}

| **Rủi ro** | **Mô tả** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hình phạt (hoặc “phạt cắt giảm”)** | Giống như đặt cọc ETH, nếu người đặt cọc lại/nhà điều hành ngoại tuyến, kiểm duyệt tin nhắn hoặc cố gắng phá hoại mạng lưới, khoản đặt cọc của họ có thể bị phạt cắt giảm (đốt) một phần hoặc toàn bộ. |
| **Sự tập trung hóa** | Nếu một vài nhà điều hành thống trị phần lớn việc đặt cọc lại, họ có thể có ảnh hưởng lớn đến những người đặt cọc lại, các AVS và thậm chí cả các nền tảng đặt cọc lại. |
| **Phản ứng dây chuyền** | Nếu một người đặt cọc lại bị phạt cắt giảm trong khi đang bảo mật nhiều AVS, điều này có thể làm giảm tính bảo mật cho các AVS khác, khiến chúng dễ bị tấn công. |
| **Quyền truy cập ngay vào tiền** | Có một khoảng thời gian chờ (hoặc “thời gian chờ mở khóa”) để rút ETH đã đặt cọc lại, vì vậy bạn có thể không phải lúc nào cũng có quyền truy cập ngay lập tức. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Nhà đồng sáng lập Ethereum đang gõ…</strong></p>
  <p className="mt-2">
    Vitalik, nhà đồng sáng lập Ethereum, đã cảnh báo về những rủi ro tiềm ẩn của việc đặt cọc lại trong một bài đăng trên blog năm 2021 có tên là <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Đừng làm quá tải sự đồng thuận.</a>
  </p>

</AlertDescription>
</AlertContent>
</Alert>

## Làm thế nào để bắt đầu với việc đặt cọc lại? {#how-to-get-started-with-restaking}

| 🫡 Người mới bắt đầu | 🤓 Người dùng nâng cao |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Đặt cọc ETH trên các nền tảng như Lido hoặc Rocket Pool để nhận LST. | 1. Đặt cọc ETH của bạn với tư cách là một trình xác thực trên Ethereum. |
| 2. Sử dụng các LST đó để bắt đầu đặt cọc lại trên một dịch vụ đặt cọc lại. | 2. So sánh các dịch vụ đặt cọc lại như EigenLayer, Symbiotic và các dịch vụ khác. |
| | 3. Làm theo hướng dẫn để kết nối trình xác thực của bạn với hợp đồng thông minh đặt cọc lại. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Đặt cọc Ethereum:</strong> Nó hoạt động như thế nào?</p>
  <ButtonLink href="/staking/">
    Tìm hiểu thêm
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Nâng cao {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## Đọc thêm {#further-reading}

1. [ethereum.org - Hướng dẫn đặt cọc ETH](/staking/)
2. [Ledger Academy - Đặt cọc lại Ethereum là gì?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [ConsenSys - EigenLayer: Giải thích về Giao thức đặt cọc lại Ethereum phi tập trung](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Đừng làm quá tải sự đồng thuận của Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayer là gì? Giải thích về giao thức đặt cọc lại của Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Bổ sung tính năng không cần cấp phép vào Ethereum với Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - Giải thích về EigenLayer: Đặt cọc lại là gì?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Bảng dữ liệu đặt cọc lại](https://www.theblock.co/data/decentralized-finance/restaking)
