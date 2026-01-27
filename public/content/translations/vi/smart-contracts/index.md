---
title: Hợp đồng thông minh
metaTitle: "Hợp đồng thông minh: Chúng là gì và lợi ích của chúng"
description: Giới thiệu phi kỹ thuật về hợp đồng thông minh
lang: vi
---

# Giới thiệu về hợp đồng thông minh {#introduction-to-smart-contracts}

<div className="mt-4">
<ListenToPlayer slug="/smart-contracts/" />
</div>

Các hợp đồng thông minh là các khối nền tảng cho các ứng dụng Ethereum. Chúng là các chương trình máy tính được lưu trữ trên [chuỗi khối](/glossary/#blockchain) tuân theo logic "nếu thế này thì thế kia" và được đảm bảo sẽ thực thi theo các quy tắc do mã của nó xác định, không thể thay đổi sau khi tạo.

Nick Szabo đã đề cập đến thuật ngữ "hợp đồng thông minh". Năm 1994, ông đã viết [một bài giới thiệu về khái niệm này](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), và vào năm 1996, ông đã viết [một bài khám phá về những gì hợp đồng thông minh có thể làm](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo đã hình dung ra một thị trường kỹ thuật số, nơi các quy trình tự động, [an toàn về mặt mật mã](/glossary/#cryptography) cho phép các giao dịch và chức năng kinh doanh diễn ra mà không cần các bên trung gian đáng tin cậy. Các hợp đồng thông minh trên Ethereum đưa tầm nhìn này vào thực tế.

Xem Finematics giải thích các hợp đồng thông minh:

<YouTube id="pWGLtjG-F5c" />

## Sự tin cậy trong các hợp đồng thông thường {#trust-and-contracts}

Một trong những vấn đề lớn nhất đối với hợp đồng truyền thống là sự cần thiết phải có những cá nhân đáng tin cậy tuân theo các kết quả của hợp đồng.

Đây là một ví dụ:

Alice và Bob đang có một cuộc đua xe đạp. Giả sử Alice đặt cược cho Bob $10 rằng cô ấy sẽ thắng cuộc đua. Bob tự tin rằng mình sẽ là người chiến thắng và đồng ý đặt cược. Cuối cùng, Alice hoàn thành cuộc đua trước Bob và là người chiến thắng rõ ràng. Nhưng Bob từ chối trả tiền cá cược, cho rằng Alice chắc chắn đã gian lận.

Ví dụ ngớ ngẩn này minh họa vấn đề với bất kỳ thỏa thuận không thông minh nào. Ngay cả khi các điều kiện của thỏa thuận được đáp ứng (tức là bạn là người chiến thắng trong cuộc đua), bạn vẫn phải tin tưởng một người khác để thực hiện thỏa thuận (tức là chi trả tiền cược).

## Một máy bán hàng tự động kỹ thuật số {#vending-machine}

Một phép ẩn dụ đơn giản cho hợp đồng thông minh là một máy bán hàng tự động, hoạt động tương tự như một đầu vào dành riêng cho hợp đồng thông minh đảm bảo đầu ra được chỉ định trước.

- Bạn chọn một sản phẩm
- Máy bán hàng tự động cho ta thấy giá cả
- Bạn trả tiền đúng giá đó
- Máy bán hàng tự động xác nhận là bạn đã trả đúng số tiền đó
- Máy bán hàng tự động đưa cho bạn vật phẩm

Máy bán hàng tự động phân phối sản phẩm mà bạn lựa chọn. Nếu bạn không chọn sản phẩm hoặc nạp đủ tiền, máy bán hàng sẽ không cung cấp sản phẩm cho bạn.

## Thực thi tự động {#automation}

Lợi ích chính của một hợp đồng thông mình là nó thực thi theo một cách được xác định từ trước đoạn code rõ ràng khi thỏa một vài điều kiện. Không cần đợi con người dịch hay xem xét kết quả. Điều này loại bỏ nhu cầu các bên trung gian được tin cậy.

Ví dụ: bạn có thể viết một hợp đồng thông minh giữ tiền ký quỹ cho một đứa trẻ, cho phép chúng rút tiền sau một ngày cụ thể. Nếu họ cố gắng rút tiền trước ngày được chỉ định, hợp đồng thông minh sẽ không thực thi. Hoặc bạn có thể viết một hợp đồng tự động cung cấp cho bạn phiên bản kỹ thuật số của tiêu đề ô tô khi bạn thanh toán cho đại lý.

## Kết quả có thể dự đoán được {#predictability}

Hợp đồng truyền thống không rõ ràng vì chúng dựa vào con người để hiểu và thực thi. Ví dụ như, hai thẩm phán có thể hiểu một hợp đồng khác nhau, điều này có thể dẫn đến những quyết định không nhất quán và những kết quả không công bằng. Hợp đồng thông minh loại bỏ khả năng này. Thay vào đó, các hợp đồng thông minh thực thi chính xác dựa trên các điều kiện được viết trong mã của hợp đồng. Độ chính xác này có nghĩa là trong các trường hợp giống nhau, hợp đồng thông minh sẽ tạo ra cùng một kết quả.

## Hồ sơ công khai {#public-record}

Hợp đồng thông minh cũng hữu ích cho việc kiểm định và theo dõi. Vì các hợp đồng thông minh Ethereum nằm trên một chuỗi khối công cộng, nên bất kỳ ai cũng có thể theo dõi ngay việc chuyển tài sản và các thông tin liên quan khác. Ví dụ như, bạn có thể kiểm tra xem ai đó đã chuyển tiền đến địa chỉ ví của bạn.

## Bảo vệ quyền riêng tư {#privacy-protection}

Các hợp đồng thông minh bảo vệ quyền riêng tư của bạn. Vì Ethereum là một mạng giả danh (các giao dịch của bạn được ràng buộc công khai với một địa chỉ mật mã duy nhất, không phải danh tính của bạn), bạn có thể bảo vệ quyền riêng tư của mình khỏi những người theo dõi.

## Các điều khoản có thể thấy được {#visible-terms}

Cuối cùng, giống như hợp đồng truyền thống, bạn có thể kiểm tra những gì trong hợp đồng thông minh trước khi ký (hoặc tương tác với nó). Tính minh bạc của một hợp đồng thông minh đảm bảo rằng ai cũng có thể xem xét kỹ lưỡng nó.

## Các trường hợp sử dụng hợp đồng thông minh {#use-cases}

Hợp đồng thông minh có thể làm bất cứ điều gì mà các chương trình máy tính khác có thể làm.

Chúng có thể thực hiện các phép tính, tạo ra tiền tệ, lưu trữ dữ liệu, đúc [NFT](/glossary/#nft), gửi thông tin liên lạc và thậm chí tạo ra đồ họa. Dưới đây là một số ví dụ phổ biến trong thế giới thực:

- [Stablecoin](/stablecoins/)
- [Tạo và phân phối các tài sản kỹ thuật số độc nhất](/nft/)
- [Một sàn giao dịch tiền tệ tự động, mở](/get-eth/#dex)
- [Trò chơi phi tập trung](/apps/categories/gaming)
- [Một hợp đồng bảo hiểm tự động chi trả](https://etherisc.com/)
- [Một tiêu chuẩn cho phép mọi người tạo ra các loại tiền tệ tùy chỉnh, có khả năng tương tác](/developers/docs/standards/tokens/)

## Đọc thêm {#further-reading}

- [Cách Hợp đồng thông minh sẽ thay đổi thế giới](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Hợp đồng thông minh dành cho nhà phát triển](/developers/docs/smart-contracts/)
- [Học cách viết hợp đồng thông minh](/developers/learning-tools/)
- [Làm chủ Ethereum - Hợp đồng thông minh là gì?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />
