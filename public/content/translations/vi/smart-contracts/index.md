---
title: Giới thiệu về hợp đồng thông minh
metaTitle: "Hợp đồng thông minh: Chúng là gì và lợi ích của chúng"
description: Giới thiệu phi kỹ thuật về hợp đồng thông minh
lang: vi
---

Hợp đồng thông minh là các khối xây dựng cơ bản của lớp ứng dụng của [Ethereum](/). Chúng là các chương trình máy tính được lưu trữ trên [Chuỗi khối](/glossary/#blockchain) tuân theo logic "nếu thế này thì thế kia" (if this then that), và được đảm bảo thực thi theo các quy tắc được xác định bởi mã của nó, vốn không thể thay đổi một khi đã được tạo.

Nick Szabo đã đặt ra thuật ngữ "hợp đồng thông minh". Vào năm 1994, ông đã viết [một bài giới thiệu về khái niệm này](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), và vào năm 1996, ông đã viết [một bài khám phá về những gì hợp đồng thông minh có thể làm](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo đã hình dung ra một thị trường kỹ thuật số nơi các quy trình tự động, [bảo mật bằng mật mã](/glossary/#cryptography) cho phép các giao dịch và chức năng kinh doanh diễn ra mà không cần các bên trung gian đáng tin cậy. Các hợp đồng thông minh trên Ethereum đã đưa tầm nhìn này vào thực tế.

Xem Finematics giải thích về hợp đồng thông minh:

<VideoWatch slug="smart-contracts-code-is-law" />

## Niềm tin trong các hợp đồng truyền thống {#trust-and-contracts}

Một trong những vấn đề lớn nhất với hợp đồng truyền thống là cần có những cá nhân đáng tin cậy để thực hiện các kết quả của hợp đồng.

Dưới đây là một ví dụ:

Alice và Bob đang tham gia một cuộc đua xe đạp. Giả sử Alice cá cược với Bob 10 đô la rằng cô ấy sẽ thắng cuộc đua. Bob tự tin rằng mình sẽ là người chiến thắng và đồng ý với vụ cá cược. Cuối cùng, Alice hoàn thành cuộc đua bỏ xa Bob và là người chiến thắng rõ ràng. Nhưng Bob từ chối trả tiền cược, cho rằng Alice chắc chắn đã gian lận.

Ví dụ ngớ ngẩn này minh họa vấn đề với bất kỳ thỏa thuận không thông minh nào. Ngay cả khi các điều kiện của thỏa thuận được đáp ứng (tức là bạn là người chiến thắng cuộc đua), bạn vẫn phải tin tưởng một người khác để thực hiện thỏa thuận (tức là trả tiền cược).

## Một máy bán hàng tự động kỹ thuật số {#vending-machine}

Một phép ẩn dụ đơn giản cho hợp đồng thông minh là một máy bán hàng tự động, hoạt động khá giống với một hợp đồng thông minh - các đầu vào cụ thể đảm bảo các đầu ra đã được xác định trước.

- Bạn chọn một sản phẩm
- Máy bán hàng tự động hiển thị giá
- Bạn thanh toán mức giá đó
- Máy bán hàng tự động xác minh rằng bạn đã trả đúng số tiền
- Máy bán hàng tự động đưa cho bạn món hàng của bạn

Máy bán hàng tự động sẽ chỉ phân phát sản phẩm bạn mong muốn sau khi tất cả các yêu cầu được đáp ứng. Nếu bạn không chọn sản phẩm hoặc không đưa đủ tiền, máy bán hàng tự động sẽ không đưa ra sản phẩm của bạn.

## Thực thi tự động {#automation}

Lợi ích chính của hợp đồng thông minh là nó thực thi một cách tất định các mã rõ ràng khi các điều kiện nhất định được đáp ứng. Không cần phải đợi con người diễn giải hoặc đàm phán kết quả. Điều này loại bỏ nhu cầu về các bên trung gian đáng tin cậy.

Ví dụ, bạn có thể viết một hợp đồng thông minh giữ tiền ký quỹ cho một đứa trẻ, cho phép chúng rút tiền sau một ngày cụ thể. Nếu chúng cố gắng rút tiền trước ngày đó, hợp đồng thông minh sẽ không thực thi. Hoặc bạn có thể viết một hợp đồng tự động cấp cho bạn phiên bản kỹ thuật số của giấy tờ xe khi bạn thanh toán cho đại lý.

## Kết quả có thể dự đoán được {#predictability}

Các hợp đồng truyền thống thường mơ hồ vì chúng dựa vào con người để diễn giải và thực hiện. Ví dụ, hai thẩm phán có thể diễn giải một hợp đồng theo những cách khác nhau, điều này có thể dẫn đến các quyết định không nhất quán và kết quả không công bằng. Hợp đồng thông minh loại bỏ khả năng này. Thay vào đó, các hợp đồng thông minh thực thi chính xác dựa trên các điều kiện được viết trong mã của hợp đồng. Sự chính xác này có nghĩa là trong cùng một hoàn cảnh, hợp đồng thông minh sẽ tạo ra cùng một kết quả.

## Hồ sơ công khai {#public-record}

Hợp đồng thông minh rất hữu ích cho việc kiểm toán và theo dõi. Vì các hợp đồng thông minh Ethereum nằm trên một Chuỗi khối công khai, bất kỳ ai cũng có thể theo dõi ngay lập tức các giao dịch chuyển tài sản và các thông tin liên quan khác. Ví dụ, bạn có thể kiểm tra xem ai đó đã gửi tiền đến Địa chỉ của bạn hay chưa.

## Bảo vệ quyền riêng tư {#privacy-protection}

Hợp đồng thông minh cũng bảo vệ quyền riêng tư của bạn. Vì Ethereum là một mạng lưới ẩn danh một phần (các giao dịch của bạn được gắn công khai với một Địa chỉ mật mã duy nhất, chứ không phải danh tính của bạn), bạn có thể bảo vệ quyền riêng tư của mình khỏi những người quan sát.

## Các điều khoản có thể nhìn thấy {#visible-terms}

Cuối cùng, giống như các hợp đồng truyền thống, bạn có thể kiểm tra những gì có trong một hợp đồng thông minh trước khi bạn ký nó. Không giống như hợp đồng truyền thống, tính minh bạch trên chuỗi của hợp đồng thông minh cho phép bất kỳ ai cũng có thể xem xét kỹ lưỡng và đánh giá nó trước khi tương tác với nó. 

Tuy nhiên, mặc dù bất kỳ ai cũng có thể xem các điều khoản của hợp đồng thông minh, dữ liệu giao dịch thô được thiết kế để các ứng dụng và ví diễn giải, chứ không phải con người. Vì dữ liệu này rất khó đọc, người dùng thường phải đối mặt với một rủi ro bảo mật lớn gọi là "ký mù" (blind signing), hay việc phê duyệt một giao dịch tương tác với một hợp đồng thông minh mà không thực sự hiểu nó sẽ làm gì. 

Hệ sinh thái Ethereum đang chuyển đổi sang các tiêu chuẩn **[Ký rõ ràng (Clear Signing)](https://clearsigning.org/)** (cụ thể là [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). Ký rõ ràng dịch dữ liệu hợp đồng thông minh khó hiểu thành các mô tả giao dịch đơn giản, dễ đọc đối với con người, đảm bảo bất kỳ ai cũng có thể hiểu được ý định thực sự của hợp đồng trước khi họ thực hiện việc ký.

## Các trường hợp sử dụng hợp đồng thông minh {#use-cases}

Hợp đồng thông minh về cơ bản có thể làm bất cứ điều gì mà các chương trình máy tính có thể làm.

Chúng có thể thực hiện các phép tính, tạo ra tiền tệ, lưu trữ dữ liệu, đúc [NFT](/glossary/#nft), gửi thông tin liên lạc và thậm chí tạo ra đồ họa. Dưới đây là một số ví dụ phổ biến trong thế giới thực:

- [Stablecoin](/stablecoins/)
- [Tạo và phân phối các tài sản kỹ thuật số độc nhất](/nft/)
- [Một sàn giao dịch tiền tệ mở, tự động](/get-eth/#dex)
- [Trò chơi phi tập trung](/apps/categories/gaming)
- [Một hợp đồng bảo hiểm tự động chi trả](https://etherisc.com/)
- [Một tiêu chuẩn cho phép mọi người tạo ra các loại tiền tệ tùy chỉnh, có khả năng tương tác](/developers/docs/standards/tokens/)

## Đọc thêm {#further-reading}

- [Hợp đồng thông minh sẽ thay đổi thế giới như thế nào](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Hợp đồng thông minh dành cho nhà phát triển](/developers/docs/smart-contracts/)
- [Học cách viết hợp đồng thông minh](/developers/learning-tools/)
- [Mastering Ethereum - Hợp đồng thông minh là gì?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />