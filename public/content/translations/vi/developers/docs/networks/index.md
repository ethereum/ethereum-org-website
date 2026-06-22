---
title: Mạng lưới
description: Tổng quan về các mạng lưới của Ethereum và nơi nhận ether (ETH) mạng thử nghiệm để thử nghiệm ứng dụng của bạn.
lang: vi
---

Các mạng lưới [Ethereum](/) là các nhóm máy tính được kết nối giao tiếp với nhau bằng giao thức Ethereum. Chỉ có một Mạng chính Ethereum duy nhất, nhưng các mạng lưới độc lập tuân thủ cùng các quy tắc giao thức có thể được tạo ra cho mục đích thử nghiệm và phát triển. Có nhiều "mạng lưới" độc lập tuân thủ giao thức mà không tương tác với nhau. Bạn thậm chí có thể khởi chạy một mạng lưới cục bộ trên máy tính của riêng mình để thử nghiệm các hợp đồng thông minh và ứng dụng Web3 của bạn.

Tài khoản Ethereum của bạn sẽ hoạt động trên các mạng lưới khác nhau, nhưng số dư tài khoản và lịch sử giao dịch của bạn sẽ không được chuyển sang từ mạng lưới Ethereum chính. Đối với mục đích thử nghiệm, việc biết những mạng lưới nào có sẵn và cách nhận ETH mạng thử nghiệm để thử nghiệm là rất hữu ích. Nhìn chung, vì lý do bảo mật, không nên sử dụng lại các tài khoản Mạng chính trên các mạng thử nghiệm hoặc ngược lại.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu [những điều cơ bản về Ethereum](/developers/docs/intro-to-ethereum/) trước khi tìm hiểu về các mạng lưới khác nhau, vì các mạng thử nghiệm sẽ cung cấp cho bạn một phiên bản Ethereum rẻ và an toàn để thử nghiệm.

## Các mạng lưới công khai {#public-networks}

Các mạng lưới công khai có thể được truy cập bởi bất kỳ ai trên thế giới có kết nối internet. Bất kỳ ai cũng có thể đọc hoặc tạo các giao dịch trên một chuỗi khối công khai và xác thực các giao dịch đang được thực thi. Sự đồng thuận giữa các máy ngang hàng quyết định việc đưa vào các giao dịch và trạng thái của mạng lưới.

### Mạng chính Ethereum {#ethereum-mainnet}

Mạng chính là chuỗi khối sản xuất Ethereum công khai chính, nơi các giao dịch có giá trị thực tế diễn ra trên sổ cái phân tán.

Khi mọi người và các sàn giao dịch thảo luận về giá ETH, họ đang nói về ETH Mạng chính.

### Các mạng thử nghiệm Ethereum {#ethereum-testnets}

Ngoài Mạng chính, còn có các mạng thử nghiệm công khai. Đây là các mạng lưới được sử dụng bởi các nhà phát triển giao thức hoặc nhà phát triển hợp đồng thông minh để thử nghiệm cả các bản nâng cấp giao thức cũng như các hợp đồng thông minh tiềm năng trong một môi trường giống như sản xuất trước khi triển khai lên Mạng chính. Hãy coi điều này tương tự như máy chủ sản xuất so với máy chủ dàn dựng (staging).

Bạn nên thử nghiệm bất kỳ mã hợp đồng nào bạn viết trên một mạng thử nghiệm trước khi triển khai lên Mạng chính. Trong số các ứng dụng phi tập trung (dapp) tích hợp với các hợp đồng thông minh hiện có, hầu hết các dự án đều có các bản sao được triển khai trên các mạng thử nghiệm.

Hầu hết các mạng thử nghiệm bắt đầu bằng cách sử dụng cơ chế đồng thuận bằng chứng ủy quyền (PoA) có cấp phép. Điều này có nghĩa là một số lượng nhỏ các nút được chọn để xác thực các giao dịch và tạo các khối mới – đặt cọc danh tính của họ trong quá trình này. Ngoài ra, một số mạng thử nghiệm có cơ chế đồng thuận Bằng chứng cổ phần (PoS) mở, nơi mọi người có thể thử nghiệm chạy một trình xác thực, giống như Mạng chính Ethereum.

ETH trên các mạng thử nghiệm được cho là không có giá trị thực; tuy nhiên, đã có những thị trường được tạo ra cho một số loại ETH mạng thử nghiệm trở nên khan hiếm hoặc khó kiếm. Vì bạn cần ETH để thực sự tương tác với Ethereum (ngay cả trên các mạng thử nghiệm), hầu hết mọi người nhận ETH mạng thử nghiệm miễn phí từ các vòi. Hầu hết các vòi là các ứng dụng web nơi bạn có thể nhập một địa chỉ mà bạn yêu cầu gửi ETH đến.

#### Tôi nên sử dụng mạng thử nghiệm nào? {#which-testnet-should-i-use}

Hai mạng thử nghiệm công khai mà các nhà phát triển máy khách hiện đang duy trì là Sepolia và Hoodi. Sepolia là một mạng lưới dành cho các nhà phát triển hợp đồng và ứng dụng để thử nghiệm các ứng dụng của họ. Mạng lưới Hoodi cho phép các nhà phát triển giao thức thử nghiệm các bản nâng cấp mạng lưới và cho phép những người đặt cọc thử nghiệm chạy các trình xác thực.

#### Sepolia {#sepolia}

**Sepolia là mạng thử nghiệm mặc định được khuyến nghị cho việc phát triển ứng dụng**. Mạng lưới Sepolia sử dụng một tập hợp trình xác thực có cấp phép được kiểm soát bởi các nhóm máy khách và thử nghiệm.

##### Tài nguyên {#hoodi}

- [Trang web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Các vòi {#ephemery}

- [Vòi Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Vòi Chain Platform Sepolia](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Vòi Chainstack Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Vòi Ethereum Ecosystem](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Vòi ethfaucet.com Sepolia](https://ethfaucet.com/networks/ethereum)
- [Vòi Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Vòi Infura Sepolia](https://www.infura.io/faucet)
- [Vòi PoW](https://sepolia-faucet.pk910.de/)
- [Vòi QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#faucets}

Hoodi là một mạng thử nghiệm để thử nghiệm việc xác thực và đặt cọc. Mạng lưới Hoodi mở cho những người dùng muốn chạy một trình xác thực mạng thử nghiệm. Do đó, những người đặt cọc muốn thử nghiệm các bản nâng cấp giao thức trước khi chúng được triển khai lên Mạng chính nên sử dụng Hoodi.

- Tập hợp trình xác thực mở, những người đặt cọc có thể thử nghiệm các bản nâng cấp mạng lưới
- Trạng thái lớn, hữu ích cho việc thử nghiệm các tương tác hợp đồng thông minh phức tạp
- Mất nhiều thời gian hơn để đồng bộ hóa và yêu cầu nhiều dung lượng lưu trữ hơn để chạy một nút

##### Tài nguyên {#holesky}

- [Trang web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Trình khám phá](https://explorer.hoodi.ethpandaops.io/)
- [Đồng bộ hóa điểm kiểm tra](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Các vòi {#layer-2-testnets}

- [Vòi Chain Platform Hoodi](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Vòi Hoodi](https://hoodi.ethpandaops.io/)
- [Vòi PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#arbitrum-sepolia}

Ephemery là một loại mạng thử nghiệm độc đáo được thiết lập lại hoàn toàn mỗi tháng. Trạng thái thực thi và đồng thuận quay trở lại nguyên thủy (genesis) mỗi 28 ngày, điều này có nghĩa là bất cứ điều gì xảy ra trên mạng thử nghiệm đều là phù du. Điều này làm cho nó trở nên lý tưởng cho việc thử nghiệm ngắn hạn, khởi động nút nhanh và các loại ứng dụng 'hello world' không cần tính lâu dài.

- Trạng thái luôn mới, thử nghiệm ngắn hạn các trình xác thực và ứng dụng
- Chỉ bao gồm tập hợp các hợp đồng cơ bản
- Tập hợp trình xác thực mở và dễ dàng tiếp cận số lượng lớn tiền
- Yêu cầu nút nhỏ nhất và đồng bộ hóa nhanh nhất, trung bình &lt;5GB

##### Tài nguyên {#optimistic-sepolia}

- [Trang web](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Trò chuyện cộng đồng](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Trình khám phá Beacon](https://beaconlight.ephemery.dev/)
- [Đồng bộ hóa điểm kiểm tra](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Các vòi {#starknet-sepolia}

- [Vòi Bordel](https://faucet.bordel.wtf/)
- [Vòi Pk910 PoW](https://ephemery-faucet.pk910.de/)

#### Holesky (đã ngừng hoạt động) {#private-networks}

Mạng thử nghiệm Holesky đã ngừng hoạt động kể từ tháng 9 năm 2025. Các nhà điều hành đặt cọc và nhà cung cấp cơ sở hạ tầng nên sử dụng Hoodi để thử nghiệm trình xác thực thay thế.

- [Thông báo ngừng hoạt động mạng thử nghiệm Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1-Tháng 9-2025_
- [Cập nhật mạng thử nghiệm Holesky và Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog EF, 18-Tháng 3-2025_

### Các mạng thử nghiệm lớp 2 {#development-networks}

[lớp 2 (l2)](/layer-2/) là một thuật ngữ chung để mô tả một tập hợp cụ thể các giải pháp mở rộng quy mô Ethereum. Một lớp 2 là một chuỗi khối riêng biệt mở rộng Ethereum và kế thừa các đảm bảo bảo mật của Ethereum. Các mạng thử nghiệm lớp 2 thường được liên kết chặt chẽ với các mạng thử nghiệm Ethereum công khai.

#### Arbitrum Sepolia {#consortium-networks}

Một mạng thử nghiệm cho [Arbitrum](https://arbitrum.io/).

##### Tài nguyên {#why-naming}

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Các vòi {#common-and-legacy-testnets}

- [Vòi Alchemy Arbitrum Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Vòi Chainlink Arbitrum Sepolia](https://faucets.chain.link/arbitrum-sepolia)
- [Vòi ethfaucet.com Arbitrum Sepolia](https://ethfaucet.com/networks/arbitrum)
- [Vòi QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#other-testnets}

Một mạng thử nghiệm cho [Optimism](https://www.optimism.io/).

##### Tài nguyên {#related-tools}

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Các vòi {#further-reading}

- [Vòi Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Vòi Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Vòi ethfaucet.com Optimism Sepolia](https://ethfaucet.com/networks/optimism)
- [Vòi mạng thử nghiệm](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia

Một mạng thử nghiệm cho [Starknet](https://www.starknet.io).

##### Tài nguyên

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Các vòi

- [Vòi Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Vòi Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Vòi Starknet](https://starknet-faucet.vercel.app/)

## Các mạng lưới riêng tư

Một mạng lưới Ethereum là một mạng lưới riêng tư nếu các nút của nó không được kết nối với một mạng lưới công khai (tức là Mạng chính hoặc một mạng thử nghiệm). Trong ngữ cảnh này, riêng tư chỉ có nghĩa là được dành riêng hoặc bị cô lập, chứ không phải là được bảo vệ hoặc an toàn.

### Các mạng lưới phát triển

Để phát triển một ứng dụng Ethereum, bạn sẽ muốn chạy nó trên một mạng lưới riêng tư để xem nó hoạt động như thế nào trước khi triển khai nó. Tương tự như cách bạn tạo một máy chủ cục bộ trên máy tính của mình để phát triển web, bạn có thể tạo một phiên bản chuỗi khối cục bộ để thử nghiệm ứng dụng phi tập trung (dapp) của mình. Điều này cho phép lặp lại nhanh hơn nhiều so với một mạng thử nghiệm công khai.

Có các dự án và công cụ chuyên dụng để hỗ trợ việc này. Tìm hiểu thêm về [các mạng lưới phát triển](/developers/docs/development-networks/).

### Các mạng lưới liên minh

Quá trình đồng thuận được kiểm soát bởi một tập hợp các nút được xác định trước và đáng tin cậy. Ví dụ, một mạng lưới riêng tư của các tổ chức học thuật đã biết, mỗi tổ chức quản lý một nút duy nhất và các khối được xác thực bởi một ngưỡng những người ký kết trong mạng lưới.

Nếu một mạng lưới Ethereum công khai giống như internet công cộng, thì một mạng lưới liên minh giống như một mạng nội bộ (intranet) riêng tư.

## <Emoji text="🚉" /> Tại sao các mạng thử nghiệm Ethereum được đặt tên theo các trạm tàu điện ngầm?

Nhiều mạng thử nghiệm Ethereum được đặt tên theo các trạm tàu điện ngầm hoặc nhà ga xe lửa trong thế giới thực. Truyền thống đặt tên này bắt đầu từ sớm và phản ánh các thành phố toàn cầu nơi những người đóng góp đã sống hoặc làm việc. Nó mang tính biểu tượng, dễ nhớ và thiết thực. Giống như các mạng thử nghiệm bị cô lập khỏi Mạng chính Ethereum, các tuyến tàu điện ngầm chạy tách biệt với giao thông trên mặt đất.

### <Emoji text="🚧" /> Các mạng thử nghiệm thường dùng và cũ

- **Sepolia** - Một khu phố có kết nối tàu điện ngầm ở Athens, Hy Lạp. Hiện được sử dụng để thử nghiệm hợp đồng thông minh và dapp.
- **Hoodi** - Được đặt tên theo trạm tàu điện ngầm Hoodi ở Bengaluru, Ấn Độ. Được sử dụng để thử nghiệm trình xác thực và nâng cấp giao thức.
- **Goerli** _(đã ngừng hoạt động)_ - Được đặt tên theo Görlitzer Bahnhof ở Berlin, Đức.
- **Rinkeby** _(đã ngừng hoạt động)_ - Được đặt tên theo một vùng ngoại ô Stockholm có trạm tàu điện ngầm.
- **Ropsten** _(đã ngừng hoạt động)_ - Đề cập đến một khu vực và bến phà/tàu điện ngầm cũ ở Stockholm.
- **Kovan** _(đã ngừng hoạt động)_ - Được đặt tên theo một trạm MRT ở Singapore.
- **Morden** _(đã ngừng hoạt động)_ - Được đặt tên theo một trạm Tàu điện ngầm London. Mạng thử nghiệm công khai đầu tiên của Ethereum.

### <Emoji text="🧪" /> Các mạng thử nghiệm chuyên biệt khác

Một số mạng thử nghiệm được tạo ra cho việc thử nghiệm ngắn hạn hoặc dành riêng cho bản nâng cấp và không nhất thiết phải theo chủ đề tàu điện ngầm:

- **Holesky** _(đã ngừng hoạt động)_ - Được đặt tên theo trạm Holešovice ở Praha. Được sử dụng để thử nghiệm trình xác thực; đã ngừng hoạt động vào năm 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tất cả đều đã ngừng hoạt động)_ và **Ephemery** - Được xây dựng có mục đích cho các mô phỏng nâng cấp như The Merge, Thượng Hải hoặc các thử nghiệm trình xác thực. Một số tên mang tính khu vực hoặc theo chủ đề thay vì dựa trên tàu điện ngầm.

Việc sử dụng tên các trạm tàu điện ngầm giúp các nhà phát triển nhanh chóng xác định và ghi nhớ các mạng thử nghiệm mà không cần phải dựa vào các ID chuỗi bằng số. Nó cũng phản ánh văn hóa của Ethereum: thiết thực, toàn cầu và lấy con người làm trung tâm.

## Các công cụ liên quan

- [Chainlist](https://chainlist.org/) _danh sách các mạng lưới EVM để kết nối ví và nhà cung cấp với ID chuỗi và ID mạng lưới phù hợp_
- [Các chuỗi dựa trên EVM](https://github.com/ethereum-lists/chains) _Kho lưu trữ GitHub về siêu dữ liệu chuỗi cung cấp sức mạnh cho Chainlist_

## Đọc thêm

- [Đề xuất: Vòng đời mạng thử nghiệm Ethereum có thể dự đoán được](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Sự tiến hóa của các mạng thử nghiệm Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)