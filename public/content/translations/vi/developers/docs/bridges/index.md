---
title: "Các cầu nối"
description: "Tổng quan về cầu nối cho các nhà phát triển"
lang: vi
---

Với sự gia tăng của các chuỗi khối L1 và các giải pháp [mở rộng](/developers/docs/scaling/) L2, cùng với số lượng ngày càng tăng của các ứng dụng phi tập trung hoạt động xuyên chuỗi, nhu cầu về giao tiếp và di chuyển tài sản giữa các chuỗi đã trở thành một phần thiết yếu của hạ tầng mạng. Có nhiều loại cầu nối khác nhau tồn tại để giúp điều này trở nên khả thi.

## Nhu cầu về cầu nối {#need-for-bridges}

Cầu tôn tại để kết nối các mạng lưới chuỗi khối. Chúng cho phép khả năng kết nối và khả năng tương tác giữa các chuỗi khối.

Các chuỗi khối tồn tại trong những môi trường tách biệt, nghĩa là không có cách nào để các chuỗi khối tự nhiên trao đổi và giao tiếp với các chuỗi khối khác. Do đó, mặc dù có thể có nhiều hoạt động và đổi mới đáng kể trong một hệ sinh thái, nhưng nó vẫn bị giới hạn bởi sự thiếu kết nối và khả năng tương tác với các hệ sinh thái khác.

Cầu nối mang đến một cách thức để các môi trường chuỗi khối tách biệt có thể kết nối với nhau. Chúng thiết lập một tuyến đường truyền giữa các chuỗi khối, nơi token, thông điệp, dữ liệu tùy ý và thậm chí cả lời gọi [hợp đồng thông minh](/developers/docs/smart-contracts/) có thể được chuyển từ chuỗi này sang chuỗi khác.

## Lợi ích của cầu nối {#benefits-of-bridges}

Nói một cách đơn giản, cầu nối mở ra nhiều trường hợp sử dụng bằng cách cho phép các mạng chuỗi khối trao đổi dữ liệu và di chuyển tài sản giữa chúng.

Các chuỗi khối có những điểm mạnh, điểm yếu và cách tiếp cận riêng trong việc xây dựng ứng dụng (chẳng hạn như tốc độ, thông lượng, chi phí, v.v.). Cầu nối hỗ trợ sự phát triển của toàn bộ hệ sinh thái tiền mã hóa bằng cách cho phép các chuỗi khối tận dụng những đổi mới của nhau.

Đối với các nhà phát triển, cầu nối cho phép những điều sau:

- việc chuyển bất kỳ dữ liệu, thông tin và tài sản nào giữa các chuỗi.
- mở khóa các tính năng và trường hợp sử dụng mới cho các giao thức khi cầu nối mở rộng không gian thiết kế cho những gì mà các giao thức có thể cung cấp. Ví dụ, một giao thức yield farming được triển khai ban đầu trên Ethereum Mainnet có thể cung cấp các pool thanh khoản trên tất cả các chuỗi tương thích với EVM.
- cơ hội tận dụng những điểm mạnh của các chuỗi khối khác nhau. Ví dụ, các nhà phát triển có thể hưởng lợi từ mức phí thấp hơn do các giải pháp L2 cung cấp bằng cách triển khai ứng dụng phi tập trung của họ trên các rollup và sidechain, và người dùng có thể sử dụng cầu nối để di chuyển giữa chúng.
- sự hợp tác giữa các nhà phát triển từ nhiều hệ sinh thái chuỗi khối khác nhau để xây dựng các sản phẩm mới.
- thu hút người dùng và cộng đồng từ nhiều hệ sinh thái khác nhau đến với các ứng dụng phi tập trung của họ.

## Các cầu nối hoạt động thế nào? {#how-do-bridges-work}

Mặc dù có nhiều [loại thiết kế cầu nối](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), ba cách nổi bật để hỗ trợ việc chuyển tài sản xuyên chuỗi là:

- **Khóa và đúc –** Khóa tài sản trên chuỗi nguồn và đúc tài sản trên chuỗi đích.
- **Đốt và đúc –** Đốt tài sản trên chuỗi nguồn và đúc tài sản trên chuỗi đích.
- **Hoán đổi nguyên tử –** Hoán đổi tài sản trên chuỗi nguồn lấy tài sản trên chuỗi đích với một bên khác.

## Các loại cầu nối {#bridge-types}

Các cầu nối thường có thể được phân loại vào một trong các nhóm sau:

- **Cầu nối gốc –** Những cầu nối này thường được xây dựng để khởi tạo thanh khoản trên một chuỗi khối cụ thể, giúp người dùng dễ dàng chuyển tiền vào hệ sinh thái đó. Ví dụ: [Arbitrum Bridge](https://bridge.arbitrum.io/) được xây dựng để giúp người dùng thuận tiện khi kết nối từ Ethereum Mainnet sang Arbitrum. Các cầu nối tương tự khác bao gồm Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), v.v.
- **Cầu nối dựa trên người xác thực hoặc oracle –** Những cầu nối này dựa vào một tập hợp người xác thực bên ngoài hoặc các oracle để xác minh các giao dịch chuyển xuyên chuỗi. Ví dụ: Multichain và Across.
- **Cầu nối truyền thông điệp tổng quát –** Những cầu nối này có thể chuyển tài sản cùng với thông điệp và dữ liệu tùy ý giữa các chuỗi. Ví dụ: Axelar, LayerZero và Nomad.
- **Mạng lưới thanh khoản –** Những cầu nối này chủ yếu tập trung vào việc chuyển tài sản từ chuỗi này sang chuỗi khác thông qua các hoán đổi nguyên tử. Thông thường, chúng không hỗ trợ việc truyền thông điệp xuyên chuỗi. Ví dụ: Connext và Hop.

## Những đánh đổi cần cân nhắc {#trade-offs}

Với các cầu nối, không có giải pháp nào là hoàn hảo. Thay vào đó, chỉ có những đánh đổi được thực hiện để phục vụ một mục đích. Các nhà phát triển và người dùng có thể đánh giá các cầu nối dựa trên các yếu tố sau:

- **Bảo mật –** Ai là người xác minh hệ thống? Các cầu nối được bảo mật bởi những người xác thực bên ngoài thường kém an toàn hơn so với các cầu nối được bảo mật cục bộ hoặc bảo mật gốc bởi những người xác thực của chính chuỗi khối.
- **Tiện lợi –** Mất bao lâu để hoàn tất một giao dịch và người dùng cần ký bao nhiêu giao dịch? Đối với một nhà phát triển, việc tích hợp một cầu nối mất bao lâu và quá trình đó phức tạp đến mức nào?
- **Khả năng kết nối –** Cầu nối có thể kết nối với những chuỗi đích khác nhau nào (ví dụ: rollup, chuỗi bên, các chuỗi khối lớp 1 khác, v.v.) và việc tích hợp một chuỗi khối mới khó đến mức nào?
- **Khả năng truyền dữ liệu phức tạp hơn –** Liệu một cầu nối có thể cho phép truyền thông điệp và dữ liệu tùy ý phức tạp hơn giữa các chuỗi, hay nó chỉ hỗ trợ chuyển tài sản xuyên chuỗi?
- **Hiệu quả chi phí –** Việc chuyển tài sản xuyên chuỗi thông qua một cầu nối tốn bao nhiêu chi phí? Thông thường, các cầu nối tính một khoản phí cố định hoặc biến đổi tùy thuộc vào chi phí gas và thanh khoản của các tuyến cụ thể. Việc đánh giá hiệu quả chi phí của một cầu nối dựa trên lượng vốn cần thiết để đảm bảo tính bảo mật của nó cũng là điều rất quan trọng.

Ở mức độ khái quát, các cầu nối có thể được phân loại thành có niềm tin và không cần niềm tin.

- **Có niềm tin –** Các cầu nối có niềm tin được xác minh bởi bên ngoài. Chúng sử dụng một tập hợp trình xác minh bên ngoài (Liên đoàn với đa chữ ký, hệ thống tính toán đa bên, mạng lưới oracle) để gửi dữ liệu giữa các chuỗi. Do đó, chúng có thể cung cấp khả năng kết nối tuyệt vời và cho phép truyền thông điệp tổng quát hoàn toàn giữa các chuỗi. Chúng cũng có xu hướng hoạt động tốt về tốc độ và hiệu quả chi phí. Điều này phải đánh đổi bằng tính bảo mật, vì người dùng phải dựa vào mức độ an toàn của chính cầu nối.
- **Không cần niềm tin –** Những cầu nối này dựa vào các chuỗi khối mà chúng kết nối và những người xác thực của các chuỗi đó để chuyển thông điệp và token. Chúng được gọi là “không cần niềm tin” vì chúng không thêm các giả định niềm tin mới (ngoài các chuỗi khối). Do đó, các cầu nối không cần niềm tin được xem là an toàn hơn so với các cầu nối có niềm tin.

Để đánh giá các cầu nối không cần niềm tin dựa trên những yếu tố khác, chúng ta phải phân loại chúng thành cầu nối truyền thông điệp tổng quát và mạng lưới thanh khoản.

- **Cầu nối truyền thông điệp tổng quát –** Những cầu nối này nổi trội về mặt bảo mật và khả năng truyền dữ liệu phức tạp hơn giữa các chuỗi. Thông thường, chúng cũng có hiệu quả chi phí tốt. Tuy nhiên, những điểm mạnh này thường phải đánh đổi bằng khả năng kết nối đối với các cầu nối light client (ví dụ: IBC) và hạn chế về tốc độ đối với các cầu nối lạc quan (ví dụ: Nomad) sử dụng bằng chứng gian lận.
- **Mạng lưới thanh khoản –** Những cầu nối này sử dụng hoán đổi nguyên tử để chuyển tài sản và là các hệ thống được xác minh cục bộ (tức là chúng sử dụng những người xác thực của các chuỗi khối nền tảng để xác minh giao dịch). Do đó, chúng nổi trội về bảo mật và tốc độ. Hơn nữa, chúng được xem là có hiệu quả chi phí tương đối và cung cấp khả năng kết nối tốt. Tuy nhiên, sự đánh đổi lớn nhất là chúng không thể truyền dữ liệu phức tạp hơn – vì chúng không hỗ trợ việc truyền thông điệp xuyên chuỗi.

## Rủi ro với cầu nối {#risk-with-bridges}

Các cầu nối chiếm ba [vụ tấn công lớn nhất trong DeFi](https://rekt.news/leaderboard/) và vẫn đang ở giai đoạn đầu của quá trình phát triển. Việc sử dụng bất kỳ cầu nối nào cũng tiềm ẩn các rủi ro sau:

- **Rủi ro hợp đồng thông minh –** Mặc dù nhiều cầu nối đã vượt qua các cuộc kiểm toán thành công, nhưng chỉ cần một lỗ hổng trong hợp đồng thông minh là tài sản có thể bị phơi bày trước các cuộc tấn công (ví dụ: [Wormhole Bridge của Solana](https://rekt.news/wormhole-rekt/)).
- **Rủi ro tài chính hệ thống** – Nhiều cầu nối sử dụng tài sản được bọc để đúc ra các phiên bản chuẩn của tài sản gốc trên một chuỗi mới. Điều này khiến hệ sinh thái phải đối mặt với rủi ro hệ thống, như chúng ta đã thấy các phiên bản token được bọc từng bị khai thác.
- **Rủi ro đối tác –** Một số cầu nối sử dụng thiết kế có niềm tin, yêu cầu người dùng dựa trên giả định rằng những người xác thực sẽ không thông đồng để đánh cắp tiền của người dùng. Việc người dùng phải đặt niềm tin vào các bên thứ ba này khiến họ đối mặt với các rủi ro như rug pull, kiểm duyệt và các hoạt động độc hại khác.
- **Các vấn đề còn bỏ ngỏ –** Do các cầu nối vẫn đang trong giai đoạn sơ khai của quá trình phát triển, có nhiều câu hỏi chưa có lời giải liên quan đến cách chúng sẽ hoạt động trong các điều kiện thị trường khác nhau, chẳng hạn như khi mạng bị tắc nghẽn hoặc trong những sự kiện bất ngờ như tấn công ở cấp độ mạng hay quay lui trạng thái. Sự không chắc chắn này tạo ra một số rủi ro, mức độ của chúng vẫn chưa được xác định.

## Các dapp có thể sử dụng cầu nối như thế nào? {#how-can-dapps-use-bridges}

Dưới đây là một số ứng dụng thực tiễn mà các nhà phát triển có thể cân nhắc về cầu và việc đưa dapp của họ hoạt động đa chuỗi:

### Tích hợp cầu nối {#integrating-bridges}

Đối với các nhà phát triển, có nhiều cách để thêm hỗ trợ cho các cầu:

1. **Xây dựng cầu nối của riêng bạn –** Xây dựng một cầu nối bảo mật và đáng tin cậy không hề dễ dàng, đặc biệt nếu bạn chọn hướng tối thiểu hóa sự tin cậy. Hơn nữa, điều này đòi hỏi nhiều năm kinh nghiệm và chuyên môn kỹ thuật liên quan đến các nghiên cứu về khả năng mở rộng và khả năng tương tác. Ngoài ra, điều này còn đòi hỏi một đội ngũ trực tiếp vận hành để duy trì cầu nối và thu hút đủ thanh khoản để làm cho nó khả thi.

2. **Hiển thị cho người dùng nhiều tùy chọn cầu nối –** Nhiều [ứng dụng phi tập trung](/developers/docs/dapps/) yêu cầu người dùng phải có token gốc của họ để tương tác. Để người dùng có thể truy cập token của mình, họ cung cấp nhiều tùy chọn cầu nối khác nhau trên trang web của họ. Tuy nhiên, phương pháp này chỉ là giải pháp tạm thời cho vấn đề, vì nó đưa người dùng ra khỏi giao diện của dapp và vẫn yêu cầu họ tương tác với các dapp và cầu nối khác. Đây là một trải nghiệm onboarding rườm rà, với nguy cơ người dùng mắc lỗi cao hơn.

3. **Tích hợp một cầu nối –** Giải pháp này không yêu cầu ứng dụng phi tập trung phải dẫn người dùng đến các giao diện cầu nối và sàn giao dịch phi tập trung bên ngoài. Nó cho phép các ứng dụng phi tập trung cải thiện trải nghiệm onboarding của người dùng. Tuy nhiên, cách tiếp cận này cũng có những hạn chế:

   - Việc đánh giá và duy trì các cầu nối rất khó khăn và tốn thời gian.
   - Việc chọn một cầu nối duy nhất tạo ra một điểm thất bại và sự phụ thuộc duy nhất.
   - Ứng dụng phi tập trung bị giới hạn bởi khả năng của cầu nối.
   - Chỉ sử dụng cầu nối có thể sẽ chưa đủ. Các ứng dụng phi tập trung có thể cần các sàn DEX để cung cấp nhiều chức năng hơn, chẳng hạn như hoán đổi tài sản xuyên chuỗi.

4. **Tích hợp nhiều cầu nối –** Giải pháp này giải quyết nhiều vấn đề liên quan đến việc tích hợp chỉ một cầu nối duy nhất. Tuy nhiên, nó cũng có những hạn chế, vì việc tích hợp nhiều cầu nối tốn nhiều tài nguyên và tạo ra gánh nặng kỹ thuật cùng chi phí truyền thông cho các nhà phát triển — nguồn lực quý giá nhất trong lĩnh vực crypto.

5. **Tích hợp bộ tổng hợp cầu nối –** Một lựa chọn khác cho các ứng dụng phi tập trung là tích hợp giải pháp tổng hợp cầu nối, giúp họ truy cập vào nhiều cầu nối. Các bộ tổng hợp cầu nối kế thừa các điểm mạnh của tất cả các cầu nối và do đó không bị giới hạn bởi khả năng của bất kỳ cầu nối đơn lẻ nào. Đáng chú ý là các bộ tổng hợp cầu nối thường duy trì các tích hợp cầu nối, điều này giúp ứng dụng phi tập trung không phải bận tâm đến việc quản lý các khía cạnh kỹ thuật và vận hành của việc tích hợp cầu nối.

Tuy vậy, các bộ tổng hợp cầu nối cũng có những hạn chế của riêng chúng. Chẳng hạn, mặc dù chúng có thể cung cấp nhiều lựa chọn cầu nối hơn, nhưng trên thị trường thường có nhiều cầu nối khác ngoài những cầu nối được cung cấp trên nền tảng của bộ tổng hợp. Hơn nữa, cũng giống như các cầu nối, các bộ tổng hợp cầu nối cũng phải đối mặt với rủi ro từ hợp đồng thông minh và công nghệ (càng nhiều hợp đồng thông minh = càng nhiều rủi ro).

Nếu một ứng dụng phi tập trung đi theo hướng tích hợp một cầu nối hoặc một bộ tổng hợp, sẽ có những lựa chọn khác nhau tùy thuộc vào mức độ tích hợp được thực hiện sâu đến đâu. Chẳng hạn, nếu chỉ là tích hợp giao diện người dùng để cải thiện trải nghiệm khởi tạo cho người dùng, một ứng dụng phi tập trung sẽ tích hợp tiện ích. Tuy nhiên, nếu việc tích hợp nhằm khám phá các chiến lược xuyên chuỗi sâu hơn như staking, yield farming, v.v., thì ứng dụng phi tập trung sẽ tích hợp SDK hoặc API.

### Triển khai một ứng dụng phi tập trung trên nhiều chuỗi {#deploying-a-dapp-on-multiple-chains}

Để triển khai một ứng dụng phi tập trung trên nhiều chuỗi, các nhà phát triển có thể sử dụng các nền tảng phát triển như [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), v.v. Thông thường, các nền tảng này đi kèm với các plugin có thể kết hợp, cho phép các ứng dụng phi tập trung hoạt động xuyên chuỗi. Chẳng hạn, các nhà phát triển có thể sử dụng proxy triển khai xác định được cung cấp bởi [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Ví dụ:

- [Cách xây dựng các ứng dụng phi tập trung xuyên chuỗi](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Xây dựng một Sàn giao dịch NFT Xuyên chuỗi](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Xây dựng các ứng dụng phi tập trung NFT xuyên chuỗi](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Giám sát hoạt động hợp đồng trên các chuỗi {#monitoring-contract-activity-across-chains}

Để giám sát hoạt động hợp đồng trên nhiều chuỗi, các nhà phát triển có thể sử dụng subgraph và các nền tảng dành cho nhà phát triển như Tenderly để quan sát hợp đồng thông minh theo thời gian thực. Các nền tảng như vậy cũng có các công cụ cung cấp chức năng giám sát dữ liệu nâng cao hơn cho các hoạt động xuyên chuỗi, chẳng hạn như kiểm tra [các sự kiện được hợp đồng phát ra](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), v.v.

#### Công cụ

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Đọc thêm {#further-reading}

- [Cầu nối Chuỗi khối](/bridges/) – ethereum.org
- [Khuôn khổ Rủi ro Cầu nối L2Beat](https://l2beat.com/bridges/summary)
- [Cầu nối chuỗi khối: Xây dựng mạng lưới của các mạng mã hóa](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 tháng 9, 2021 – Dmitriy Berenzon
- [Thế khó ba của khả năng tương tác](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 tháng 10, 2021 – Arjun Bhuptani
- [Các cụm: Cách các cầu nối có niềm tin & tối thiểu hóa niềm tin định hình bối cảnh đa chuỗi](https://blog.celestia.org/clusters/) - 4 tháng 10, 2021 – Mustafa Al-Bassam
- [LI.FI: Với cầu nối, niềm tin là một phổ](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 tháng 4, 2022 – Arjun Chand
- [Tình trạng của các giải pháp tương tác Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 tháng 6, 2024 – Alex Hook
- [Tận dụng bảo mật chung cho khả năng tương tác chuỗi chéo an toàn: Lagrange State Committees và hơn thế nữa](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 tháng 6, 2024 – Emmanuel Awosika

Ngoài ra, dưới đây là một số bài thuyết trình giàu thông tin của [James Prestwich](https://twitter.com/_prestwich) có thể giúp phát triển sự hiểu biết sâu hơn về các cầu nối:

- [Xây dựng cầu nối, không phải những hệ sinh thái khép kín](https://youtu.be/ZQJWMiX4hT0)
- [Phân tích về cầu nối](https://youtu.be/b0mC-ZqN8Oo)
- [Tại sao những cầu nối lại bốc cháy](https://youtu.be/c7cm2kd20j8)
