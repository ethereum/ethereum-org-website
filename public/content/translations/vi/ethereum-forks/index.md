---
title: Dòng thời gian của tất cả các phân nhánh Ethereum (từ 2014 đến nay)
description: Lịch sử của chuỗi khối Ethereum, bao gồm các cột mốc quan trọng, các cập nhật, và các nhánh.
lang: vi
sidebarDepth: 1
---

# Dòng thời gian của tất cả các phân nhánh Ethereum (từ 2014 đến nay) {#the-history-of-ethereum}

Tóm lược các cột mốc quan trọng, các nhánh - forks, và các cập nhật của chuỗi khối Ethereum.

<ExpandableCard title="Phân nhánh là gì?" contentPreview="Thay đổi quy tắc giao thức Ethereum, thường là các nâng cấp kỹ thuật được định trước.">

Sự tách nhánh - forks - xảy ra khi những nâng cấp hoặc thay đổi kỹ thuật lớn cần được thực hiện đối với mạng Ethereum. Chúng thường được xuất phát từ những [Đề xuất cải tiến Ethereum (EIP)] (/ eips /) và làm thay đổi các "quy tắc" của giao thức.

Đối với những phần mềm truyền thống được quản lý tập trung, khi những nâng cấp mới được thực hiện, các công ty phần mềm chỉ việc phát hành chúng tới người dùng cuối. Các Chuỗi khối - blockchains - không áp dụng hình thức này vì không có sự sở hữu tập trung. [Ethereum clients](/developers/docs/nodes-and-clients/) phải tự cập nhật phần mềm của mình để áp dụng những quy tắc mới. Ngoài ra, những người tạo khối (thợ đào đối với bằng chứng công việc, người xác thực đối với bằng chứng cổ phần) và các node trong mạng phải tạo khối và xác thực dựa trên các quy tắc mới. [Tìm hiểu thêm về cơ chế đồng thuận](/developers/docs/consensus-mechanisms/)

Những thay đổi quy tắc này có thể tạo ra sự chia tách tạm thời trong mạng lưới. Những khối mới có thể được tạo ra dựa trên quy tắc mới, hoặc quỹ tắc cũ. Nhánh - forks - thường được thảo luận và đồng thuận trước để các client chấp nhận và áp dụng đồng loạt. Khi đó nhánh mới với các nâng cấp trở thành chuỗi chính. Tuy nhiên, trong một số trường hợp hiếm gặp, sự không đồng thuận tách nhánh có thể làm mạng lưới bị tách rời vĩnh viễn - điển hình nhất là sự hình thành Ethereum Classic với <a href="#dao-fork">tách nhánh DAO</a>.

</ExpandableCard>

<ExpandableCard title="Tại sao một số nâng cấp lại có nhiều tên?" contentPreview="Tên các bản nâng cấp tuân theo một quy tắc.">

Phần mềm làm nền tảng cho Ethereum bao gồm hai nửa, được gọi là lớp thực thi

**Cách đặt tên nâng cấp lớp thực thi**

Kể từ năm 2021, các bản nâng cấp cho **lớp thực thi** được đặt tên theo tên thành phố của [các địa điểm Devcon trước đây](https://devcon.org/en/past-events/) theo thứ tự thời gian:

| Tên bản nâng cấp | Năm Devcon | Số Devcon | Ngày nâng cấp            |
| ---------------- | ---------- | --------- | ------------------------ |
| Berlin           | 2014       | 0         | Ngày 15 tháng 4 năm 2021 |
| London           | 2015       | I         | Ngày 5 tháng 8 năm 2021  |
| Shanghai         | 2016       | II        | Ngày 12 tháng 4 năm 2023 |
| Cancun           | 2017       | III       | Ngày 13 tháng 3 năm 2024 |
| **Prague**       | 2018       | IV        | Sẽ xác định - Tiếp theo  |
| _Osaka_          | 2019       | V         | Sẽ xác định              |
| _Bogota_         | 2022       | VI        | Sẽ xác định              |
| _Bangkok_        | Năm 2024   | VII       | Sẽ xác định              |

**Cách đặt tên nâng cấp lớp đồng thuận**

Kể từ khi ra mắt [Chuỗi Hải Đăng](/glossary/#beacon-chain), các bản nâng cấp cho **lớp đồng thuận** được đặt theo tên các ngôi sao trên trời bắt đầu bằng các chữ cái theo thứ tự bảng chữ cái:

| Tên bản nâng cấp                                              | Ngày nâng cấp             |
| ------------------------------------------------------------- | ------------------------- |
| Khởi nguồn của Chuỗi Hải đăng                                 | Ngày 1 tháng 12 năm 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | Ngày 27 tháng 10 năm 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | Ngày 6 tháng 9 năm 2022   |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | Ngày 12 tháng 4 năm 2023  |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | Ngày 13 tháng 3 năm 2024  |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | Sẽ xác định - Tiếp theo   |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | Sẽ xác định               |

**Đặt tên kết hợp**

Các bản nâng cấp lớp thực thi và lớp đồng thuận ban đầu được triển khai vào các thời điểm khác nhau, nhưng sau [The Merge](/roadmap/merge/) vào năm 2022, chúng đã được triển khai đồng thời. Do đó, các thuật ngữ thông tục đã xuất hiện để đơn giản hóa việc tham khảo các nâng cấp này bằng một thuật ngữ kết hợp duy nhất. Điều này bắt đầu với bản nâng cấp _Shanghai-Capella_, thường được gọi là **Shapella**, và tiếp nối bằng các bản nâng cấp _Cancun-Deneb_ (**Dencun**) và _Prague-Electra_ (**Pectra**).

| Nâng cấp lớp thực thi | Nâng cấp lớp đồng thuận | Tên rút gọn |
| --------------------- | ----------------------- | ----------- |
| Shanghai              | Capella                 | "Shapella"  |
| Cancun                | Deneb                   | "Dencun"    |
| Prague                | Electra                 | "Pectra"    |
| Osaka                 | Fulu                    | "Fusaka"    |

</ExpandableCard>

Chuyển thẳng đến thông tin về một số bản nâng cấp quan trọng trong quá khứ: [Chuỗi Hải Đăng](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); và [EIP-1559](#london)

Tìm hiểu thêm về nâng cấp giao thức tương lai? [Tìm hiểu về các bản nâng cấp sắp tới trên lộ trình Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Thông tin thêm về Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Bản nâng cấp Prague-Electra (Pectra) bao gồm nhiều cải tiến cho giao thức Ethereum, nhằm nâng cao trải nghiệm cho tất cả người dùng, mạng Lớp 2, Người stake và nhà vận hành nút.

Staking được nâng cấp với tính năng cộng dồn lợi nhuận cho tài khoản nút xác thực, và khả năng kiểm soát tốt hơn đối với số tiền đã Stake thông qua địa chỉ rút tiền ở lớp xác thực. EIP-7251 nâng mức số dư hiệu quả tối đa cho một nút xác thực lên 2048, giúp cải thiện hiệu quả sử dụng vốn cho người Stake. EIP-7002 cho phép tài khoản thực thi có thể kích hoạt một các bảo mật các hành động của một nút xác thực, bao gồm thoát hoặc rút một phần tiền, cải thiện trải nghiệm cho người Stake ETH, đồng thời tăng cường tính minh bạch và trách nhiệm cho các nhà vận hành nút.

Một số phần của nâng cấp tập trung vào cải thiện trải nghiệm người dùng thông thường. EIP-7702 mang lại khả năng cho một tài khoản thông thường không phải là hợp đồng thông minh ([EOA](/glossary/#eoa)) có thể thực thi mã tương tự như một hợp đồng thông minh. Điều này mở ra vô số chức năng cho tài khoản Ethereum truyền thống, chẳng hạn như gộp giao dịch, tài trợ phí Gas, cơ chế xác thực thay thế, lập trình kiểm soát chi tiêu, cơ chế khôi phục tài khoản và hơn thế nữa.

<ExpandableCard title="Các EIP của Pectra" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

Trải nghiệm người dùng tốt hơn:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Thiết lập mã cho tài khoản EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Tăng thông lượng Blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>EIP-7623 – Tăng chi phí calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Bổ sung cấu hình về lịch sử dụng blob vào các tệp cấu hình của lớp thực thi</em></li>
</ul>

Trải nghiệm Staking tốt hơn:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Tăng lượng <code>SỐ_DƯ_HIỆU_QUẢ_TỐI_ĐA</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Lớp thực thi có thể ra lệnh thoát hoặc rút tiền</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Yêu cầu lớp thực thi mục đích chung</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Ghi nhận giao dịch gửi của nút xác thực trên chuỗi</em></li>
</ul>

Cải thiện hiệu quả và bảo mật giao thức:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Hàm tiền biên dịch cho các phép toán trên đường cong BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Lưu lịch sử khối băm trong trạng thái</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Chuyển chỉ số uỷ ban ra ngoài sự chứng thực</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Cách Pectra sẽ nâng cao trải nghiệm đặt cược](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Đọc thông số kỹ thuật nâng cấp Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Câu hỏi thường gặp về Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Tóm tắt Cancun {#cancun-summary}

Bản nâng cấp Cancun chứa một bộ cải tiến cho _quá trình thực thi_ của Ethereum nhằm cải thiện khả năng mở rộng, song song với các bản nâng cấp đồng thuận Deneb.

Đáng chú ý, bản nâng cấp này bao gồm EIP-4844, được gọi là **Proto-Danksharding**, giúp giảm đáng kể chi phí lưu trữ dữ liệu cho các rollup lớp 2. Điều này được thực hiện thông qua việc giới thiệu các "blob" dữ liệu, cho phép rollups đăng dữ liệu lên Mainnet trong một khoảng thời gian ngắn. Điều này dẫn đến việc phí giao dịch đáng kể thấp hơn cho người dùng của các lớp 2 rollups.

<ExpandableCard title="Các EIP của Cancun" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Opcodes lưu trữ tạm thời</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Gốc khối Beacon trong EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Giao dịch blob sharding (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Memory copying instruction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> chỉ xảy ra trong cùng một giao dịch</em></li>
  <li>Cóe</li>
</ul>

</ExpandableCard>

- [Các rollup lớp 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Đọc thông số kỹ thuật nâng cấp Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Tóm tắt Deneb {#deneb-summary}

Bản nâng cấp Deneb chứa một bộ cải tiến cho _sự đồng thuận_ của Ethereum nhằm cải thiện khả năng mở rộng. Bản nâng cấp này đi kèm với các bản nâng cấp thực thi Cancun để kích hoạt Proto-Danksharding (EIP-4844), cùng với các cải tiến khác đối với Beacon Chain

Các "thông điệp tự nguyện rời đi" được ký trước không còn hết hạn, do đó giúp người dùng có nhiều quyền kiểm soát hơn khi staking tài sản của họ với một nhà điều hành nút bên thứ ba. Với thông điệp thoát đã được ký, người Stake có thể ủy quyền việc vận hành nút trong khi vẫn giữ khả năng thoát ra và rút tiền của mình bất cứ lúc nào, mà không cần xin phép bất kỳ ai.

EIP-7514 khiến việc phát hành ETH trở nên chặt chẽ hơn bằng cách giới hạn tỷ lệ 'churn' mà các validator có thể tham gia mạng xuống còn tám (8) mỗi kỳ. Vì việc phát hành ETH tỷ lệ thuận với tổng số ETH được đặt cược, việc giới hạn số lượng người xác thực tham gia sẽ hạn chế _tốc độ tăng trưởng_ của ETH mới được phát hành, đồng thời giảm yêu cầu phần cứng cho người vận hành nút, giúp thúc đẩy phi tập trung hóa.

<ExpandableCard title="Các EIP của Deneb" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Gốc khối Beacon trong EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Giao dịch blob phân mảnh</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Các lựa chọn tự nguyện có chữ ký vĩnh viễn hợp lệ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7045</a> - <em>Tăng số khe bao gồm xác nhận tối đa</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Thêm giới hạn xoay vòng tối đa của kỳ</em></li>
</ul>

</ExpandableCard>

- [Đọc thông số kỹ thuật nâng cấp Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Câu hỏi thường gặp về Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Tóm tắt Shanghai {#shanghai-summary}

Nâng cấp Thượng Hải đã mang số tiền đặt cọc tới lớp vận hành. Cùng với nâng cấp Capella, nó giúp các khối chấp nhận vận hành việc rút tiền, cho phép người gửi rút ETH từ Beacon Chain sang lớp vận hành.

<ExpandableCard title="Các EIP của Shanghai" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Bắt đầu khởi động địa chỉ <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Hướng dẫn mới về <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">Đề xuất cải thiện Ethereum-3860</a> - <em>Giới hạn và initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">Đề xuất cải thiện Ethereum-3860</a> - <em>Giới hạn và initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">Đề xuất cải thiện Ethereum-4895</a> - <em> Beacon chain đẩy rút tiền hoạt động</em></li>
</ul>

</ExpandableCard>

- [Đọc thông số kỹ thuật nâng cấp Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Tóm tắt Capella {#capella-summary}

Nâng cấp Capella là đợt nâng cấp thứ ba về lớp đồng thuận (Beacon Chain) và cho phép rút cọc. Capella xảy ra đồng bộ với nâng cấp lớp thực thi, Shanghai, cho phép thực hiện chức năng rút cọc.

Việc nâng cấp lớp đồng thuận này mang lại khả năng cho những người đặt cược không cung cấp thông tin xác thực rút tiền với khoản tiền gửi ban đầu của họ, do đó những người không cung cấp thông tin xác thực này được phép rút tiền.

Bản nâng cấp này cũng cung cấp chức năng quét tài khoản tự động cho phép xử lý liên tục các tài khoản xác thực để được thanh toán phần thưởng có sẵn bất kỳ hoặc rút ra toàn bộ.

- [Thông tin thêm về việc rút tiền đặt cược](/staking/withdrawals/).
- [Đọc thông số kỹ thuật nâng cấp Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Tóm tắt {#paris-summary}

Bản nâng cấp Paris được kích hoạt khi chuỗi khối bằng chứng công việc vượt qua [tổng độ khó cuối cùng](/glossary/#terminal-total-difficulty) là 58750000000000000000000. Nó xảy ra ở block 15537393 vào 15 tháng 9 năm 2022, tạo nên nâng cấp khối tiếp theo Paris. Paris là quá trình chuyển đổi của [The Merge](/roadmap/merge/) - tính năng chính của nó là tắt thuật toán khai thác [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow) và logic đồng thuận liên quan, đồng thời chuyển sang [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos). Bản thân Paris là một bản nâng cấp cho [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) (tương đương với Bellatrix trên lớp đồng thuận) cho phép chúng nhận chỉ thị từ [máy khách đồng thuận ](/developers/docs/nodes-and-clients/#consensus-clients) được kết nối. Điều này yêu cầu một bộ phương thức API nội bộ mới, được gọi chung là [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), phải được kích hoạt. Đây được cho là bản nâng cấp quan trọng nhất trong lịch sử Ethereum kể từ [Homestead](#homestead)!

- [Đọc thông số kỹ thuật nâng cấp Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Các EIP của Paris" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">Đề xuất nâng cấp Ethereum-3675</a> - <em>Đồng thuận nâng cấp tới Bằng chứng cổ phần</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Thay thế opcode KHÓ KHĂN bằng PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Tóm tắt {#bellatrix-summary}

Bản nâng cấp Bellatrix là bản nâng cấp theo lịch trình thứ hai cho [Chuỗi Hải Đăng](/roadmap/beacon-chain), chuẩn bị chuỗi cho [The Merge](/roadmap/merge/). It brings validator penalties to their full values for inactivity and slashable offenses. Bellatrix cũng bao gồm cập nhật các quy tắc lựa chọn tách nhánh để chuẩn bị khối cho sự kiện hợp nhất và chuyển giao từ khối bằng chứng công việc sang khối bằng chứng đặt cọc đầu tiên. Điều này bao gồm việc làm cho các máy khách đồng thuận nhận biết được [tổng độ khó cuối cùng](/glossary/#terminal-total-difficulty) là 58750000000000000000000.

- [Đọc thông số kỹ thuật nâng cấp Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Tóm tắt {#gray-glacier-summary}

Bản nâng cấp mạng lưới Gray Glacier đã lùi thời điểm kích hoạt [bom độ khó](/glossary/#difficulty-bomb) lại ba tháng. Đây là thay đổi duy nhất được giới thiệu trong bản nâng cấp này và có bản chất tương tự như các bản nâng cấp [Arrow Glacier](#arrow-glacier) và [Muir Glacier](#muir-glacier). Các thay đổi tương tự đã được thực hiện trên các bản nâng cấp mạng lưới [Byzantium](#byzantium), [Constantinople](#constantinople) và [London](#london).

- [Blog EF - Thông báo nâng cấp Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Các EIP của Gray Glacier" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133"> Đề xuất cải thiện Ethereum </a> - <em> trì hoãn độ khó bom cho đến tháng 9 2022 </em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Tóm tắt {#arrow-glacier-summary}

Bản nâng cấp mạng lưới Arrow Glacier đã lùi thời điểm kích hoạt [bom độ khó](/glossary/#difficulty-bomb) lại vài tháng. Đây là thay đổi duy nhất được giới thiệu trong bản nâng cấp này và có bản chất tương tự như bản nâng cấp [Muir Glacier](#muir-glacier). Các thay đổi tương tự đã được thực hiện trên các bản nâng cấp mạng lưới [Byzantium](#byzantium), [Constantinople](#constantinople) và [London](#london).

- [Blog EF - Thông báo nâng cấp Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Nâng cấp Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Các EIP của Arrow Glacier" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345"> Đề xuất cải thiện Ethereum - 4345 </a> - <em> trì hoãn độ khó bom tới tháng 6 2020 </em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Tóm tắt {#altair-summary}

Bản nâng cấp Altair là bản nâng cấp theo lịch trình đầu tiên cho [Chuỗi Hải Đăng](/roadmap/beacon-chain). Nó đã bổ sung hỗ trợ cho "ủy ban đồng bộ hóa"—cho phép các ứng dụng khách nhẹ, đồng thời tăng tình trạng không hoạt động của trình xác thực và cắt giảm các hình phạt khi quá trình phát triển tiến tới Hợp nhất.

- [Đọc thông số kỹ thuật nâng cấp Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Sự thật thú vị! {#altair-fun-fact}

Alair từng là bản nâng cấp mạng chính đầu tiên có số lần tổng hợp chính xác. Mỗi bản nâng cấp trước hết dựa trên số khối công khai theo chain bằng chứng công việc, nơi mà thời gian từng khối khác nhau. Chain Beacon không yêu cầu xử lý bằng chứng công việc, thay vào đó chúng làm việc trên hệ thống số lần duyệt qua giao dịch bao gồm 32 lần 12 giây để các nhà xác thực có thể tạo ra khối. Đây là lí do tại sao chúng tôi đã biết chính xác khi chúng tôi đạt 74,240 lần và Altair đã được triển khai!

- [Thời gian khối](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Tóm tắt {#london-summary}

Bản nâng cấp London đã giới thiệu [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), cải cách thị trường phí giao dịch, cùng với những thay đổi về cách xử lý hoàn trả gas và lịch trình [Kỷ Băng Hà](/glossary/#ice-age).

#### London Upgrade / EIP-1559 là gì?  {#eip-1559}

Trước khi London được nâng cấp, Ethereum đã chỉnh lại cỡ cái khối. Trong những thời điểm có nhu cầu mạng cao, các khối này hoạt động ở công suất tối đa. Kết quả là, người dùng thường phải chờ đợi sự giảm bớt nhu cầu để được đưa vào một khối, điều này đã dẫn đến trải nghiệm người dùng kém. London nâng cấp giới thiệu vài khối tới Ethereum.

Cách tính phí giao dịch trên mạng lưới Ethereum đã thay đổi với [Bản nâng cấp London](/ethereum-forks/#london) vào tháng 8 năm 2021. Trước bản nâng cấp London, phí được tính mà không tách riêng phí `cơ bản` và phí `ưu tiên`, như sau:

Giả sử Alice phải trả cho Bob 1 ETH. Trong giao dịch, giới hạn gas là 21.000 đơn vị và giá gas là 200 gwei.

Tổng phí sẽ là: `Đơn vị gas (giới hạn) * Giá gas mỗi đơn vị` tức là `21.000 * 200 = 4.200.000 gwei` hoặc 0,0042 ETH

Việc triển khai [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) trong Bản nâng cấp London đã làm cho cơ chế phí giao dịch trở nên phức tạp hơn, nhưng giúp phí gas dễ dự đoán hơn, dẫn đến một thị trường phí giao dịch hiệu quả hơn. Người dùng có thể gửi giao dịch với `maxFeePerGas` tương ứng với số tiền họ sẵn sàng trả để giao dịch được thực hiện, biết rằng họ sẽ không trả nhiều hơn giá thị trường cho gas (`baseFeePerGas`), và nhận lại bất kỳ khoản tiền thừa nào, sau khi trừ tiền boa của họ.

Video này giải thích về EIP-1559 và những lợi ích mà nó mang lại: [Giải thích EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Bạn là một nhà phát triển ứng dụng phi tập trung? Hãy chắc chắn nâng cấp thư viện và công cụ của bạn.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Đọc bài giải thích của Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="Các EIP của London" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>cải thiện thị trường phí giao dịch</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">Đề xuất cải thiện Ethereum-3198</a>-<em>trả về <code> PHÍ CƠ BẢN </code> từ một khối </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>giảm khoản hoàn gas cho các thao tác EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">Đề xuất cải thiện Ethereum-3541</a>-<em>phòng triển khai hợp đồng thông minh bắt đầu với <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>hoãn Kỉ Băng Hà cho đến tháng 12 năm 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Tóm tắt {#berlin-summary}

Bản nâng cấp Berlin tối ưu hóa phí gas cho một số hoạt động trong EVM và tăng cường hỗ trợ cho nhiều loại giao dịch.

- [Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Đọc bài giải thích của Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Các EIP của Berlin" contentPreview="Các cải tiến chính thức có trong bản nâng cấp này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>giảm chi phí gas ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">Đề xuất cải thiện Ethereum-2718</a> - <em> giúp hỗ trợ dễ dàng hơn cho nhiều loại giao dịch </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>tăng chi phí gas cho các mã lệnh truy cập trạng thái</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>thêm danh sách truy cập tùy chọn</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Khởi đầu Chuỗi Hải Đăng {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Tóm tắt {#beacon-chain-genesis-summary}

[Chuỗi Hải Đăng](/roadmap/beacon-chain/) cần 16.384 khoản ký gửi 32 ETH được đặt cược để khởi chạy một cách an toàn. Điều này xảy ra vào ngày 27 tháng 11 và Chuỗi Hải Đăng bắt đầu tạo khối vào ngày 1 tháng 12 năm 2020.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Chuỗi Hải Đăng
</DocLink>

---

### Hợp đồng ký gửi đặt cược đã được triển khai {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Tóm tắt {#deposit-contract-summary}

Hợp đồng ký gửi đặt cược đã giới thiệu hình thức [đặt cược](/glossary/#staking) cho hệ sinh thái Ethereum. Mặc dù là hợp đồng [Mainnet](/glossary/#mainnet), nó có tác động trực tiếp đến dòng thời gian ra mắt [Chuỗi Hải Đăng](/roadmap/beacon-chain/), một [bản nâng cấp quan trọng của Ethereum](/roadmap/).

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Đặt cược
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Tóm tắt {#muir-glacier-summary}

Phân nhánh Muir Glacier đã trì hoãn [bom độ khó](/glossary/#difficulty-bomb). Sự gia tăng độ khó của khối trong cơ chế đồng thuận [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/) đã đe dọa làm giảm khả năng sử dụng của Ethereum bằng cách tăng thời gian chờ gửi giao dịch và sử dụng các ứng dụng phi tập trung.

- [Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Đọc bài giải thích của Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Các EIP của Muir Glacier" contentPreview="Các cải tiến chính thức có trong lần phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">Đề xuất cải thiện Ethereum-2384</a> - <em> trì hoãn độ khó bom cho các khối 4,000,000 khác hoặc xấp xỉ 611 ngày.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Tóm tắt {#istanbul-summary}

Phân nhánh Istanbul:

- Tối ưu hóa chi phí [gas](/glossary/#gas) của một số hành động nhất định trong [máy ảo ethereum](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Cải thiện khả năng chống chịu tấn công từ chối dịch vụ.
- Giúp các giải pháp [mở rộng quy mô Lớp 2](/developers/docs/scaling/#layer-2-scaling) dựa trên SNARK và STARK hoạt động hiệu quả hơn.
- Cho phép hai mạng Ethereum và Zcash tương tác với nhau.
- Cho phép các hợp đồng đưa vào nhiều chức năng sáng tạo hơn.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Các EIP của Istanbul" contentPreview="Các cải tiến chính thức có trong lần phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">Đề xuất cải thiện Ethereum-152</a> - <em> cho phép Ethereum làm việc với đồng tiền bảo vệ quyền riêng tư như Zcash.</em></li>
  <li>EIP-1108 – mật mã học rẻ hơn nhằm cải thiện chi phí [gas]</li>
  <li>EIP-1344 – bảo vệ Ethereum khỏi các cuộc tấn công lặp lại bằng cách thêm <CHAINID> [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)..</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">Đề xuất cải thiện Ethereum-1884</a> - <em>tối ưu hóa mã lệnh chi phí gas dựa trên tiêu thụ.</em></li>
  <li>EIP-2028 – làm giảm chi phí CallData để cho phép nhiều dữ liệu hơn trong các khối – điều này có lợi cho [Layer 2 scaling](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">Đề xuất cải thiện Ethereum-2200</a> - <em>thay đổi giá gas mã lệnh khác.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Tóm tắt {#constantinople-summary}

Phân nhánh Constantinople:

- Giảm phần thưởng [khai thác](/developers/docs/consensus-mechanisms/pow/mining/) khối từ 3 xuống 2 ETH.
- Đảm bảo chuỗi khối không bị đóng băng trước khi [bằng chứng cổ phần được triển khai](#beacon-chain-genesis).
- Tối ưu hóa chi phí [gas](/glossary/#gas) của một số hành động nhất định trong [máy ảo ethereum](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Thêm khả năng tương tác với các địa chỉ chưa được tạo.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Các EIP của Constantinople" contentPreview="Các cải tiến chính thức có trong lần phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>tối ưu chi phí cho một số hành động nhất định trên chuỗi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">Đề xuất cải thiện Ethereum-1014</a> - <em>cho phép bạn tương tác với các địa chỉ chưa được tạo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>giới thiệu lệnh <code>EXTCODEHASH</code> để truy xuất băm của mã nguồn một hợp đồng khác.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>makes sure the blockchain doesn&#39;t freeze before proof-of-stake and reduces block reward from 3 to 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Tóm tắt {#byzantium-summary}

Phân nhánh Byzantium:

- Giảm phần thưởng [khai thác](/developers/docs/consensus-mechanisms/pow/mining/) khối từ 5 xuống 3 ETH.
- Trì hoãn [bom độ khó](/glossary/#difficulty-bomb) một năm.
- Thêm khả năng tạo lệnh call không-làm-thay-đổi-trạng-thái tới các hợp đồng khác.
- Đã thêm một số phương pháp mật mã nhất định để cho phép [mở rộng quy mô lớp 2](/developers/docs/scaling/#layer-2-scaling).

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Các EIP của Byzantium" contentPreview="Các cải tiến chính thức có trong lần phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>thêm opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">Đề xuất cải thiện Ethereum-658</a> - <em>trường trạng thái được thêm vào danh sách giao dịch để chỉ ra trạng thái giao dịch thành công hay thất bại.</em></li>
  <li>EIP-196 – bổ sung phép nhân trên đường cong ellip và phép nhân vô hướng để cho phép [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li>EIP-197 – bổ sung phép nhân trên đường cong ellip và phép nhân vô hướng để cho phép [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">Đề xuất cải thiện Ethereum-198</a> - <em> cho phép xác minh chữ ký thuật toán mã hóa công khai.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">Đề xuất cải thiện Ethereum-211</a> - <em> bổ sung hỗ trợ cho các giá trị lợi nhuận có độ dài khác nhau.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">Đề xuất cải thiện Etherem-214</a> - <em> thêm vào mã lệnh <code> STATICCALL</code>, cho phép các cuộc gọi không thay đổi trạng thái tới các hợp đồng khác.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">Đề xuất cải thiện Ethereum-100</a> - <em> thay đổi công thức chỉnh sửa độ khó.</em></li>
  <li>EIP-649 – trì hoãn [dificulty bomb](/glossary/#difficulty-bomb) thêm 1 năm và giảm phần thưởng khối từ 5 xuống 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Tóm tắt {#spurious-dragon-summary}

Phân nhánh Spurious Dragon là câu trả lời thứ hai cho các cuộc tấn công từ chối dịch vụ (DoS) (tháng 09-10/2016) bao gồm:

- điều chỉnh giá opcode để ngăn chặn các cuộc tấn công mạng trong tương lai.
- cho phép "debloat" trạng thái chuỗi khối.
- thêm tính năng bảo vệ tấn công phát lại.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Các EIP của Spurious Dragon" contentPreview="Các cải tiến chính thức có trong lần phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">Đề xuất cải thiện Ethereum-155</a> - <em> ngăn chặn các giao dịch từ một chuỗi Ethereum chạy lại trên một chuỗi thay thế khác, ví dụ mạng thử nghiệm được chạy lại trên chuỗi Ethereum chính.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">Đề xuất cải thiện Ethereum-160</a> - <em>thay đổi giá trị của mã lệnh <code>EXP</code> - khiến việc làm chậm mạng lưới khó hơn thông qua tính toán vận hành hợp đồng đắt đỏ.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">Đề xuất cải thiện Ethereum-161</a> - <em>cho phép loại bỏ các tài khoản rỗng được thêm vào trong cuộc Tấn công Từ chối Dịch Vụ.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">Đề xuất cải thiện Ethereum-170</a> - <em> thay đổi độ dài mã tối đa mà một hợp đồng trên chuỗi khối có thể có - tới 24576 byte.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Tóm tắt {#tangerine-whistle-summary}

Phân nhánh Tangerine Whistle là câu trả lời đầu tiên cho các cuộc tấn công từ chối dịch vụ (DoS) (tháng 09-10/2016) bao gồm:

- giải quyết các vấn đề khẩn cấp về sức khỏe mạng liên quan đến việc một số mã opcode được định giá quá thấp.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Các EIP của Tangerine Whistle" contentPreview="Các cải tiến chính thức có trong lần phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">Đề xuất cải thiện Ethereum-150</a> - <em> tăng phí gas của các mã lệnh vận hành được sử dụng trong tấn công thư rác.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">Đề xuất cải thiện Ethereum-158</a> - <em> giảm kích thước hiện tại bằng việc loại bỏ số lượng lớn các tài khoản rỗng được đặt trong trạng thái phí thấp do sai sót của các phiên bản giao thức Ethereum trước đó.</em></li>
</ul>

</ExpandableCard>

---

### Phân nhánh DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Tóm tắt {#dao-fork-summary}

Phân nhánh DAO là để đối phó với [cuộc tấn công DAO năm 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), trong đó một hợp đồng [DAO](/glossary/#dao) không an toàn đã bị rút mất hơn 3,6 triệu ETH trong một vụ hack. Phân nhánh này đã chuyển tiền từ hợp đồng bị lỗi sang một [hợp đồng mới](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) chỉ với một chức năng duy nhất: rút tiền. Bất cứ ai bị mất tiền cũng có thể rút 1 ETH cho mỗi 100 token DAO trong ví của họ.

Quá trình này đã được bỏ phiếu thông qua bởi cộng đồng Ethereum. Bất kỳ người nắm giữ ETH nào cũng có thể bỏ phiếu thông qua một giao dịch trên [một nền tảng bỏ phiếu](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Quyết định phân nhánh đã đạt trên 85% số phiếu đồng thuận.

Một số thợ đào từ chối phân nhánh vì sự cố DAO không phải là một khiếm khuyết trong giao thức. Họ đã tiếp tục hình thành [Ethereum Classic](https://ethereumclassic.org/).

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Tóm tắt {#homestead-summary}

Phân nhánh Homestead dọn đường cho các cập nhật tương lai. Bản nâng cấp này bao gồm nhiều thay đổi về giao thức và thay đổi về mạng giúp Ethereum có khả năng thực hiện nhiều nâng cấp mạng hơn nữa.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Các EIP của Homestead" contentPreview="Các cải tiến chính thức có trong lần phân nhánh này.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">Đề xuất cải thiện Ethereum-2</a> - <em> chỉnh sửa quy trình tạo hợp đồng.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">Đề xuất cải thiện Ethereum-7</a> - <em> thêm mã lệnh vận hành mới:<code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">Đề xuất cải thiện Ethereum-8</a> - <em> giới thiệu các yêu cầu về khả năng tương thích chuyển tiếp lập trình ngang hàng</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier tan băng {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Tóm tắt {#frontier-thawing-summary}

Phân nhánh Frontier tan băng đã dỡ bỏ giới hạn 5.000 [gas](/glossary/#gas) mỗi [khối](/glossary/#block) và đặt giá gas mặc định là 51 [gwei](/glossary/#gwei). Điều này cho phép các giao dịch được thực hiện - vì giao dịch sử dụng 21,000 gas. [Bom độ khó](/glossary/#difficulty-bomb) đã được giới thiệu để đảm bảo một hard fork sang [bằng chứng cổ phần](/glossary/#pos) trong tương lai.

- [Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Đọc Bản cập nhật Giao thức Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Tóm tắt {#frontier-summary}

Frontier là giai đoạn bắt đầu đi vào hoạt động, nhưng còn sơ khai, của dự án Ethereum. Nó tiếp nối giai đoạn thử nghiệm Olympic đã thành công trước đó. Nó chủ yếu dành cho đối tượng người dùng kỹ thuật, đặc biệt là các nhà phát triển. [Các khối](/glossary/#block) có giới hạn [gas](/glossary/#gas) là 5.000. Giai đoạn 'tan băng' này cho phép các thợ đào bắt đầu hoạt động và những người dùng đầu tiên có thể cài đặt các client của họ mà không cần phải 'gấp rút'.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Đợt bán Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether chính thức được bán ra trong 42 ngày. Khi đó bạn có thể mua nó bằng BTC.

[Đọc thông báo của Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Phát hành Yellowpaper {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Sách Vàng, được soạn thảo bởi tiến sĩ Gavin Wood, là tài liệu kỹ thuật định nghĩa giao thức Ethereum.

[Xem Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Phát hành Sách trắng {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Tài liệu giới thiệu giao thức, phát hành năm 2013 bởi Vitalik Buterin, người sáng lập Ethereum, trước khi dự án ra mắt năm 2015.

<DocLink href="/whitepaper/">
  Sách trắng
</DocLink>
