---
title: Dòng thời gian của tất cả các đợt phân nhánh Ethereum (2014 đến nay)
description: Lịch sử của chuỗi khối Ethereum bao gồm các cột mốc, bản phát hành và đợt phân nhánh chính.
lang: vi
sidebarDepth: 1
authors: ["Nixo"]
---

Dòng thời gian của tất cả các cột mốc, đợt phân nhánh và bản cập nhật chính cho chuỗi khối [Ethereum](/).

<ExpandableCard title="Phân nhánh là gì?" contentPreview="Những thay đổi đối với các quy tắc của Giao thức Ethereum thường bao gồm các bản nâng cấp kỹ thuật theo kế hoạch.">

Phân nhánh là khi các bản nâng cấp hoặc thay đổi kỹ thuật lớn cần được thực hiện đối với mạng lưới – chúng thường bắt nguồn từ [Đề xuất Cải tiến Ethereum (EIP)](/eips/) và thay đổi các "quy tắc" của giao thức.

Khi cần nâng cấp trong phần mềm truyền thống, được kiểm soát tập trung, công ty sẽ chỉ cần phát hành một phiên bản mới cho người dùng cuối. Chuỗi khối hoạt động khác biệt vì không có quyền sở hữu tập trung. [Các máy khách Ethereum](/developers/docs/nodes-and-clients/) phải cập nhật phần mềm của họ để triển khai các quy tắc phân nhánh mới. Thêm vào đó, những người tạo khối (người khai thác trong thế giới Bằng chứng công việc (PoW), trình xác thực trong thế giới Bằng chứng cổ phần (PoS)) và các nút phải tạo khối và xác thực theo các quy tắc mới. [Tìm hiểu thêm về cơ chế đồng thuận](/developers/docs/consensus-mechanisms/)

Những thay đổi quy tắc này có thể tạo ra một sự chia tách tạm thời trong mạng lưới. Các khối mới có thể được tạo ra theo các quy tắc mới hoặc cũ. Các đợt phân nhánh thường được thống nhất trước để các máy khách áp dụng các thay đổi một cách đồng bộ và đợt phân nhánh với các bản nâng cấp sẽ trở thành chuỗi chính. Tuy nhiên, trong một số trường hợp hiếm hoi, những bất đồng về các đợt phân nhánh có thể khiến mạng lưới bị chia tách vĩnh viễn – đáng chú ý nhất là việc tạo ra Ethereum Classic với <a href="#dao-fork">phân nhánh DAO</a>.

</ExpandableCard>

<ExpandableCard title="Tại sao một số bản nâng cấp có nhiều tên?" contentPreview="Tên các bản nâng cấp tuân theo một quy tắc">

Phần mềm nền tảng của Ethereum bao gồm hai nửa, được gọi là [lớp thực thi](/glossary/#execution-layer) và [lớp đồng thuận](/glossary/#consensus-layer).

**Cách đặt tên bản nâng cấp thực thi**

Kể từ năm 2021, các bản nâng cấp cho **lớp thực thi** được đặt theo tên các thành phố [tổ chức Devcon và Devconnect trước đây](https://devcon.org/en/past-events/) theo thứ tự thời gian:

| Tên bản nâng cấp | Năm Devcon(nect) | Số Devcon | Ngày nâng cấp |
| -------------- | ----------------- | ------------- | ------------ |
| Berlin         | 2014              | 0             | 15 thg 4, 2021 |
| London         | 2015              | I             | 5 thg 8, 2021  |
| Thượng Hải       | 2016              | II            | 12 thg 4, 2023 |
| Cancun         | 2017              | III           | 13 thg 3, 2024 |
| Prague         | 2018              | IV            | 7 thg 5, 2025  |
| Osaka          | 2019              | V             | 3 thg 12, 2025  |
| **Amsterdam**  | 2022              | Devconnect    | Chưa xác định - Tiếp theo |
| _Bogotá_       | 2022              | VI            | Chưa xác định |
| _Istanbul_     | 2023              | Devconnect    | Chưa xác định |
| _Bangkok_      | 2024              | VII           | Chưa xác định |
| _Buenos Aires_ | 2025              | Devconnect    | Chưa xác định |
| _Mumbai_       | 2026              | VIII          | Chưa xác định |

**Cách đặt tên bản nâng cấp đồng thuận**

Kể từ khi ra mắt [Chuỗi Beacon](/glossary/#beacon-chain), các bản nâng cấp cho **lớp đồng thuận** được đặt theo tên các ngôi sao trên bầu trời bắt đầu bằng các chữ cái theo thứ tự bảng chữ cái:

| Tên bản nâng cấp                                              | Ngày nâng cấp |
| --------------------------------------------------------- | ------------ |
| Khởi nguyên Chuỗi Beacon                                      | 1 thg 12, 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 thg 10, 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 thg 9, 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 thg 4, 2023 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 thg 3, 2024 |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 thg 5, 2025  |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 thg 12, 2025  |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | Chưa xác định - Tiếp theo   |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Chưa xác định          |

**Cách đặt tên kết hợp**

Các bản nâng cấp thực thi và đồng thuận ban đầu được triển khai vào các thời điểm khác nhau, nhưng sau [The Merge](/roadmap/merge/) vào năm 2022, chúng đã được triển khai đồng thời. Do đó, các thuật ngữ thông dụng đã xuất hiện để đơn giản hóa việc tham chiếu đến các bản nâng cấp này bằng cách sử dụng một thuật ngữ kết hợp duy nhất. Điều này bắt đầu với bản nâng cấp _Thượng Hải-Capella_, thường được gọi là "**Shapella**", và được tiếp tục với các bản nâng cấp tiếp theo.

| Bản nâng cấp thực thi | Bản nâng cấp đồng thuận | Tên viết tắt    |
| ----------------- | ----------------- | ------------- |
| Thượng Hải          | Capella           | "Shapella"    |
| Cancun            | Deneb             | "Dencun"      |
| Prague            | Electra           | "Pectra"      |
| Osaka             | Fulu              | "Fusaka"      |
| Amsterdam         | Gloas             | "Glamsterdam" |
| Bogotá            | Heze              | "Hegotá"      |

</ExpandableCard>

Chuyển thẳng đến thông tin về một số bản nâng cấp đặc biệt quan trọng trong quá khứ: [Chuỗi Beacon](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); và [EIP-1559](#london)

Bạn đang tìm kiếm các bản nâng cấp giao thức trong tương lai? [Tìm hiểu về các bản nâng cấp sắp tới trên lộ trình Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Tìm hiểu thêm về Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Bản nâng cấp Prague-Electra ("Pectra") bao gồm một số cải tiến đối với Giao thức Ethereum nhằm nâng cao trải nghiệm cho tất cả người dùng, các mạng lưới lớp 2 (l2), người đặt cọc và người vận hành nút.

Việc đặt cọc đã được nâng cấp với các tài khoản trình xác thực có khả năng cộng dồn và cải thiện quyền kiểm soát đối với các khoản tiền đặt cọc bằng cách sử dụng địa chỉ rút tiền thực thi. EIP-7251 đã tăng số dư hiệu dụng tối đa cho một trình xác thực duy nhất lên 2048, cải thiện hiệu quả sử dụng vốn cho người đặt cọc. EIP-7002 cho phép một tài khoản thực thi kích hoạt các hành động của trình xác thực một cách an toàn, bao gồm thoát hoặc rút một phần tiền, cải thiện trải nghiệm cho người đặt cọc ETH, đồng thời giúp tăng cường trách nhiệm giải trình cho người vận hành nút.

Các phần khác của bản nâng cấp tập trung vào việc cải thiện trải nghiệm cho người dùng thông thường. EIP-7702 mang lại khả năng cho một tài khoản không phải hợp đồng thông minh thông thường ([EOA](/glossary/#eoa)) thực thi mã tương tự như một hợp đồng thông minh. Điều này đã mở khóa chức năng mới không giới hạn cho các tài khoản Ethereum truyền thống, chẳng hạn như gom lô giao dịch, tài trợ Gas, xác thực thay thế, kiểm soát chi tiêu có thể lập trình, cơ chế khôi phục tài khoản và hơn thế nữa.

<ExpandableCard title="Các EIP của Pectra" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

Trải nghiệm người dùng tốt hơn:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Thiết lập mã tài khoản EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Tăng thông lượng khối dữ liệu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Tăng chi phí dữ liệu lệnh gọi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Thêm lịch trình khối dữ liệu vào các tệp cấu hình EL</em></li>
</ul>

Trải nghiệm đặt cọc tốt hơn:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Tăng <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Các lượt thoát có thể kích hoạt từ lớp thực thi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Các yêu cầu lớp thực thi đa mục đích</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Cung cấp các khoản tiền đặt cọc của trình xác thực trên chuỗi</em></li>
</ul>

Cải thiện hiệu quả và bảo mật của Giao thức:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Hợp đồng tiền biên dịch cho các phép toán đường cong BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Lưu mã băm khối lịch sử trong trạng thái</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Di chuyển chỉ số ủy ban ra ngoài Chứng thực</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Cách Pectra sẽ nâng cao trải nghiệm đặt cọc](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Đọc thông số kỹ thuật của bản nâng cấp Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Câu hỏi thường gặp về Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Tóm tắt Cancun {#cancun-summary}

Bản nâng cấp Cancun bao gồm một tập hợp các cải tiến đối với quá trình _thực thi_ của Ethereum nhằm cải thiện khả năng mở rộng, song song với các bản nâng cấp đồng thuận Deneb.

Đáng chú ý, bản nâng cấp này bao gồm EIP-4844, được biết đến với tên gọi **Proto-Danksharding**, giúp giảm đáng kể chi phí lưu trữ dữ liệu cho các bản cuộn lớp 2. Điều này đạt được thông qua việc giới thiệu các "khối dữ liệu" (blob) cho phép các bản cuộn đăng dữ liệu lên Mạng chính trong một khoảng thời gian ngắn. Kết quả là phí giao dịch thấp hơn đáng kể cho người dùng của các bản cuộn lớp 2.

<ExpandableCard title="Các EIP của Cancun" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Các mã lệnh lưu trữ tạm thời</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Gốc khối beacon trong EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Giao dịch khối dữ liệu phân mảnh (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Lệnh sao chép bộ nhớ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> chỉ trong cùng một giao dịch</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Mã lệnh <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Các bản cuộn lớp 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Đọc thông số kỹ thuật của bản nâng cấp Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Tóm tắt Deneb {#deneb-summary}

Bản nâng cấp Deneb bao gồm một tập hợp các cải tiến đối với sự _đồng thuận_ của Ethereum nhằm cải thiện khả năng mở rộng. Bản nâng cấp này đi kèm với các bản nâng cấp thực thi Cancun để kích hoạt Proto-Danksharding (EIP-4844), cùng với các cải tiến khác cho Chuỗi Beacon.

Các "thông điệp tự nguyện thoát" đã ký được tạo sẵn không còn hết hạn nữa, do đó mang lại nhiều quyền kiểm soát hơn cho người dùng đặt cọc tiền của họ với người vận hành nút của bên thứ ba. Với thông điệp thoát đã ký này, người đặt cọc có thể ủy quyền vận hành nút trong khi vẫn duy trì khả năng thoát an toàn và rút tiền của họ bất cứ lúc nào mà không cần phải xin phép bất kỳ ai.

EIP-7514 mang đến sự thắt chặt đối với việc phát hành ETH bằng cách giới hạn tỷ lệ "ra vào" mà các trình xác thực có thể tham gia mạng lưới ở mức tám (8) mỗi Kỷ nguyên. Vì lượng ETH phát hành tỷ lệ thuận với tổng số ETH được đặt cọc, việc giới hạn số lượng trình xác thực tham gia sẽ giới hạn _tốc độ tăng trưởng_ của ETH mới được phát hành, đồng thời giảm yêu cầu phần cứng cho những người vận hành nút, giúp ích cho sự phi tập trung.

<ExpandableCard title="Các EIP của Deneb" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Gốc khối beacon trong EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Giao dịch khối dữ liệu phân mảnh</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Các lệnh tự nguyện thoát đã ký có hiệu lực vĩnh viễn</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Tăng khe bao gồm chứng thực tối đa</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Thêm giới hạn ra vào tối đa của Kỷ nguyên</em></li>
</ul>

</ExpandableCard>

- [Đọc thông số kỹ thuật của bản nâng cấp Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Câu hỏi thường gặp về Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Thượng Hải-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Tóm tắt Thượng Hải {#shanghai-summary}

Bản nâng cấp Thượng Hải đã mang tính năng rút tiền đặt cọc đến lớp thực thi. Song song với bản nâng cấp Capella, điều này cho phép các khối chấp nhận các hoạt động rút tiền, cho phép những người đặt cọc rút ETH của họ từ Chuỗi Beacon sang lớp thực thi.

<ExpandableCard title="Các EIP của Thượng Hải" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Khởi động ấm địa chỉ <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Lệnh <code>PUSH0</code> mới</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Giới hạn và đo lường initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Chuỗi Beacon đẩy các khoản rút tiền dưới dạng hoạt động</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Ngừng sử dụng <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Đọc thông số kỹ thuật của bản nâng cấp Thượng Hải](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Tóm tắt Capella {#capella-summary}

Bản nâng cấp Capella là bản nâng cấp lớn thứ ba đối với lớp đồng thuận (Chuỗi Beacon) và đã kích hoạt tính năng rút tiền đặt cọc. Capella diễn ra đồng bộ với bản nâng cấp lớp thực thi, Thượng Hải, và đã kích hoạt chức năng rút tiền đặt cọc.

Bản nâng cấp lớp đồng thuận này mang lại khả năng cho những người đặt cọc chưa cung cấp thông tin xác thực rút tiền cùng với khoản tiền đặt cọc ban đầu của họ có thể thực hiện điều đó, qua đó cho phép rút tiền.

Bản nâng cấp cũng cung cấp chức năng quét tài khoản tự động, liên tục xử lý các tài khoản trình xác thực cho bất kỳ khoản thanh toán phần thưởng nào có sẵn hoặc rút tiền toàn bộ.

- [Tìm hiểu thêm về việc rút tiền đặt cọc](/staking/withdrawals/).
- [Đọc thông số kỹ thuật của bản nâng cấp Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Tóm tắt {#paris-summary}

Bản nâng cấp Paris được kích hoạt khi Chuỗi khối Bằng chứng công việc (PoW) vượt qua [tổng độ khó cuối cùng](/glossary/#terminal-total-difficulty) là 58750000000000000000000. Điều này đã xảy ra tại khối 15537393 vào ngày 15 tháng 9 năm 2022, kích hoạt bản nâng cấp Paris ở khối tiếp theo. Paris là quá trình chuyển đổi [The Merge](/roadmap/merge/) - tính năng chính của nó là tắt thuật toán khai thác [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow) cùng logic đồng thuận liên quan và thay vào đó là bật [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos). Bản thân Paris là một bản nâng cấp cho các [ứng dụng khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) (tương đương với Bellatrix trên lớp đồng thuận) cho phép chúng nhận lệnh từ các [ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients) được kết nối. Điều này yêu cầu kích hoạt một tập hợp các phương thức API nội bộ mới, được gọi chung là [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Đây được cho là bản nâng cấp quan trọng nhất trong lịch sử Ethereum kể từ [Homestead](#homestead)!

- [Đọc thông số kỹ thuật của bản nâng cấp Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Các EIP của Paris" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Nâng cấp đồng thuận lên Bằng chứng cổ phần (PoS)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Thay thế mã lệnh DIFFICULTY bằng PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Tóm tắt {#bellatrix-summary}

Bản nâng cấp Bellatrix là bản nâng cấp theo lịch trình thứ hai cho [Chuỗi Beacon](/roadmap/beacon-chain), chuẩn bị Chuỗi cho [The Merge](/roadmap/merge/). Nó đưa các hình phạt đối với trình xác thực lên mức tối đa cho các hành vi không hoạt động và các vi phạm có thể bị phạt cắt giảm. Bellatrix cũng bao gồm một bản cập nhật cho các quy tắc lựa chọn phân nhánh để chuẩn bị Chuỗi cho The Merge và quá trình chuyển đổi từ khối Bằng chứng công việc (PoW) cuối cùng sang khối Bằng chứng cổ phần (PoS) đầu tiên. Điều này bao gồm việc làm cho các ứng dụng khách đồng thuận nhận biết được [tổng độ khó cuối cùng](/glossary/#terminal-total-difficulty) là 58750000000000000000000.

- [Đọc thông số kỹ thuật của bản nâng cấp Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Tóm tắt {#gray-glacier-summary}

Bản nâng cấp mạng lưới Gray Glacier đã đẩy lùi [bom độ khó](/glossary/#difficulty-bomb) thêm ba tháng. Đây là thay đổi duy nhất được giới thiệu trong bản nâng cấp này và có bản chất tương tự như các bản nâng cấp [Arrow Glacier](#arrow-glacier) và [Muir Glacier](#muir-glacier). Những thay đổi tương tự đã được thực hiện trên các bản nâng cấp mạng lưới [Byzantium](#byzantium), [Constantinople](#constantinople) và [London](#london).

- [Blog của EF - Thông báo về bản nâng cấp Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="Các EIP của Gray Glacier" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>trì hoãn bom độ khó cho đến tháng 9 năm 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Tóm tắt {#arrow-glacier-summary}

Bản nâng cấp mạng lưới Arrow Glacier đã đẩy lùi [bom độ khó](/glossary/#difficulty-bomb) thêm vài tháng. Đây là thay đổi duy nhất được giới thiệu trong bản nâng cấp này và có bản chất tương tự như bản nâng cấp [Muir Glacier](#muir-glacier). Các thay đổi tương tự đã được thực hiện trên các bản nâng cấp mạng lưới [Byzantium](#byzantium), [Constantinople](#constantinople) và [London](#london).

- [Blog của Tổ chức Ethereum - Thông báo nâng cấp Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - Bản nâng cấp Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Các EIP của Arrow Glacier" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>trì hoãn bom độ khó cho đến tháng 6 năm 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Tóm tắt {#altair-summary}

Bản nâng cấp Altair là bản nâng cấp được lên lịch đầu tiên cho [Chuỗi Beacon](/roadmap/beacon-chain). Nó đã bổ sung hỗ trợ cho "các ủy ban đồng bộ hóa" (sync committees)—cho phép các máy khách nhẹ (light clients), đồng thời tăng các hình phạt đối với sự không hoạt động của trình xác thực và phạt cắt giảm khi quá trình phát triển tiến tới The Merge.

- [Đọc thông số kỹ thuật của bản nâng cấp Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Sự thật thú vị! {#altair-fun-fact}

Altair là bản nâng cấp mạng lưới lớn đầu tiên có thời gian triển khai chính xác. Mọi bản nâng cấp trước đó đều dựa trên số khối được khai báo trên chuỗi Bằng chứng công việc (PoW), nơi thời gian tạo khối có thể thay đổi. Chuỗi Beacon không yêu cầu giải quyết Bằng chứng công việc (PoW), thay vào đó hoạt động trên một hệ thống Kỷ nguyên dựa trên thời gian bao gồm 32 "khe" thời gian, mỗi khe 12 giây, nơi các trình xác thực có thể đề xuất các khối. Đây là lý do tại sao chúng ta biết chính xác khi nào sẽ đạt đến Kỷ nguyên 74.240 và Altair chính thức hoạt động!

- [Thời gian tạo khối](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Tóm tắt {#london-summary}

Bản nâng cấp London đã giới thiệu [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), giúp cải tổ thị trường phí giao dịch, cùng với những thay đổi về cách xử lý hoàn trả Gas và lịch trình [Kỷ Băng Hà (Ice Age)](/glossary/#ice-age).

#### Bản nâng cấp London / EIP-1559 là gì? {#eip-1559}

Trước bản nâng cấp London, Ethereum có các khối với kích thước cố định. Trong những thời điểm nhu cầu mạng lưới cao, các khối này hoạt động hết công suất. Do đó, người dùng thường phải đợi nhu cầu giảm xuống để được đưa vào một khối, điều này dẫn đến trải nghiệm người dùng kém. Bản nâng cấp London đã giới thiệu các khối có kích thước thay đổi cho Ethereum.

Cách tính phí giao dịch trên mạng lưới Ethereum đã thay đổi với [bản nâng cấp London](/ethereum-forks/#london) vào tháng 8 năm 2021. Trước bản nâng cấp London, phí được tính toán mà không tách biệt phí `base` và `priority`, như sau:

Giả sử Alice phải trả cho Bob 1 ETH. Trong giao dịch, giới hạn gas là 21.000 đơn vị và giá gas là 200 Gwei.

Tổng phí sẽ là: `Gas units (limit) * Gas price per unit` tức là `21,000 * 200 = 4,200,000 gwei` hoặc 0,0042 ETH

Việc triển khai [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) trong bản nâng cấp London đã làm cho cơ chế phí giao dịch trở nên phức tạp hơn, nhưng lại làm cho phí Gas dễ dự đoán hơn, dẫn đến một thị trường phí giao dịch hiệu quả hơn. Người dùng có thể gửi các giao dịch với một `maxFeePerGas` tương ứng với số tiền họ sẵn sàng trả để giao dịch được thực thi, biết rằng họ sẽ không trả nhiều hơn giá thị trường cho Gas (`baseFeePerGas`), và nhận lại bất kỳ khoản dư nào, trừ đi phí ưu tiên của họ.

Video này giải thích về EIP-1559 và những lợi ích mà nó mang lại: [Giải thích về EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Bạn là nhà phát triển ứng dụng phi tập trung (dapp)? Hãy đảm bảo nâng cấp các thư viện và công cụ của bạn.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Đọc bài giải thích của Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="Các EIP của London" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>cải thiện thị trường phí giao dịch</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>trả về <code>BASEFEE</code> từ một khối</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>giảm hoàn trả Gas cho các hoạt động EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>ngăn chặn việc triển khai các hợp đồng bắt đầu bằng <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>trì hoãn Kỷ Băng Hà cho đến tháng 12 năm 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Tóm tắt {#berlin-summary}

Bản nâng cấp Berlin đã tối ưu hóa chi phí Gas cho một số hành động EVM nhất định và tăng cường hỗ trợ cho nhiều loại giao dịch.

- [Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Đọc bài giải thích của Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Các EIP của Berlin" contentPreview="Các cải tiến chính thức được bao gồm trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>giảm chi phí Gas cho ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>cho phép hỗ trợ dễ dàng hơn cho nhiều loại giao dịch</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>tăng chi phí Gas cho các mã lệnh truy cập trạng thái</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>thêm các danh sách truy cập tùy chọn</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Khởi nguyên Chuỗi Beacon {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Tóm tắt {#beacon-chain-genesis-summary}

[Chuỗi Beacon](/roadmap/beacon-chain/) cần 16384 khoản tiền gửi gồm 32 ETH được đặt cọc để ra mắt một cách an toàn. Điều này đã diễn ra vào ngày 27 tháng 11 và Chuỗi Beacon bắt đầu tạo khối vào ngày 1 tháng 12 năm 2020.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  Chuỗi Beacon
</DocLink>

---

### Triển khai hợp đồng tiền đặt cọc {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Tóm tắt {#deposit-contract-summary}

Hợp đồng tiền đặt cọc đã giới thiệu [việc đặt cọc](/glossary/#staking) vào hệ sinh thái Ethereum. Mặc dù là một hợp đồng trên [Mạng chính](/glossary/#mainnet), nó có tác động trực tiếp đến tiến độ ra mắt [Chuỗi Beacon](/roadmap/beacon-chain/), một [bản nâng cấp Ethereum](/roadmap/) quan trọng.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Đặt cọc
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Tóm tắt {#muir-glacier-summary}

Phân nhánh Muir Glacier đã giới thiệu một sự trì hoãn đối với [bom độ khó](/glossary/#difficulty-bomb). Sự gia tăng độ khó của khối trong cơ chế đồng thuận [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/) đe dọa làm giảm khả năng sử dụng của Ethereum bằng cách tăng thời gian chờ đợi khi gửi giao dịch và sử dụng các ứng dụng phi tập trung (dapp).

- [Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Đọc bài giải thích của Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Các EIP của Muir Glacier" contentPreview="Các cải tiến chính thức được bao gồm trong phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>trì hoãn bom độ khó thêm 4.000.000 khối nữa, tương đương khoảng 611 ngày.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Tóm tắt {#istanbul-summary}

Phân nhánh Istanbul:

- Tối ưu hóa chi phí [Gas](/glossary/#gas) của một số hành động nhất định trong [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Cải thiện khả năng chống chịu tấn công từ chối dịch vụ.
- Giúp các giải pháp [mở rộng quy mô lớp 2](/developers/docs/scaling/#layer-2-scaling) dựa trên SNARKs và STARKs có hiệu suất cao hơn.
- Cho phép Ethereum và Zcash tương tác với nhau.
- Cho phép các hợp đồng giới thiệu nhiều chức năng sáng tạo hơn.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="Các EIP của Istanbul" contentPreview="Các cải tiến chính thức được bao gồm trong phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>cho phép Ethereum hoạt động với loại tiền tệ bảo vệ quyền riêng tư như Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>mật mã học rẻ hơn để cải thiện chi phí [Gas](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>bảo vệ Ethereum khỏi các cuộc tấn công phát lại bằng cách thêm [mã lệnh](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>tối ưu hóa giá Gas của mã lệnh dựa trên mức tiêu thụ.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>giảm chi phí của dữ liệu lệnh gọi để cho phép nhiều dữ liệu hơn trong các khối – tốt cho việc [mở rộng quy mô lớp 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>các thay đổi khác về giá Gas của mã lệnh.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Tóm tắt {#constantinople-summary}

Phân nhánh Constantinople:

- Giảm phần thưởng [khai thác](/developers/docs/consensus-mechanisms/pow/mining/) khối từ 3 xuống 2 ETH.
- Đảm bảo chuỗi khối không bị đóng băng trước khi [Bằng chứng cổ phần (PoS) được triển khai](#beacon-chain-genesis).
- Tối ưu hóa chi phí [Gas](/glossary/#gas) của một số hành động nhất định trong [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Thêm khả năng tương tác với các địa chỉ chưa được tạo.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="Các EIP của Constantinople" contentPreview="Các cải tiến chính thức được bao gồm trong phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>tối ưu hóa chi phí của một số hành động trên chuỗi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>cho phép bạn tương tác với các địa chỉ chưa được tạo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>giới thiệu lệnh <code>EXTCODEHASH</code> để truy xuất mã băm của mã hợp đồng khác.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>đảm bảo chuỗi khối không bị đóng băng trước Bằng chứng cổ phần (PoS) và giảm phần thưởng khối từ 3 xuống 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Tóm tắt {#byzantium-summary}

Phân nhánh Byzantium:

- Đã giảm phần thưởng [khai thác](/developers/docs/consensus-mechanisms/pow/mining/) khối từ 5 xuống 3 ETH.
- Đã trì hoãn [bom độ khó](/glossary/#difficulty-bomb) thêm một năm.
- Đã thêm khả năng thực hiện các lệnh gọi không thay đổi trạng thái đến các hợp đồng khác.
- Đã thêm một số phương pháp mật mã học nhất định để cho phép mở rộng quy mô [lớp 2](/developers/docs/scaling/#layer-2-scaling).

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="Các EIP của Byzantium" contentPreview="Các cải tiến chính thức được bao gồm trong phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>thêm mã lệnh <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>trường trạng thái được thêm vào biên lai giao dịch để biểu thị thành công hay thất bại.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>thêm đường cong elliptic và phép nhân vô hướng để cho phép [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>thêm đường cong elliptic và phép nhân vô hướng để cho phép [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>cho phép xác minh chữ ký RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>thêm hỗ trợ cho các giá trị trả về có độ dài thay đổi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>thêm mã lệnh <code>STATICCALL</code>, cho phép các lệnh gọi không thay đổi trạng thái đến các hợp đồng khác.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>thay đổi công thức điều chỉnh độ khó.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>trì hoãn [bom độ khó](/glossary/#difficulty-bomb) thêm 1 năm và giảm phần thưởng khối từ 5 xuống 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Tóm tắt {#spurious-dragon-summary}

Phân nhánh Spurious Dragon là phản ứng thứ hai đối với các cuộc tấn công từ chối dịch vụ (DoS) trên mạng lưới (tháng 9/tháng 10 năm 2016) bao gồm:

- điều chỉnh giá mã lệnh để ngăn chặn các cuộc tấn công trong tương lai trên mạng lưới.
- cho phép "giảm tải" (debloat) trạng thái chuỗi khối.
- thêm tính năng bảo vệ chống tấn công phát lại (replay attack).

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="Các EIP của Spurious Dragon" contentPreview="Các cải tiến chính thức được bao gồm trong phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>ngăn chặn các giao dịch từ một chuỗi Ethereum bị phát lại trên một chuỗi thay thế, ví dụ như một giao dịch trên mạng thử nghiệm bị phát lại trên chuỗi Ethereum chính.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>điều chỉnh giá của mã lệnh <code>EXP</code> – làm cho việc làm chậm mạng lưới thông qua các hoạt động hợp đồng tốn kém về mặt tính toán trở nên khó khăn hơn.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>cho phép xóa các tài khoản trống được thêm vào thông qua các cuộc tấn công DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>thay đổi kích thước mã tối đa mà một hợp đồng trên chuỗi khối có thể có – thành 24576 byte.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Tóm tắt {#tangerine-whistle-summary}

Phân nhánh Tangerine Whistle là phản ứng đầu tiên đối với các cuộc tấn công từ chối dịch vụ (DoS) trên mạng lưới (tháng 9/tháng 10 năm 2016) bao gồm:

- giải quyết các vấn đề cấp bách về tình trạng mạng lưới liên quan đến các mã lệnh bị định giá quá thấp.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="Các EIP của Tangerine Whistle" contentPreview="Các cải tiến chính thức được bao gồm trong phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>tăng chi phí Gas của các mã lệnh có thể được sử dụng trong các cuộc tấn công thư rác (spam).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>giảm kích thước trạng thái bằng cách xóa một lượng lớn các tài khoản trống đã được đưa vào trạng thái với chi phí rất thấp do các lỗ hổng trong các phiên bản trước của giao thức Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Phân nhánh DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Tóm tắt {#dao-fork-summary}

Phân nhánh DAO là phản ứng đối với [cuộc tấn công DAO năm 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), trong đó một hợp đồng [DAO](/glossary/#dao) không an toàn đã bị bòn rút hơn 3,6 triệu ETH trong một vụ hack. Phân nhánh này đã chuyển tiền từ hợp đồng bị lỗi sang một [hợp đồng mới](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) với một chức năng duy nhất: rút tiền. Bất kỳ ai bị mất tiền đều có thể rút 1 ETH cho mỗi 100 token DAO trong ví của họ.

Hướng hành động này đã được cộng đồng Ethereum bỏ phiếu. Bất kỳ người nắm giữ ETH nào cũng có thể bỏ phiếu thông qua một giao dịch trên [một nền tảng bỏ phiếu](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Quyết định phân nhánh đã đạt được hơn 85% số phiếu bầu.

Một số người khai thác đã từ chối phân nhánh vì sự cố DAO không phải là một khiếm khuyết trong giao thức. Họ đã tiếp tục thành lập [Ethereum Classic](https://ethereumclassic.org/).

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Tóm tắt {#homestead-summary}

Phân nhánh Homestead hướng tới tương lai. Nó bao gồm một số thay đổi về giao thức và một thay đổi về mạng lưới giúp Ethereum có khả năng thực hiện các đợt nâng cấp mạng lưới tiếp theo.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="Các EIP của Homestead" contentPreview="Các cải tiến chính thức được bao gồm trong phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>thực hiện các chỉnh sửa đối với quá trình tạo hợp đồng.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>thêm mã lệnh mới: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>giới thiệu các yêu cầu tương thích về sau của devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Rã đông Biên giới {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Tóm tắt {#frontier-thawing-summary}

Phân nhánh rã đông Biên giới đã gỡ bỏ giới hạn 5.000 [Gas](/glossary/#gas) cho mỗi [khối](/glossary/#block) và đặt giá Gas mặc định là 51 [Gwei](/glossary/#gwei). Điều này cho phép thực hiện các giao dịch – các giao dịch yêu cầu 21.000 Gas. [Bom độ khó](/glossary/#difficulty-bomb) đã được giới thiệu để đảm bảo một đợt phân nhánh cứng trong tương lai sang [Bằng chứng cổ phần (PoS)](/glossary/#pos).

- [Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Đọc Bản cập nhật Giao thức Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Biên giới {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Tóm tắt {#frontier-summary}

Biên giới là một bản triển khai thực tế nhưng sơ khai của dự án Ethereum. Nó tiếp nối giai đoạn thử nghiệm Olympic thành công. Nó được dành cho người dùng kỹ thuật, đặc biệt là các nhà phát triển. Các [khối](/glossary/#block) có giới hạn [Gas](/glossary/#gas) là 5.000. Giai đoạn 'rã đông' này cho phép những người khai thác bắt đầu hoạt động của họ và những người dùng sớm cài đặt máy khách của họ mà không phải 'vội vàng'.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Mở bán ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

ether đã chính thức được mở bán trong 42 ngày. Bạn có thể mua bằng BTC.

[Đọc thông báo của Tổ chức Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Phát hành sách vàng {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Sách vàng, được viết bởi Tiến sĩ Gavin Wood, là một định nghĩa kỹ thuật của giao thức Ethereum.

[Xem sách vàng](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Phát hành sách trắng {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Tài liệu giới thiệu, được xuất bản vào năm 2013 bởi Vitalik Buterin, nhà sáng lập Ethereum, trước khi dự án ra mắt vào năm 2015.

<DocLink href="/whitepaper/">
  Sách trắng
</DocLink>