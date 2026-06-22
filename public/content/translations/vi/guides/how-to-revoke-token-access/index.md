---
title: Cách thu hồi quyền truy cập của hợp đồng thông minh vào quỹ tiền mã hóa của bạn
description: Hướng dẫn cách thu hồi quyền truy cập token của các hợp đồng thông minh có tính bóc lột
lang: vi
---

Hướng dẫn này sẽ chỉ cho bạn cách xem danh sách tất cả các [hợp đồng thông minh](/glossary/#smart-contract) mà bạn đã cho phép truy cập vào quỹ của mình và cách hủy bỏ chúng.

Đôi khi, các nhà phát triển độc hại xây dựng các cửa hậu (backdoor) vào các hợp đồng thông minh, cho phép truy cập vào quỹ của những người dùng không hay biết khi họ tương tác với hợp đồng thông minh. Điều thường xảy ra là các nền tảng như vậy yêu cầu người dùng cấp quyền chi tiêu một **số lượng token không giới hạn** nhằm cố gắng tiết kiệm một lượng nhỏ [Gas](/glossary/#gas) trong tương lai, nhưng điều này đi kèm với rủi ro gia tăng.

Khi một nền tảng có quyền truy cập không giới hạn vào một token trên [ví](/glossary/#wallet) của bạn, họ có thể chi tiêu tất cả các token đó ngay cả khi bạn đã rút quỹ của mình từ nền tảng của họ về ví. Những kẻ xấu vẫn có thể truy cập vào quỹ của bạn và rút chúng về ví của họ mà bạn không còn cách nào để khôi phục.

Các biện pháp bảo vệ duy nhất là hạn chế sử dụng các dự án mới chưa được kiểm chứng, chỉ chấp thuận những gì bạn cần, hoặc thường xuyên thu hồi quyền truy cập. Vậy, bạn làm điều đó như thế nào?

## Bước 1: Sử dụng các công cụ thu hồi quyền truy cập {#step-1-use-revoke-access-tools}

Một số trang web cho phép bạn xem và thu hồi các hợp đồng thông minh được kết nối với địa chỉ của bạn. Hãy truy cập trang web và kết nối ví của bạn:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (nhiều mạng lưới)
- [Unrekt](https://app.unrekt.net/) (nhiều mạng lưới)
- [EverRevoke](https://everrise.com/everrevoke/) (nhiều mạng lưới)

## Bước 2: Kết nối ví của bạn {#step-2-connect-your-wallet}

Khi bạn đang ở trên trang web, hãy nhấp vào “Connect wallet” (Kết nối ví). Trang web sẽ yêu cầu bạn kết nối ví của mình.

Đảm bảo bạn sử dụng cùng một mạng lưới trên ví và trang web của mình. Bạn sẽ chỉ thấy các hợp đồng thông minh liên quan đến mạng lưới đã chọn. Ví dụ: nếu bạn kết nối với Mạng chính Ethereum, bạn sẽ chỉ thấy các hợp đồng Ethereum, không phải các hợp đồng từ các chuỗi khác như Polygon.

## Bước 3: Chọn một hợp đồng thông minh mà bạn muốn thu hồi {#step-3-select-a-smart-contract-you-wish-to-revoke}

Bạn sẽ thấy tất cả các hợp đồng được phép truy cập vào các token của bạn và giới hạn chi tiêu của chúng. Hãy tìm hợp đồng mà bạn muốn chấm dứt.

Nếu bạn không biết nên chọn hợp đồng nào, bạn có thể thu hồi tất cả chúng. Điều này sẽ không gây ra bất kỳ vấn đề nào cho bạn, nhưng bạn sẽ phải cấp một bộ quyền mới vào lần tiếp theo bạn tương tác với bất kỳ hợp đồng nào trong số này.

## Bước 4: Thu hồi quyền truy cập vào quỹ của bạn {#step-4-revoke-access-to-your-funds}

Khi bạn nhấp vào thu hồi, bạn sẽ thấy một đề xuất giao dịch mới trong ví của mình. Điều này là hoàn toàn bình thường. Bạn sẽ phải trả phí để việc hủy bỏ thành công. Tùy thuộc vào mạng lưới, quá trình này có thể mất từ một đến vài phút để được xử lý.

Chúng tôi khuyên bạn nên làm mới công cụ thu hồi sau vài phút và kết nối lại ví của bạn để kiểm tra kỹ xem hợp đồng đã bị thu hồi có biến mất khỏi danh sách hay không.

<mark>Chúng tôi khuyên bạn không bao giờ cho phép các dự án truy cập không giới hạn vào các token của mình và thường xuyên thu hồi tất cả quyền truy cập hạn mức token. Việc thu hồi quyền truy cập token sẽ không bao giờ dẫn đến mất quỹ, đặc biệt nếu bạn sử dụng các công cụ được liệt kê ở trên.</mark>

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

## Các câu hỏi thường gặp {#frequently-asked-questions}

### Việc thu hồi quyền truy cập token có đồng thời chấm dứt việc đặt cọc, góp vốn (pooling), cho vay, v.v. không? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Không, điều đó sẽ không ảnh hưởng đến bất kỳ chiến lược [tài chính phi tập trung (DeFi)](/glossary/#defi) nào của bạn. Bạn sẽ vẫn giữ nguyên các vị thế của mình và tiếp tục nhận được phần thưởng, v.v.

### Việc ngắt kết nối ví khỏi một dự án có giống với việc xóa quyền sử dụng quỹ của tôi không? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Không, nếu bạn ngắt kết nối ví của mình khỏi dự án, nhưng bạn đã cấp quyền hạn mức token, họ vẫn có thể sử dụng những token đó. Bạn cần phải thu hồi quyền truy cập đó.

### Khi nào quyền của hợp đồng sẽ hết hạn? {#when-will-the-contract-permission-expire}

Không có ngày hết hạn đối với các quyền của hợp đồng. Nếu bạn cấp quyền cho hợp đồng, chúng có thể được sử dụng, thậm chí nhiều năm sau khi được cấp.

### Tại sao các dự án lại thiết lập hạn mức token không giới hạn? {#why-do-projects-set-unlimited-token-allowance}

Các dự án thường làm điều này để giảm thiểu số lượng yêu cầu cần thiết, nghĩa là người dùng chỉ phải chấp thuận một lần và chỉ trả phí giao dịch một lần. Mặc dù tiện lợi, nhưng điều này có thể gây nguy hiểm cho người dùng nếu họ chấp thuận một cách bất cẩn trên các trang web chưa được kiểm chứng qua thời gian hoặc chưa được kiểm toán. Một số ví cho phép bạn hạn chế thủ công số lượng token được chấp thuận để giới hạn rủi ro của bạn. Hãy kiểm tra với nhà cung cấp ví của bạn để biết thêm thông tin.
