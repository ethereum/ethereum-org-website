---
title: "Giá trị có thể trích xuất tối đa (MEV)"
description: "Giới thiệu về giá trị có thể trích xuất tối đa (MEV)"
lang: vi
---

Giá trị có thể trích xuất tối đa (MEV) đề cập đến giá trị tối đa có thể được trích xuất từ việc sản xuất khối vượt quá phần thưởng khối tiêu chuẩn và phí gas bằng cách bao gồm, loại trừ và thay đổi thứ tự của các giao dịch trong một khối.

## Giá trị có thể trích xuất tối đa {#maximal-extractable-value}

Giá trị có thể trích xuất tối đa lần đầu tiên được áp dụng trong bối cảnh [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/), và ban đầu được gọi là "giá trị có thể trích xuất của thợ đào". Điều này là do trong Bằng chứng công việc (PoW), thợ đào kiểm soát việc bao gồm, loại trừ và sắp xếp giao dịch. Tuy nhiên, kể từ khi chuyển sang Bằng chứng cổ phần (PoS) thông qua [The Merge](/roadmap/merge), các trình xác thực đã chịu trách nhiệm cho những vai trò này và việc khai thác không còn là một phần của Giao thức [Ethereum](/). Mặc dù vậy, các phương pháp trích xuất giá trị vẫn tồn tại, do đó thuật ngữ "Giá trị có thể trích xuất tối đa" hiện được sử dụng thay thế.

## Điều kiện tiên quyết {#prerequisites}

Đảm bảo bạn đã quen thuộc với [giao dịch](/developers/docs/transactions/), [khối](/developers/docs/blocks/), [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos) và [Gas](/developers/docs/gas/). Việc làm quen với [ứng dụng phi tập trung (dapp)](/apps/) và [tài chính phi tập trung (DeFi)](/defi/) cũng rất hữu ích.

## Trích xuất MEV {#mev-extraction}

Về lý thuyết, MEV hoàn toàn thuộc về các trình xác thực vì họ là bên duy nhất có thể đảm bảo việc thực thi một cơ hội MEV sinh lời. Tuy nhiên, trên thực tế, một phần lớn MEV được trích xuất bởi những người tham gia mạng lưới độc lập được gọi là "người tìm kiếm". Người tìm kiếm chạy các thuật toán phức tạp trên dữ liệu Chuỗi khối để phát hiện các cơ hội MEV sinh lời và có các bot để tự động gửi các giao dịch sinh lời đó lên mạng lưới.

Dù sao thì các trình xác thực cũng nhận được một phần của toàn bộ số tiền MEV vì người tìm kiếm sẵn sàng trả phí gas cao (phần này thuộc về trình xác thực) để đổi lấy khả năng cao hơn các giao dịch sinh lời của họ được đưa vào một khối. Giả sử người tìm kiếm có lý trí về mặt kinh tế, phí gas mà người tìm kiếm sẵn sàng trả sẽ là một số tiền lên tới 100% MEV của người tìm kiếm (bởi vì nếu phí gas cao hơn, người tìm kiếm sẽ bị lỗ).

Với điều đó, đối với một số cơ hội MEV có tính cạnh tranh cao, chẳng hạn như [kinh doanh chênh lệch giá trên DEX](#mev-examples-dex-arbitrage), người tìm kiếm có thể phải trả 90% hoặc thậm chí nhiều hơn tổng doanh thu MEV của họ dưới dạng phí gas cho trình xác thực vì có quá nhiều người muốn chạy cùng một giao dịch chênh lệch giá sinh lời. Điều này là do cách duy nhất để đảm bảo rằng giao dịch chênh lệch giá của họ được chạy là nếu họ gửi giao dịch với giá gas cao nhất.

### Tối ưu hóa gas (Gas golfing) {#mev-extraction-gas-golfing}

Động lực này đã làm cho việc giỏi "gas golfing" — lập trình các giao dịch sao cho chúng sử dụng ít Gas nhất — trở thành một lợi thế cạnh tranh, bởi vì nó cho phép người tìm kiếm đặt giá gas cao hơn trong khi vẫn giữ nguyên tổng phí gas của họ (vì phí gas = giá gas \* lượng gas sử dụng).

Một vài kỹ thuật gas golf nổi tiếng bao gồm: sử dụng các Địa chỉ bắt đầu bằng một chuỗi dài các số không (ví dụ: [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) vì chúng chiếm ít không gian hơn (và do đó tốn ít Gas hơn) để lưu trữ; và để lại số dư token [ERC-20](/developers/docs/standards/tokens/erc-20/) nhỏ trong các hợp đồng, vì việc khởi tạo một khe lưu trữ (trường hợp số dư là 0) tốn nhiều Gas hơn so với việc cập nhật một khe lưu trữ. Việc tìm kiếm thêm các kỹ thuật để giảm mức sử dụng Gas là một lĩnh vực nghiên cứu tích cực của những người tìm kiếm.

### Các bot chạy trước tổng quát (Generalized frontrunners) {#mev-extraction-generalized-frontrunners}

Thay vì lập trình các thuật toán phức tạp để phát hiện các cơ hội MEV sinh lời, một số người tìm kiếm chạy các bot chạy trước tổng quát (generalized frontrunners). Các bot chạy trước tổng quát là những bot theo dõi mempool để phát hiện các giao dịch sinh lời. Bot chạy trước sẽ sao chép mã của giao dịch có khả năng sinh lời, thay thế các Địa chỉ bằng Địa chỉ của bot chạy trước và chạy giao dịch cục bộ để kiểm tra lại xem giao dịch đã sửa đổi có mang lại lợi nhuận cho Địa chỉ của bot chạy trước hay không. Nếu giao dịch thực sự sinh lời, bot chạy trước sẽ gửi giao dịch đã sửa đổi với Địa chỉ được thay thế và giá gas cao hơn, "chạy trước" giao dịch ban đầu và lấy MEV của người tìm kiếm ban đầu.

### Flashbots {#mev-extraction-flashbots}

Flashbots là một dự án độc lập mở rộng các máy khách thực thi với một dịch vụ cho phép người tìm kiếm gửi các giao dịch MEV cho các trình xác thực mà không tiết lộ chúng cho mempool công khai. Điều này ngăn chặn các giao dịch bị chạy trước bởi các bot chạy trước tổng quát.

## Các ví dụ về MEV {#mev-examples}

MEV xuất hiện trên Chuỗi khối theo một vài cách.

### Kinh doanh chênh lệch giá trên DEX {#mev-examples-dex-arbitrage}

Kinh doanh chênh lệch giá trên [sàn giao dịch phi tập trung](/glossary/#dex) (DEX) là cơ hội MEV đơn giản và nổi tiếng nhất. Do đó, nó cũng là cơ hội cạnh tranh nhất.

Nó hoạt động như thế này: nếu hai DEX đang cung cấp một token ở hai mức giá khác nhau, ai đó có thể mua token trên DEX có giá thấp hơn và bán nó trên DEX có giá cao hơn trong một giao dịch nguyên tử duy nhất. Nhờ vào cơ chế của Chuỗi khối, đây là hoạt động kinh doanh chênh lệch giá thực sự, không có rủi ro.

[Đây là một ví dụ](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) về một giao dịch chênh lệch giá sinh lời, trong đó một người tìm kiếm đã biến 1.000 ETH thành 1.045 ETH bằng cách tận dụng sự khác biệt về giá của cặp ETH/DAI trên Uniswap so với Sushiswap.

### Thanh lý {#mev-examples-liquidations}

Việc thanh lý trên các Giao thức cho vay mang đến một cơ hội MEV nổi tiếng khác.

Các Giao thức cho vay như Maker và Aave yêu cầu người dùng gửi một số tài sản thế chấp (ví dụ: ETH). Tài sản thế chấp được gửi này sau đó được sử dụng để cho những người dùng khác vay.

Người dùng sau đó có thể vay mượn tài sản và token từ những người khác tùy thuộc vào những gì họ cần (ví dụ: bạn có thể vay MKR nếu bạn muốn bỏ phiếu trong một đề xuất Quản trị của MakerDAO) lên đến một tỷ lệ phần trăm nhất định của tài sản thế chấp đã gửi của họ. Ví dụ: nếu số tiền vay tối đa là 30%, một người dùng gửi 100 DAI vào Giao thức có thể vay mượn một tài sản khác trị giá lên đến 30 DAI. Giao thức xác định tỷ lệ phần trăm sức mua chính xác.

Khi giá trị tài sản thế chấp của người vay biến động, sức mua của họ cũng biến động theo. Nếu do biến động thị trường, giá trị của các tài sản đã vay vượt quá, giả sử là 30% giá trị tài sản thế chấp của họ (một lần nữa, tỷ lệ phần trăm chính xác được xác định bởi Giao thức), Giao thức thường cho phép bất kỳ ai thanh lý tài sản thế chấp, ngay lập tức trả nợ cho những người cho vay (điều này tương tự như cách [lệnh gọi ký quỹ (margin calls)](https://www.investopedia.com/terms/m/margincall.asp) hoạt động trong tài chính truyền thống). Nếu bị thanh lý, người vay thường phải trả một khoản phí thanh lý khổng lồ, một phần trong số đó thuộc về người thanh lý — đây chính là lúc cơ hội MEV xuất hiện.

Người tìm kiếm cạnh tranh để phân tích dữ liệu Chuỗi khối càng nhanh càng tốt nhằm xác định người vay nào có thể bị thanh lý và là người đầu tiên gửi giao dịch thanh lý để thu phí thanh lý cho chính họ.

### Giao dịch kẹp (Sandwich trading) {#mev-examples-sandwich-trading}

Giao dịch kẹp là một phương pháp trích xuất MEV phổ biến khác.

Để thực hiện giao dịch kẹp, một người tìm kiếm sẽ theo dõi mempool để tìm các giao dịch DEX lớn. Ví dụ: giả sử ai đó muốn mua 10.000 UNI bằng DAI trên Uniswap. Một giao dịch ở quy mô này sẽ có tác động đáng kể đến cặp UNI/DAI, có khả năng làm tăng đáng kể giá của UNI so với DAI.

Một người tìm kiếm có thể tính toán tác động giá gần đúng của giao dịch lớn này đối với cặp UNI/DAI và thực hiện một lệnh mua tối ưu ngay _trước_ giao dịch lớn, mua UNI với giá rẻ, sau đó thực hiện một lệnh bán ngay _sau_ giao dịch lớn, bán nó với giá cao hơn do lệnh lớn gây ra.

Tuy nhiên, giao dịch kẹp rủi ro hơn vì nó không mang tính nguyên tử (không giống như kinh doanh chênh lệch giá trên DEX, như được mô tả ở trên) và dễ bị [tấn công salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV trên NFT {#mev-examples-nfts}

MEV trong không gian NFT là một hiện tượng mới nổi và không nhất thiết phải sinh lời.

Tuy nhiên, vì các giao dịch NFT diễn ra trên cùng một Chuỗi khối được chia sẻ bởi tất cả các giao dịch Ethereum khác, người tìm kiếm cũng có thể sử dụng các kỹ thuật tương tự như những kỹ thuật được sử dụng trong các cơ hội MEV truyền thống trong thị trường NFT.

Ví dụ: nếu có một đợt phát hành NFT phổ biến và một người tìm kiếm muốn một NFT hoặc một bộ NFT nhất định, họ có thể lập trình một giao dịch sao cho họ là người đầu tiên xếp hàng để mua NFT, hoặc họ có thể mua toàn bộ bộ NFT trong một giao dịch duy nhất. Hoặc nếu một NFT bị [niêm yết nhầm với giá thấp](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), một người tìm kiếm có thể chạy trước những người mua khác và chộp lấy nó với giá rẻ.

Một ví dụ nổi bật về MEV trên NFT đã xảy ra khi một người tìm kiếm chi 7 triệu đô la để [mua](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) mọi Cryptopunk ở mức giá sàn. Một nhà nghiên cứu Chuỗi khối đã [giải thích trên Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) cách người mua làm việc với một nhà cung cấp MEV để giữ bí mật việc mua hàng của họ.

### Đuôi dài (The long tail) {#mev-examples-long-tail}

Kinh doanh chênh lệch giá trên DEX, thanh lý và giao dịch kẹp đều là những cơ hội MEV rất nổi tiếng và khó có khả năng sinh lời cho những người tìm kiếm mới. Tuy nhiên, có một "đuôi dài" các cơ hội MEV ít được biết đến hơn (MEV trên NFT được cho là một cơ hội như vậy).

Những người tìm kiếm mới bắt đầu có thể tìm thấy nhiều thành công hơn bằng cách tìm kiếm MEV trong phần đuôi dài này. [Bảng công việc MEV](https://github.com/flashbots/mev-job-board) của Flashbots liệt kê một số cơ hội mới nổi.

## Tác động của MEV {#effects-of-mev}

MEV không hoàn toàn xấu — có cả những hậu quả tích cực và tiêu cực đối với MEV trên Ethereum.

### Mặt tốt {#effects-of-mev-the-good}

Nhiều dự án tài chính phi tập trung (DeFi) dựa vào các tác nhân có lý trí về mặt kinh tế để đảm bảo tính hữu dụng và sự ổn định của các Giao thức của họ. Ví dụ: kinh doanh chênh lệch giá trên DEX đảm bảo rằng người dùng nhận được giá tốt nhất, chính xác nhất cho các token của họ và các Giao thức cho vay dựa vào việc thanh lý nhanh chóng khi người vay giảm xuống dưới tỷ lệ thế chấp để đảm bảo người cho vay được trả lại tiền.

Nếu không có những người tìm kiếm có lý trí tìm kiếm và khắc phục những điểm kém hiệu quả về kinh tế cũng như tận dụng các ưu đãi kinh tế của Giao thức, các Giao thức DeFi và ứng dụng phi tập trung (dapp) nói chung có thể không mạnh mẽ như ngày nay.

### Mặt xấu {#effects-of-mev-the-bad}

Ở lớp ứng dụng, một số hình thức MEV, như giao dịch kẹp, dẫn đến trải nghiệm tồi tệ hơn rõ rệt cho người dùng. Những người dùng bị kẹp phải đối mặt với tình trạng trượt giá gia tăng và việc thực thi giao dịch của họ kém hơn.

Ở lớp mạng lưới, các bot chạy trước tổng quát và các cuộc đấu giá giá gas mà chúng thường tham gia (khi hai hoặc nhiều bot chạy trước cạnh tranh để giao dịch của chúng được đưa vào khối tiếp theo bằng cách tăng dần giá gas cho các giao dịch của chính chúng) dẫn đến tắc nghẽn mạng lưới và giá gas cao cho tất cả những người khác đang cố gắng chạy các giao dịch thông thường.

Vượt ra ngoài những gì đang xảy ra _bên trong_ các khối, MEV có thể có những tác động có hại _giữa_ các khối. Nếu MEV có sẵn trong một khối vượt quá đáng kể phần thưởng khối tiêu chuẩn, các trình xác thực có thể được khuyến khích tổ chức lại chuỗi các khối và tự mình chiếm lấy MEV, gây ra việc tổ chức lại chuỗi khối và sự mất ổn định của đồng thuận.

Khả năng tổ chức lại chuỗi khối này đã được [khám phá trước đây trên Chuỗi khối Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Khi phần thưởng khối của Bitcoin giảm một nửa và phí giao dịch chiếm một phần ngày càng lớn trong phần thưởng khối, các tình huống phát sinh trong đó việc thợ đào từ bỏ phần thưởng của khối tiếp theo và thay vào đó khai thác lại các khối trong quá khứ với mức phí cao hơn trở nên hợp lý về mặt kinh tế. Với sự phát triển của MEV, tình huống tương tự có thể xảy ra trong Ethereum, đe dọa tính toàn vẹn của Chuỗi khối.

## Trạng thái của MEV {#state-of-mev}

Việc trích xuất MEV đã bùng nổ vào đầu năm 2021, dẫn đến giá gas cực kỳ cao trong vài tháng đầu năm. Sự xuất hiện của rơ-le MEV của Flashbots đã làm giảm hiệu quả của các bot chạy trước tổng quát và đã đưa các cuộc đấu giá giá gas ra ngoài chuỗi, làm giảm giá gas cho người dùng thông thường.

Mặc dù nhiều người tìm kiếm vẫn đang kiếm được nhiều tiền từ MEV, nhưng khi các cơ hội trở nên nổi tiếng hơn và ngày càng có nhiều người tìm kiếm cạnh tranh cho cùng một cơ hội, các trình xác thực sẽ chiếm được ngày càng nhiều tổng doanh thu MEV (bởi vì cùng một loại đấu giá gas như được mô tả ban đầu ở trên cũng xảy ra trong Flashbots, mặc dù là riêng tư, và các trình xác thực sẽ chiếm được doanh thu gas từ đó). MEV cũng không phải là duy nhất đối với Ethereum, và khi các cơ hội trở nên cạnh tranh hơn trên Ethereum, những người tìm kiếm đang chuyển sang các Chuỗi khối thay thế như Binance Smart Chain, nơi tồn tại các cơ hội MEV tương tự như trên Ethereum với ít sự cạnh tranh hơn.

Mặt khác, quá trình chuyển đổi từ Bằng chứng công việc (PoW) sang Bằng chứng cổ phần (PoS) và nỗ lực không ngừng để mở rộng quy mô Ethereum bằng cách sử dụng các bản cuộn đều thay đổi bối cảnh MEV theo những cách vẫn còn hơi chưa rõ ràng. Vẫn chưa biết rõ việc có những người đề xuất khối được đảm bảo biết trước một chút sẽ thay đổi động lực trích xuất MEV như thế nào so với mô hình xác suất trong Bằng chứng công việc (PoW) hoặc điều này sẽ bị phá vỡ như thế nào khi [bầu cử người lãnh đạo bí mật duy nhất (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) và [công nghệ trình xác thực phân tán (DVT)](/staking/dvt/) được triển khai. Tương tự như vậy, vẫn còn phải xem những cơ hội MEV nào tồn tại khi hầu hết hoạt động của người dùng được chuyển khỏi Ethereum và sang các bản cuộn lớp 2 (l2) và các phân đoạn của nó.

## MEV trong Bằng chứng cổ phần (PoS) của Ethereum {#mev-in-ethereum-proof-of-stake}

Như đã giải thích, MEV có những tác động tiêu cực đến trải nghiệm tổng thể của người dùng và bảo mật của lớp đồng thuận. Nhưng quá trình chuyển đổi của Ethereum sang đồng thuận Bằng chứng cổ phần (PoS) (được gọi là “The Merge”) có khả năng gây ra những rủi ro mới liên quan đến MEV:

### Sự tập trung hóa trình xác thực {#validator-centralization}

Trong Ethereum sau The Merge, các trình xác thực (đã thực hiện đặt cọc bảo mật 32 ETH) đi đến đồng thuận về tính hợp lệ của các khối được thêm vào Chuỗi Beacon. Vì 32 ETH có thể nằm ngoài tầm với của nhiều người, [tham gia một nhóm đặt cọc](/staking/pools/) có thể là một lựa chọn khả thi hơn. Tuy nhiên, sự phân bổ lành mạnh của [những người đặt cọc độc lập](/staking/solo/) là lý tưởng, vì nó giảm thiểu sự tập trung hóa của các trình xác thực và cải thiện bảo mật của Ethereum.

Tuy nhiên, việc trích xuất MEV được cho là có khả năng đẩy nhanh sự tập trung hóa trình xác thực. Điều này một phần là do, khi các trình xác thực [kiếm được ít tiền hơn cho việc đề xuất khối](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) so với thợ đào trước đây, việc trích xuất MEV đã [ảnh hưởng lớn đến thu nhập của trình xác thực](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) kể từ [The Merge](/roadmap/merge/).

Các nhóm đặt cọc lớn hơn có thể sẽ có nhiều nguồn lực hơn để đầu tư vào các tối ưu hóa cần thiết nhằm nắm bắt các cơ hội MEV. Các nhóm này càng trích xuất được nhiều MEV, họ càng có nhiều nguồn lực để cải thiện khả năng trích xuất MEV của mình (và tăng tổng doanh thu), về cơ bản tạo ra [lợi thế nhờ quy mô](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Với ít nguồn lực hơn theo ý mình, những người đặt cọc độc lập có thể không thu được lợi nhuận từ các cơ hội MEV. Điều này có thể làm tăng áp lực buộc các trình xác thực độc lập phải tham gia vào các nhóm đặt cọc mạnh mẽ để tăng thu nhập của họ, làm giảm sự phi tập trung trong Ethereum.

### Mempool có cấp phép {#permissioned-mempools}

Để đối phó với các cuộc tấn công kẹp và chạy trước, các nhà giao dịch có thể bắt đầu tiến hành các thỏa thuận ngoài chuỗi với các trình xác thực để đảm bảo quyền riêng tư của giao dịch. Thay vì gửi một giao dịch MEV tiềm năng đến mempool công khai, nhà giao dịch gửi nó trực tiếp đến trình xác thực, người này sẽ đưa nó vào một khối và chia sẻ lợi nhuận với nhà giao dịch.

"Hồ tối" (Dark pools) là một phiên bản lớn hơn của sự sắp xếp này và hoạt động như các mempool có cấp phép, chỉ dành cho truy cập mở cho những người dùng sẵn sàng trả một số khoản phí nhất định. Xu hướng này sẽ làm giảm tính không cần cấp phép và tính không cần niềm tin của Ethereum và có khả năng biến Chuỗi khối thành một cơ chế "trả tiền để chơi" (pay-to-play) ưu ái người trả giá cao nhất.

Các mempool có cấp phép cũng sẽ đẩy nhanh các rủi ro tập trung hóa được mô tả trong phần trước. Các nhóm lớn chạy nhiều trình xác thực có thể sẽ được hưởng lợi từ việc cung cấp quyền riêng tư giao dịch cho các nhà giao dịch và người dùng, làm tăng doanh thu MEV của họ.

Việc chống lại các vấn đề liên quan đến MEV này trong Ethereum sau The Merge là một lĩnh vực nghiên cứu cốt lõi. Cho đến nay, hai giải pháp được đề xuất để giảm tác động tiêu cực của MEV đối với sự phi tập trung và bảo mật của Ethereum sau The Merge là [**tách biệt người đề xuất và người xây dựng (PBS)**](/roadmap/pbs/) và [**Builder API**](https://github.com/ethereum/builder-specs).

### Tách biệt người đề xuất và người xây dựng {#proposer-builder-separation}

Trong cả Bằng chứng công việc (PoW) và Bằng chứng cổ phần (PoS), một nút xây dựng một khối sẽ đề xuất nó để thêm vào Chuỗi cho các nút khác tham gia vào đồng thuận. Một khối mới trở thành một phần của Chuỗi chính tắc sau khi một thợ đào khác xây dựng trên nó (trong PoW) hoặc nó nhận được chứng thực từ đa số các trình xác thực (trong PoS).

Sự kết hợp giữa vai trò của người sản xuất khối và người đề xuất khối là điều gây ra hầu hết các vấn đề liên quan đến MEV được mô tả trước đây. Ví dụ: các nút đồng thuận được khuyến khích kích hoạt việc tổ chức lại chuỗi trong [các cuộc tấn công time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack) để tối đa hóa thu nhập MEV.

[Tách biệt người đề xuất và người xây dựng (PBS)](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) được thiết kế để giảm thiểu tác động của MEV, đặc biệt là ở lớp đồng thuận. Tính năng chính của PBS là sự tách biệt các quy tắc của người sản xuất khối và người đề xuất khối. Các trình xác thực vẫn chịu trách nhiệm đề xuất và bỏ phiếu cho các khối, nhưng một lớp thực thể chuyên biệt mới, được gọi là **trình tạo block**, được giao nhiệm vụ sắp xếp các giao dịch và xây dựng các khối.

Theo PBS, một trình tạo block tạo ra một gói giao dịch và đặt giá thầu để đưa nó vào một khối Chuỗi Beacon (dưới dạng "tải trọng thực thi"). Trình xác thực được chọn để đề xuất khối tiếp theo sau đó sẽ kiểm tra các giá thầu khác nhau và chọn gói có mức phí cao nhất. PBS về cơ bản tạo ra một thị trường đấu giá, nơi các trình xây dựng đàm phán với các trình xác thực bán không gian khối.

Các thiết kế PBS hiện tại sử dụng một [lược đồ cam kết-tiết lộ (commit-reveal scheme)](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) trong đó các trình xây dựng chỉ công bố một cam kết mật mã đối với nội dung của một khối (tiêu đề block) cùng với giá thầu của họ. Sau khi chấp nhận giá thầu chiến thắng, người đề xuất tạo ra một đề xuất khối đã ký bao gồm tiêu đề block. Trình tạo block dự kiến sẽ công bố toàn bộ phần thân khối sau khi nhìn thấy đề xuất khối đã ký và nó cũng phải nhận đủ [chứng thực](/glossary/#attestation) từ các trình xác thực trước khi nó đã chung cuộc.

#### Tách biệt người đề xuất và người xây dựng giảm thiểu tác động của MEV như thế nào? {#how-does-pbs-curb-mev-impact}

Việc tách biệt người đề xuất và người xây dựng trong Giao thức làm giảm tác động của MEV đối với đồng thuận bằng cách loại bỏ việc trích xuất MEV khỏi phạm vi của các trình xác thực. Thay vào đó, các trình tạo block chạy phần cứng chuyên dụng sẽ nắm bắt các cơ hội MEV trong tương lai.

Tuy nhiên, điều này không loại trừ hoàn toàn các trình xác thực khỏi thu nhập liên quan đến MEV, vì các trình xây dựng phải trả giá cao để các khối của họ được các trình xác thực chấp nhận. Tuy nhiên, với việc các trình xác thực không còn tập trung trực tiếp vào việc tối ưu hóa thu nhập MEV, mối đe dọa từ các cuộc tấn công time-bandit sẽ giảm đi.

Việc tách biệt người đề xuất và người xây dựng cũng làm giảm rủi ro tập trung hóa của MEV. Ví dụ: việc sử dụng lược đồ cam kết-tiết lộ loại bỏ nhu cầu các trình xây dựng phải tin tưởng các trình xác thực không đánh cắp cơ hội MEV hoặc tiết lộ nó cho các trình xây dựng khác. Điều này làm giảm rào cản đối với những người đặt cọc độc lập để hưởng lợi từ MEV, nếu không, các trình xây dựng sẽ có xu hướng ưu ái các nhóm lớn có danh tiếng ngoài chuỗi và tiến hành các thỏa thuận ngoài chuỗi với họ.

Tương tự như vậy, các trình xác thực không phải tin tưởng các trình xây dựng không giữ lại phần thân khối hoặc công bố các khối không hợp lệ vì việc thanh toán là vô điều kiện. Phí của trình xác thực vẫn được xử lý ngay cả khi khối được đề xuất không có sẵn hoặc bị các trình xác thực khác tuyên bố là không hợp lệ. Trong trường hợp sau, khối đơn giản là bị loại bỏ, buộc trình tạo block phải mất tất cả phí giao dịch và doanh thu MEV.

### Builder API {#builder-api}

Mặc dù việc tách biệt người đề xuất và người xây dựng hứa hẹn sẽ làm giảm tác động của việc trích xuất MEV, nhưng việc triển khai nó đòi hỏi phải thay đổi Giao thức đồng thuận. Cụ thể, quy tắc [lựa chọn Phân nhánh](/developers/docs/consensus-mechanisms/pos/#fork-choice) trên Chuỗi Beacon sẽ cần được cập nhật. [Builder API](https://github.com/ethereum/builder-specs) là một giải pháp tạm thời nhằm cung cấp một triển khai hoạt động của việc tách biệt người đề xuất và người xây dựng, mặc dù với các giả định tin cậy cao hơn.

Builder API là một phiên bản sửa đổi của [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) được sử dụng bởi các máy khách lớp đồng thuận để yêu cầu các tải trọng thực thi từ các máy khách lớp thực thi. Như được phác thảo trong [đặc tả trình xác thực trung thực](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), các trình xác thực được chọn cho nhiệm vụ đề xuất khối yêu cầu một gói giao dịch từ một máy khách thực thi được kết nối, mà họ đưa vào khối Chuỗi Beacon được đề xuất.

Builder API cũng hoạt động như một phần mềm trung gian giữa các trình xác thực và các máy khách lớp thực thi; nhưng nó khác biệt vì nó cho phép các trình xác thực trên Chuỗi Beacon lấy nguồn các khối từ các thực thể bên ngoài (thay vì xây dựng một khối cục bộ bằng cách sử dụng một máy khách thực thi).

Dưới đây là tổng quan về cách Builder API hoạt động:

1. Builder API kết nối trình xác thực với một mạng lưới các trình tạo block chạy các máy khách lớp thực thi. Giống như trong PBS, các trình xây dựng là các bên chuyên biệt đầu tư vào việc xây dựng khối tốn nhiều tài nguyên và sử dụng các chiến lược khác nhau để tối đa hóa doanh thu kiếm được từ MEV + tiền boa ưu tiên.

2. Một trình xác thực (chạy một máy khách lớp đồng thuận) yêu cầu các tải trọng thực thi cùng với các giá thầu từ mạng lưới các trình xây dựng. Giá thầu từ các trình xây dựng sẽ chứa tiêu đề tải trọng thực thi—một cam kết mật mã đối với nội dung của tải trọng—và một khoản phí phải trả cho trình xác thực.

3. Trình xác thực xem xét các giá thầu đến và chọn tải trọng thực thi có mức phí cao nhất. Sử dụng Builder API, trình xác thực tạo ra một đề xuất khối Beacon "bị che khuất" (blinded) chỉ bao gồm chữ ký của họ và tiêu đề tải trọng thực thi và gửi nó cho trình xây dựng.

4. Trình xây dựng chạy Builder API dự kiến sẽ phản hồi với toàn bộ tải trọng thực thi khi nhìn thấy đề xuất khối bị che khuất. Điều này cho phép trình xác thực tạo ra một khối Beacon "đã ký", mà họ truyền bá khắp mạng lưới.

5. Một trình xác thực sử dụng Builder API vẫn được kỳ vọng sẽ xây dựng một khối cục bộ trong trường hợp trình tạo block không phản hồi kịp thời, để họ không bỏ lỡ phần thưởng đề xuất khối. Tuy nhiên, trình xác thực không thể tạo một khối khác bằng cách sử dụng các giao dịch hiện đã được tiết lộ hoặc một bộ khác, vì điều đó sẽ tương đương với _sự lập lờ_ (equivocation - việc ký hai khối trong cùng một khe), đây là một hành vi vi phạm có thể bị cắt giảm (slashable).

Một ví dụ triển khai của Builder API là [MEV-Boost](https://github.com/flashbots/mev-boost), một cải tiến đối với [cơ chế đấu giá Flashbots](https://docs.flashbots.net/flashbots-auction/overview) được thiết kế để kiềm chế các ngoại ứng tiêu cực của MEV trên Ethereum. Đấu giá Flashbots cho phép các trình xác thực trong Bằng chứng cổ phần (PoS) thuê ngoài công việc xây dựng các khối sinh lời cho các bên chuyên biệt được gọi là **người tìm kiếm**.
![A diagram showing the MEV flow in detail](./mev.png)

Người tìm kiếm tìm kiếm các cơ hội MEV béo bở và gửi các gói giao dịch cho người đề xuất khối cùng với một [giá thầu kín](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) để được đưa vào khối. Trình xác thực chạy mev-geth, một phiên bản Phân nhánh của máy khách Go Ethereum (Geth) chỉ phải chọn gói có nhiều lợi nhuận nhất và đưa nó vào như một phần của khối mới. Để bảo vệ người đề xuất khối (trình xác thực) khỏi thư rác và các giao dịch không hợp lệ, các gói giao dịch đi qua các **rơ-le** (relayers) để xác thực trước khi đến tay người đề xuất.

MEV-Boost giữ nguyên cách thức hoạt động của cuộc đấu giá Flashbots ban đầu, mặc dù có các tính năng mới được thiết kế cho việc chuyển đổi sang Bằng chứng cổ phần (PoS) của Ethereum. Người tìm kiếm vẫn tìm thấy các giao dịch MEV sinh lời để đưa vào các khối, nhưng một lớp các bên chuyên biệt mới, được gọi là **trình xây dựng**, chịu trách nhiệm tổng hợp các giao dịch và các gói thành các khối. Một trình xây dựng chấp nhận các giá thầu kín từ những người tìm kiếm và chạy các tối ưu hóa để tìm ra thứ tự sinh lời nhất.

Rơ-le vẫn chịu trách nhiệm xác thực các gói giao dịch trước khi chuyển chúng cho người đề xuất. Tuy nhiên, MEV-Boost giới thiệu các **khế ước lưu giữ** (escrows) chịu trách nhiệm cung cấp [tính khả dụng của dữ liệu](/developers/docs/data-availability/) bằng cách lưu trữ các phần thân khối do các trình xây dựng gửi và các tiêu đề block do các trình xác thực gửi. Tại đây, một trình xác thực được kết nối với một rơ-le yêu cầu các tải trọng thực thi có sẵn và sử dụng thuật toán sắp xếp của MEV-Boost để chọn tiêu đề tải trọng có giá thầu + tiền boa MEV cao nhất.

#### Builder API giảm thiểu tác động của MEV như thế nào? {#how-does-builder-api-curb-mev-impact}

Lợi ích cốt lõi của Builder API là tiềm năng dân chủ hóa quyền truy cập vào các cơ hội MEV. Việc sử dụng các lược đồ cam kết-tiết lộ giúp loại bỏ các giả định tin cậy và giảm rào cản gia nhập đối với các trình xác thực đang tìm cách hưởng lợi từ MEV. Điều này sẽ làm giảm áp lực đối với những người đặt cọc độc lập trong việc tích hợp với các nhóm đặt cọc lớn để tăng lợi nhuận MEV.

Việc triển khai rộng rãi Builder API sẽ khuyến khích sự cạnh tranh lớn hơn giữa các trình tạo block, điều này làm tăng khả năng chống kiểm duyệt. Khi các trình xác thực xem xét giá thầu từ nhiều trình xây dựng, một trình xây dựng có ý định kiểm duyệt một hoặc nhiều giao dịch của người dùng phải trả giá cao hơn tất cả các trình xây dựng không kiểm duyệt khác để thành công. Điều này làm tăng đáng kể chi phí kiểm duyệt người dùng và không khuyến khích hành vi này.

Một số dự án, chẳng hạn như MEV-Boost, sử dụng Builder API như một phần của cấu trúc tổng thể được thiết kế để cung cấp quyền riêng tư giao dịch cho một số bên nhất định, chẳng hạn như các nhà giao dịch đang cố gắng tránh các cuộc tấn công chạy trước/kẹp. Điều này đạt được bằng cách cung cấp một kênh liên lạc riêng tư giữa người dùng và các trình tạo block. Không giống như các mempool có cấp phép được mô tả trước đó, phương pháp này có lợi vì những lý do sau:

1. Sự tồn tại của nhiều trình xây dựng trên thị trường làm cho việc kiểm duyệt trở nên không thực tế, điều này mang lại lợi ích cho người dùng. Ngược lại, sự tồn tại của các hồ tối tập trung và dựa trên sự tin cậy sẽ tập trung quyền lực vào tay một số ít trình tạo block và làm tăng khả năng kiểm duyệt.

2. Phần mềm Builder API là mã nguồn mở, cho phép bất kỳ ai cung cấp các dịch vụ trình tạo block. Điều này có nghĩa là người dùng không bị buộc phải sử dụng bất kỳ trình tạo block cụ thể nào và cải thiện tính trung lập cũng như tính không cần cấp phép của Ethereum. Hơn nữa, các nhà giao dịch tìm kiếm MEV sẽ không vô tình góp phần vào sự tập trung hóa bằng cách sử dụng các kênh giao dịch riêng tư.

## Tài nguyên liên quan {#related-resources}

- [Tài liệu Flashbots](https://docs.flashbots.net/)
- [GitHub của Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Trình theo dõi với số liệu thống kê theo thời gian thực cho các rơ-le MEV-Boost và trình tạo block_

## Đọc thêm {#further-reading}

- [Giá trị có thể trích xuất của thợ đào (MEV) là gì?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV và tôi](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum là một khu rừng tối](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Thoát khỏi khu rừng tối](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Chạy trước cuộc khủng hoảng MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Các luồng MEV của @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Kiến trúc Flashbots sẵn sàng cho The Merge](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [MEV-Boost là gì](https://www.alchemy.com/overviews/mev-boost)
- [Tại sao nên chạy mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Hướng dẫn quá giang đến Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)