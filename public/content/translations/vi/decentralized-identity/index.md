---
title: "Định danh phi tập trung"
description: "Định danh phi tập trung là gì, và tại sao nó cần thiết?"
lang: vi
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: "Các hệ thống định danh truyền thống tập trung vào việc cấp, duy trì và kiểm soát các định danh của bạn."
summaryPoint2: "Danh tính phi tập trung loại bỏ sự phụ thuộc vào các bên tập trung thứ ba."
summaryPoint3: "Nhờ vào tiền mã hóa, người dùng giờ đây có các công cụ để phát hành, lưu giữ và kiểm soát các số định danh và chứng từ của riêng họ một lần nữa."
---

Danh tính làm nền tảng cho hầu như mọi phương diện trong cuộc sống của bạn ngày nay. Sử dụng các dịch vụ trực tuyến, mở tài khoản ngân hàng, bỏ phiếu trong cuộc bầu cử, mua tài sản, đảm bảo việc làm — tất cả những việc này đều yêu cầu chứng minh danh tính của bạn.

Tuy nhiên, các hệ thống quản lý danh tính truyền thống từ lâu đã dựa vào các bên trung gian tập trung để phát hành, nắm giữ và kiểm soát số nhận dạng cũng như [chứng thực](/glossary/#attestation) của bạn. Điều này có nghĩa là bạn không thể kiểm soát thông tin liên quan đến danh tính của mình hoặc quyết định ai có quyền truy cập vào thông tin nhận dạng cá nhân (CCCD/CMND) và mức độ mà các bên này được phép truy cập.

Để giải quyết những vấn đề này, chúng tôi có các hệ thống định danh phi tập trung được xây dựng trên chuỗi khối công khai như Ethereum. Danh tính phi tập trung cho phép các cá nhân quản lý thông tin liên quan đến danh tính của họ. Với các giải pháp danh tính phi tập trung, _bạn_ có thể tạo số nhận dạng, đồng thời yêu cầu và nắm giữ các chứng thực của mình mà không cần dựa vào các cơ quan trung ương, như nhà cung cấp dịch vụ hoặc chính phủ.

## Danh tính là gì? {#what-is-identity}

Danh tính nghĩa là những thông tin được dùng để gán riêng cho một đối tượng nhất định. Danh tính chỉ việc là một _cá nhân_, tức là một thực thể con người riêng biệt. Danh tính cũng có thể đại diện cho các thực thể không phải con người, chẳng hạn như một tổ chức hoặc cơ quan có thẩm quyền.

<YouTube id="Ew-_F-OtDFI" />

## Sổ định danh là gì? {#what-are-identifiers}

Sổ định danh là một phần thông tin hoạt động như một thiết bị truy xuất danh tính cụ thể. Sổ định danh thường bao gồm:

- Họ tên
- Số an sinh xã hội/mã số thuế
- Số điện thoại
- Ngày tháng năm và nơi sinh
- Danh tính kỹ thuật số, vd., địa chỉ email, usernames, avatars

Các ví dụ về sổ định danh này được cấp, nắm giữ và kiểm soát bởi các cơ quan quản lý trung ương. Bạn cần phải xin quyền từ chính phủ để được đổi tên hoặc từ một nền tảng truyền thông xã hội để thay đổi danh tính của bạn.

## Lợi ích của danh tính phi tập trung {#benefits-of-decentralized-identity}

1. Danh tính phi tập trung gia tăng quyền kiểm soát của cá nhân đối với thông tin danh tính. Định danh phi tập trung và chứng thực có thể được xác minh mà không phụ thuộc vào bên thẩm quyền tập trung hoặc dịch vụ bên thứ ba.

2. Các giải pháp danh tính phi tập trung tạo điều kiện cho một phương pháp không cần tin cậy, liền mạch và bảo vệ quyền riêng tư để xác minh và quản lý danh tính người dùng.

3. Danh tính phi tập trung khai thác công nghệ blockchain, giúp tạo niềm tin giữa các bên và cung cấp bảo đảm mật mã học để xác minh tính hợp lệ của chứng thực.

4. Danh tính phi tập trung làm dữ liệu danh tính di động. Người dùng trữ chứng thực và định danh trong ví điện thoại và có thể chia sẻ với bất kỳ bên nào mà họ chọn. Định danh phi tập trung và chứng thực không bị khóa trong cơ sở dữ liệu của bên phát hành.

5. Danh tính phi tập trung nên hoạt động tốt với các công nghệ [không kiến thức](/glossary/#zk-proof) mới nổi, cho phép các cá nhân chứng minh rằng họ sở hữu hoặc đã làm điều gì đó mà không cần tiết lộ đó là gì. Đây cũng có thể trở thành một hướng đi mạnh để kết hợp niềm tin và sự riêng tư cho các ứng dụng như bầu cử.

6. Danh tính phi tập trung cho phép các cơ chế [chống Sybil](/glossary/#anti-sybil) xác định khi một cá nhân đang giả làm nhiều người để lợi dụng hoặc spam một hệ thống nào đó.

## Các trường hợp sử dụng danh tính phi tập trung {#decentralized-identity-use-cases}

Danh tính phi tập trung có nhiều trường hợp sử dụng tiềm năng:

### 1. Đăng nhập chung {#universal-dapp-logins}

Danh tính phi tập trung có thể giúp thay thế việc đăng nhập bằng mật khẩu với phương pháp xác thực phi tập trung. Các bên cung cấp dịch vụ có thể phát hành chứng thực cho người dùng, thứ mà có thể được lữu trữ trong ví Ethereum. Một ví dụ về chứng thực sẽ là một [NFT](/glossary/#nft) cấp cho người nắm giữ quyền truy cập vào một cộng đồng trực tuyến.

Chức năng [Đăng nhập bằng Ethereum](https://siwe.xyz/) sau đó sẽ cho phép máy chủ xác nhận tài khoản Ethereum của người dùng và lấy chứng thực được yêu cầu từ địa chỉ tài khoản của họ. Điều này có nghĩa rằng người dùng có thể truy cập vào các nền tảng và trang web, mà không cần phải ghi nhớ những đoạn mật khẩu dài dòng, và cải thiện trải nghiệm người dùng.

### 2. Xác thực KYC {#kyc-authentication}

Dùng nhiều dịch vụ trên mạng yêu cầu các cá nhân phải cung cấp nhiều chứng thực và chứng minh, ví dụ như bằng lái xe hoặc hộ chiếu quốc gia. Nhưng hướng giải quyết này còn rắc rối vì thông tin người dùng cá nhân có thể bị chiếm đoạt và các bên cung cấp dịch vụ không thể xác minh được tính trung thực của chứng thực đó.

Danh tính phi tập trung cho phép các công ty bỏ qua các quy trình [Biết khách hàng của bạn (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) thông thường và xác thực danh tính người dùng thông qua Thông tin xác thực có thể xác minh. Điều này giảm thiểu chi phí quản lý danh tính và ngăn chặn sự lạm dụng giấy giờ giả.

### 3. Bỏ phiếu và cộng đồng trực tuyến {#voting-and-online-communities}

Bầu cử trên mạng và mạng xã hội là hai ứng dụng độc đáo cho danh tính phi tập trung. Hệ thống bầu cử trên mạng thường dễ bị thao túng, nhất là khi các thành phần xấu tạo ra nhiều danh tính giả để bầu cử. Việc yêu cầu các cá nhân trình bày chứng thực trên chuỗi có thể cải thiện tính toàn vẹn của các quy trình bỏ phiếu trực tuyến.

Danh tính phi tập trung có thể giúp tạo ra các cộng đồng trực tuyến mà không bị tràn lan các tài khoản giả. Ví dụ: mỗi người dùng có thể phải xác thực danh tính của mình bằng hệ thống danh tính trên chuỗi, như Dịch vụ Định danh Ethereum, để giảm khả năng có bot.

### 4. Bảo vệ chống tấn công Sybil {#sybil-protection}

Các ứng dụng cấp tài trợ sử dụng [bỏ phiếu bậc hai](/glossary/#quadratic-voting) dễ bị [tấn công Sybil](/glossary/#sybil-attack) vì giá trị của một khoản tài trợ sẽ tăng lên khi có nhiều cá nhân bỏ phiếu cho nó, điều này khuyến khích người dùng chia nhỏ các khoản đóng góp của họ qua nhiều danh tính. Danh tính phi tập trung giúp ngăn chặn điều này bằng cách gia tăng gánh nặng mà mỗi người tham gia phải chứng minh họ là người thật, dù thường là không phải tiết lộ thông tin cá nhân.

### 5. ID Quốc gia và Chính phủ {#national-and-government-id}

Các chính phủ có thể sử dụng các nguyên tắc của danh tính phi tập trung để phát hành các tài liệu nhận dạng nền tảng—chẳng hạn như ID quốc gia, hộ chiếu hoặc giấy phép lái xe—dưới dạng thông tin xác thực có thể xác minh trên Ethereum, cung cấp sự đảm bảo mạnh mẽ về tính xác thực bằng mật mã để giảm gian lận và giả mạo trong xác minh danh tính trực tuyến. Công dân có thể lưu trữ những chứng thực này trong [ví](/wallets/) cá nhân của họ và sử dụng chúng để chứng minh danh tính, tuổi tác hoặc quyền bỏ phiếu của mình.

Mô hình này cho phép tiết lộ có chọn lọc, đặc biệt khi kết hợp với công nghệ quyền riêng tư [bằng chứng không kiến thức (ZKP)](/zero-knowledge-proofs/). Ví dụ: một công dân có thể chứng minh bằng mật mã rằng họ trên 18 tuổi để truy cập một dịch vụ bị giới hạn độ tuổi mà không tiết lộ ngày sinh chính xác của họ, mang lại sự riêng tư cao hơn so với ID truyền thống.

#### 💡Nghiên cứu điển hình: ID kỹ thuật số quốc gia (NDI) của Bhutan trên Ethereum {#case-study-bhutan-ndi}

- Cung cấp quyền truy cập vào thông tin xác thực có thể xác minh cho gần 800.000 công dân của Bhutan
- Đã di chuyển từ mạng Polygon [sang mạng chính Ethereum](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) vào tháng 10 năm 2025
- Hơn [234.000 ID kỹ thuật số](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/) đã được cấp tính đến tháng 3 năm 2025

Vương quốc Bhutan đã [di chuyển hệ thống ID kỹ thuật số quốc gia (NDI)](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) sang Ethereum vào tháng 10 năm 2025. Được xây dựng trên các nguyên tắc về danh tính phi tập trung và danh tính tự chủ, hệ thống NDI của Bhutan sử dụng các số nhận dạng phi tập trung và thông tin xác thực có thể xác minh để cấp thông tin xác thực được ký kỹ thuật số trực tiếp vào ví cá nhân của công dân. Bằng cách neo các lược đồ nhà phát hành của những thông tin xác thực này trên Ethereum, hệ thống đảm bảo chúng là xác thực, chống giả mạo và có thể được xác minh bởi bất kỳ bên nào mà không cần truy vấn một cơ quan trung ương.

## Chứng thực là gì? {#what-are-attestations}

Chứng thực là một tuyên bố của một thực thể về một thực thể khác. Nếu bạn sống ở Hoa Kỳ, giấy phép lái xe do Nha lộ vận (một tổ chức) cấp cho bạn chứng nhận rằng bạn (một tổ chức khác) được phép lái xe ô tô một cách hợp pháp.

Chứng thực thì sẽ khác biệt so với sổ định danh. Một chứng thực _chứa_ các số nhận dạng để tham chiếu một danh tính cụ thể và đưa ra một tuyên bố về một thuộc tính liên quan đến danh tính này. Vậy, bằng lái xe của bạn có nhiều định danh (tên, ngày sinh, địa chỉ) nhưng cũng là thứ chứng thực quyền pháp lý của bạn để lái xe.

### Định danh phi tập trung là gì? {#what-are-decentralized-identifiers}

Định danh truyền thống như tên pháp lý hoặc địa chỉ email dựa vào các bên thứ ba - chính quyền và các bên cung cấp email. Định danh phi tập trung (DIDs) thì khác - Chúng không được phát hành, quản lý, hoặc kiểm soát bởi bất kỳ thực thể tập trung nào.

Định danh phi tập trung được phát hành, giữ, và kiểm soát bởi cá nhân. Một [tài khoản Ethereum](/glossary/#account) là một ví dụ về số nhận dạng phi tập trung. Bạn có thể tạo ra bao nhiêu tài khoản bạn muốn mà không cần sự cho phép của bất kỳ ai và không cần trữ chúng trong một trung tâm đăng ký.

Số nhận dạng phi tập trung được lưu trữ trên các sổ cái phân tán ([chuỗi khối](/glossary/#blockchain)) hoặc [mạng ngang hàng](/glossary/#peer-to-peer-network). Điều này làm cho các DID [trở nên duy nhất trên toàn cầu, có thể phân giải với tính sẵn sàng cao và có thể xác minh bằng mật mã](https://w3c-ccg.github.io/did-primer/). Một định danh phi tập trung có thể liên quan đến nhiều thực thể khác nhau, bao gồm con người, tổ chức cá nhân, hoặc chính quyền.

## Điều gì làm cho định danh phi tập trung khả thi? Điều gì làm cho số nhận dạng phi tập trung trở nên khả thi? {#what-makes-decentralized-identifiers-possible}

### 1. Mật mã học khóa công khai {#public-key-cryptography}

Mật mã học khóa công khai là một biện pháp bảo mật thông tin, tạo ra một [khóa công khai](/glossary/#public-key) và [khóa riêng tư](/glossary/#private-key) cho một thực thể. [Mật mã học](/glossary/#cryptography) khóa công khai được sử dụng trong các mạng chuỗi khối để xác thực danh tính người dùng và chứng minh quyền sở hữu tài sản kỹ thuật số.

Một số định danh phi tập trung, như tài khoản Ethereum, có khóa công khai và riêng tư. Khóa công khai xác định người kiểm soát tài khoản, trong khi khóa riêng tư có thể ký và mở khóa tin nhắn cho tài khoản đó. Mật mã học khóa công khai cung cấp các bằng chứng cần thiết để xác thực các thực thể và ngăn chặn việc mạo danh và sử dụng danh tính giả, sử dụng [chữ ký mật mã](https://andersbrownworth.com/blockchain/public-private-keys/) để xác minh tất cả các tuyên bố.

### 2. Kho dữ liệu phi tập trung {#decentralized-datastores}

Một blockchain hoạt động như là một trung tâm xác minh dữ liệu đăng ký: một kho lưu trữ thông tin mở, không cần đặt niềm tin vào ai, và phi tập trung. Sự tồn tại của blockchain công cộng loại bỏ nhu cầu lưu trữ định danh trong các trung tâm đăng ký tập trung.

Nếu ai đó cần xác minh tính hợp lệ của một định danh phi tập trung, họ có thể tìm khóa công khai liên quan trên blockchain. Điều này khác biệt với các định danh truyền thống mà cần các bên thứ ba xác minh.

## Bằng cách nào mà định danh phi tập trung và chứng thực hiện thực hóa danh tính phi tập trung? Số nhận dạng phi tập trung và chứng thực cho phép danh tính phi tập trung hoạt động như thế nào? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

Danh tính phi tập trung là một lý tưởng mà những thông tin liên quan đến danh tính nên được tự kiểm soát, riêng tư, và mang theo được, với các định danh phi tập trung và chứng thực là những viên gạch đầu tiên.

Trong bối cảnh danh tính phi tập trung, chứng thực (còn được gọi là [Thông tin xác thực có thể xác minh](https://www.w3.org/TR/vc-data-model/)) là các tuyên bố chống giả mạo, có thể xác minh bằng mật mã do bên phát hành đưa ra. Mọi chứng thực hoặc chứng minh xác thực mà một thực thể (ví dụ như một tổ chức) phát hành ra đều liên kết với DID của họ.

Bởi vì DID được lưu trữ trên blockchain, ai cũng có thể xác minh tính hợp lệ của một chứng thực bằng cách kiểm tra chéo DID của người phát hành trên Ethereum. Về căn bản, blockchain Ethereum hoạt động như một sổ danh bạ toàn cầu mà giúp xác minh các DID liên quan đến các thực tế nhất định.

Định danh phi tập trung là lí do mà chứng thực được tự kiểm soát và xác minh được. Cho dù người phát hành không tồn tại nữa, người nắm giữ luôn có chứng cứ về nguồn gốc và tính hợp lệ của chứng thực đó.

Định danh phi tập trung cũng rất thiết yếu với sự riêng tư của thông tin cá nhân thông qua danh tính phi tập trung. Ví dụ như, nếu một cá nhân nộp bằng chứng của một chứng thực (một giấy phép lái xe), thì bên xác minh không cần phải kiểm tra tính hợp lệ của thông tin trong bằng chứng đó. Tuy nhiên, người xác minh chỉ cần xem các bảo đảm mật mã về tính xác thực của chứng thực đó và danh tính của bên đang phát hành để xác định xem chứng cứ có hợp lệ không.

## Các loại chứng thực trong danh tính phi tập trung {#types-of-attestations-in-decentralized-identity}

Cách thông tin chứng thực được lưu trữ và tìm lấy trong hệ sinh thái danh tính Ethereum khác với cách quản lý danh tính truyền thống. Đây là khái quát về nhiều phương pháp phát hành, lưu trữ, và xác minh chứng thực trong hệ thống danh tính phi tập trung:

### Chứng thực ngoài chuỗi {#offchain-attestations}

Một mối lo ngại khi lưu trữ chứng thực trên chuỗi là chúng có thể chứa thông tin mà các cá nhân muốn giữ riêng tư. Bản tính công khai của blockchain Ethereum làm cho việc lưu trữ chứng thực không hay lắm.

Giải pháp là phát hành chứng thực, được người dùng giữ ngoài chuỗi trong ví kỹ thuật số, nhưng được ký bằng DID của bên phát hành được lưu trữ trên chuỗi. Các chứng thực này được mã hóa dưới dạng [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) và chứa chữ ký số của bên phát hành—điều này cho phép dễ dàng xác minh các tuyên bố ngoài chuỗi.

Đây là một kịch bản giả định để giải thích về chứng thực ngoài chuỗi:

1. Một trường đại học (bên phát hành) tạo ra một chứng thực (một chứng nhận học thuật số), ký với khóa của họ, và phân phối nó cho Bob (chủ sở hữu danh tính).

2. Bob nộp đơn cho 1 vị trí công việc và muốn đưa chứng chỉ học thuật của anh ấy tới nhà tuyển dụng, nên anh ấy chia sẻ chứng thực từ ví di động của mình. Công ty đó (bên xác nhận) sau đó có thể xác nhận tính hợp lệ của chứng thực đó bằng việc kiểm tra DID của bên phát hành (khóa công khai của nó trên Ethereum).

### Chứng thực ngoài chuỗi với quyền truy cập liên tục {#offchain-attestations-with-persistent-access}

Theo cơ chế này, các chứng thực được chuyển đổi thành các tệp JSON và được lưu trữ ngoài chuỗi (lý tưởng nhất là trên một nền tảng [lưu trữ đám mây phi tập trung](/developers/docs/storage/), chẳng hạn như IPFS hoặc Swarm). Tuy nhiên, một [hàm băm](/glossary/#hash) của tệp JSON được lưu trữ trên chuỗi và được liên kết với một DID thông qua một sổ đăng ký trên chuỗi. DID liên quan có thể một là thuộc quyền sở hữu của bên phát hành chứng thực hoặc là của bên nhận.

Phương thức này cho phép chứng thực hưởng tính bền vững blockchain, trong khi giữ thông tin về các yêu cầu mã hóa và xác minh được. Nó cũng cho phép công khai chọn lọc vì chủ sở hữu của khóa tư có thể giải mã thông tin đó.

### Chứng thực trên chuỗi {#onchain-attestations}

Chứng thực trên chuỗi được giữ trong [hợp đồng thông minh](/glossary/#smart-contract) trên chuỗi khối Ethereum. Hợp đồng thông minh (đóng vai trò là một sổ đăng ký) sẽ ánh xạ một chứng thực tới một số nhận dạng phi tập trung trên chuỗi tương ứng (một khóa công khai).

Đây là một ví dụ để cho thấy cách chứng thực trên chuỗi có thể hoạt động trong thực tế:

1. Một công ty (XYZ Corp) lên kế hoạch bán cổ phần sở hữu dùng một hợp đồng thông minh nhưng chỉ muốn người mua mà đã hoàn thành một bài kiểm tra lý lịch.

2. XYZ Corp có thể yêu cầu công ty thực hiện kiểm tra lý lịch để phát hành chứng thực trên chuỗi trên Ethereum. Chứng thực này xác nhận rằng một cá nhân đã vượt qua bài kiểm tra lý lịch mà không để lộ thông tin cá nhân nào.

3. Hợp đồng thông minh bán cổ phần có thể kiểm tra hợp đồng đăng ký các danh tính của người mua được duyệt, cho phép hợp đồng thông minh xác định ai có quyền mua có quyền mua cổ phần.

### Token soulbound và danh tính {#soulbound}

[Token soulbound](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([NFT không thể chuyển nhượng](/glossary/#nft)) có thể được sử dụng để thu thập thông tin dành riêng cho một ví cụ thể. Điều này tạo ra một danh tính trên chuỗi duy nhất được ràng buộc với một địa chỉ Ethereum cụ thể, có thể bao gồm các token đại diện cho thành tích (ví dụ: hoàn thành một khóa học trực tuyến cụ thể hoặc vượt qua một ngưỡng điểm trong trò chơi) hoặc sự tham gia cộng đồng.

## Sử dụng danh tính phi tập trung {#use-decentralized-identity}

Có nhiều dự án đầy hoài bão đang sử dụng Ethereum làm nền tảng cho giải pháp danh tính phi tập trung:

- **[Dịch vụ Định danh Ethereum (ENS)](https://ens.domains/)** - _Một hệ thống đặt tên phi tập trung cho các số nhận dạng trên chuỗi, máy có thể đọc được, chẳng hạn như địa chỉ ví Ethereum, hàm băm nội dung và siêu dữ liệu._
- **[Đăng nhập bằng Ethereum (SIWE)](https://siwe.xyz/)** - _Tiêu chuẩn mở để xác thực bằng tài khoản Ethereum._
- **[SpruceID](https://www.spruceid.com/)** - _Một dự án danh tính phi tập trung cho phép người dùng kiểm soát danh tính kỹ thuật số bằng tài khoản Ethereum và hồ sơ ENS thay vì dựa vào các dịch vụ của bên thứ ba._
- **[Dịch vụ chứng thực Ethereum (EAS)](https://attest.org/)** - _Một sổ cái/giao thức phi tập trung để tạo các chứng thực trên chuỗi hoặc ngoài chuỗi về bất cứ điều gì._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (hay PoH) là một hệ thống xác minh danh tính xã hội được xây dựng trên Ethereum._
- **[Veramo](https://veramo.io/)** - _Một framework JavaScript giúp mọi người dễ dàng sử dụng dữ liệu có thể xác minh bằng mật mã trong các ứng dụng của họ._

## Đọc thêm {#further-reading}

### Bài viết {#articles}

- [Các trường hợp sử dụng Blockchain: Blockchain trong nhận dạng kỹ thuật số](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [Ethereum ERC725 là gì? Quản lý danh tính tự chủ trên Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Cách Blockchain có thể giải quyết vấn đề nhận dạng kỹ thuật số](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Danh tính phi tập trung là gì và tại sao bạn nên quan tâm?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Giới thiệu về danh tính phi tập trung](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Video {#videos}

- [Danh tính phi tập trung (Phiên phát trực tiếp thưởng)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Một video giải thích tuyệt vời về danh tính phi tập trung của Andreas Antonopolous_
- [Đăng nhập bằng Ethereum và danh tính phi tập trung với Ceramic, IDX, React và 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Hướng dẫn trên YouTube về cách xây dựng hệ thống quản lý danh tính để tạo, đọc và cập nhật hồ sơ người dùng bằng ví Ethereum của họ của Nader Dabit_
- [BrightID - Danh tính phi tập trung trên Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Tập podcast của Bankless thảo luận về BrightID, một giải pháp danh tính phi tập trung cho Ethereum_
- [Internet ngoài chuỗi: Danh tính phi tập trung & Thông tin xác thực có thể xác minh](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Bài thuyết trình tại EthDenver 2022 của Evin McMullen
- [Giải thích về thông tin xác thực có thể xác minh](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Video giải thích trên YouTube có bản demo của Tamino Baumann

### Cộng đồng {#communities}

- [Liên minh ERC-725 trên GitHub](https://github.com/erc725alliance) — _Những người ủng hộ tiêu chuẩn ERC725 để quản lý danh tính trên chuỗi khối Ethereum_
- [Máy chủ Discord của EthID](https://discord.com/invite/ZUyG3mSXFD) — _Cộng đồng dành cho những người đam mê và nhà phát triển làm việc với Đăng nhập bằng Ethereum và Giao thức theo dõi Ethereum_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Một cộng đồng các nhà phát triển đóng góp xây dựng một khuôn khổ cho dữ liệu có thể xác minh cho các ứng dụng_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _Một cộng đồng các nhà phát triển và nhà xây dựng làm việc về các trường hợp sử dụng danh tính phi tập trung trong các ngành khác nhau_
