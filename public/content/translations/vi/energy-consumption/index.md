---
title: Mức tiêu thụ năng lượng của Ethereum
metaTitle: Mức tiêu thụ năng lượng của Ethereum
description: Những thông tin cơ bản bạn cần để hiểu về mức tiêu thụ năng lượng của Ethereum.
lang: vi
---

[Ethereum](/) là một Chuỗi khối xanh. Cơ chế đồng thuận [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos) của Ethereum sử dụng ETH thay vì [năng lượng để bảo mật mạng lưới](/developers/docs/consensus-mechanisms/pow). Mức tiêu thụ năng lượng của Ethereum xấp xỉ [~0,0026 TWh/năm](https://carbon-ratings.com/eth-report-2022) trên toàn bộ mạng lưới toàn cầu.

Ước tính mức tiêu thụ năng lượng của Ethereum đến từ một nghiên cứu của [CCRI (Viện Xếp hạng Carbon Tiền mã hóa)](https://carbon-ratings.com). Họ đã tạo ra các ước tính từ dưới lên về mức tiêu thụ điện năng và lượng khí thải carbon của mạng lưới Ethereum ([xem báo cáo](https://carbon-ratings.com/eth-report-2022)). Họ đã đo lường mức tiêu thụ điện năng của các node khác nhau với nhiều cấu hình phần cứng và phần mềm client khác nhau. Ước tính **2.601 MWh** (0,0026 TWh) cho mức tiêu thụ điện năng hàng năm của mạng lưới tương đương với lượng khí thải carbon hàng năm là **870 tấn CO2e** khi áp dụng các hệ số cường độ carbon đặc thù của từng khu vực. Giá trị này thay đổi khi các node tham gia và rời khỏi mạng lưới - bạn có thể theo dõi bằng cách sử dụng ước tính trung bình động 7 ngày của [Chỉ số Bền vững Mạng lưới Chuỗi khối Cambridge](https://ccaf.io/cbnsi/ethereum) (lưu ý rằng họ sử dụng một phương pháp hơi khác cho các ước tính của mình - chi tiết có sẵn trên trang web của họ).

Để bối cảnh hóa mức tiêu thụ năng lượng của Ethereum, chúng ta có thể so sánh các ước tính hàng năm cho một số sản phẩm và ngành công nghiệp khác. Điều này giúp chúng ta hiểu rõ hơn liệu ước tính cho Ethereum là cao hay thấp.

<EnergyConsumptionChart />

Biểu đồ trên hiển thị mức tiêu thụ năng lượng ước tính tính bằng TWh/năm của Ethereum, so với một số sản phẩm và ngành công nghiệp khác. Các ước tính được cung cấp có nguồn gốc từ thông tin công khai, được truy cập vào tháng 7 năm 2023, với các liên kết đến các nguồn có sẵn trong bảng bên dưới.

|                     | Mức tiêu thụ năng lượng hàng năm (TWh) | So sánh với PoS Ethereum |                                                                                      Nguồn                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Trung tâm dữ liệu toàn cầu |                 190                 |          73.000x           |                                    [nguồn](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53.000x           |                                                                 [nguồn](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Khai thác vàng         |                 131                 |          50.000x           |                                                                 [nguồn](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Chơi game ở Mỹ\*     |                 34                  |          13.000x           |                 [nguồn](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum        |                 21                  |           8.100x           |                                                                    [nguồn](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7.300x           |                                           [nguồn](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [nguồn](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [nguồn](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [nguồn](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS Ethereum**    |             **0,0026**              |           **1x**           |                                                               [nguồn](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Bao gồm các thiết bị của người dùng cuối như PC, máy tính xách tay và máy chơi game console.

Việc có được các ước tính chính xác về mức tiêu thụ năng lượng là rất phức tạp, đặc biệt là khi đối tượng được đo lường có chuỗi cung ứng phức tạp hoặc các chi tiết về việc triển khai ảnh hưởng đến hiệu quả của nó. Ví dụ, ước tính mức tiêu thụ năng lượng cho Netflix và Google thay đổi tùy thuộc vào việc chúng chỉ bao gồm năng lượng được sử dụng để duy trì hệ thống của họ và phân phối nội dung cho người dùng (_chi phí trực tiếp_) hay chúng bao gồm cả chi phí cần thiết để sản xuất nội dung, vận hành văn phòng công ty, quảng cáo, v.v. (_chi phí gián tiếp_). Chi phí gián tiếp cũng có thể bao gồm năng lượng cần thiết để tiêu thụ nội dung trên các thiết bị của người dùng cuối như TV, máy tính và điện thoại di động.

Các ước tính trên không phải là những so sánh hoàn hảo. Lượng chi phí gián tiếp được tính đến thay đổi tùy theo nguồn và hiếm khi bao gồm năng lượng từ các thiết bị của người dùng cuối. Mỗi nguồn cơ sở bao gồm nhiều chi tiết hơn về những gì đang được đo lường.

Bảng và biểu đồ trên cũng bao gồm các so sánh với Bitcoin và Ethereum Bằng chứng công việc (PoW). Điều quan trọng cần lưu ý là mức tiêu thụ năng lượng của các mạng lưới Bằng chứng công việc (PoW) không tĩnh và thay đổi từng ngày. Các ước tính cũng có thể khác nhau rất nhiều giữa các nguồn. Chủ đề này thu hút [cuộc tranh luận](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) nhiều sắc thái, không chỉ về lượng năng lượng được tiêu thụ, mà còn về các nguồn năng lượng đó và các vấn đề đạo đức liên quan. Mức tiêu thụ năng lượng không nhất thiết phản ánh chính xác dấu chân môi trường vì các dự án khác nhau có thể sử dụng các nguồn năng lượng khác nhau, bao gồm tỷ lệ năng lượng tái tạo ít hơn hoặc nhiều hơn. Ví dụ, [Chỉ số Tiêu thụ Điện năng Bitcoin của Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) chỉ ra rằng nhu cầu của mạng lưới Bitcoin về mặt lý thuyết có thể được cung cấp bởi việc đốt khí gas hoặc điện năng mà nếu không sẽ bị thất thoát trong quá trình truyền tải và phân phối. Con đường hướng tới sự bền vững của Ethereum là thay thế phần tiêu tốn nhiều năng lượng của mạng lưới bằng một giải pháp thay thế xanh.

Bạn có thể duyệt qua các ước tính về mức tiêu thụ năng lượng và lượng khí thải carbon cho nhiều ngành công nghiệp trên [trang web Chỉ số Bền vững Mạng lưới Chuỗi khối Cambridge](https://ccaf.io/cbnsi/ethereum).

## Ước tính trên mỗi giao dịch {#per-transaction-estimates}

Nhiều bài viết ước tính chi phí năng lượng "trên mỗi giao dịch" cho các Chuỗi khối. Điều này có thể gây hiểu nhầm vì năng lượng cần thiết để đề xuất và xác thực một khối độc lập với số lượng giao dịch bên trong nó. Đơn vị chi phí năng lượng trên mỗi giao dịch ngụ ý rằng ít giao dịch hơn sẽ dẫn đến chi phí năng lượng nhỏ hơn và ngược lại, nhưng thực tế không phải vậy. Ngoài ra, các ước tính trên mỗi giao dịch rất nhạy cảm với cách xác định thông lượng giao dịch của một Chuỗi khối và việc tinh chỉnh định nghĩa này có thể bị thao túng để làm cho giá trị có vẻ lớn hơn hoặc nhỏ hơn.

Ví dụ, trên Ethereum, thông lượng giao dịch không chỉ là của lớp cơ sở - nó còn là tổng thông lượng giao dịch của tất cả các bản cuộn "[lớp 2 (l2)](/layer-2/)" của nó. Lớp 2 (l2) thường không được đưa vào các tính toán, nhưng việc tính đến năng lượng bổ sung được tiêu thụ bởi các sequencer (nhỏ) và số lượng giao dịch mà chúng xử lý (lớn) có thể sẽ làm giảm đáng kể các ước tính trên mỗi giao dịch. Đây là một lý do tại sao việc so sánh mức tiêu thụ năng lượng trên mỗi giao dịch giữa các nền tảng có thể gây hiểu nhầm.

## Nợ carbon của Ethereum {#carbon-debt}

Chi phí năng lượng của Ethereum rất thấp, nhưng không phải lúc nào cũng như vậy. Ethereum ban đầu sử dụng Bằng chứng công việc (PoW), có chi phí môi trường lớn hơn nhiều so với cơ chế Bằng chứng cổ phần (PoS) hiện tại.

Ngay từ đầu, Ethereum đã lên kế hoạch triển khai một cơ chế đồng thuận dựa trên Bằng chứng cổ phần (PoS), nhưng việc thực hiện điều đó mà không hy sinh tính bảo mật và sự phi tập trung đã mất nhiều năm tập trung nghiên cứu và phát triển. Do đó, một cơ chế Bằng chứng công việc (PoW) đã được sử dụng để khởi động mạng lưới. Bằng chứng công việc (PoW) yêu cầu các thợ đào sử dụng phần cứng máy tính của họ để tính toán một giá trị, tiêu tốn năng lượng trong quá trình này.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI ước tính rằng The Merge đã giảm mức tiêu thụ điện năng hàng năm của Ethereum hơn **99,988%**. Tương tự như vậy, lượng khí thải carbon của Ethereum đã giảm khoảng **99,992%** (từ 11.016.000 xuống còn 870 tấn CO2e). Để dễ hình dung, việc giảm lượng khí thải giống như việc đi từ chiều cao của Tháp Eiffel xuống một mô hình đồ chơi bằng nhựa nhỏ, như được minh họa trong hình trên. Kết quả là, chi phí môi trường để bảo mật mạng lưới đã giảm đáng kể. Đồng thời, tính bảo mật của mạng lưới được cho là đã được cải thiện.

## Một lớp ứng dụng xanh {#green-applications}

Mặc dù mức tiêu thụ năng lượng của Ethereum rất thấp, nhưng cũng có một cộng đồng [**tài chính tái tạo (ReFi)**](/refi/) đáng kể, đang phát triển và hoạt động rất tích cực đang xây dựng trên Ethereum. Các ứng dụng ReFi sử dụng các thành phần tài chính phi tập trung (DeFi) để xây dựng các ứng dụng tài chính có những tác động ngoại ứng tích cực mang lại lợi ích cho môi trường. ReFi là một phần của phong trào ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) rộng lớn hơn, gắn bó chặt chẽ với Ethereum và nhằm mục đích kết hợp tiến bộ công nghệ với việc quản lý môi trường. Bản chất phi tập trung, không cần cấp phép và có khả năng kết hợp của Ethereum khiến nó trở thành lớp cơ sở lý tưởng cho các cộng đồng ReFi và solarpunk.

Các nền tảng tài trợ hàng hóa công cộng gốc Web3 như [Gitcoin](https://gitcoin.co) tổ chức các vòng tài trợ về khí hậu để kích thích việc xây dựng có ý thức về môi trường trên lớp ứng dụng của Ethereum. Thông qua sự phát triển của các sáng kiến này (và những sáng kiến khác, ví dụ: [khoa học phi tập trung (desci)](/desci/)), Ethereum đang trở thành một công nghệ mang lại giá trị dương ròng cho môi trường và xã hội.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Nếu bạn cho rằng trang này có thể được làm cho chính xác hơn, vui lòng tạo một issue hoặc PR. Các số liệu thống kê trên trang này là những ước tính dựa trên dữ liệu công khai - chúng không đại diện cho một tuyên bố hay lời hứa chính thức từ nhóm ethereum.org, hoặc Tổ chức Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Đọc thêm {#further-reading}

- [Chỉ số Bền vững Mạng lưới Chuỗi khối Cambridge](https://ccaf.io/cbnsi/ethereum)
- [Báo cáo của Nhà Trắng về các Chuỗi khối Bằng chứng công việc (PoW)](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Khí thải của Ethereum: Một ước tính từ dưới lên](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Chỉ số Tiêu thụ Năng lượng của Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Những tác động đến Mức tiêu thụ Điện năng và Lượng khí thải Carbon của Mạng lưới Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Mức tiêu thụ năng lượng của Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Các chủ đề liên quan {#related-topics}

- [Chuỗi Beacon](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)