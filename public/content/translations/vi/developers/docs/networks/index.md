---
title: "Mạng"
description: "Tổng quan về các mạng của Ethereum và nơi nhận ether testnet (ETH) để thử nghiệm ứng dụng của bạn."
lang: vi
---

Mạng lưới Ethereum là nhóm máy tính được kết nối sử dụng giao thức Ethereum để giao tiếp. Chỉ có một mạng chính Ethereum, nhưng các mạng độc lập tuân theo cùng một bộ quy tắc giao thức được tạo ra để thử nghiệm và phát triển. Có nhiều "mạng lưới" độc lập tuân theo giao thức mà không tương tác với nhau. Bạn có thể bắt đầu một mạng cục bộ trên máy tính của bạn để có thể thử nghiệm hợp đồng thông minh và ứng dụng Web3.

Tài khoản Ethereum của bạn sẽ hoạt động trên các mạng lưới khác nhau, nhưng số dư tài khoản và lịch sử giao dịch của bạn sẽ không được chuyển lên từ mạng Ethereum chính. Đối với mục đích thử nghiệm, sẽ rất có ích nếu biết rõ mạng lưới nào đang khả dụng và cách nhận testnet ETH để trải nghiệm. Nói chung, về yếu tố bảo mật, sử dụng lại một tài khoản mạng chính trên mạng lưới thử nghiệm là không được khuyến khích và ngược lại.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu [những điều cơ bản về Ethereum](/developers/docs/intro-to-ethereum/) trước khi tìm hiểu về các mạng khác nhau, vì các mạng thử nghiệm sẽ cung cấp cho bạn một phiên bản Ethereum giá rẻ, an toàn để thử nghiệm.

## Mạng công khai {#public-networks}

Các mạng lưới công cộng có thể được truy cập bởi bất kì ai trên thế giới có kết nối internet. Bất kỳ ai cũng có thể đọc hoặc tạo giao dịch trên chuỗi khối công cộng và xác minh các giao dịch đang được thực thi. Sự đồng thuận giữa các cá nhân ngang hàng sẽ quyết định việc thêm các giao dịch và trạng thái của mạng lưới.

### Mạng chính Ethereum {#ethereum-mainnet}

Mainnet là chuỗi khối Etherem công cộng chính, nơi các giao dịch có giá trị thực diễn ra trên sổ cái phân tán.

Khi cộng đồng và các sàn giao dịch bàn tán về giá ETH, nghĩa là họ đang nói về Mainnet ETH.

### Các mạng thử nghiệm Ethereum {#ethereum-testnets}

Bên cạnh Mainnet, còn có những mạng testnet công cộng. Đây là những mạng lưới được sử dụng bởi các nhà phát triển giao thức và các nhà phát triển hợp đồng thông minh để kiểm tra các nâng cấp giao thức cũng như các hợp đồng thông minh tiềm năng trong môi trường sản xuất tương tự trước khi triển khai trên Mainnet. Hãy nghĩ về điều này như một sự tương tự như máy chủ sản xuất so với máy chủ staging.

Bạn nên thử nghiệm code của bất cứ hợp đồng nào bạn viết trên testnet trước khi triển khai trên Mainnet. Trong số các ứng dụng phi tập trung (dapp) được tích hợp với các hợp đồng thông minh hiện nay, hầu hết các dự án này đều có bản sao triển khai trên testnet.

Hầu hết mạng thử nghiệm ban đầu bắt đầu bằng việc sử dụng cơ chế đồng thuận bằng chứng ủy quyền (Proof-of-Authority) được cấp quyền hạng. Điều này có nghĩa là một số lượng nhỏ các nút được chọn để xác thực giao dịch và tạo khối mới – đặt cược danh tính của họ trong quá trình này. Thay vào đó, một số tính năng của mạng thử nghiệm mở cơ chế đồng thuận bằng chứng cổ phần nơi mà mọi người có thể chạy nút xác thực, giống như mạng chính Ethereum.

ETH trên mạng thử nghiệm sẽ không có giá trị thực; tuy nhiên, nếu chúng được thị trường tạo ra cho một số loại mạng thử nghiệm ETH đã trở nên khan hiếm và khó kiếm được. Vì bạn càn ETH để có thể tương tác với mạng Ethereum (thậm chí là mạng thử nghiệm), nhiều người sẽ lấy ETH mạng thử nghiệm từ phân phối (Faucets). Hầu hết faucets là các ứng dụng web nơi bạn có thể nhập địa chỉ mà bạn yêu cầu gửi ETH tới.

#### Tôi nên dùng testnet nào?

Hai mạng thử nghiệm công khai mà nhà lập trình Client thực sự đang duy trì là Sepolia và Hoodi. Sepolia là mạng lưới cho hợp đồng và nhà phát triển ứng dụng để thử nghiệm ứng dụng của họ. Mạng Hoodi cho phép nhà lập trình giao thức thử nghiệm nâng cấp mạng lưới, và giúp người Stake thử nghiệm vận hành nút xác thực.

#### Sepolia {#sepolia}

**Sepolia được khuyến nghị cho thử nghiệm phát triển ứng dụng mặc định**. Mạng Sepolia sử dụng một tập hợp trình xác thực được cấp phép do các đội ngũ client và thử nghiệm kiểm soát.

##### Các nguồn

- [Trang web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Vòi Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Vòi Chain Platform Sepolia](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Vòi Chainstack Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Vòi Hệ sinh thái Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Vòi ethfaucet.com Sepolia](https://ethfaucet.com/networks/ethereum)
- [Vòi Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Vòi Infura Sepolia](https://www.infura.io/faucet)
- [Vòi PoW](https://sepolia-faucet.pk910.de/)
- [Vòi QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi là một mạng thử nghiệm dùng để thử nghiệm xác thực và Staking. Mạng Hoodi cho phép người dùng muốn chạy nút xác thực cho mạng thử nghiệm. Người Stake muốn thử nghiệm nâng cấp giao thức trước khi họ tiến hành trên mạng chính nên sử dụng Hoodi.

- Đội ngũ xác thực mở, người đặt cược có thể thử nghiệm các bản nâng cấp mạng lưới
- Trạng thái lớn, có ích cho việc thử nghiệm các tương tác giữa các hợp đồng thông minh phức tạp
- Đông bộ hoá lâu hơn và yêu cầu bộ nhớ cao hơn để vận hành một nút

##### Các nguồn

- [Trang web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Trình khám phá](https://explorer.hoodi.ethpandaops.io/)
- [Đồng bộ hóa điểm kiểm tra](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Vòi Chain Platform Hoodi](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Vòi Hoodi](https://hoodi.ethpandaops.io/)
- [Vòi PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery là một mạng thử nghiệm độc nhất luôn được đặt lại vào mỗi tháng. Trạng thái thực thi và đồng thuận được đảo ngược về khởi nguyên mỗi 28 ngày, điều đó có nghĩa là những gì diễn ra trên mạng lưới là nhanh chóng phai mờ. Điều này phù hợp cho những thử nghiệm ngắn hạn, khởi tạo node nhanh và các ứng dụng kiểu “hello world” không cần tính lâu dài.

- Một trạng thái mới, thử nghiệm ngắn hạn cho các nút xác thực và ứng dụng
- Chỉ bao gồm bộ hợp đồng cơ bản
- Mở một bộ nút xác thực và dễ dàng tiếp cận một lượng lớn tài sản
- Yêu câu của nút nhỏ nhất và đồng bộ nhanh nhất, trung bình &lt;5GB

##### Các nguồn

- [Trang web](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Trò chuyện cộng đồng](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Trình khám phá Beacon](https://beaconlight.ephemery.dev/)
- [Đồng bộ hóa điểm kiểm tra](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Bệ phóng](https://launchpad.ephemery.dev/)

#### Faucets

- [Vòi Bordel](https://faucet.bordel.wtf/)
- [Vòi PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (không còn được dùng) {#holesky}

Mạng thử nghiệm Holesky sẽ bị ngừng sử dụng kể từ tháng 9 năm 2025. Những người vận hành Staking và nhà cung cấp cơ sở hạ tầng nên sử dụng Hoodi thay để thử nghiệm nút xác thực.

- [Thông báo Ngừng hoạt động Mạng thử nghiệm Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, ngày 1 tháng 9 năm 2025_
- [Cập nhật Mạng thử nghiệm Holesky và Hoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _Blog EF, ngày 18 tháng 3 năm 2025_

### Các mạng thử nghiệm Lớp 2 {#layer-2-testnets}

[Lớp 2 (L2)](/layer-2/) là một thuật ngữ chung để mô tả một tập hợp các giải pháp mở rộng quy mô cụ thể của Ethereum. Một layer 2 là một chuỗi khối riêng biệt giúp mở rộng Ethereum và kế thừa sự bảo mật của Ethereum. Testnet của các Layer 2 thường được kết hợp chặt chẽ với các testnet công cộng của Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Một mạng thử nghiệm cho [Arbitrum](https://arbitrum.io/).

##### Các nguồn

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Vòi Alchemy Arbitrum Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Vòi Chainlink Arbitrum Sepolia](https://faucets.chain.link/arbitrum-sepolia)
- [Vòi ethfaucet.com Arbitrum Sepolia](https://ethfaucet.com/networks/arbitrum)
- [Vòi QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Một mạng thử nghiệm cho [Optimism](https://www.optimism.io/).

##### Các nguồn

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Vòi Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Vòi Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Vòi ethfaucet.com Optimism Sepolia](https://ethfaucet.com/networks/optimism)
- [Vòi mạng thử nghiệm](https://docs.optimism.io/app-developers/tools/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Một mạng thử nghiệm cho [Starknet](https://www.starknet.io).

##### Các nguồn

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucets

- [Vòi Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Vòi Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Vòi Starknet](https://starknet-faucet.vercel.app/)

## Mạng riêng tư {#private-networks}

Một mạng Ethereum là mạng riêng tư nếu các nút của nó không được kết nối với mạng công cộng (ví dụ: Mạng chính hoặc mạng thử nghiệm). Trong bối cảnh này, riêng tư chỉ có nghĩa là dành riêng hoặc bị cô lập, thay vì được bảo vệ hoặc an toàn.

### Mạng phát triển {#development-networks}

Khi phát triển một ứng dụng Ethereum, bạn sẽ muốn chạy thử trên một mạng lưới riêng tư để xem nó hoạt động thế nào trước khi triển khai nó. Tương tự như cách bạn tạo một máy chủ cục bộ trên máy tính của mình để phát triển web, bạn có thể tạo một phiên bản chuỗi khối cục bộ để kiểm tra dapp của mình. Điều này cho phép sự lặp lại diễn ra nhanh hơn nhiều so với testnet công cộng.

Có một vài dự án và các công cụ dành riêng cho mục đích hỗ trợ quá trình này. Tìm hiểu thêm về [mạng phát triển](/developers/docs/development-networks/).

### Mạng liên hợp {#consortium-networks}

Quá trình đồng thuận được kiểm soát bởi một tập hợp các nút đáng tin cậy được xác định trước. Ví dụ, một mạng lưới riêng tư của các tổ chức học thuật nổi tiếng mà mỗi tổ chức sẽ điều hành một node duy nhất và các khối được xác minh bởi một số lượng chữ kí nhất định trong mạng lưới.

Nếu một mạng lưới Ethereum công khai giống như internet công cộng, thì một mạng lưới tập đoàn sẽ giống như internet nội bộ.

## <Emoji text="🚉" /> Tại sao các mạng thử nghiệm Ethereum được đặt tên theo các ga tàu điện ngầm? {#why-naming}

Nhiều mạng thử nghiệm Ethereum được đặt tên theo các ga tàu điện ngầm hoặc ga tàu hỏa ngoài đời thực. Truyền thống đặt tên này bắt đầu từ sớm và phản ánh các thành phố toàn cầu nơi những người đóng góp đã sống hoặc làm việc. Điều này mang tính biểu tượng, dễ nhớ và thiết thực. Cũng giống như các mạng thử nghiệm được tách biệt khỏi mạng chính Ethereum, các tuyến tàu điện ngầm cũng chạy tách biệt với giao thông trên mặt đất.

### <Emoji text="🚧" /> Các mạng thử nghiệm thường dùng và cũ {#common-and-legacy-testnets}

- **Sepolia** - Một khu phố được kết nối bằng tàu điện ngầm ở Athens, Hy Lạp. Hiện được sử dụng để thử nghiệm hợp đồng thông minh và ứng dụng phi tập trung.
- **Hoodi** - Được đặt theo tên ga tàu điện ngầm Hoodi ở Bengaluru, Ấn Độ. Được sử dụng để thử nghiệm trình xác thực và nâng cấp giao thức.
- **Goerli** _(không còn được dùng)_ - Được đặt theo tên của Görlitzer Bahnhof ở Berlin, Đức.
- **Rinkeby** _(không còn được dùng)_ - Được đặt theo tên một vùng ngoại ô của Stockholm có ga tàu điện ngầm.
- **Ropsten** _(không còn được dùng)_ - Ám chỉ một khu vực và bến phà/nhà ga tàu điện ngầm cũ ở Stockholm.
- **Kovan** _(không còn được dùng)_ - Được đặt tên theo một ga MRT của Singapore.
- **Morden** _(không còn được dùng)_ - Được đặt theo tên một ga Tàu điện ngầm London. Mạng thử nghiệm công khai đầu tiên của Ethereum.

### <Emoji text="🧪" /> Các mạng thử nghiệm chuyên dụng khác {#other-testnets}

Một số mạng thử nghiệm được tạo ra để thử nghiệm ngắn hạn hoặc dành riêng cho nâng cấp và không nhất thiết phải theo chủ đề tàu điện ngầm:

- **Holesky** _(không còn được dùng)_ - Được đặt theo tên của nhà ga Holešovice ở Praha. Được sử dụng để thử nghiệm trình xác thực; không còn được dùng vào năm 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tất cả đều không còn được dùng)_ và **Ephemery** - Được xây dựng chuyên cho các mô phỏng nâng cấp như The Merge, Shanghai, hoặc các thử nghiệm trình xác thực. Một số tên theo vùng hoặc theo chủ đề chứ không dựa trên tàu điện ngầm.

Việc sử dụng tên các ga tàu điện ngầm giúp các nhà phát triển nhanh chóng xác định và ghi nhớ các mạng thử nghiệm mà không cần phải dựa vào ID chuỗi dạng số. Nó cũng phản ánh văn hóa của Ethereum: thiết thực, toàn cầu và lấy con người làm trung tâm.

## Các công cụ liên quan {#related-tools}

- [Chainlist](https://chainlist.org/) _danh sách các mạng EVM để kết nối ví và nhà cung cấp với ID chuỗi và ID mạng phù hợp_
- [Các chuỗi dựa trên EVM](https://github.com/ethereum-lists/chains) _repo GitHub chứa siêu dữ liệu chuỗi hỗ trợ Chainlist_

## Đọc thêm {#further-reading}

- [Đề xuất: Vòng đời có thể dự đoán của Mạng thử nghiệm Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Sự phát triển của các mạng thử nghiệm Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
