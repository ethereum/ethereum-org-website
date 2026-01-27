---
title: Nhuận quyền thợ đào (MEV)
description: An introduction to maximal extractable value (MEV)
lang: vi
---

Giá trị trích xuất tối đa (MEV) đề cập đến giá trị tối đa có thể được trích xuất từ việc sản xuất khối ngoài phần thưởng khối tiêu chuẩn và phí gas bằng cách bao gồm, loại trừ và thay đổi thứ tự các giao dịch trong một khối.

## Giá trị trích xuất tối đa {#maximal-extractable-value}

Giá trị trích xuất tối đa lần đầu tiên được áp dụng trong bối cảnh [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/), và ban đầu được gọi là "giá trị thợ đào có thể trích xuất". Điều này là do trong bằng chứng công việc, các thợ đào kiểm soát việc bao gồm, loại trừ và sắp xếp thứ tự giao dịch. Tuy nhiên, kể từ khi chuyển đổi sang bằng chứng cổ phần thông qua [The Merge](/roadmap/merge), những người xác thực đã chịu trách nhiệm cho các vai trò này và việc khai thác không còn là một phần của giao thức Ethereum. Tuy nhiên, các phương pháp trích xuất giá trị vẫn tồn tại, do đó thuật ngữ "Giá trị trích xuất tối đa" hiện được sử dụng thay thế.

## Điều kiện tiên quyết {#prerequisites}

Hãy chắc chắn rằng bạn đã quen thuộc với [giao dịch](/developers/docs/transactions/), [khối](/developers/docs/blocks/), [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos) và [gas](/developers/docs/gas/). Việc quen thuộc với [các ứng dụng phi tập trung](/apps/) và [DeFi](/defi/) cũng rất hữu ích.

## Trích xuất MEV {#mev-extraction}

Về lý thuyết, MEV hoàn toàn thuộc về những người xác thực vì họ là bên duy nhất có thể đảm bảo việc thực hiện một cơ hội MEV có lợi nhuận. Tuy nhiên, trên thực tế, một phần lớn MEV được trích xuất bởi những người tham gia mạng độc lập được gọi là "người tìm kiếm." Người tìm kiếm chạy các thuật toán phức tạp trên dữ liệu chuỗi khối để phát hiện các cơ hội MEV có lợi nhuận và có các bot để tự động gửi các giao dịch có lợi nhuận đó đến mạng.

Dù sao thì những người xác thực cũng nhận được một phần trong tổng số tiền MEV vì những người tìm kiếm sẵn sàng trả phí gas cao (phí này sẽ thuộc về người xác thực) để đổi lấy khả năng cao hơn về việc các giao dịch có lợi nhuận của họ được đưa vào một khối. Giả sử những người tìm kiếm có lý trí về mặt kinh tế, phí gas mà người tìm kiếm sẵn sàng trả sẽ là một khoản tiền lên tới 100% MEV của người tìm kiếm (bởi vì nếu phí gas cao hơn, người tìm kiếm sẽ mất tiền).

Với điều đó, đối với một số cơ hội MEV có tính cạnh tranh cao, chẳng hạn như [kinh doanh chênh lệch giá DEX](#mev-examples-dex-arbitrage), người tìm kiếm có thể phải trả 90% hoặc thậm chí nhiều hơn tổng doanh thu MEV của họ dưới dạng phí gas cho người xác thực vì có rất nhiều người muốn chạy cùng một giao dịch kinh doanh chênh lệch giá có lợi nhuận. Điều này là do cách duy nhất để đảm bảo rằng giao dịch kinh doanh chênh lệch giá của họ được chạy là nếu họ gửi giao dịch với giá gas cao nhất.

### Gas golfing {#mev-extraction-gas-golfing}

Động lực này đã khiến việc giỏi "gas golfing" — lập trình các giao dịch sao cho chúng sử dụng lượng gas ít nhất — trở thành một lợi thế cạnh tranh, bởi vì nó cho phép những người tìm kiếm đặt giá gas cao hơn trong khi vẫn giữ nguyên tổng phí gas của họ (vì phí gas = giá gas \* gas đã sử dụng).

Một vài kỹ thuật gas golf nổi tiếng bao gồm: sử dụng các địa chỉ bắt đầu bằng một chuỗi số không dài (ví dụ: [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) vì chúng chiếm ít không gian hơn (và do đó tốn ít gas hơn) để lưu trữ; và để lại số dư token [ERC-20](/developers/docs/standards/tokens/erc-20/) nhỏ trong các hợp đồng, vì việc khởi tạo một khe lưu trữ (trường hợp nếu số dư là 0) sẽ tốn nhiều gas hơn là cập nhật một khe lưu trữ. Việc tìm ra nhiều kỹ thuật hơn để giảm mức sử dụng gas là một lĩnh vực nghiên cứu tích cực của những người tìm kiếm.

### Những kẻ chạy trước tổng quát {#mev-extraction-generalized-frontrunners}

Thay vì lập trình các thuật toán phức tạp để phát hiện các cơ hội MEV có lợi nhuận, một số người tìm kiếm chạy những kẻ chạy trước tổng quát. Những kẻ chạy trước tổng quát là các bot theo dõi mempool để phát hiện các giao dịch có lợi nhuận. Kẻ chạy trước sẽ sao chép mã của giao dịch có khả năng sinh lời, thay thế các địa chỉ bằng địa chỉ của kẻ chạy trước và chạy giao dịch cục bộ để kiểm tra kỹ rằng giao dịch đã sửa đổi có mang lại lợi nhuận cho địa chỉ của kẻ chạy trước hay không. Nếu giao dịch thực sự có lãi, kẻ chạy trước sẽ gửi giao dịch đã sửa đổi với địa chỉ được thay thế và giá gas cao hơn, "chạy trước" giao dịch ban đầu và nhận được MEV của người tìm kiếm ban đầu.

### Flashbots {#mev-extraction-flashbots}

Flashbots là một dự án độc lập mở rộng các máy khách thực thi với một dịch vụ cho phép người tìm kiếm gửi các giao dịch MEV cho người xác thực mà không tiết lộ chúng cho mempool công khai. Điều này ngăn các giao dịch bị chạy trước bởi những kẻ chạy trước tổng quát.

## Các ví dụ về MEV {#mev-examples}

MEV xuất hiện trên chuỗi khối theo một vài cách.

### Kinh doanh chênh lệch giá trên DEX {#mev-examples-dex-arbitrage}

Kinh doanh chênh lệch giá trên [sàn giao dịch phi tập trung](/glossary/#dex) (DEX) là cơ hội MEV đơn giản và nổi tiếng nhất. Do đó, đây cũng là cơ hội cạnh tranh nhất.

Nó hoạt động như thế này: nếu hai DEX đang cung cấp một token ở hai mức giá khác nhau, ai đó có thể mua token trên DEX giá thấp hơn và bán nó trên DEX giá cao hơn trong một giao dịch nguyên tử duy nhất. Nhờ cơ chế của chuỗi khối, đây là hình thức kinh doanh chênh lệch giá thực sự không có rủi ro.

[Đây là một ví dụ](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) về một giao dịch kinh doanh chênh lệch giá có lợi nhuận, trong đó một người tìm kiếm đã biến 1.000 ETH thành 1.045 ETH bằng cách tận dụng các mức giá khác nhau của cặp ETH/Dai trên Uniswap so với Sushiswap.

### Thanh lý {#mev-examples-liquidations}

Thanh lý giao thức cho vay là một cơ hội MEV nổi tiếng khác.

Các giao thức cho vay như Maker và Aave yêu cầu người dùng gửi một số tài sản thế chấp (ví dụ: ETH). Tài sản thế chấp đã gửi này sau đó được sử dụng để cho những người dùng khác vay.

Người dùng sau đó có thể vay tài sản và token từ người khác tùy thuộc vào nhu cầu của họ (ví dụ: bạn có thể vay MKR nếu muốn bỏ phiếu trong một đề xuất quản trị của MakerDAO) lên đến một tỷ lệ phần trăm nhất định trên tài sản thế chấp đã gửi của họ. Ví dụ: nếu số tiền vay tối đa là 30%, một người dùng gửi 100 Dai vào giao thức có thể vay một tài sản khác trị giá lên tới 30 Dai. Giao thức xác định tỷ lệ phần trăm khả năng vay chính xác.

Khi giá trị tài sản thế chấp của người đi vay biến động, khả năng vay của họ cũng vậy. Nếu do biến động của thị trường, giá trị của tài sản đã vay vượt quá, giả sử là 30% giá trị tài sản thế chấp của họ (một lần nữa, tỷ lệ phần trăm chính xác được xác định bởi giao thức), giao thức thường cho phép bất kỳ ai thanh lý tài sản thế chấp, ngay lập tức trả hết nợ cho người cho vay (điều này tương tự như cách [lệnh gọi ký quỹ](https://www.investopedia.com/terms/m/margincall.asp) hoạt động trong tài chính truyền thống). Nếu bị thanh lý, người đi vay thường phải trả một khoản phí thanh lý khá lớn, một phần trong số đó sẽ thuộc về người thanh lý — đó là nơi cơ hội MEV xuất hiện.

Những người tìm kiếm cạnh tranh để phân tích cú pháp dữ liệu chuỗi khối nhanh nhất có thể để xác định người đi vay nào có thể bị thanh lý và là người đầu tiên gửi giao dịch thanh lý và tự mình thu phí thanh lý.

### Giao dịch kẹp {#mev-examples-sandwich-trading}

Giao dịch kẹp là một phương pháp trích xuất MEV phổ biến khác.

Để thực hiện giao dịch kẹp, một người tìm kiếm sẽ theo dõi mempool để tìm các giao dịch DEX lớn. Ví dụ, giả sử ai đó muốn mua 10.000 UNI bằng Dai trên Uniswap. Một giao dịch có quy mô này sẽ có tác động đáng kể đến cặp UNI/Dai, có khả năng làm tăng đáng kể giá của UNI so với Dai.

Một người tìm kiếm có thể tính toán tác động giá gần đúng của giao dịch lớn này đối với cặp UNI/Dai và thực hiện một lệnh mua tối ưu ngay _trước_ giao dịch lớn, mua UNI với giá rẻ, sau đó thực hiện một lệnh bán ngay _sau_ giao dịch lớn, bán nó với giá cao hơn do lệnh lớn gây ra.

Tuy nhiên, giao dịch kẹp có rủi ro cao hơn vì nó không phải là nguyên tử (không giống như kinh doanh chênh lệch giá DEX, như đã mô tả ở trên) và dễ bị [tấn công salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV NFT {#mev-examples-nfts}

MEV trong không gian NFT là một hiện tượng mới nổi và không nhất thiết phải có lợi nhuận.

Tuy nhiên, vì các giao dịch NFT xảy ra trên cùng một chuỗi khối được chia sẻ bởi tất cả các giao dịch Ethereum khác, những người tìm kiếm cũng có thể sử dụng các kỹ thuật tương tự như những kỹ thuật được sử dụng trong các cơ hội MEV truyền thống trên thị trường NFT.

Ví dụ, nếu có một đợt phát hành NFT phổ biến và một người tìm kiếm muốn một NFT hoặc một bộ NFT nhất định, họ có thể lập trình một giao dịch sao cho họ là người đầu tiên xếp hàng để mua NFT đó, hoặc họ có thể mua toàn bộ bộ NFT trong một giao dịch duy nhất. Hoặc nếu một NFT bị [niêm yết nhầm với giá thấp](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), một người tìm kiếm có thể chạy trước những người mua khác và giành lấy nó với giá rẻ.

Một ví dụ nổi bật về MEV NFT đã xảy ra khi một người tìm kiếm đã chi 7 triệu đô la để [mua](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) tất cả các Cryptopunk ở mức giá sàn. Một nhà nghiên cứu chuỗi khối đã [giải thích trên Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) cách người mua đã làm việc với một nhà cung cấp MEV để giữ bí mật việc mua hàng của họ.

### Đuôi dài {#mev-examples-long-tail}

Kinh doanh chênh lệch giá trên DEX, thanh lý và giao dịch kẹp đều là những cơ hội MEV rất nổi tiếng và không có khả năng mang lại lợi nhuận cho những người tìm kiếm mới. Tuy nhiên, có một cái đuôi dài gồm các cơ hội MEV ít được biết đến hơn (MEV NFT được cho là một cơ hội như vậy).

Những người tìm kiếm mới bắt đầu có thể tìm thấy nhiều thành công hơn bằng cách tìm kiếm MEV trong cái đuôi dài hơn này. [Bảng công việc MEV](https://github.com/flashbots/mev-job-board) của Flashbot niêm yết một số cơ hội mới nổi.

## Tác động của MEV {#effects-of-mev}

MEV không hoàn toàn xấu — có cả hậu quả tích cực và tiêu cực đối với MEV trên Ethereum.

### Mặt tốt {#effects-of-mev-the-good}

Nhiều dự án DeFi dựa vào các tác nhân có lý trí về mặt kinh tế để đảm bảo tính hữu dụng và ổn định của các giao thức của họ. Ví dụ: kinh doanh chênh lệch giá trên DEX đảm bảo rằng người dùng nhận được mức giá tốt nhất, chính xác nhất cho token của họ và các giao thức cho vay dựa vào việc thanh lý nhanh chóng khi người đi vay giảm xuống dưới tỷ lệ thế chấp để đảm bảo người cho vay được trả lại tiền.

Nếu không có những người tìm kiếm hợp lý tìm kiếm và khắc phục những thiếu hiệu quả kinh tế và tận dụng các ưu đãi kinh tế của giao thức, các giao thức DeFi và các ứng dụng phi tập trung nói chung có thể không mạnh mẽ như ngày nay.

### Mặt xấu {#effects-of-mev-the-bad}

Ở lớp ứng dụng, một số dạng MEV, như giao dịch kẹp, dẫn đến trải nghiệm tồi tệ hơn rõ ràng cho người dùng. Những người dùng bị kẹp phải đối mặt với tình trạng trượt giá gia tăng và thực hiện giao dịch của họ tồi tệ hơn.

Ở lớp mạng, những kẻ chạy trước tổng quát và các cuộc đấu giá giá gas mà chúng thường tham gia (khi hai hoặc nhiều kẻ chạy trước cạnh tranh để giao dịch của họ được đưa vào khối tiếp theo bằng cách tăng dần giá gas cho giao dịch của chính họ) dẫn đến tắc nghẽn mạng và giá gas cao cho tất cả những người khác đang cố gắng chạy các giao dịch thông thường.

Ngoài những gì đang xảy ra _bên trong_ các khối, MEV có thể có những tác động bất lợi _giữa_ các khối. Nếu MEV có sẵn trong một khối vượt quá đáng kể phần thưởng khối tiêu chuẩn, người xác thực có thể được khuyến khích tổ chức lại các khối và tự mình nắm bắt MEV, gây ra sự tái tổ chức chuỗi khối và bất ổn về sự đồng thuận.

Khả năng tái tổ chức chuỗi khối này đã được [khám phá trước đây trên chuỗi khối Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Khi phần thưởng khối của Bitcoin giảm một nửa và phí giao dịch chiếm một phần ngày càng lớn trong phần thưởng khối, các tình huống nảy sinh khi các thợ đào trở nên có lý do kinh tế để từ bỏ phần thưởng của khối tiếp theo và thay vào đó khai thác lại các khối trong quá khứ với phí cao hơn. Với sự phát triển của MEV, tình huống tương tự có thể xảy ra ở Ethereum, đe dọa tính toàn vẹn của chuỗi khối.

## Trạng thái của MEV {#state-of-mev}

Việc khai thác MEV đã bùng nổ vào đầu năm 2021, dẫn đến giá gas cực kỳ cao trong vài tháng đầu năm. Sự xuất hiện của rơ-le MEV của Flashbots đã làm giảm hiệu quả của các công cụ chạy trước tổng quát và đã đưa các cuộc đấu giá giá gas ra ngoài chuỗi, làm giảm giá gas cho người dùng thông thường.

Trong khi nhiều người tìm kiếm vẫn đang kiếm bộn tiền từ MEV, khi các cơ hội ngày càng được biết đến nhiều hơn và ngày càng có nhiều người tìm kiếm cạnh tranh cho cùng một cơ hội, người xác thực sẽ chiếm được ngày càng nhiều tổng doanh thu MEV (bởi vì cùng loại đấu giá gas như được mô tả ban đầu ở trên cũng xảy ra trong Flashbots, mặc dù ở chế độ riêng tư, và người xác thực sẽ chiếm được doanh thu gas kết quả). MEV cũng không phải là duy nhất đối với Ethereum, và khi các cơ hội trở nên cạnh tranh hơn trên Ethereum, những người tìm kiếm đang chuyển sang các chuỗi khối thay thế như Binance Smart Chain, nơi tồn tại các cơ hội MEV tương tự như trên Ethereum với ít sự cạnh tranh hơn.

Mặt khác, quá trình chuyển đổi từ bằng chứng công việc sang bằng chứng cổ phần và nỗ lực không ngừng nhằm mở rộng quy mô Ethereum bằng cách sử dụng các rollup đều làm thay đổi bối cảnh MEV theo những cách vẫn còn hơi chưa rõ ràng. Vẫn chưa rõ việc có những người đề xuất khối được đảm bảo và biết trước một chút sẽ thay đổi động lực của việc trích xuất MEV như thế nào so với mô hình xác suất trong bằng chứng công việc hoặc điều này sẽ bị gián đoạn như thế nào khi [bầu cử lãnh đạo bí mật duy nhất](https://ethresear.ch/t/secret-non-single-leader-election/11789) và [công nghệ trình xác thực phân tán](/staking/dvt/) được triển khai. Tương tự, vẫn còn phải xem các cơ hội MEV tồn tại khi hầu hết hoạt động của người dùng được chuyển khỏi Ethereum và sang các rollup và shard lớp 2 của nó.

## MEV trong Bằng chứng cổ phần Ethereum (PoS) {#mev-in-ethereum-proof-of-stake}

Như đã giải thích, MEV có những tác động tiêu cực đến trải nghiệm người dùng tổng thể và bảo mật lớp đồng thuận. Nhưng quá trình chuyển đổi của Ethereum sang sự đồng thuận bằng chứng cổ phần (được mệnh danh là “The Merge”) có khả năng giới thiệu các rủi ro mới liên quan đến MEV:

### Tập trung hóa trình xác thực {#validator-centralization}

Trong Ethereum sau The Merge, những người xác thực (đã đặt cọc bảo mật 32 ETH) đi đến sự đồng thuận về tính hợp lệ của các khối được thêm vào Chuỗi Hải Đăng. Vì 32 ETH có thể nằm ngoài tầm với của nhiều người, [tham gia một bể staking](/staking/pools/) có thể là một lựa chọn khả thi hơn. Tuy nhiên, một sự phân bổ lành mạnh của [những người staking đơn lẻ](/staking/solo/) là lý tưởng, vì nó giảm thiểu sự tập trung hóa của những người xác thực và cải thiện tính bảo mật của Ethereum.

Tuy nhiên, việc khai thác MEV được cho là có khả năng đẩy nhanh quá trình tập trung hóa trình xác thực. Điều này một phần là do, khi người xác thực [kiếm được ít hơn cho việc đề xuất các khối](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) so với các thợ đào trước đây, việc khai thác MEV đã [ảnh hưởng lớn đến thu nhập của người xác thực](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) kể từ [The Merge](/roadmap/merge/).

Các bể staking lớn hơn có thể sẽ có nhiều tài nguyên hơn để đầu tư vào các tối ưu hóa cần thiết để nắm bắt các cơ hội MEV. Các bể này càng trích xuất nhiều MEV, chúng càng có nhiều tài nguyên để cải thiện khả năng trích xuất MEV của mình (và tăng tổng doanh thu), về cơ bản tạo ra [tính kinh tế theo quy mô](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Với ít tài nguyên hơn, những người staking đơn lẻ có thể không thể kiếm lợi từ các cơ hội MEV. Điều này có thể làm tăng áp lực lên những người xác thực độc lập để tham gia các bể staking mạnh mẽ để tăng thu nhập của họ, làm giảm sự phi tập trung trong Ethereum.

### Mempool được cấp phép {#permissioned-mempools}

Để đối phó với các cuộc tấn công kẹp và chạy trước, các nhà giao dịch có thể bắt đầu tiến hành các giao dịch ngoài chuỗi với những người xác thực để bảo mật giao dịch. Thay vì gửi một giao dịch MEV tiềm năng đến mempool công khai, nhà giao dịch sẽ gửi nó trực tiếp đến người xác thực, người sẽ đưa nó vào một khối và chia lợi nhuận với nhà giao dịch.

“Các bể tối” là một phiên bản lớn hơn của sự sắp xếp này và hoạt động như các mempool chỉ cho phép truy cập, được cấp phép, mở cho những người dùng sẵn sàng trả một số khoản phí nhất định. Xu hướng này sẽ làm giảm tính không cần cấp phép và không cần tin cậy của Ethereum và có khả năng biến chuỗi khối thành một cơ chế “trả tiền để chơi” có lợi cho người trả giá cao nhất.

Các mempool được cấp phép cũng sẽ đẩy nhanh các rủi ro tập trung hóa được mô tả trong phần trước. Các bể lớn chạy nhiều trình xác thực có thể sẽ được hưởng lợi từ việc cung cấp quyền riêng tư giao dịch cho các nhà giao dịch và người dùng, làm tăng doanh thu MEV của họ.

Chống lại các vấn đề liên quan đến MEV này trong Ethereum sau The Merge là một lĩnh vực nghiên cứu cốt lõi. Cho đến nay, hai giải pháp được đề xuất để giảm tác động tiêu cực của MEV đối với sự phi tập trung và bảo mật của Ethereum sau The Merge là [**Phân tách Người đề xuất-Người xây dựng (PBS)**](/roadmap/pbs/) và [**API của Người xây dựng**](https://github.com/ethereum/builder-specs).

### Phân tách Người đề xuất-Người xây dựng {#proposer-builder-separation}

Trong cả bằng chứng công việc và bằng chứng cổ phần, một nút xây dựng một khối sẽ đề xuất nó để thêm vào chuỗi cho các nút khác tham gia vào sự đồng thuận. Một khối mới trở thành một phần của chuỗi chính tắc sau khi một thợ đào khác xây dựng trên nó (trong PoW) hoặc nó nhận được sự chứng thực từ phần lớn người xác thực (trong PoS).

Sự kết hợp giữa vai trò nhà sản xuất khối và người đề xuất khối là nguyên nhân gây ra hầu hết các vấn đề liên quan đến MEV được mô tả trước đây. Ví dụ, các nút đồng thuận được khuyến khích kích hoạt các cuộc tái tổ chức chuỗi trong [các cuộc tấn công kẻ cướp thời gian](https://www.mev.wiki/attack-examples/time-bandit-attack) để tối đa hóa thu nhập MEV.

[Phân tách người đề xuất-người xây dựng](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) được thiết kế để giảm thiểu tác động của MEV, đặc biệt là ở lớp đồng thuận. Tính năng chính của PBS là phân tách các quy tắc của nhà sản xuất khối và người đề xuất khối. Người xác thực vẫn chịu trách nhiệm đề xuất và bỏ phiếu cho các khối, nhưng một loại thực thể chuyên biệt mới, được gọi là **người xây dựng khối**, được giao nhiệm vụ sắp xếp các giao dịch và xây dựng các khối.

Trong PBS, người xây dựng khối tạo một gói giao dịch và đặt giá thầu để được đưa vào khối Chuỗi Hải Đăng (dưới dạng “tải trọng thực thi”). Người xác thực được chọn để đề xuất khối tiếp theo sau đó sẽ kiểm tra các giá thầu khác nhau và chọn gói có phí cao nhất. PBS về cơ bản tạo ra một thị trường đấu giá, nơi những người xây dựng đàm phán với những người xác thực bán không gian khối.

Các thiết kế PBS hiện tại sử dụng [sơ đồ cam kết-tiết lộ](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) trong đó người xây dựng chỉ xuất bản một cam kết mật mã đối với nội dung của khối (tiêu đề khối) cùng với giá thầu của họ. Sau khi chấp nhận giá thầu thắng cuộc, người đề xuất sẽ tạo một đề xuất khối đã ký bao gồm tiêu đề khối. Người xây dựng khối dự kiến sẽ xuất bản toàn bộ nội dung khối sau khi thấy đề xuất khối đã ký và nó cũng phải nhận đủ [sự chứng thực](/glossary/#attestation) từ những người xác thực trước khi được hoàn tất.

#### Làm thế nào việc phân tách người đề xuất-người xây dựng giảm thiểu tác động của MEV? {#how-does-pbs-curb-mev-impact}

Việc phân tách người đề xuất-người xây dựng trong giao thức làm giảm tác động của MEV đối với sự đồng thuận bằng cách loại bỏ việc trích xuất MEV khỏi phạm vi của người xác thực. Thay vào đó, những người xây dựng khối chạy phần cứng chuyên dụng sẽ nắm bắt các cơ hội MEV trong tương lai.

Tuy nhiên, điều này không loại trừ hoàn toàn người xác thực khỏi thu nhập liên quan đến MEV, vì người xây dựng phải đặt giá thầu cao để các khối của họ được người xác thực chấp nhận. Tuy nhiên, với việc người xác thực không còn trực tiếp tập trung vào việc tối ưu hóa thu nhập MEV, mối đe dọa về các cuộc tấn công kẻ cướp thời gian sẽ giảm.

Việc phân tách người đề xuất-người xây dựng cũng làm giảm rủi ro tập trung hóa của MEV. Ví dụ, việc sử dụng sơ đồ cam kết-tiết lộ loại bỏ nhu cầu người xây dựng tin tưởng người xác thực không ăn cắp cơ hội MEV hoặc tiết lộ nó cho những người xây dựng khác. Điều này làm giảm rào cản cho những người staking đơn lẻ hưởng lợi từ MEV, nếu không, những người xây dựng sẽ có xu hướng ủng hộ các bể lớn có uy tín ngoài chuỗi và tiến hành các giao dịch ngoài chuỗi với họ.

Tương tự, người xác thực không cần phải tin tưởng người xây dựng không giữ lại nội dung khối hoặc xuất bản các khối không hợp lệ vì việc thanh toán là vô điều kiện. Phí của người xác thực vẫn được xử lý ngay cả khi khối được đề xuất không có sẵn hoặc bị những người xác thực khác tuyên bố là không hợp lệ. Trong trường hợp sau, khối chỉ đơn giản là bị loại bỏ, buộc người xây dựng khối phải mất tất cả phí giao dịch và doanh thu MEV.

### API của Người xây dựng {#builder-api}

Mặc dù việc phân tách người đề xuất-người xây dựng hứa hẹn sẽ làm giảm tác động của việc trích xuất MEV, nhưng việc triển khai nó đòi hỏi những thay đổi đối với giao thức đồng thuận. Cụ thể, quy tắc [lựa chọn phân nhánh](/developers/docs/consensus-mechanisms/pos/#fork-choice) trên Chuỗi Hải Đăng sẽ cần được cập nhật. [API của Người xây dựng](https://github.com/ethereum/builder-specs) là một giải pháp tạm thời nhằm cung cấp một triển khai hoạt động của việc phân tách người đề xuất-người xây dựng, mặc dù có các giả định về độ tin cậy cao hơn.

API của Người xây dựng là một phiên bản sửa đổi của [API Công cụ](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) được các ứng dụng lớp đồng thuận sử dụng để yêu cầu tải trọng thực thi từ các ứng dụng lớp thực thi. Như được nêu trong [đặc tả trình xác thực trung thực](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), các trình xác thực được chọn cho nhiệm vụ đề xuất khối sẽ yêu cầu một gói giao dịch từ một máy khách thực thi được kết nối, mà họ sẽ đưa vào khối Chuỗi Hải Đăng được đề xuất.

API của Người xây dựng cũng hoạt động như một phần mềm trung gian giữa người xác thực và máy khách lớp thực thi; nhưng nó khác biệt vì nó cho phép người xác thực trên Chuỗi Hải Đăng lấy khối từ các thực thể bên ngoài (thay vì xây dựng khối cục bộ bằng máy khách thực thi).

Dưới đây là tổng quan về cách hoạt động của API của Người xây dựng:

1. API của Người xây dựng kết nối trình xác thực với mạng lưới các trình xây dựng khối đang chạy các máy khách lớp thực thi. Giống như trong PBS, người xây dựng là các bên chuyên biệt đầu tư vào việc xây dựng khối đòi hỏi nhiều tài nguyên và sử dụng các chiến lược khác nhau để tối đa hóa doanh thu kiếm được từ MEV + tiền boa ưu tiên.

2. Một người xác thực (chạy một máy khách lớp đồng thuận) yêu cầu tải trọng thực thi cùng với các giá thầu từ mạng lưới các nhà xây dựng. Giá thầu từ các nhà xây dựng sẽ chứa tiêu đề tải trọng thực thi—một cam kết mật mã đối với nội dung của tải trọng—và một khoản phí phải trả cho người xác thực.

3. Người xác thực xem xét các giá thầu đến và chọn tải trọng thực thi có phí cao nhất. Sử dụng API của Người xây dựng, người xác thực tạo một đề xuất khối Chuỗi Hải Đăng "bị che" chỉ bao gồm chữ ký của họ và tiêu đề tải trọng thực thi và gửi nó cho người xây dựng.

4. Người xây dựng chạy API của Người xây dựng dự kiến sẽ phản hồi bằng tải trọng thực thi đầy đủ khi thấy đề xuất khối bị che. Điều này cho phép người xác thực tạo một khối Chuỗi Hải Đăng "đã ký", mà họ sẽ lan truyền khắp mạng.

5. Một người xác thực sử dụng API của Người xây dựng vẫn được kỳ vọng sẽ xây dựng một khối cục bộ trong trường hợp người xây dựng khối không phản hồi kịp thời, để họ không bỏ lỡ phần thưởng đề xuất khối. Tuy nhiên, người xác thực không thể tạo một khối khác bằng cách sử dụng các giao dịch vừa được tiết lộ hoặc một bộ khác, vì điều đó sẽ tương đương với _hành vi gian lận_ (ký hai khối trong cùng một khe), đây là một hành vi có thể bị phạt.

Một ví dụ về việc triển khai API của Người xây dựng là [MEV Boost](https://github.com/flashbots/mev-boost), một cải tiến trên [cơ chế đấu giá Flashbots](https://docs.flashbots.net/Flashbots-auction/overview) được thiết kế để hạn chế các ngoại ứng tiêu cực của MEV trên Ethereum. Đấu giá Flashbots cho phép những người xác thực trong bằng chứng cổ phần thuê ngoài công việc xây dựng các khối có lợi nhuận cho các bên chuyên biệt được gọi là **người tìm kiếm**.
![Một sơ đồ hiển thị chi tiết luồng MEV](./mev.png)

Những người tìm kiếm tìm kiếm các cơ hội MEV sinh lợi và gửi các gói giao dịch cho những người đề xuất khối cùng với một [giá thầu kín](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) để được đưa vào khối. Người xác thực chạy mev-geth, một phiên bản phân nhánh của ứng dụng go-ethereum (Geth) chỉ cần chọn gói có lợi nhuận cao nhất và đưa nó vào như một phần của khối mới. Để bảo vệ những người đề xuất khối (người xác thực) khỏi thư rác và các giao dịch không hợp lệ, các gói giao dịch sẽ đi qua **bộ chuyển tiếp** để xác thực trước khi đến tay người đề xuất.

MEV Boost giữ lại các hoạt động tương tự như đấu giá Flashbots ban đầu, mặc dù có các tính năng mới được thiết kế cho quá trình chuyển đổi sang bằng chứng cổ phần của Ethereum. Những người tìm kiếm vẫn tìm thấy các giao dịch MEV có lợi nhuận để đưa vào các khối, nhưng một loại bên chuyên biệt mới, được gọi là **người xây dựng**, chịu trách nhiệm tổng hợp các giao dịch và các gói thành các khối. Một người xây dựng chấp nhận giá thầu kín từ những người tìm kiếm và chạy các tối ưu hóa để tìm ra thứ tự có lợi nhất.

Bộ chuyển tiếp vẫn chịu trách nhiệm xác thực các gói giao dịch trước khi chuyển chúng cho người đề xuất. Tuy nhiên, MEV Boost giới thiệu **ký quỹ** chịu trách nhiệm cung cấp [tính khả dụng của dữ liệu](/developers/docs/data-availability/) bằng cách lưu trữ các phần thân khối do người xây dựng gửi và các tiêu đề khối do người xác thực gửi. Ở đây, một người xác thực được kết nối với một rơ le yêu cầu các tải trọng thực thi có sẵn và sử dụng thuật toán sắp xếp của MEV Boost để chọn tiêu đề tải trọng có giá thầu cao nhất + tiền boa MEV.

#### API của Người xây dựng giảm thiểu tác động của MEV như thế nào? {#how-does-builder-api-curb-mev-impact}

Lợi ích cốt lõi của API của Người xây dựng là tiềm năng dân chủ hóa quyền truy cập vào các cơ hội MEV. Việc sử dụng các sơ đồ cam kết-tiết lộ giúp loại bỏ các giả định về lòng tin và giảm bớt rào cản gia nhập cho những người xác thực đang tìm cách hưởng lợi từ MEV. Điều này sẽ làm giảm áp lực đối với những người staking đơn lẻ trong việc tích hợp với các bể staking lớn để tăng lợi nhuận MEV.

Việc triển khai rộng rãi API của Người xây dựng sẽ khuyến khích sự cạnh tranh lớn hơn giữa những người xây dựng khối, điều này làm tăng khả năng chống kiểm duyệt. Khi những người xác thực xem xét giá thầu từ nhiều người xây dựng, một người xây dựng có ý định kiểm duyệt một hoặc nhiều giao dịch của người dùng phải trả giá cao hơn tất cả những người xây dựng không kiểm duyệt khác để thành công. Điều này làm tăng đáng kể chi phí kiểm duyệt người dùng và không khuyến khích hành vi này.

Một số dự án, chẳng hạn như MEV Boost, sử dụng API của Người xây dựng như một phần của cấu trúc tổng thể được thiết kế để cung cấp quyền riêng tư giao dịch cho một số bên nhất định, chẳng hạn như các nhà giao dịch đang cố gắng tránh các cuộc tấn công chạy trước/kẹp. Điều này đạt được bằng cách cung cấp một kênh liên lạc riêng tư giữa người dùng và người xây dựng khối. Không giống như các mempool được cấp phép được mô tả trước đó, cách tiếp cận này có lợi vì những lý do sau:

1. Sự tồn tại của nhiều người xây dựng trên thị trường khiến việc kiểm duyệt trở nên không thực tế, điều này mang lại lợi ích cho người dùng. Ngược lại, sự tồn tại của các bể tối tập trung và dựa trên sự tin cậy sẽ tập trung quyền lực vào tay một vài người xây dựng khối và làm tăng khả năng kiểm duyệt.

2. Phần mềm API của Người xây dựng là nguồn mở, cho phép bất kỳ ai cũng có thể cung cấp dịch vụ xây dựng khối. Điều này có nghĩa là người dùng không bị buộc phải sử dụng bất kỳ trình xây dựng khối cụ thể nào và cải thiện tính trung lập và không cần cấp phép của Ethereum. Hơn nữa, các nhà giao dịch tìm kiếm MEV sẽ không vô tình góp phần vào việc tập trung hóa bằng cách sử dụng các kênh giao dịch riêng tư.

## Tài nguyên liên quan {#related-resources}

- [Tài liệu Flashbots](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Công cụ theo dõi với các thống kê thời gian thực cho các relay của MEV-Boost và người xây dựng khối_

## Đọc thêm {#further-reading}

- [Giá trị có thể khai thác của thợ đào (MEV) là gì?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV và Tôi](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum là một khu rừng tối](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Thoát khỏi Khu rừng tối](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Chạy trước Khủng hoảng MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Chủ đề MEV của @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Kiến trúc Flashbots sẵn sàng cho The Merge](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [MEV Boost là gì](https://www.alchemy.com/overviews/mev-boost)
- [Tại sao nên chạy mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Sách Hướng dẫn của Người quá giang về Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
