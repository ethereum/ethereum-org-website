---
title: Bảo mật Ethereum và phòng chống lừa đảo
description: Giữ an toàn trên Ethereum
lang: vi
---

Sự quan tâm ngày càng tăng đối với tiền mã hóa mang theo rủi ro ngày càng lớn từ những kẻ lừa đảo và tin tặc. Bài viết này trình bày một số phương pháp hay nhất để giảm thiểu những rủi ro này.

**Hãy nhớ: Không ai từ ethereum.org sẽ liên hệ với bạn. Đừng trả lời các email nói rằng họ đến từ bộ phận hỗ trợ chính thức của Ethereum.**

<Divider />

## Kiến thức cơ bản về bảo mật tiền mã hóa {#crypto-security}

### Nâng cao kiến thức của bạn {#level-up-your-knowledge}

Những hiểu lầm về cách hoạt động của tiền mã hóa có thể dẫn đến những sai lầm đắt giá. Ví dụ: nếu ai đó giả vờ là nhân viên dịch vụ khách hàng có thể trả lại ETH đã mất để đổi lấy khóa riêng tư của bạn, họ đang lợi dụng những người không hiểu rằng [Ethereum](/) là một mạng lưới phi tập trung không có loại chức năng này. Tự trang bị kiến thức về cách hoạt động của Ethereum là một khoản đầu tư xứng đáng.

<DocLink href="/what-is-ethereum/">
  Ethereum là gì?
</DocLink>

<DocLink href="/what-is-ether/">
  ether là gì?
</DocLink>
<Divider />

## Bảo mật ví {#wallet-security}

### Không bao giờ chia sẻ cụm từ khôi phục của bạn {#protect-private-keys}

**Không bao giờ, vì bất kỳ lý do gì, chia sẻ cụm từ khôi phục hoặc khóa riêng tư của bạn!**

Cụm từ khôi phục của bạn (còn được gọi là cụm từ khôi phục bí mật hoặc cụm từ hạt giống) là chìa khóa vạn năng cho ví của bạn. Bất kỳ ai có nó đều có thể truy cập vào tất cả các tài khoản của bạn và rút sạch mọi tài sản. Khóa riêng tư hoạt động theo cách tương tự đối với các tài khoản cá nhân. Không có dịch vụ, nhân viên hỗ trợ hoặc trang web hợp pháp nào sẽ yêu cầu bạn cung cấp những thông tin này.

<DocLink href="/wallets/">
  Ví Ethereum là gì?
</DocLink>

#### Không chụp ảnh màn hình cụm từ hạt giống/khóa riêng tư của bạn {#screenshot-private-keys}

Việc chụp ảnh màn hình cụm từ hạt giống hoặc khóa riêng tư của bạn có thể đồng bộ hóa chúng với nhà cung cấp dữ liệu đám mây, điều này có thể khiến tin tặc có thể truy cập được. Lấy khóa riêng tư từ đám mây là một phương thức tấn công phổ biến của tin tặc.

### Sử dụng ví phần cứng {#use-hardware-wallet}

Ví phần cứng cung cấp khả năng lưu trữ ngoại tuyến cho các khóa riêng tư. Chúng được coi là tùy chọn ví an toàn nhất để lưu trữ khóa riêng tư của bạn: khóa riêng tư của bạn không bao giờ tiếp xúc với internet và hoàn toàn nằm cục bộ trên thiết bị của bạn.

Việc giữ các khóa riêng tư ngoại tuyến làm giảm đáng kể rủi ro bị tấn công, ngay cả khi tin tặc giành được quyền kiểm soát máy tính của bạn.

#### Dùng thử ví phần cứng: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Kiểm tra kỹ các giao dịch trước khi gửi {#double-check-transactions}

Vô tình gửi tiền mã hóa đến sai địa chỉ ví là một sai lầm phổ biến. **Một giao dịch được gửi trên Ethereum là không thể đảo ngược.** Trừ khi bạn biết chủ sở hữu địa chỉ và có thể thuyết phục họ gửi lại tiền cho bạn, bạn sẽ không thể lấy lại tiền của mình.

Luôn đảm bảo địa chỉ bạn đang gửi đến khớp chính xác với địa chỉ của người nhận mong muốn trước khi gửi giao dịch.
Một thói quen tốt khi tương tác với hợp đồng thông minh là đọc thông điệp giao dịch trước khi ký.

### Đặt giới hạn chi tiêu của hợp đồng thông minh {#spend-limits}

Khi tương tác với các hợp đồng thông minh, không cho phép giới hạn chi tiêu không giới hạn. Việc chi tiêu không giới hạn có thể cho phép hợp đồng thông minh rút sạch ví của bạn. Thay vào đó, hãy đặt giới hạn chi tiêu chỉ ở mức cần thiết cho giao dịch.

Nhiều ví Ethereum cung cấp tính năng bảo vệ giới hạn để bảo vệ tài khoản khỏi bị rút sạch.

[Cách thu hồi quyền truy cập của hợp đồng thông minh vào quỹ tiền mã hóa của bạn](/guides/how-to-revoke-token-access/)

<Divider />

## Các trò lừa đảo phổ biến {#common-scams}

Không thể ngăn chặn hoàn toàn những kẻ lừa đảo, nhưng chúng ta có thể làm cho chúng bớt hiệu quả hơn bằng cách nhận thức được các kỹ thuật được sử dụng nhiều nhất của chúng. Có nhiều biến thể của những trò lừa đảo này, nhưng chúng thường tuân theo các mô hình cấp cao giống nhau. Nếu không có gì khác, hãy nhớ:

- luôn hoài nghi
- không ai sẽ cho bạn ETH miễn phí hoặc giảm giá
- không ai cần quyền truy cập vào khóa riêng tư hoặc thông tin cá nhân của bạn

### Lừa đảo qua quảng cáo trên Twitter {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Có một phương pháp giả mạo tính năng xem trước liên kết của Twitter (còn được gọi là X) (unfurling) để có khả năng đánh lừa người dùng nghĩ rằng họ đang truy cập một trang web hợp pháp. Kỹ thuật này khai thác cơ chế của Twitter để tạo bản xem trước của các URL được chia sẻ trong các tweet và hiển thị _từ ethereum.org_ chẳng hạn (như hình trên), trong khi thực tế họ đang bị chuyển hướng đến một trang web độc hại.

Luôn kiểm tra xem bạn có đang ở đúng miền hay không, đặc biệt là sau khi nhấp vào một liên kết.

[Thêm thông tin tại đây](https://harrydenley.com/faking-twitter-unfurling).

### Lừa đảo tặng quà (Giveaway) {#giveaway}

Một trong những trò lừa đảo phổ biến nhất trong tiền mã hóa là lừa đảo tặng quà. Trò lừa đảo tặng quà có thể có nhiều hình thức, nhưng ý tưởng chung là nếu bạn gửi ETH đến địa chỉ ví được cung cấp, bạn sẽ nhận lại được ETH của mình nhưng nhân đôi. *Vì lý do này, nó còn được gọi là trò lừa đảo 2 đổi 1.*

Những trò lừa đảo này thường quy định một khoảng thời gian giới hạn để yêu cầu nhận quà tặng nhằm tạo ra cảm giác cấp bách giả tạo.

### Tấn công mạng xã hội {#social-media-hacks}

Một phiên bản nổi tiếng của việc này đã xảy ra vào tháng 7 năm 2020, khi tài khoản Twitter của các tổ chức và người nổi tiếng bị tấn công. Tin tặc đã đồng thời đăng một chương trình tặng Bitcoin trên các tài khoản bị tấn công. Mặc dù các tweet lừa đảo đã nhanh chóng bị phát hiện và xóa, nhưng tin tặc vẫn tẩu thoát với 11 bitcoin (hoặc 500.000 đô la tính đến tháng 9 năm 2021).

![A scam on Twitter](./appleTwitterScam.png)

### Tặng quà từ người nổi tiếng {#celebrity-giveaway}

Tặng quà từ người nổi tiếng là một hình thức phổ biến khác của trò lừa đảo tặng quà. Những kẻ lừa đảo sẽ lấy một cuộc phỏng vấn video hoặc bài nói chuyện hội nghị đã được ghi lại của một người nổi tiếng và phát trực tiếp trên YouTube - làm cho nó có vẻ như người nổi tiếng đang thực hiện một cuộc phỏng vấn video trực tiếp để xác nhận một chương trình tặng tiền mã hóa.

Vitalik Buterin được sử dụng thường xuyên nhất trong trò lừa đảo này, nhưng nhiều người nổi tiếng khác liên quan đến tiền mã hóa cũng được sử dụng (ví dụ: Elon Musk hoặc Charles Hoskinson). Việc đưa một người nổi tiếng vào mang lại cho buổi phát trực tiếp của những kẻ lừa đảo cảm giác hợp pháp (điều này trông có vẻ mờ ám, nhưng Vitalik có liên quan, vì vậy chắc chắn là ổn!).

**Các chương trình tặng quà luôn là lừa đảo. Nếu bạn gửi tiền của mình vào các tài khoản này, bạn sẽ mất chúng vĩnh viễn.**

![A scam on YouTube](./youtubeScam.png)

### Lừa đảo hỗ trợ {#support-scams}

Tiền mã hóa là một công nghệ tương đối non trẻ và hay bị hiểu lầm. Một trò lừa đảo phổ biến lợi dụng điều này là lừa đảo hỗ trợ, trong đó những kẻ lừa đảo sẽ mạo danh nhân viên hỗ trợ cho các ví, sàn giao dịch hoặc blockchain phổ biến.

Phần lớn các cuộc thảo luận về Ethereum diễn ra trên Discord. Những kẻ lừa đảo hỗ trợ thường sẽ tìm thấy mục tiêu của chúng bằng cách tìm kiếm các câu hỏi hỗ trợ trong các kênh discord công khai và sau đó gửi cho người hỏi một tin nhắn riêng tư đề nghị hỗ trợ. Bằng cách xây dựng lòng tin, những kẻ lừa đảo hỗ trợ cố gắng lừa bạn tiết lộ khóa riêng tư hoặc gửi tiền vào ví của chúng.

![A support scam on Discord](./discordScam.png)

Theo nguyên tắc chung, nhân viên sẽ không bao giờ giao tiếp với bạn thông qua các kênh riêng tư, không chính thức. Một số điều đơn giản cần ghi nhớ khi giải quyết vấn đề hỗ trợ:

- Không bao giờ chia sẻ khóa riêng tư, cụm từ hạt giống hoặc mật khẩu của bạn
- Không bao giờ cho phép bất kỳ ai truy cập từ xa vào máy tính của bạn
- Không bao giờ giao tiếp bên ngoài các kênh được chỉ định của tổ chức

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Hãy cẩn thận: mặc dù các trò lừa đảo kiểu hỗ trợ thường xảy ra trên Discord, chúng cũng có thể phổ biến trên bất kỳ ứng dụng trò chuyện nào diễn ra cuộc thảo luận về tiền mã hóa, bao gồm cả email.
</AlertDescription>
</AlertContent>
</Alert>

### Lừa đảo token 'Eth2' {#eth2-token-scam}

Trong thời gian chuẩn bị cho [The Merge](/roadmap/merge/), những kẻ lừa đảo đã lợi dụng sự nhầm lẫn xung quanh thuật ngữ 'Eth2' để cố gắng khiến người dùng đổi ETH của họ lấy token 'ETH2'. Không có 'ETH2' và không có token hợp pháp nào khác được giới thiệu cùng với The Merge. ETH mà bạn sở hữu trước The Merge cũng chính là ETH hiện tại. **Không cần thực hiện bất kỳ hành động nào liên quan đến ETH của bạn để tính đến việc chuyển đổi từ Bằng chứng công việc (PoW) sang Bằng chứng cổ phần (PoS)**.

Những kẻ lừa đảo có thể xuất hiện dưới dạng "hỗ trợ", nói với bạn rằng nếu bạn nạp ETH của mình, bạn sẽ nhận lại được 'ETH2'. Không có [hỗ trợ chính thức của Ethereum](/community/support/) và không có token mới nào. Không bao giờ chia sẻ cụm từ hạt giống ví của bạn với bất kỳ ai.

_Lưu ý: Có các token/mã phái sinh có thể đại diện cho ETH được đặt cọc (ví dụ: rETH từ Rocket Pool, stETH từ Lido, ETH2 từ Coinbase), nhưng đây không phải là thứ bạn cần "di chuyển sang"._

### Lừa đảo tấn công giả mạo (Phishing) {#phishing-scams}

Lừa đảo tấn công giả mạo là một góc độ ngày càng phổ biến khác mà những kẻ lừa đảo sẽ sử dụng để cố gắng đánh cắp tiền trong ví của bạn.

Một số email lừa đảo yêu cầu người dùng nhấp vào các liên kết sẽ chuyển hướng họ đến các trang web giả mạo, yêu cầu họ nhập cụm từ hạt giống, đặt lại mật khẩu hoặc gửi ETH. Những kẻ khác có thể yêu cầu bạn vô tình cài đặt phần mềm độc hại để lây nhiễm vào máy tính của bạn và cấp cho những kẻ lừa đảo quyền truy cập vào các tệp trên máy tính của bạn.

Nếu bạn nhận được email từ một người gửi không xác định, hãy nhớ:

- Không bao giờ mở liên kết hoặc tệp đính kèm từ các địa chỉ email mà bạn không nhận ra
- Không bao giờ tiết lộ thông tin cá nhân hoặc mật khẩu của bạn cho bất kỳ ai
- Xóa email từ những người gửi không xác định

[Thêm thông tin về cách tránh lừa đảo tấn công giả mạo](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Lừa đảo môi giới giao dịch tiền mã hóa {#broker-scams}

Các nhà môi giới giao dịch tiền mã hóa lừa đảo tự nhận là các nhà môi giới tiền mã hóa chuyên nghiệp, những người sẽ đề nghị lấy tiền của bạn và đầu tư thay cho bạn. Sau khi kẻ lừa đảo nhận được tiền của bạn, chúng có thể dẫn dắt bạn, yêu cầu bạn gửi thêm tiền để bạn không bỏ lỡ các khoản lợi nhuận đầu tư tiếp theo, hoặc chúng có thể biến mất hoàn toàn.

Những kẻ lừa đảo này thường tìm mục tiêu bằng cách sử dụng các tài khoản giả mạo trên YouTube để bắt đầu các cuộc trò chuyện có vẻ tự nhiên về 'nhà môi giới'. Những cuộc trò chuyện này thường được ủng hộ (upvote) cao để tăng tính hợp pháp, nhưng tất cả các lượt ủng hộ đều đến từ các tài khoản bot.

**Đừng tin tưởng những người lạ trên internet để đầu tư thay cho bạn. Bạn sẽ mất tiền mã hóa của mình.**

![A trading broker scam on YouTube](./brokerScam.png)

### Lừa đảo nhóm khai thác tiền mã hóa {#mining-pool-scams}

Kể từ tháng 9 năm 2022, việc khai thác trên Ethereum không còn khả thi nữa. Tuy nhiên, các trò lừa đảo nhóm khai thác vẫn tồn tại. Các trò lừa đảo nhóm khai thác liên quan đến việc mọi người liên hệ với bạn mà không được yêu cầu và tuyên bố rằng bạn có thể kiếm được lợi nhuận lớn bằng cách tham gia một nhóm khai thác Ethereum. Kẻ lừa đảo sẽ đưa ra các tuyên bố và giữ liên lạc với bạn trong bao lâu tùy thích. Về cơ bản, kẻ lừa đảo sẽ cố gắng thuyết phục bạn rằng khi bạn tham gia một nhóm khai thác Ethereum, tiền mã hóa của bạn sẽ được sử dụng để tạo ETH và bạn sẽ được trả cổ tức bằng ETH. Sau đó, bạn sẽ thấy rằng tiền mã hóa của mình đang tạo ra lợi nhuận nhỏ. Đây chỉ đơn giản là mồi nhử để bạn đầu tư nhiều hơn. Cuối cùng, tất cả tiền của bạn sẽ được gửi đến một địa chỉ không xác định và kẻ lừa đảo sẽ biến mất hoặc trong một số trường hợp sẽ tiếp tục giữ liên lạc như đã xảy ra trong một trường hợp gần đây.

Điểm mấu chốt: hãy cảnh giác với những người liên hệ với bạn trên mạng xã hội yêu cầu bạn tham gia vào một nhóm khai thác. Một khi bạn mất tiền mã hóa của mình, nó sẽ biến mất.

Một số điều cần nhớ:

- Hãy cảnh giác với bất kỳ ai liên hệ với bạn về các cách kiếm tiền từ tiền mã hóa của bạn
- Hãy tự nghiên cứu về việc đặt cọc, các nhóm thanh khoản hoặc các cách đầu tư tiền mã hóa khác của bạn
- Hiếm khi, nếu có, những kế hoạch như vậy là hợp pháp. Nếu có, chúng có thể đã trở nên phổ biến và bạn sẽ nghe nói về chúng.

[Người đàn ông mất 200 nghìn đô la trong vụ lừa đảo nhóm khai thác](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Lừa đảo airdrop {#airdrop-scams}

Các trò lừa đảo airdrop liên quan đến một dự án lừa đảo airdrop một tài sản (NFT, token) vào ví của bạn và gửi bạn đến một trang web lừa đảo để yêu cầu nhận tài sản được airdrop. Bạn sẽ được nhắc đăng nhập bằng ví Ethereum của mình và "chấp thuận" một giao dịch khi cố gắng yêu cầu nhận. Giao dịch này xâm phạm tài khoản của bạn bằng cách gửi khóa công khai và khóa riêng tư của bạn cho kẻ lừa đảo. Một hình thức thay thế của trò lừa đảo này có thể yêu cầu bạn xác nhận một giao dịch gửi tiền vào tài khoản của kẻ lừa đảo.

[Thêm thông tin về lừa đảo airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Kiến thức cơ bản về bảo mật web {#web-security}

### Sử dụng mật khẩu mạnh {#use-strong-passwords}

[Hơn 80% các vụ hack tài khoản là do mật khẩu yếu hoặc bị đánh cắp](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Sự kết hợp dài của các ký tự, số và ký hiệu sẽ giúp giữ an toàn cho tài khoản của bạn.

Một sai lầm phổ biến là sử dụng sự kết hợp của một vài từ phổ biến, có liên quan. Những mật khẩu như thế này không an toàn vì chúng dễ bị tấn công bằng kỹ thuật hack gọi là tấn công từ điển (dictionary attack).

```md
Ví dụ về mật khẩu yếu: CuteFluffyKittens!

Ví dụ về mật khẩu mạnh: ymv\*azu.EAC8eyp8umf
```

Một sai lầm phổ biến khác là sử dụng mật khẩu có thể dễ dàng đoán được hoặc bị phát hiện thông qua [tấn công phi kỹ thuật (social engineering)](<https://wikipedia.org/wiki/Social_engineering_(security). Việc bao gồm tên thời con gái của mẹ bạn, tên của con cái hoặc thú cưng của bạn, hoặc ngày sinh trong mật khẩu của bạn sẽ làm tăng rủi ro bị tấn công.

#### Các phương pháp hay về mật khẩu: {#good-password-practices}

- Đặt mật khẩu dài nhất có thể theo sự cho phép của trình tạo mật khẩu hoặc biểu mẫu bạn đang điền
- Sử dụng hỗn hợp chữ hoa, chữ thường, số và ký hiệu
- Không sử dụng các chi tiết cá nhân, chẳng hạn như tên gia đình, trong mật khẩu của bạn
- Tránh các từ phổ biến

[Thêm thông tin về cách tạo mật khẩu mạnh](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Sử dụng mật khẩu duy nhất cho mọi thứ {#use-unique-passwords}

Một mật khẩu mạnh đã bị tiết lộ trong một vụ vi phạm dữ liệu không còn là mật khẩu mạnh nữa. Trang web [Have I Been Pwned](https://haveibeenpwned.com) cho phép bạn kiểm tra xem tài khoản của mình có liên quan đến bất kỳ vụ vi phạm dữ liệu công khai nào hay không. Nếu có, **hãy thay đổi những mật khẩu đó ngay lập tức**. Việc sử dụng mật khẩu duy nhất cho mỗi tài khoản làm giảm rủi ro tin tặc có quyền truy cập vào tất cả các tài khoản của bạn nếu một trong các mật khẩu của bạn bị xâm phạm.

### Sử dụng trình quản lý mật khẩu {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Việc sử dụng trình quản lý mật khẩu sẽ đảm nhận việc tạo các mật khẩu mạnh, duy nhất và ghi nhớ chúng! Chúng tôi <strong>đặc biệt</strong> khuyên bạn nên sử dụng một trình quản lý mật khẩu và hầu hết chúng đều miễn phí!
</AlertDescription>
</AlertContent>
</Alert>

Việc ghi nhớ các mật khẩu mạnh, duy nhất cho mọi tài khoản bạn có không phải là lý tưởng. Trình quản lý mật khẩu cung cấp một kho lưu trữ an toàn, được mã hóa cho tất cả các mật khẩu của bạn mà bạn có thể truy cập thông qua một mật khẩu chính mạnh. Chúng cũng đề xuất các mật khẩu mạnh khi đăng ký một dịch vụ mới, vì vậy bạn không cần phải tự tạo. Nhiều trình quản lý mật khẩu cũng sẽ cho bạn biết nếu bạn có liên quan đến một vụ vi phạm dữ liệu, cho phép bạn thay đổi mật khẩu trước bất kỳ cuộc tấn công độc hại nào.

![Example of using a password manager](./passwordManager.png)

#### Dùng thử trình quản lý mật khẩu: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Hoặc xem các [trình quản lý mật khẩu được đề xuất](https://www.privacytools.io/secure-password-manager) khác

### Sử dụng Xác thực hai yếu tố {#two-factor-authentication}

Đôi khi bạn có thể được yêu cầu xác thực danh tính của mình thông qua các bằng chứng duy nhất. Chúng được gọi là **các yếu tố**. Ba yếu tố chính là:

- Thứ bạn biết (chẳng hạn như mật khẩu hoặc câu hỏi bảo mật)
- Thứ thuộc về bạn (chẳng hạn như dấu vân tay hoặc máy quét mống mắt/khuôn mặt)
- Thứ bạn sở hữu (khóa bảo mật hoặc ứng dụng xác thực trên điện thoại của bạn)

Việc sử dụng **Xác thực hai yếu tố (2FA)** cung cấp thêm một *yếu tố bảo mật* cho các tài khoản trực tuyến của bạn. 2FA đảm bảo rằng chỉ có mật khẩu của bạn là không đủ để truy cập vào một tài khoản. Thông thường nhất, yếu tố thứ hai là một mã 6 chữ số ngẫu nhiên, được gọi là **mật khẩu một lần dựa trên thời gian (TOTP)**, mà bạn có thể truy cập thông qua một ứng dụng xác thực như Google Authenticator hoặc Authy. Chúng hoạt động như một yếu tố "thứ bạn sở hữu" vì hạt giống tạo ra mã định giờ được lưu trữ trên thiết bị của bạn.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Lưu ý: Việc sử dụng 2FA dựa trên SMS rất dễ bị <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">đánh cắp SIM (SIM jacking)</a> và không an toàn. Để có bảo mật tốt nhất, hãy sử dụng một dịch vụ như <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> hoặc <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Khóa bảo mật {#security-keys}

Khóa bảo mật là một loại 2FA tiên tiến và an toàn hơn. Khóa bảo mật là các thiết bị xác thực phần cứng vật lý hoạt động giống như các ứng dụng xác thực. Sử dụng khóa bảo mật là cách an toàn nhất để thực hiện 2FA. Nhiều khóa trong số này sử dụng tiêu chuẩn FIDO Universal 2nd Factor (U2F). [Tìm hiểu thêm về FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Xem thêm về 2FA:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Gỡ cài đặt các tiện ích mở rộng của trình duyệt {#uninstall-browser-extensions}

Các tiện ích mở rộng của trình duyệt, như tiện ích mở rộng của Chrome hoặc Tiện ích bổ sung (Add-ons) cho Firefox, có thể cải thiện chức năng của trình duyệt nhưng cũng đi kèm với rủi ro. Theo mặc định, hầu hết các tiện ích mở rộng của trình duyệt đều yêu cầu quyền truy cập để 'đọc và thay đổi dữ liệu trang web', cho phép chúng làm hầu hết mọi thứ với dữ liệu của bạn. Các tiện ích mở rộng của Chrome luôn được cập nhật tự động, vì vậy một tiện ích mở rộng an toàn trước đây có thể cập nhật sau đó để bao gồm mã độc. Hầu hết các tiện ích mở rộng của trình duyệt không cố gắng đánh cắp dữ liệu của bạn, nhưng bạn nên biết rằng chúng có thể làm như vậy.

#### Giữ an toàn bằng cách: {#browser-extension-safety}

- Chỉ cài đặt các tiện ích mở rộng của trình duyệt từ các nguồn đáng tin cậy
- Xóa các tiện ích mở rộng của trình duyệt không sử dụng
- Cài đặt cục bộ các tiện ích mở rộng của Chrome để dừng tự động cập nhật (Nâng cao)

[Thêm thông tin về rủi ro của các tiện ích mở rộng của trình duyệt](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Đọc thêm {#further-reading}

### Bảo mật web {#reading-web-security}

- [Lên đến 3 triệu thiết bị bị nhiễm phần mềm độc hại từ các tiện ích bổ sung của Chrome và Edge](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Cách tạo mật khẩu mạnh — Mà bạn sẽ không quên](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Khóa bảo mật là gì?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Bảo mật tiền mã hóa {#reading-crypto-security}

- [Bảo vệ bản thân và tiền của bạn](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Các vấn đề bảo mật trong phần mềm giao tiếp tiền mã hóa phổ biến](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Hướng dẫn bảo mật cho người mới bắt đầu và cả những người thông minh](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Bảo mật tiền mã hóa: Mật khẩu và Xác thực](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Giáo dục về lừa đảo {#reading-scam-education}

- [Hướng dẫn: Cách xác định token lừa đảo](/guides/how-to-id-scam-tokens/)
- [Giữ an toàn: Các trò lừa đảo phổ biến](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Tránh lừa đảo](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Chủ đề trên Twitter về các email và tin nhắn lừa đảo tấn công giả mạo tiền mã hóa phổ biến](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />