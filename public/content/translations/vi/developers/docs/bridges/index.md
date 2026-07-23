---
title: "Cầu nối"
description: "Tổng quan về cầu nối dành cho nhà phát triển"
lang: vi
---

Với sự phát triển mạnh mẽ của các chuỗi khối lớp 1 (l1) và các giải pháp [mở rộng quy mô](/developers/docs/scaling/) lớp 2 (l2), cùng với số lượng ngày càng tăng các ứng dụng phi tập trung (dapp) hoạt động chuỗi chéo, nhu cầu giao tiếp và di chuyển tài sản qua các chuỗi đã trở thành một phần thiết yếu của cơ sở hạ tầng mạng lưới. Các loại cầu nối khác nhau tồn tại để giúp biến điều này thành hiện thực.

## Nhu cầu về cầu nối {#need-for-bridges}

Các cầu nối tồn tại để kết nối các mạng lưới chuỗi khối. Chúng cho phép khả năng kết nối và khả năng tương tác giữa các chuỗi khối.

Các chuỗi khối tồn tại trong các môi trường biệt lập, nghĩa là không có cách nào để các chuỗi khối giao dịch và giao tiếp với các chuỗi khối khác một cách tự nhiên. Do đó, mặc dù có thể có hoạt động và sự đổi mới đáng kể trong một hệ sinh thái, nhưng nó bị giới hạn bởi sự thiếu kết nối và khả năng tương tác với các hệ sinh thái khác.

Các cầu nối cung cấp một cách để các môi trường chuỗi khối bị cô lập kết nối với nhau. Chúng thiết lập một tuyến đường vận chuyển giữa các chuỗi khối, nơi các token, thông điệp, dữ liệu tùy ý và thậm chí cả các lệnh gọi [hợp đồng thông minh](/developers/docs/smart-contracts/) có thể được chuyển từ chuỗi này sang chuỗi khác.

## Lợi ích của cầu nối {#benefits-of-bridges}

Nói một cách đơn giản, các cầu nối mở khóa vô số trường hợp sử dụng bằng cách cho phép các mạng lưới chuỗi khối trao đổi dữ liệu và di chuyển tài sản giữa chúng.

Các chuỗi khối có những điểm mạnh, điểm yếu và cách tiếp cận riêng để xây dựng ứng dụng (chẳng hạn như tốc độ, thông lượng, chi phí, v.v.). Các cầu nối giúp phát triển toàn bộ hệ sinh thái tiền mã hóa bằng cách cho phép các chuỗi khối tận dụng những đổi mới của nhau.

Đối với các nhà phát triển, các cầu nối cho phép những điều sau:

- việc chuyển bất kỳ dữ liệu, thông tin và tài sản nào qua các chuỗi.
- mở khóa các tính năng và trường hợp sử dụng mới cho các giao thức vì các cầu nối mở rộng không gian thiết kế cho những gì các giao thức có thể cung cấp. Ví dụ: một giao thức để khai thác lợi suất ban đầu được triển khai trên [Mạng chính Ethereum](/) có thể cung cấp các nhóm thanh khoản trên tất cả các chuỗi tương thích với EVM.
- cơ hội tận dụng thế mạnh của các chuỗi khối khác nhau. Ví dụ: các nhà phát triển có thể hưởng lợi từ mức phí thấp hơn do các giải pháp lớp 2 (l2) khác nhau cung cấp bằng cách triển khai các dapp của họ trên các bản cuộn và chuỗi phụ (sidechain), và người dùng có thể sử dụng cầu nối qua lại giữa chúng.
- sự hợp tác giữa các nhà phát triển từ các hệ sinh thái chuỗi khối khác nhau để xây dựng các sản phẩm mới.
- thu hút người dùng và cộng đồng từ các hệ sinh thái khác nhau đến với các dapp của họ.

## Các cầu nối hoạt động như thế nào? {#how-do-bridges-work}

Mặc dù có nhiều [loại thiết kế cầu nối](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), có ba cách nổi bật để tạo điều kiện thuận lợi cho việc chuyển tài sản chuỗi chéo:

- **Khóa và đúc –** Khóa tài sản trên chuỗi nguồn và đúc tài sản trên chuỗi đích.
- **Đốt và đúc –** Đốt tài sản trên chuỗi nguồn và đúc tài sản trên chuỗi đích.
- **Hoán đổi nguyên tử –** Hoán đổi tài sản trên chuỗi nguồn lấy tài sản trên chuỗi đích với một bên khác.

## Các loại cầu nối {#bridge-types}

Các cầu nối thường có thể được phân loại vào một trong các nhóm sau:

- **Cầu nối gốc (Native bridges) –** Các cầu nối này thường được xây dựng để khởi động thanh khoản trên một chuỗi khối cụ thể, giúp người dùng dễ dàng chuyển tiền vào hệ sinh thái hơn. Ví dụ: [Cầu nối Arbitrum](https://bridge.arbitrum.io/) được xây dựng để tạo thuận lợi cho người dùng sử dụng cầu nối từ Mạng chính Ethereum sang Arbitrum. Các cầu nối khác như vậy bao gồm Cầu nối Polygon PoS, [Cổng Optimism](https://app.optimism.io/bridge), v.v.
- **Cầu nối dựa trên trình xác thực hoặc nguồn cấp dữ liệu –** Các cầu nối này dựa vào một tập hợp trình xác thực bên ngoài hoặc các nguồn cấp dữ liệu để xác thực các giao dịch chuyển chuỗi chéo. Ví dụ: Multichain và Across.
- **Cầu nối truyền thông điệp tổng quát –** Các cầu nối này có thể chuyển tài sản, cùng với các thông điệp và dữ liệu tùy ý qua các chuỗi. Ví dụ: Axelar, LayerZero và Nomad.
- **Mạng lưới thanh khoản –** Các cầu nối này chủ yếu tập trung vào việc chuyển tài sản từ chuỗi này sang chuỗi khác thông qua các hoán đổi nguyên tử. Nhìn chung, chúng không hỗ trợ truyền thông điệp chuỗi chéo. Ví dụ: Connext và Hop.

## Những đánh đổi cần xem xét {#trade-offs}

Với các cầu nối, không có giải pháp nào là hoàn hảo. Thay vào đó, chỉ có những sự đánh đổi được thực hiện để hoàn thành một mục đích. Các nhà phát triển và người dùng có thể đánh giá các cầu nối dựa trên các yếu tố sau:

- **Bảo mật –** Ai xác minh hệ thống? Các cầu nối được bảo mật bởi các trình xác thực bên ngoài thường kém an toàn hơn so với các cầu nối được bảo mật cục bộ hoặc nguyên bản bởi các trình xác thực của chuỗi khối.
- **Sự tiện lợi –** Mất bao lâu để hoàn thành một giao dịch và người dùng cần ký bao nhiêu giao dịch? Đối với một nhà phát triển, mất bao lâu để tích hợp một cầu nối và quá trình này phức tạp như thế nào?
- **Khả năng kết nối –** Các chuỗi đích khác nhau mà một cầu nối có thể kết nối là gì (tức là các bản cuộn, chuỗi phụ, các chuỗi khối lớp 1 khác, v.v.) và việc tích hợp một chuỗi khối mới khó đến mức nào?
- **Khả năng truyền dữ liệu phức tạp hơn –** Một cầu nối có thể cho phép chuyển các thông điệp và dữ liệu tùy ý phức tạp hơn qua các chuỗi hay nó chỉ hỗ trợ chuyển tài sản chuỗi chéo?
- **Hiệu quả chi phí –** Chi phí chuyển tài sản qua các chuỗi thông qua một cầu nối là bao nhiêu? Thông thường, các cầu nối tính một khoản phí cố định hoặc biến đổi tùy thuộc vào chi phí Gas và thanh khoản của các tuyến đường cụ thể. Việc đánh giá hiệu quả chi phí của một cầu nối dựa trên số vốn cần thiết để đảm bảo an ninh của nó cũng rất quan trọng.

Ở cấp độ cao, các cầu nối có thể được phân loại thành cầu nối tin cậy (trusted) và không cần tin cậy (trustless).

- **Tin cậy (Trusted) –** Các cầu nối tin cậy được xác minh từ bên ngoài. Chúng sử dụng một tập hợp các trình xác minh bên ngoài (Các liên đoàn với đa chữ ký, hệ thống tính toán đa bên, mạng lưới nguồn cấp dữ liệu) để gửi dữ liệu qua các chuỗi. Do đó, chúng có thể cung cấp khả năng kết nối tuyệt vời và cho phép truyền thông điệp tổng quát hoàn toàn qua các chuỗi. Chúng cũng có xu hướng hoạt động tốt về tốc độ và hiệu quả chi phí. Điều này phải trả giá bằng tính bảo mật, vì người dùng phải dựa vào tính bảo mật của cầu nối.
- **Không cần tin cậy (Trustless) –** Các cầu nối này dựa vào các chuỗi khối mà chúng đang kết nối và các trình xác thực của chúng để chuyển các thông điệp và token. Chúng 'không cần tin cậy' vì chúng không thêm các giả định tin cậy mới (ngoài các chuỗi khối). Do đó, các cầu nối không cần tin cậy được coi là an toàn hơn các cầu nối tin cậy.

Để đánh giá các cầu nối không cần tin cậy dựa trên các yếu tố khác, chúng ta phải chia chúng thành các cầu nối truyền thông điệp tổng quát và mạng lưới thanh khoản.

- **Cầu nối truyền thông điệp tổng quát –** Các cầu nối này vượt trội về bảo mật và khả năng chuyển dữ liệu phức tạp hơn qua các chuỗi. Thông thường, chúng cũng tốt về hiệu quả chi phí. Tuy nhiên, những điểm mạnh này thường phải trả giá bằng khả năng kết nối đối với các cầu nối máy khách nhẹ (ví dụ: IBC) và những hạn chế về tốc độ đối với các cầu nối optimistic (ví dụ: Nomad) sử dụng bằng chứng gian lận.
- **Mạng lưới thanh khoản –** Các cầu nối này sử dụng hoán đổi nguyên tử để chuyển tài sản và là các hệ thống được xác minh cục bộ (tức là chúng sử dụng các trình xác thực của các chuỗi khối cơ sở để xác minh các giao dịch). Do đó, chúng vượt trội về bảo mật và tốc độ. Hơn nữa, chúng được coi là tương đối hiệu quả về chi phí và cung cấp khả năng kết nối tốt. Tuy nhiên, sự đánh đổi lớn nhất là việc chúng không có khả năng truyền dữ liệu phức tạp hơn – vì chúng không hỗ trợ truyền thông điệp chuỗi chéo.

## Rủi ro với các cầu nối {#risk-with-bridges}

Các cầu nối chiếm ba [vụ hack lớn nhất trong tài chính phi tập trung (DeFi)](https://rekt.news/leaderboard/) hàng đầu và vẫn đang trong giai đoạn phát triển ban đầu. Việc sử dụng bất kỳ cầu nối nào đều mang theo những rủi ro sau:

- **Rủi ro hợp đồng thông minh –** Mặc dù nhiều cầu nối đã vượt qua các cuộc kiểm toán thành công, nhưng chỉ cần một lỗ hổng trong hợp đồng thông minh là tài sản có thể bị lộ trước các vụ hack (ví dụ: [Cầu nối Wormhole của Solana](https://rekt.news/wormhole-rekt/)).
- **Rủi ro tài chính hệ thống** – Nhiều cầu nối sử dụng các tài sản được bọc (wrapped assets) để đúc các phiên bản chuẩn của tài sản gốc trên một chuỗi mới. Điều này khiến hệ sinh thái gặp rủi ro hệ thống, vì chúng ta đã thấy các phiên bản bọc của token bị khai thác.
- **Rủi ro đối tác –** Một số cầu nối sử dụng thiết kế tin cậy yêu cầu người dùng phải dựa vào giả định rằng các trình xác thực sẽ không thông đồng để đánh cắp tiền của người dùng. Việc người dùng cần phải tin tưởng các tác nhân bên thứ ba này khiến họ gặp phải các rủi ro như rút thảm (rug pull), kiểm duyệt và các hoạt động độc hại khác.
- **Các vấn đề mở –** Do các cầu nối đang trong giai đoạn phát triển non trẻ, có nhiều câu hỏi chưa được giải đáp liên quan đến cách các cầu nối sẽ hoạt động trong các điều kiện thị trường khác nhau, như thời điểm tắc nghẽn mạng lưới và trong các sự kiện không lường trước được như các cuộc tấn công cấp mạng lưới hoặc khôi phục trạng thái. Sự không chắc chắn này đặt ra những rủi ro nhất định, mức độ của chúng vẫn chưa được biết rõ.

## Các dapp có thể sử dụng cầu nối như thế nào? {#how-can-dapps-use-bridges}

Dưới đây là một số ứng dụng thực tế mà các nhà phát triển có thể xem xét về các cầu nối và đưa dapp của họ lên chuỗi chéo:

### Tích hợp các cầu nối {#integrating-bridges}

Đối với các nhà phát triển, có nhiều cách để thêm hỗ trợ cho các cầu nối:

1. **Tự xây dựng cầu nối của riêng bạn –** Việc xây dựng một cầu nối an toàn và đáng tin cậy không hề dễ dàng, đặc biệt nếu bạn đi theo con đường tối thiểu hóa niềm tin hơn. Hơn nữa, nó đòi hỏi nhiều năm kinh nghiệm và chuyên môn kỹ thuật liên quan đến các nghiên cứu về khả năng mở rộng và khả năng tương tác. Ngoài ra, nó sẽ yêu cầu một đội ngũ thực hành để duy trì một cầu nối và thu hút đủ thanh khoản để làm cho nó khả thi.

2. **Hiển thị cho người dùng nhiều tùy chọn cầu nối –** Nhiều [dapp](/developers/docs/dapps/) yêu cầu người dùng phải có token gốc của họ để tương tác với chúng. Để cho phép người dùng truy cập token của họ, họ cung cấp các tùy chọn cầu nối khác nhau trên trang web của mình. Tuy nhiên, phương pháp này là một cách khắc phục nhanh chóng cho vấn đề vì nó đưa người dùng ra khỏi giao diện dapp và vẫn yêu cầu họ tương tác với các dapp và cầu nối khác. Đây là một trải nghiệm tiếp nhận người dùng cồng kềnh với phạm vi mắc lỗi tăng lên.

3. **Tích hợp một cầu nối –** Giải pháp này không yêu cầu dapp gửi người dùng đến các giao diện cầu nối và sàn giao dịch phi tập trung (DEX) bên ngoài. Nó cho phép các dapp cải thiện trải nghiệm tiếp nhận người dùng. Tuy nhiên, cách tiếp cận này có những hạn chế của nó:

   - Việc đánh giá và bảo trì các cầu nối rất khó khăn và tốn thời gian.
   - Việc chọn một cầu nối tạo ra một điểm lỗi và sự phụ thuộc duy nhất.
   - Dapp bị giới hạn bởi các khả năng của cầu nối.
   - Chỉ riêng các cầu nối có thể không đủ. Các dapp có thể cần các DEX để cung cấp nhiều chức năng hơn như hoán đổi chuỗi chéo.

4. **Tích hợp nhiều cầu nối –** Giải pháp này giải quyết nhiều vấn đề liên quan đến việc tích hợp một cầu nối duy nhất. Tuy nhiên, nó cũng có những hạn chế, vì việc tích hợp nhiều cầu nối tiêu tốn nhiều tài nguyên và tạo ra chi phí kỹ thuật và giao tiếp cho các nhà phát triển—nguồn tài nguyên khan hiếm nhất trong lĩnh vực tiền mã hóa.

5. **Tích hợp một công cụ tổng hợp cầu nối –** Một tùy chọn khác cho các dapp là tích hợp một giải pháp tổng hợp cầu nối cung cấp cho họ quyền truy cập vào nhiều cầu nối. Các công cụ tổng hợp cầu nối kế thừa thế mạnh của tất cả các cầu nối và do đó không bị giới hạn bởi khả năng của bất kỳ cầu nối đơn lẻ nào. Đáng chú ý, các công cụ tổng hợp cầu nối thường duy trì các tích hợp cầu nối, điều này giúp dapp tránh khỏi rắc rối khi phải luôn cập nhật các khía cạnh kỹ thuật và hoạt động của một tích hợp cầu nối.

Mặc dù vậy, các công cụ tổng hợp cầu nối cũng có những hạn chế của chúng. Ví dụ: mặc dù chúng có thể cung cấp nhiều tùy chọn cầu nối hơn, nhưng thường có nhiều cầu nối khác có sẵn trên thị trường ngoài những cầu nối được cung cấp trên nền tảng của công cụ tổng hợp. Hơn nữa, giống như các cầu nối, các công cụ tổng hợp cầu nối cũng phải đối mặt với các rủi ro về hợp đồng thông minh và công nghệ (nhiều hợp đồng thông minh hơn = nhiều rủi ro hơn).

Nếu một dapp đi theo con đường tích hợp một cầu nối hoặc một công cụ tổng hợp, sẽ có các tùy chọn khác nhau dựa trên mức độ sâu của việc tích hợp. Ví dụ: nếu đó chỉ là tích hợp giao diện người dùng (front-end) để cải thiện trải nghiệm tiếp nhận người dùng, một dapp sẽ tích hợp tiện ích (widget). Tuy nhiên, nếu việc tích hợp là để khám phá các chiến lược chuỗi chéo sâu hơn như đặt cọc, khai thác lợi suất, v.v., dapp sẽ tích hợp SDK hoặc API.

### Triển khai một dapp trên nhiều chuỗi {#deploying-a-dapp-on-multiple-chains}

Để triển khai một dapp trên nhiều chuỗi, các nhà phát triển có thể sử dụng các nền tảng phát triển như [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), v.v. Thông thường, các nền tảng này đi kèm với các plugin có khả năng kết hợp có thể cho phép các dapp hoạt động chuỗi chéo. Ví dụ: các nhà phát triển có thể sử dụng một proxy triển khai xác định do [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy) cung cấp.

#### Ví dụ: {#examples}

- [Cách xây dựng các dapp chuỗi chéo](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Xây dựng một thị trường NFT chuỗi chéo](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Xây dựng các dapp NFT chuỗi chéo](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Giám sát hoạt động của hợp đồng qua các chuỗi {#monitoring-contract-activity-across-chains}

Để giám sát hoạt động của hợp đồng qua các chuỗi, các nhà phát triển có thể sử dụng các đồ thị con (subgraph) và các nền tảng dành cho nhà phát triển như Tenderly để quan sát các hợp đồng thông minh trong thời gian thực. Các nền tảng như vậy cũng có các công cụ cung cấp chức năng giám sát dữ liệu lớn hơn cho các hoạt động chuỗi chéo, chẳng hạn như kiểm tra các [sự kiện được phát ra bởi các hợp đồng](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), v.v.

#### Công cụ {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Đọc thêm {#further-reading}

- [Cầu nối chuỗi khối](/bridges/) – ethereum.org
- [Khung rủi ro cầu nối L2BEAT](https://l2beat.com/bridges/summary)
- [Cầu nối chuỗi khối: Xây dựng mạng lưới của các mạng lưới tiền mã hóa](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 tháng 9, 2021 – Dmitriy Berenzon
- [Bộ ba bất khả thi về khả năng tương tác](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 tháng 10, 2021 – Arjun Bhuptani
- [Cụm: Cách các cầu nối tin cậy & tối thiểu hóa niềm tin định hình bối cảnh đa chuỗi](https://blog.celestia.org/clusters/) - 4 tháng 10, 2021 – Mustafa Al-Bassam
- [LI.FI: Với các cầu nối, niềm tin là một phổ](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 tháng 4, 2022 – Arjun Chand
- [Trạng thái của các giải pháp khả năng tương tác Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 tháng 6, 2024 – Alex Hook
- [Khai thác bảo mật chia sẻ cho khả năng tương tác chuỗi chéo an toàn: Các ủy ban trạng thái Lagrange và hơn thế nữa](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 tháng 6, 2024 – Emmanuel Awosika

Ngoài ra, đây là một số bài thuyết trình sâu sắc của [James Prestwich](https://twitter.com/_prestwich) có thể giúp phát triển sự hiểu biết sâu sắc hơn về các cầu nối:

- [Xây dựng cầu nối, không phải những khu vườn có tường bao quanh](https://youtu.be/ZQJWMiX4hT0)
- [Phân tích các cầu nối](https://youtu.be/b0mC-ZqN8Oo)
- [Tại sao các cầu nối lại bốc cháy](https://youtu.be/c7cm2kd20j8)