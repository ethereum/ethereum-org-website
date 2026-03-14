---
title: "Bảo mật Ethereum và chống lừa đảo"
description: "Hãy giữ an toàn cho bản thân khi sử dụng Ethereum"
lang: vi
---

# Bảo mật Ethereum và phòng chống lừa đảo {#introduction}

Sự quan tâm ngày càng tăng đối với tiền điện tử kéo theo rủi ro tăng cao từ phía những kẻ lừa đảo và tin tặc. Bài viết này đưa ra một số phương pháp hay để giảm thiểu những rủi ro này.

**Nên nhớ: Không ai từ ethereum.org sẽ chủ động liên hệ với bạn. Đừng trả lời các email nói rằng chúng từ bộ phận hỗ trợ chính thức của Ethereum.**

<Divider />

## Bảo mật tiền mã hóa 101 {#crypto-security}

### Nâng cao kiến thức của bạn {#level-up-your-knowledge}

Những hiểu lầm về cách thức hoạt động của tiền điện tử có thể dẫn đến những sai lầm tổn thất tới kinh tế. Ví dụ, nếu ai đó giả mạo làm 1 chăm sóc khách hàng của 1 sàn giao dịch, họ sẽ nói rằng họ có thể trả lại ETH bạn làm mất nếu bạn đưa mã 12 ký tự cho họ. Chính những tin tặc đang săn lùng những người không hiểu rằng Ethereum là một mạng phi tập trung và không ai có thể can thiệp theo phương thức đó. Tự giáo dục bản thân về cách mà Ethereum hoạt động là một khoản đầu tư đáng giá.

<DocLink href="/what-is-ethereum/">
  Ethereum là gì?
</DocLink>

<DocLink href="/eth/">
  Ether là gì?
</DocLink>
<Divider />

## Bảo mật ví {#wallet-security}

### Đừng tiết lộ khóa riêng tư của bạn {#protect-private-keys}

**Không bao giờ, vì bất kỳ lý do gì, chia sẻ khóa cá nhân của bạn!**

Khóa riêng tư của ví hoạt động như một mật khẩu cho ví Ethereum của bạn. Đó là điều duy nhất ngăn người biết địa chỉ ví của bạn rút hết tài sản của tài khoản của bạn!

<DocLink href="/wallets/">
  Ví Ethereum là gì?
</DocLink>

#### Đừng chụp ảnh màn hình cụm từ khôi phục/khóa riêng tư của bạn {#screenshot-private-keys}

Việc chụp màn hình các cụm từ khóa bí mật hoặc mã riêng tư của ví làm bạn có nguy cơ đồng bộ hóa chúng với đám mây như Icloud, Google drive và có khả năng khiến chúng bị tin tặc truy cập. Lấy khóa cá nhân từ đám mây là một cách thức tấn công phổ biến đối với tin tặc.

### Sử dụng ví phần cứng {#use-hardware-wallet}

Ví phần cứng cung cấp khả năng lưu trữ ngoại tuyến cho các khóa cá nhân. Chúng được coi là tùy chọn ví an toàn nhất để lưu trữ các khóa riêng tư: khóa riêng tư của bạn không bao giờ kết nối với internet và duy trì cục bộ hoàn toàn trên thiết bị của bạn.

Việc giữ các khóa cá nhân ngoại tuyến hàng loạt giúp giảm nguy cơ bị tấn công, ngay cả khi tin tặc có được quyền kiểm soát máy tính của bạn.

#### Thử dùng ví phần cứng: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Kiểm tra kỹ các giao dịch trước khi gửi {#double-check-transactions}

Vô tình gửi tiền điện tử đến sai địa chỉ ví là một sai lầm phổ biến. **Một giao dịch được gửi trên Ethereum là không thể đảo ngược.** Trừ khi bạn biết chủ sở hữu địa chỉ và có thể thuyết phục họ gửi lại tiền cho bạn, bạn sẽ không thể lấy lại tiền của mình.

Luôn đảm bảo rằng địa chỉ bạn đang gửi khớp chính xác với địa chỉ người nhận mong muốn trước khi gửi giao dịch.
Sẽ tốt khi bạn làm quen với việc đọc thông báo giao dịch trước khi ký khi tương tác với hợp đồng thông minh.

### Đặt giới hạn chi tiêu của hợp đồng thông minh {#spend-limits}

Khi tương tác với các hợp đồng thông minh, không cho phép giới hạn chi tiêu không giới hạn. Chi tiêu không giới hạn có thể cho phép hợp đồng thông minh rút cạn nguồn quỹ trong ví của bạn. Thay vào đó, hãy đặt giới hạn chi tiêu chỉ với số tiền cần thiết cho giao dịch.

Nhiều ví Ethereum cung cấp bảo vệ giới hạn để bảo vệ chống lại việc tài khoản bị rút cạn.

[Cách thu hồi quyền truy cập của hợp đồng thông minh vào quỹ tiền mã hóa của bạn](/guides/how-to-revoke-token-access/)

<Divider />

## Các trò lừa đảo phổ biến {#common-scams}

Không thể hoàn toàn ngăn chặn những kẻ lừa đảo, nhưng chúng ta có thể ngăn ngừa bị lừa khi đọc thêm về các kỹ thuật lừa đảo phổ biến được chúng sử dụng. Có nhiều biến thể của những trò lừa đảo, nhưng chúng thường tuân theo một mô-típ. Nếu không có gì khác, hãy nhớ:

- luôn hoài nghi
- sẽ không ai cho bạn ETH miễn phí hoặc chiết khấu
- không ai cần quyền truy cập vào các khóa cá nhân hoặc thông tin cá nhân của bạn

### Lừa đảo qua quảng cáo trên Twitter {#ad-phishing}

![Lừa đảo qua liên kết trên Twitter](./twitterPhishingScam.png)

Một phương thức lừa đảo đang nhắm vào tính năng xem trước liên kết (unfurling) của Twitter (hay còn gọi là X). Kẻ gian có thể lợi dụng cơ chế này để đánh lừa người dùng, khiến họ tin rằng họ đang truy cập vào một trang web hợp pháp. Kỹ thuật này khai thác cơ chế của Twitter để tạo bản xem trước các URL được chia sẻ trong tweet, và hiển thị ví dụ như _từ ethereum.org_ (hiển thị ở trên), trong khi thực tế chúng đang được chuyển hướng đến một trang web độc hại.

Luôn luôn kiểm tra xem bạn có đang truy cập đúng tên miền hay không, đặc biệt là sau khi nhấp vào một liên kết.

[Thông tin thêm tại đây](https://harrydenley.com/faking-twitter-unfurling).

### Lừa đảo tặng quà {#giveaway}

Một trong những trò lừa đảo phổ biến nhất trong tiền điện tử là lừa đảo tặng quà. Lừa đảo tặng quà miễn phí có nhiều hình thức, nhưng mô-típ chung là chúng sẽ dụ bạn gửi ETH đến địa chỉ ví được cung cấp để nhận lại gấp đôi số ETH bạn đã gửi._Vì lý do này, nó còn được gọi là lừa đảo 2 tặng 1._

Những trò lừa đảo này giới hạn thời gian nhận quà nhằm tạo ra cảm giác sợ bị bỏ lỡ (Fomo).

### Tấn công mạng xã hội {#social-media-hacks}

Một phiên bản cao cấp của điều này xảy ra vào tháng 7 năm 2020, khi tài khoản Twitter của những người nổi tiếng và tổ chức bị tấn công. Tin tặc đồng thời đăng một tặng phẩm Bitcoin cho các tài khoản bị tấn công. Mặc dù các tweet lừa đảo nhanh chóng bị chú ý và bị xóa, các tin tặc vẫn lấy đi được 11 bitcoin (tương đương 500.000 Usd tính đến tháng 9 năm 2021).

![Một vụ lừa đảo trên Twitter](./appleTwitterScam.png)

### Tặng quà của người nổi tiếng {#celebrity-giveaway}

Quà tặng người nổi tiếng là một hình thức phổ biến khác mà lừa đảo tặng quà. Những kẻ lừa đảo sẽ lấy một video phỏng vấn đã ghi hình hoặc một buổi nói chuyện hội nghị của một người nổi tiếng và phát trực tiếp trên YouTube - khiến nó trông như thể người nổi tiếng đó đang phỏng vấn trực tiếp để quảng bá cho một chương trình tặng tiền mã hóa.

Vitalik Buterin được sử dụng thường xuyên nhất trong trò lừa đảo này, nhưng nhiều người nổi tiếng khác trong lĩnh vực tiền mã hóa cũng bị lợi dụng (ví dụ: Elon Musk hoặc Charles Hoskinson). Bao gồm cả một người nổi tiếng mang lại cho những kẻ lừa đảo livestream cảm giác hợp pháp (điều này trông có vẻ sơ sài, nhưng Vitalik đã tham gia, vì vậy nó phải ổn!).

**Quà tặng luôn là trò gian lận. Nếu bạn gửi tiền vào những tài khoản này, bạn sẽ mất chúng vĩnh viễn.**

![Một vụ lừa đảo trên YouTube](./youtubeScam.png)

### Lừa đảo hỗ trợ {#support-scams}

Tiền điện tử là một công nghệ tương đối non trẻ và dễ bị hiểu nhầm. Một trò lừa đảo phổ biến lợi dụng điều này là lừa đảo hỗ trợ, trong đó những kẻ lừa đảo sẽ mạo danh nhân viên hỗ trợ cho các ví, sàn giao dịch hoặc các chuỗi khối phổ biến.

Phần lớn các cuộc thảo luận về Ethereum diễn ra trên Discord. Những kẻ lừa đảo hỗ trợ thường sẽ tìm thấy mục tiêu của họ bằng cách tìm kiếm các câu hỏi hỗ trợ trong các kênh bất hòa công khai và sau đó gửi cho người yêu cầu một tin nhắn riêng đề nghị hỗ trợ. Bằng cách xây dựng lòng tin, những kẻ lừa đảo hỗ trợ cố gắng lừa bạn tiết lộ khóa cá nhân hoặc gửi tiền của bạn vào ví của chúng.

![Một vụ lừa đảo hỗ trợ trên Discord](./discordScam.png)

Về nguyên tắc chung, nhân viên sẽ không bao giờ liên lạc với bạn qua các kênh riêng tư, hoặc không chính thức. Một số điều đơn giản cần ghi nhớ khi tương tác với bộ phận hỗ trợ là:

- Không bao giờ chia sẻ khóa riêng tư, cụm từ gốc hoặc mật khẩu của bạn
- Không bao giờ cho phép bất kỳ ai truy cập từ xa vào máy tính của bạn
- Không bao giờ giao tiếp bên ngoài các kênh được chỉ định của tổ chức

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Hãy cẩn thận: mặc dù các vụ lừa đảo kiểu hỗ trợ thường xảy ra trên Discord, chúng cũng có thể phổ biến trên bất kỳ ứng dụng trò chuyện nào có thảo luận về tiền mã hóa, bao gồm cả email.
</AlertDescription>
</AlertContent>
</Alert>

### Lừa đảo token 'Eth2' {#eth2-token-scam}

Trong giai đoạn chuẩn bị cho [Hợp nhất](/roadmap/merge/), những kẻ lừa đảo đã lợi dụng sự nhầm lẫn xung quanh thuật ngữ 'Eth2' để cố gắng lừa người dùng đổi ETH của họ lấy một token 'ETH2'. Không có 'ETH2' nào tồn tại, không có token mới nào được ra mắt trong sự kiện hợp nhất. ETH mà bạn sở hữu trước sự kiện hợp nhất cũng là ETH hiện tại. Bạn **không cần thực hiện bất kỳ hành động nào liên quan đến ETH của mình để chuẩn bị cho việc chuyển đổi từ bằng chứng công việc sang bằng chứng cổ phần**.

Những kẻ lừa đảo có thể xuất hiện dưới dạng "hỗ trợ", cho bạn biết rằng nếu bạn gửi ETH của mình, bạn sẽ nhận lại 'ETH2'. Không có [hỗ trợ Ethereum chính thức](/community/support/), và không có token mới nào cả. Không bao giờ chia sẻ cụm từ hạt giống ví của bạn với bất kỳ ai.

_Lưu ý: Có các token/mã phái sinh có thể đại diện cho ETH đã đặt cược (ví dụ: rETH từ Rocket Pool, stETH từ Lido, ETH2 từ Coinbase), nhưng đây không phải là thứ bạn cần "di chuyển sang"._

### Lừa đảo giả mạo {#phishing-scams}

Lừa đảo nhử mồi là một kiểu lừa đảo ngày càng phổ biến khác mà những kẻ lừa đảo sẽ sử dụng để cố gắng lấy cắp tiền trong ví của bạn.

Một số email lừa đảo yêu cầu người dùng nhấp vào các liên kết sẽ chuyển hướng họ đến các trang web bắt chước, yêu cầu họ nhập cụm từ hạt giống, đặt lại mật khẩu hoặc gửi ETH. Những người khác có thể yêu cầu bạn vô tình cài đặt phần mềm độc hại để lây nhiễm vào máy tính của bạn và cấp cho những kẻ lừa đảo quyền truy cập vào các tệp máy tính của bạn.

Nếu bạn nhận được email từ một người gửi không xác định, hãy nhớ rằng:

- Không bao giờ mở liên kết hoặc tệp đính kèm từ các địa chỉ email mà bạn không nhận ra
- Không bao giờ tiết lộ thông tin cá nhân hoặc mật khẩu của bạn cho bất kỳ ai
- Xóa thư điện tử từ những người gửi lạ

[Thông tin thêm về cách tránh lừa đảo giả mạo](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Lừa đảo môi giới giao dịch tiền mã hóa {#broker-scams}

Những kẻ lừa đảo sẽ giả vờ làm các nhà môi giới giao dịch tiền điện tử, chúng sẽ tự nhận là nhà môi giới chuyên nghiệp. Từ đây, chúng sẽ đề nghị bạn gửi tiền để chúng đầu tư giúp bạn. Sau khi kẻ lừa đảo nhận được tiền của bạn, họ có thể dẫn bạn đến, yêu cầu bạn gửi thêm tiền, để bạn không bỏ lỡ thêm lợi nhuận đầu tư, hoặc chúng có thể biến mất hoàn toàn.

Những kẻ môi giới lừa đảo này tìm mục tiêu của họ bằng cách sử dụng các tài khoản giả mạo trên YouTube và bình luận 1 cách tự nhiên về 1 chủ đề nào đó. Các cuộc trò chuyện này thường nhận được lượt tương tác cao (thích, bình luận được tán thành) để tăng tính tin cậy, nhưng tất cả các bình luận tán thành đều từ các tài khoản bot.

**Đừng tin tưởng những người lạ trên internet để đầu tư thay mặt bạn. Bạn sẽ mất tiền điện tử của mình.**

![Một vụ lừa đảo môi giới giao dịch trên YouTube](./brokerScam.png)

### Lừa đảo bể khai thác tiền mã hóa {#mining-pool-scams}

Kể từ tháng 9 năm 2022, việc khai thác trên Ethereum không còn khả thi nữa. Tuy nhiên, mỏ đào lừa đảo vẫn tồn tại. Các vụ lừa đảo về mỏ đào liên quan đến những người liên hệ với bạn mà không được yêu cầu và tuyên bố rằng bạn có thể kiếm được lợi nhuận lớn bằng cách tham gia mỏ đào Ethereum. Kẻ lừa đảo sẽ yêu cầu bồi thường và giữ liên lạc với bạn trong thời gian dài. Về cơ bản, kẻ lừa đảo sẽ cố thuyết phục bạn khi bạn tham gia nhóm đào Ethereum, tiền điện tử của bạn sẽ được sử dụng để đào ETH và bạn sẽ được trả cổ tức dưới dạng ETH. Sau đó, bạn sẽ thấy rằng tiền điện tử của bạn đang mang lại lợi nhuận nhỏ nhưng không nhiều. Điều này chỉ đơn giản là để dụ bạn đầu tư nhiều hơn. Cuối cùng, tất cả số tiền của bạn sẽ được gửi đến một địa chỉ không xác định và kẻ lừa đảo sẽ biến mất hoặc trong một số trường hợp sẽ tiếp tục giữ liên lạc như đã xảy ra trong một sự việc gần đây.

Tóm tắt: hãy cảnh giác với bất kỳ ai liên hệ với bạn trên các nền tảng mạng xã hội yêu cầu bạn tham gia vào nhóm đào tiền ảo. Một khi bạn mất tiền điện tử của mình, nó sẽ biến mất.

Một số thứ cần nhớ:

- Cảnh giác với bất kỳ ai liên hệ với bạn về các cách kiếm tiền từ tiền điện tử của bạn
- Thực hiện nghiên cứu của bạn về đặt cược, nhóm thanh khoản hoặc các cách khác để đầu tư tiền điện tử của bạn
- Hiếm khi, nếu có, những nền tảng như vậy là hợp pháp. Nếu có, họ có thể sẽ là xu hướng chủ đạo và bạn sẽ nghe nói về họ lúc nào đó.

[Người đàn ông mất 200 nghìn đô la trong vụ lừa đảo bể khai thác](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Lừa đảo Airdrop {#airdrop-scams}

Các trò gian lận trong airdrop liên quan đến một dự án lừa đảo chuyển một tài sản (NFT, token) vào ví của bạn và đưa bạn đến một trang web lừa đảo để yêu cầu tài sản airdrop. Bạn sẽ được nhắc đăng nhập bằng ví Ethereum của mình và "chấp thuận" giao dịch khi cố gắng nhận thưởng. Giao dịch này xâm phạm tài khoản của bạn bằng cách gửi các khóa công khai và riêng tư của bạn cho kẻ lừa đảo. Một hình thức khác của trò lừa đảo này có thể yêu cầu bạn xác nhận một giao dịch gửi tiền vào tài khoản của kẻ lừa đảo.

[Thông tin thêm về lừa đảo Airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Bảo mật web 101 {#web-security}

### Sử dụng mật khẩu mạnh {#use-strong-passwords}

[Hơn 80% các vụ tấn công tài khoản là kết quả của mật khẩu yếu hoặc bị đánh cắp](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Sự kết hợp các ký tự dài, số và ký hiệu đặc biệt sẽ giúp tài khoản của bạn bảo mật hơn.

Một sai lầm phổ biến là sử dụng mật khẩu có các từ phổ biến và có liên quan tới bản thân bạn. Những mật khẩu như thế này sẽ không an toàn vì chúng dễ bị tấn công bằng kỹ thuật hack gọi là tấn công từ khóa.

```md
Ví dụ về mật khẩu yếu: CuteFluffyKittens!

Ví dụ về mật khẩu mạnh: ymv\*azu.EAC8eyp8umf
```

Một sai lầm phổ biến khác là sử dụng mật khẩu có thể dễ dàng bị đoán hoặc bị phát hiện thông qua [tấn công phi kỹ thuật](https://wikipedia.org/wiki/Social_engineering_\(security\)). Việc đưa tên thời con gái của mẹ, tên của con cái, vật nuôi hoặc ngày sinh vào mật khẩu của bạn sẽ làm tăng nguy cơ bị hack.

#### Các phương pháp tạo mật khẩu tốt: {#good-password-practices}

- Tạo mật khẩu càng dài càng tốt miễn là được cho phép bởi trình tạo mật khẩu của bạn hoặc biểu mẫu bạn đang điền
- Sử dụng hỗn hợp chữ hoa, chữ thường, số và ký hiệu
- Không sử dụng thông tin cá nhân, chẳng hạn như tên gia đình, trong mật khẩu của bạn
- Tránh những từ thông dụng

[Thông tin thêm về cách tạo mật khẩu mạnh](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Sử dụng mật khẩu riêng cho mọi thứ {#use-unique-passwords}

Một mật khẩu mạnh đã bị lộ trong một vụ rò rỉ dữ liệu sẽ không còn là mật khẩu mạnh nữa. Trang web [Have I Been Pwned](https://haveibeenpwned.com) cho phép bạn kiểm tra xem tài khoản của mình có liên quan đến bất kỳ vụ rò rỉ dữ liệu công khai nào không. Nếu có, **hãy thay đổi ngay những mật khẩu đó**. Việc sử dụng mật khẩu duy nhất cho từng tài khoản sẽ giảm nguy cơ tin tặc truy cập vào tất cả tài khoản của bạn nếu một trong các mật khẩu của bạn bị lộ.

### Sử dụng trình quản lý mật khẩu {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Sử dụng trình quản lý mật khẩu sẽ giúp bạn tạo mật khẩu mạnh, độc nhất và ghi nhớ chúng! Chúng tôi <strong>thực sự</strong> khuyên bạn nên sử dụng một trình quản lý, và hầu hết chúng đều miễn phí!
</AlertDescription>
</AlertContent>
</Alert>

Việc ghi nhớ mật khẩu mạnh, duy nhất cho mọi tài khoản bạn có không phải là điều lý tưởng. Trình quản lý mật khẩu cung cấp một kho bảo mật, được mã hóa cho tất cả các mật khẩu của bạn mà bạn có thể truy cập thông qua một mật khẩu chính. Họ cũng đề xuất mật khẩu mạnh khi đăng ký dịch vụ mới, vì vậy bạn không cần phải tạo mật khẩu của riêng mình. Nhiều trình quản lý mật khẩu cũng sẽ cho bạn biết nếu bạn đã liên quan vào một vụ vi phạm dữ liệu, cho phép bạn thay đổi mật khẩu trước bất kỳ cuộc tấn công nguy hiểm nào.

![Ví dụ về việc sử dụng trình quản lý mật khẩu](./passwordManager.png)

#### Thử dùng trình quản lý mật khẩu: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Hoặc xem các [trình quản lý mật khẩu được đề xuất](https://www.privacytools.io/secure-password-manager) khác

### Sử dụng Xác thực hai yếu tố {#two-factor-authentication}

Đôi khi bạn có thể được yêu cầu xác thực danh tính của mình thông qua các phương thức đặc biệt. Đây được gọi là các **yếu tố**. Ba phương thức chính này bao gồm:

- Điều gì đó bạn biết (chẳng hạn như mật khẩu hoặc câu hỏi bảo mật)
- Một cái gì đó của bạn (chẳng hạn như dấu vân tay hoặc máy quét mống mắt / khuôn mặt)
- Thứ mà bạn sở hữu (khóa bảo mật hoặc ứng dụng xác thực trên điện thoại của bạn)

Sử dụng **Xác thực hai yếu tố (2FA)** cung cấp thêm một _yếu tố bảo mật_ cho tài khoản trực tuyến của bạn. 2FA đảm bảo rằng việc sử dụng mật khẩu là chưa đủ để truy cập tài khoản. Thông thường nhất, yếu tố thứ hai là một mã 6 chữ số ngẫu nhiên, được gọi là **mật khẩu một lần dựa trên thời gian (TOTP)**, mà bạn có thể truy cập thông qua một ứng dụng xác thực như Google Authenticator hoặc Authy. Chúng hoạt động như một yếu tố "thứ gì đó bạn sở hữu" vì hạt giống tạo mã hẹn giờ được lưu trữ trên thiết bị của bạn.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Lưu ý: Sử dụng 2FA qua SMS dễ bị <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">tấn công hoán đổi SIM</a> và không an toàn. Để bảo mật tốt nhất, hãy sử dụng dịch vụ như <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> hoặc <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Khóa bảo mật {#security-keys}

Khóa bảo mật vật lý là loại 2FA tiên tiến và an toàn hơn của 2FA. Khóa bảo mật vật lý là thiết bị xác thực phần cứng vật lý hoạt động giống như các ứng dụng xác thực. Sử dụng khóa bảo mật là cách an toàn nhất để 2FA. Nhiều phím trong số này sử dụng tiêu chuẩn FIDO Universal 2nd Factor (U2F). [Tìm hiểu thêm về FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Xem thêm tại 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Gỡ cài đặt tiện ích mở rộng của trình duyệt {#uninstall-browser-extensions}

Các tiện ích mở rộng của trình duyệt, như tiện ích mở rộng của Chrome hoặc Tiện ích bổ sung dành cho Firefox, có thể cải thiện chức năng của trình duyệt nhưng cũng tiềm ẩn nhiều rủi ro. Theo mặc định, hầu hết các tiện ích mở rộng trình duyệt yêu cầu quyền truy cập để 'đọc và thay đổi dữ liệu trang web', cho phép chúng thực hiện hầu hết mọi thứ với dữ liệu của bạn. Các tiện ích mở rộng của Chrome luôn được cập nhật tự động, vì vậy, tiện ích mở rộng an toàn trước đây có thể cập nhật sau để bao gồm mã độc hại. Hầu hết các tiện ích mở rộng trình duyệt không cố lấy cắp dữ liệu của bạn, nhưng bạn nên biết rằng chúng có thể.

#### Giữ an toàn bằng cách: {#browser-extension-safety}

- Chỉ cài đặt tiện ích mở rộng trình duyệt từ các nguồn đáng tin cậy
- Xóa các tiện ích mở rộng trình duyệt không sử dụng
- Cài đặt cục bộ các tiện ích mở rộng của Chrome để ngừng tự động cập nhật (Nâng cao)

[Thông tin thêm về rủi ro của tiện ích mở rộng trình duyệt](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Đọc thêm {#further-reading}

### Bảo mật web {#reading-web-security}

- [Lên đến 3 triệu thiết bị bị nhiễm phần mềm độc hại từ các tiện ích bổ sung của Chrome và Edge](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Cách tạo mật khẩu mạnh — mà bạn sẽ không quên](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Khóa bảo mật là gì?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Bảo mật tiền mã hóa {#reading-crypto-security}

- [Bảo vệ bản thân và tài sản của bạn](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Các vấn đề bảo mật trong phần mềm giao tiếp tiền mã hóa thông thường](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Hướng dẫn bảo mật cho người mới bắt đầu và cả người thông minh nữa](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Bảo mật tiền mã hóa: Mật khẩu và xác thực](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Kiến thức về lừa đảo {#reading-scam-education}

- [Hướng dẫn: Cách nhận biết token lừa đảo](/guides/how-to-id-scam-tokens/)
- [Giữ an toàn: Các trò lừa đảo phổ biến](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Tránh lừa đảo](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Chuỗi Twitter về các email và tin nhắn lừa đảo tiền mã hóa phổ biến](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
