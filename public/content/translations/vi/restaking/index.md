---
title: Tái cổ phần
metaTitle: Tái cổ phần là gì? | Lợi ích và cách sử dụng tái cổ phần
description: Sử dụng ETH đã được góp cổ phần để bảo mật các dịch vụ phi tập trung khác và kiếm thêm phần thưởng.
lang: vi
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Mô tả trực quan về tái cổ phần trên Ethereum.
sidebarDepth: 2
summaryPoint1: Sử dụng ETH đã được góp cổ phần để bảo mật các dịch vụ phi tập trung khác và kiếm thêm phần thưởng.
buttons:
  - content: Tái cổ phần là gì?
    toId: what-is-restaking
  - content: Nó hoạt động như thế nào?
    toId: how-does-restaking-work
    isSecondary: false
---

Mạng lưới Ethereum bảo mật giá trị hàng tỷ đô la 24/7, 365 ngày. Bằng cách nào?

Mọi người trên khắp thế giới khóa (hoặc “góp cổ phần”) [ether (ETH)](/eth/) trong các hợp đồng thông minh để chạy phần mềm xử lý các giao dịch Ethereum và bảo mật mạng lưới Ethereum. Đổi lại, họ nhận được phần thưởng là nhiều ETH hơn.

Tái cổ phần là một công nghệ được xây dựng cho những [người góp cổ phần](/staking/) để mở rộng tính bảo mật này cho các dịch vụ, ứng dụng hoặc mạng lưới khác. Đổi lại, họ kiếm được thêm phần thưởng tái cổ phần. Tuy nhiên, họ cũng đặt ETH đã góp cổ phần của mình vào tình thế rủi ro hơn.

**Giải thích về tái cổ phần trong 18 phút**

<YouTube id="rOJo7VwPh7I" />

## Tái cổ phần là gì? {#what-is-restaking}

Tái cổ phần là khi những người góp cổ phần sử dụng ETH đã được góp cổ phần của họ để bảo mật các dịch vụ phi tập trung khác. Đổi lại, những người tái cổ phần có thể nhận thêm phần thưởng từ các dịch vụ khác đó bên cạnh phần thưởng góp cổ phần ETH thông thường của họ.

Các dịch vụ phi tập trung được bảo mật bằng tái cổ phần được gọi là "Dịch vụ được xác thực chủ động" (AVS).
Tương tự như nhiều người góp cổ phần ETH chạy phần mềm xác thực Ethereum, nhiều người tái cổ phần cũng chạy phần mềm AVS chuyên dụng.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Tốt để biết</strong></p>
  <p className="mt-2">Mặc dù "Dịch vụ được xác thực chủ động" (AVS) là phổ biến nhất, các nền tảng tái cổ phần khác nhau có thể sử dụng các tên khác cho các dịch vụ phi tập trung mà họ giúp bảo mật, như "Dịch vụ được xác thực tự động," "Dịch vụ bảo mật phân tán," hoặc "Mạng lưới."</p>
</AlertDescription>
</AlertContent>
</Alert>

## Góp cổ phần và Tái cổ phần {#staking-vs-restaking}

| Đặt cọc                                   | Tái cổ phần                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| Kiếm phần thưởng ETH                      | Kiếm Phần thưởng ETH + phần thưởng AVS                                 |
| Bảo mật mạng lưới Ethereum                | Bảo mật mạng lưới Ethereum + AVS                                       |
| Không có ETH tối thiểu                    | Không có ETH tối thiểu                                                 |
| Mức độ rủi ro thấp                        | Mức độ rủi ro từ thấp đến cao                                          |
| Thời gian rút tiền phụ thuộc vào hàng đợi | Thời gian rút tiền phụ thuộc vào hàng đợi + thời gian chờ hủy liên kết |

## Tại sao chúng ta cần tái cổ phần? {#why-do-we-need-restaking}

Hãy hình dung hai thế giới; một có tái cổ phần và một không.

 <TabbedSection />

Trong thế giới có tái cổ phần này, cả AVS và người góp cổ phần đều được hưởng lợi từ việc có thể tìm thấy nhau và trao đổi bảo mật để lấy thêm phần thưởng.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Lợi ích bổ sung của việc tái cổ phần</strong></p>
  <p className="mt-2">AVS có thể dồn tất cả tài nguyên của mình vào việc xây dựng và tiếp thị dịch vụ của họ, thay vì bị phân tâm bởi việc phi tập trung hóa và bảo mật.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Tái cổ phần hoạt động như thế nào? {#how-does-restaking-work}

Có một số thực thể tham gia vào việc tái cổ phần — mỗi thực thể đều đóng một vai trò quan trọng.

| **Thuật ngữ**                     | **Mô tả**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nền tảng tái cổ phần**          | Nền tảng tái cổ phần là một dịch vụ kết nối các AVS, người góp cổ phần ETH và các nhà điều hành. Họ xây dựng các ứng dụng phi tập trung cho người góp cổ phần để tái cổ phần ETH của họ, và các thị trường nơi người góp cổ phần, AVS và nhà điều hành có thể tìm thấy nhau.                                                                                                                                                                                            |
| **Người tái cổ phần gốc**         | Những người góp cổ phần ETH bằng cách chạy các trình xác thực Ethereum của riêng họ có thể kết nối ETH đã góp cổ phần của họ với một nền tảng tái cổ phần, bao gồm EigenLayer và các nền tảng khác, để kiếm phần thưởng tái cổ phần bên cạnh phần thưởng của trình xác thực ETH.                                                                                                                                                                                                        |
|                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Người tái cổ phần thanh khoản** | Những người góp cổ phần ETH của họ thông qua một nhà cung cấp dịch vụ góp cổ phần thanh khoản của bên thứ ba, như Lido hoặc Rocket Pool, sẽ nhận được Token góp cổ phần thanh khoản (LST) đại diện cho ETH đã được góp cổ phần của họ. Họ có thể tái cổ phần các LST này để kiếm phần thưởng tái cổ phần trong khi vẫn giữ ETH ban đầu của họ được góp cổ phần.                                                                                      |
|                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Nhà điều hành**                 | Các nhà điều hành chạy phần mềm tái cổ phần của AVS, thực hiện các tác vụ xác thực mà mỗi AVS yêu cầu. Các nhà điều hành thường là các nhà cung cấp dịch vụ chuyên nghiệp đảm bảo những thứ như thời gian hoạt động và hiệu suất. Giống như những người tái cổ phần không phải là nhà điều hành, các nhà điều hành sử dụng ETH đã được góp cổ phần để bảo mật AVS, nhưng các nhà điều hành cũng nhận được thêm phần thưởng để đổi lấy công việc của họ. |
|                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **AVS**                           | Đây là các dịch vụ phi tập trung — như oracle giá, cầu nối token và hệ thống dữ liệu — nhận được bảo mật từ những người tái cổ phần và cung cấp phần thưởng token để đổi lại.                                                                                                                                                                                                                                                                                                           |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Tốt để biết</strong></p>
  <p className="mt-2">Những người tái cổ phần gốc và thanh khoản thường ủy quyền ETH đã góp cổ phần của họ cho một nhà điều hành, thay vì tự mình chạy phần mềm để bảo mật AVS.</p>
  <p className="mt-2">Bằng cách này, họ không cần phải lo lắng về các yêu cầu kỹ thuật phức tạp từ AVS, mặc dù họ nhận được tỷ lệ phần thưởng thấp hơn so với các nhà điều hành.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Một số ví dụ về tái cổ phần là gì? {#what-are-some-examples-of-restaking}

Mặc dù là một ý tưởng mới lạ, một vài dự án đã xuất hiện để khám phá các khả năng của việc tái cổ phần.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Cảnh báo nhầm lẫn</strong></p>
  <p className="mt-2">Một số người nhầm lẫn "tái cổ phần" với việc cho vay và vay LST trong DeFi. Cả hai đều đưa ETH đã góp cổ phần vào hoạt động, nhưng tái cổ phần có nghĩa là bảo mật AVS, không chỉ đơn thuần là kiếm lợi nhuận từ LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Tôi có thể kiếm được bao nhiêu từ việc tái cổ phần? {#how-much-can-i-make-from-restaking}

Mặc dù AVS cung cấp các tỷ lệ khác nhau, các Token Tái cổ phần Thanh khoản (LRT) như eETH cho bạn ý tưởng về số tiền bạn có thể kiếm được. Tương tự như cách bạn nhận được các LST như stETH khi góp cổ phần ETH, bạn có thể nhận được các LRT như eETH khi tái cổ phần stETH. Các token này kiếm được phần thưởng từ việc góp cổ phần ETH và tái cổ phần.

**Điều quan trọng là phải thừa nhận những rủi ro với việc tái cổ phần. Các phần thưởng tiềm năng có thể hấp dẫn, nhưng chúng không phải là không có rủi ro.**

## Rủi ro của việc tái cổ phần là gì? {#what-are-the-risks-of-restaking}

| **Rủi ro**                                              | **Mô tả**                                                                                                                                                                                                                                          |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hình phạt (hoặc “phạt cắt giảm”)** | Giống như việc góp cổ phần ETH, nếu những người tái cổ phần/nhà điều hành ngoại tuyến, kiểm duyệt tin nhắn hoặc cố gắng phá hoại mạng lưới, cổ phần của họ có thể bị phạt cắt giảm (đốt) một phần hoặc toàn bộ. |
| **Sự tập trung hóa**                                    | Nếu một vài nhà điều hành thống trị hầu hết hoạt động tái cổ phần, họ có thể có ảnh hưởng lớn đến những người tái cổ phần, AVS và thậm chí cả các nền tảng tái cổ phần.                                                            |
| **Phản ứng dây chuyền**                                 | Nếu một người tái cổ phần bị phạt cắt giảm trong khi bảo mật nhiều AVS, điều này có thể làm giảm tính bảo mật cho các AVS khác, khiến chúng trở nên dễ bị tấn công.                                                                |
| **Truy cập ngay lập tức vào quỹ**                       | Có một khoảng thời gian chờ (hoặc “thời gian chờ hủy liên kết”) để rút ETH đã tái cổ phần, vì vậy bạn có thể không phải lúc nào cũng có quyền truy cập ngay lập tức.                                            |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Đồng sáng lập Ethereum đang gõ…</strong></p>
  <p className="mt-2">
    Vitalik, đồng sáng lập Ethereum, đã cảnh báo về những rủi ro tiềm tàng của việc tái cổ phần trong một bài đăng blog năm 2021 có tên <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html"> Don't Overload Consensus</a>. </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## Làm thế nào để bắt đầu với việc tái cổ phần? {#how-to-get-started-with-restaking}

| 🫡 Người mới bắt đầu                                                                                               | 🤓 Người dùng nâng cao                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1. Góp cổ phần ETH trên các nền tảng như Lido hoặc Rocket Pool để nhận LST. | 1. Góp cổ phần ETH của bạn với tư cách là một trình xác thực trên Ethereum.                  |
| 2. Sử dụng các LST đó để bắt đầu tái cổ phần trên một dịch vụ tái cổ phần.  | 2. So sánh các dịch vụ tái cổ phần như EigenLayer, Symbiotic và các dịch vụ khác.            |
|                                                                                                                    | 3. Làm theo hướng dẫn để kết nối trình xác thực của bạn với hợp đồng thông minh tái cổ phần. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Góp cổ phần Ethereum:</strong> Nó hoạt động như thế nào?</p>
  <ButtonLink href="/staking/">
    Tìm hiểu thêm
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Nâng cao {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Đọc thêm {#further-reading}

1. [ethereum.org - Hướng dẫn góp cổ phần ETH](https://ethereum.org/en/staking/)
2. [Ledger Academy - Tái cổ phần Ethereum là gì?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Giải thích về Giao thức Tái cổ phần Ethereum Phi tập trung](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Đừng làm quá tải sự đồng thuận của Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayer là gì? Giải thích về giao thức tái cổ phần của Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Thêm tính năng không cần cấp phép vào Ethereum với Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - Giải thích về EigenLayer: Tái cổ phần là gì?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Bảng điều khiển dữ liệu tái cổ phần](https://www.theblock.co/data/decentralized-finance/restaking)
