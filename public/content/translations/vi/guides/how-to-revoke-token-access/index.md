---
title: Cách thu hồi quyền truy cập hợp đồng thông minh vào tài sản tiền mã hóa của bạn
description: Hướng dẫn thu hồi quyền truy cập mã thông báo hợp đồng thông minh khai thác
lang: vi
---

# Cách thu hồi quyền truy cập hợp đồng thông minh vào tài sản tiền mã hóa của bạn

Hướng dẫn này sẽ chỉ cho bạn cách xem danh sách tất cả các [hợp đồng thông minh](/glossary/#smart-contract) mà bạn đã cho phép truy cập vào quỹ tiền của mình và cách hủy các quyền đó.

Đôi khi các nhà phát triển độc hại xây dựng cửa hậu vào các hợp đồng thông minh cho phép truy cập vào quỹ của những người dùng không biết tương tác với hợp đồng thông minh. Điều thường xảy ra là các nền tảng như vậy yêu cầu người dùng cho phép chi tiêu **một số lượng token không giới hạn** để tiết kiệm một lượng nhỏ [gas](/glossary/#gas) trong tương lai, nhưng điều này đi kèm với rủi ro gia tăng.

Khi một nền tảng có quyền truy cập không giới hạn vào token trên [ví](/glossary/#wallet) của bạn, họ có thể chi tiêu tất cả các token đó ngay cả khi bạn đã rút tiền từ nền tảng của họ vào ví của mình. Các tác nhân độc hại vẫn có thể truy cập tiền của bạn và rút chúng vào ví của họ mà không còn tùy chọn khôi phục nào cho bạn.

Các biện pháp bảo vệ duy nhất là hạn chế sử dụng các dự án mới chưa được kiểm tra, chỉ phê duyệt những gì bạn cần hoặc thường xuyên thu hồi quyền truy cập. Thế, bạn làm điều đó như thế nào?

## Bước 1: Sử dụng thu hồi các công cụ truy cập

Một số trang web cho phép bạn xem và thu hồi các hợp đồng thông minh được kết nối với địa chỉ của bạn. Truy cập trang web và kết nối ví của bạn:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/apps/revokescout) (Ethereum)
- [Revoke](https://revoke.cash/) (nhiều mạng)
- [Unrekt](https://app.unrekt.net/) (nhiều mạng)
- [EverRevoke](https://everrise.com/everrevoke/) (nhiều mạng)

## Bước 2: Kết nối ví của bạn

Once you are on the website, click on “Connect wallet”. Trang web sẽ nhắc bạn kết nối ví của mình.

. Bạn chỉ thấy các hợp đồng thông minh liên quan đến mạng đã chọn. Ví dụ, nếu bạn kết nối với Ethereum Mainnet, bạn chỉ thấy hợp đồng Ethereum, chứ không thấy hợp đồng từ các chuỗi khác như Polygon.

## Bước 3: Chọn hợp đồng thông minh bạn thu hồi

Bạn sẽ thấy tất cả các hợp đồng được phép truy cập vào token của bạn và hạn mức chi tiêu của chúng. Tìm hợp đồng mà bạn muốn chấm dứt.

Nếu bạn không biết chọn hợp đồng nào, bạn có thể chấm dứt tất cả chúng. Điều này sẽ không tạo ra bất kì vấn đề gì cho bạn, nhưng bạn sẽ phải trao quyền mới lần tới bạn tương tác với bất kì hợp đồng này.

## Bước 4: Hủy truy cập vào quỹ của bạn

Một khi bạn bấm thu hồi, bạn sẽ thấy một giao dịch gợi ý mới trong ví của bạn. Điều này là bình thường. Bạn sẽ phải trả phí thì việc hủy bỏ mới thành công. Tùy thuộc vào mạng lưới mà quá trình sẽ tốn một hoặc vài phút để xử lí.

Chúng tôi khuyên bạn nên làm mới công cụ thu hồi sau vài phút và kết nối lại ví để kiểm tra lần nữa xem hợp đồng đã thu hồi có biến mất khỏi danh sách hay chưa.

<mark>Chúng tôi khuyên bạn không bao giờ cho phép các dự án truy cập không giới hạn vào token của bạn và hãy thường xuyên thu hồi mọi quyền chi tiêu token. Việc thu hồi quyền truy cập token sẽ không bao giờ dẫn đến mất tiền, đặc biệt nếu bạn sử dụng các công cụ được liệt kê ở trên.</mark>

<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Bạn muốn tìm hiểu thêm?</div>
  <ButtonLink href="/guides/">
    Xem các hướng dẫn khác của chúng tôi
  </ButtonLink>
</AlertContent>
</Alert>

## Những câu hỏi thường gặp

### Việc thu hồi quyền truy cập token có chấm dứt Staking, góp chung, cho vay… hay không?

Không, điều này sẽ không ảnh hưởng đến bất kỳ chiến lược [DeFi](/glossary/#defi) nào của bạn. Bạn sẽ vẫn giữ vị thế của mình và tiếp tục nhận phần thưởng,...

### Ngắt kết nối ví khỏi một dự án có giống với việc xóa quyền sử dụng tiền của tôi không?

Không, nếu bạn ngắt kết nối ví khỏi dự án, nhưng đã cấp quyền truy cập Token, thì nó vẫn có thể sử dụng những Token đó. Bạn phải thu hồi quyền truy cập lại.

### Khi nào quyền hạn của hợp đồng sẽ hết hạn?

Quyền truy cập của hợp đồng không có ngày hết hạn. Nếu bạn trao quyền truy cập cho hợp đồng, chúng có thể được sử dụng, ngay cả khi đã nhiều năm kể từ ngày được trao quyền.

### Tại sao một số dự án cho phép quyền truy cập không giới hạn Token?

Các dự án thường làm vậy để giảm số lượng yêu cầu, nghĩa là người dùng chỉ phải phê duyệt một lần và chỉ trả phí giao dịch một lần. Mặc dù tiện lợi, nhưng nó đầy rẫy nguy hiểm cho người dùng khi ủy quyền cẩu thả trên những trang chưa được kiểm chứng qua thời gian hoặc kiểm toán. Một số ví cho phép bạn tự giới hạn lượng Token phê duyệt để giảm rủi ro. Hãy kiểm tra nhà cung cấp ví để biết thêm thông tin.
