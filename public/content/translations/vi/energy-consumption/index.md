---
title: "Năng lượng tiêu thu của Ethereum"
description: "Các thông tin cơ bản cần hiểu về năng lượng tiêu thụ của Ethereum."
lang: vi
---

# Chi tiêu năng lượng của Ethereum {#proof-of-stake-energy}

Ethereum là một chuỗi khối xanh. Cơ chế đồng thuận [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos) của Ethereum sử dụng ETH thay vì [năng lượng để bảo mật mạng lưới](/developers/docs/consensus-mechanisms/pow). Mức tiêu thụ năng lượng của Ethereum là khoảng [~0,0026 TWh/năm](https://carbon-ratings.com/eth-report-2022) trên toàn bộ mạng lưới toàn cầu.

Ước tính mức tiêu thụ năng lượng cho Ethereum đến từ một nghiên cứu của [CCRI (Viện Đánh giá Carbon Tiền mã hóa)](https://carbon-ratings.com). Họ đã tạo ra các ước tính từ dưới lên về mức tiêu thụ điện và dấu chân carbon của mạng lưới Ethereum ([xem báo cáo](https://carbon-ratings.com/eth-report-2022)). Họ đã đo mức tiêu thụ điện của các nodes khác nhau với nhiều loại phần cứng và cấu hình phần mềm máy khách. Ước tính **2.601 MWh** (0,0026 TWh) cho mức tiêu thụ điện hàng năm của mạng lưới tương ứng với lượng phát thải carbon hàng năm là **870 tấn CO2e** khi áp dụng các yếu tố cường độ carbon theo từng khu vực. Giá trị này thay đổi khi các nút vào và rời khỏi mạng - bạn có thể theo dõi bằng cách sử dụng ước tính trung bình trượt 7 ngày của [Chỉ số Bền vững Mạng lưới Chuỗi khối Cambridge](https://ccaf.io/cbnsi/ethereum) (lưu ý rằng họ sử dụng một phương pháp hơi khác cho các ước tính của mình - chi tiết có trên trang web của họ).

Để đánh giá mức tiêu thụ năng lượng của Ethereum một cách chính xác, chúng ta có thể so sánh các ước tính được tính toán hàng năm với một số sản phẩm và ngành công nghiệp khác. Điều này giúp chúng ta hiểu rõ hơn liệu mức tiêu thụ năng lượng của Ethereum là cao hay thấp.

<EnergyConsumptionChart />

Biểu đồ phía trên hiển thị mức tiêu thụ năng lượng ước tính theo TWh/năm cho Ethereum, so sánh với một số sản phẩm và ngành công nghiệp khác. Các ước tính được cung cấp dựa trên thông tin công khai, truy cập vào tháng 7 năm 2023, với các liên kết đến nguồn được liệt kê trong bảng bên dưới.

|                            | Năng lượng tiêu thụ hàng năm (TWh) | So sánh với Ethereum PoS |                                                                                       Nguồn                                                                                      |
| :------------------------- | :---------------------------------------------------: | :----------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Trung tâm dữ liệu toàn cầu |                          190                          |          73,000x         |                                    [nguồn](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                    |                          149                          |          53,000x         |                                                                 [nguồn](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Khai thác vàng             |                          131                          |          50,000x         |                                                                 [nguồn](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Ngành game tại Hoa Kỳ\*    |                           34                          |          13,000x         |                 [nguồn](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| Ethereum PoW               |                           21                          |          8,100x          |                                                                     [nguồn](https://ccaf.io/cbnsi/ethereum/1)                                                                    |
| Google                     |                           19                          |          7,300x          |                                           [nguồn](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                    |                 0.457                 |           176x           | [nguồn](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                     |                  0.26                 |           100x           |                                  [nguồn](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-\(1\).pdf)                                 |
| AirBnB                     |                  0.02                 |            8x            |                              [nguồn](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-\(Final\).pdf)                              |
| **Ethereum PoS**           |               **0.0026**              |          **1x**          |                                                                [nguồn](https://carbon-ratings.com/eth-report-2022)                                                               |

\*Bao gồm các thiết bị người dùng đầu cuối như PC, laptop và máy chơi game console.

Để có được ước tính chính xác về mức tiêu thụ năng lượng thường rất phức tạp, đặc biệt là đối với các sản phẩm hoặc ngành công nghiệp có chuỗi cung ứng rắc rối hoặc có chi tiết triển khai ảnh hưởng đến hiệu quả sử dụng năng lượng. Ví dụ, các ước tính về mức tiêu thụ năng lượng của Netflix và Google khác nhau tùy thuộc vào việc chúng chỉ bao gồm năng lượng được sử dụng để duy trì hệ thống và cung cấp nội dung cho người dùng (_chi tiêu trực tiếp_) hay chúng cũng bao gồm cả chi tiêu cần thiết để sản xuất nội dung, điều hành văn phòng công ty, quảng cáo, v.v. (_chi tiêu gián tiếp_). Chi phí gián tiếp cũng có thể bao gồm năng lượng cần thiết để tiêu thụ nội dung trên các thiết bị của người dùng cuối như TV, máy tính và điện thoại di động.

Các ước tính ở trên không phải là những phép so sánh hoàn hảo. Lượng chi phí gián tiếp được tính toán sẽ khác nhau tùy theo nguồn và hiếm khi bao gồm năng lượng từ các thiết bị của người dùng cuối. Mỗi nguồn cơ sở đều cung cấp chi tiết hơn về những gì đang được đo lường.

Bảng và biểu đồ ở trên cũng bao gồm các so sánh với Bitcoin và Ethereum bằng chứng công việc. Một điểm quan trọng cần lưu ý là mức tiêu thụ năng lượng của các mạng bằng chứng công việc không phải là cố định và thay đổi theo từng ngày. Ước tính giữa các nguồn cũng có thể khác nhau đáng kể. Chủ đề này thu hút [cuộc tranh luận](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) phức tạp, không chỉ về lượng năng lượng tiêu thụ, mà còn về các nguồn năng lượng đó và các vấn đề đạo đức liên quan. Mức tiêu thụ năng lượng không nhất thiết tương ứng chính xác với dấu chân môi trường vì các dự án khác nhau có thể sử dụng các nguồn năng lượng khác nhau, bao gồm tỷ lệ năng lượng tái tạo ít hơn hoặc nhiều hơn. Ví dụ, [Chỉ số Tiêu thụ Điện Bitcoin Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) chỉ ra rằng nhu cầu của mạng lưới Bitcoin về mặt lý thuyết có thể được cung cấp năng lượng bằng việc đốt khí thải hoặc bằng lượng điện năng lẽ ra đã bị thất thoát trong quá trình truyền tải và phân phối. Mục tiêu phát triển bền vững của Ethereum là thay thế phần ngốn năng lượng của mạng lưới bằng một giải pháp khác thân thiện với môi trường.

Bạn có thể duyệt qua các ước tính về tiêu thụ năng lượng và phát thải carbon cho nhiều ngành công nghiệp trên [trang web Chỉ số Bền vững Mạng lưới Chuỗi khối Cambridge](https://ccaf.io/cbnsi/ethereum).

## Ước tính trên mỗi giao dịch {#per-transaction-estimates}

Rất nhiều bài báo ước tính lượng năng lượng tiêu thụ của "mỗi giao dịch" trên các chuỗi khối. Điều này có thể gây hiểu lầm vì năng lượng cần thiết để đề xuất và xác minh một khối không phụ thuộc vào số lượng giao dịch bên trong nó. Nói cách khác, dù có một hay nhiều giao dịch trong khối, lượng năng lượng tiêu thụ để xử lý khối đó vẫn tương tự nhau. Ngoài ra, các ước tính trên mỗi giao dịch rất nhạy cảm với cách xác định thông lượng giao dịch của chuỗi khối và việc điều chỉnh cách xác định này có thể được thay đổi theo ý muốn để trông lớn hoặc nhỏ hơn.

Ví dụ, trên Ethereum, thông lượng giao dịch không chỉ là của lớp cơ sở - nó còn là tổng thông lượng giao dịch của tất cả các "[lớp 2](/layer-2/)" rollup của nó. Layer 2 thường không được tính vào, nhưng việc tính toán năng lượng bổ sung được tiêu thụ bởi trình xác thực trên L2 (nhỏ) và số lượng giao dịch mà chúng xử lý (lớn) có thể sẽ làm giảm đáng kể các ước tính trên mỗi giao dịch. So sánh mức tiêu thụ năng lượng cho mỗi giao dịch giữa các nền tảng blockchain có thể gây hiểu lầm vì những lý do trên.

## Nợ carbon của Ethereum {#carbon-debt}

Mức tiêu hao năng lượng của Ethereum rất thấp, nhưng điều này không phải lúc nào cũng đúng. Ethereum ban đầu sử dụng bằng chứng công việc có chi phí môi trường lớn hơn nhiều so với cơ chế bằng chứng cổ phần hiện tại.

Ngay từ đầu, Ethereum đã lên kế hoạch triển khai cơ chế đồng thuận dựa trên bằng chứng cổ phần, nhưng để làm được điều đó mà không ảnh hưởng đến tính bảo mật và tính phi tập trung đã mất nhiều năm tập trung nghiên cứu và phát triển. Do đó, cơ chế bằng chứng công việc đã được sử dụng để bắt đầu lưới. Bằng chứng công việc yêu cầu thợ đào sử dụng phần cứng máy tính của họ để tính toán một giá trị, tiêu thụ năng lượng trong quá trình này.

![So sánh mức tiêu thụ năng lượng của Ethereum trước và sau The Merge, sử dụng Tháp Eiffel (cao 330 mét) ở bên trái để tượng trưng cho mức tiêu thụ năng lượng cao trước The Merge và một mô hình Lego nhỏ cao 4 cm ở bên phải để thể hiện sự giảm đáng kể trong việc sử dụng năng lượng sau The Merge](energy_consumption_pre_post_merge.png)

CCRI ước tính rằng The Merge đã giảm mức tiêu thụ điện hàng năm của Ethereum hơn **99,988%**. Tương tự như vậy, dấu chân carbon của Ethereum đã giảm khoảng **99,992%** (từ 11.016.000 xuống còn 870 tấn CO2e). Để hình dung rõ hơn, sự giảm thiểu khí thải này tương tự như đi từ đỉnh Tháp Eiffel xuống một mô hình đồ chơi bằng nhựa nhỏ, như hình minh họa bên trên. Nhờ vậy, chi phí môi trường để bảo vệ mạng lưới được giảm thiểu đáng kể. Đồng thời, tính bảo mật của mạng lưới cũng được tin là đã được cải thiện.

## Một lớp ứng dụng xanh {#green-applications}

Mặc dù mức tiêu thụ năng lượng của Ethereum rất thấp, nhưng cũng có một cộng đồng [**tài chính tái tạo (ReFi)**](/refi/) lớn, đang phát triển và rất năng động đang xây dựng trên Ethereum. Các ứng dụng ReFi sử dụng các thành phần DeFi để xây dựng các ứng dụng tài chính có ngoại tác tích cực có ích với môi trường. ReFi là một phần của phong trào ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) rộng lớn hơn, có liên kết chặt chẽ với Ethereum và nhằm mục đích kết hợp giữa tiến bộ công nghệ và quản lý môi trường. Bản chất phi tập trung, không cần cấp phép và có thể kết hợp của Ethereum khiến nó trở thành lớp cơ sở lý tưởng cho cộng đồng ReFi và Solarpunk.

Các nền tảng tài trợ hàng hóa công cộng gốc Web3 như [Gitcoin](https://gitcoin.co) điều hành các vòng khí hậu để kích thích việc xây dựng có ý thức về môi trường trên lớp ứng dụng của Ethereum. Thông qua việc phát triển các sáng kiến này (và các sáng kiến khác, ví dụ: [DeSci](/desci/)), Ethereum đang trở thành một công nghệ có giá trị ròng tích cực đối với môi trường và xã hội.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Nếu bạn nghĩ rằng trang này có thể được thực hiện chính xác hơn, vui lòng nêu vấn đề hoặc PR. Số liệu thống kê trên trang này là ước tính dựa trên dữ liệu có sẵn công khai - chúng không đại diện cho một tuyên bố hoặc lời hứa chính thức từ đội ngũ ethereum.org hoặc Ethereum Foundation.
</AlertDescription>
</AlertContent>
</Alert>

## Đọc thêm {#further-reading}

- [Chỉ số Bền vững Mạng lưới Chuỗi khối Cambridge](https://ccaf.io/cbnsi/ethereum)
- [Báo cáo của Nhà Trắng về các chuỗi khối bằng chứng công việc](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Phát thải của Ethereum: Một Ước tính từ Dưới lên](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Chỉ số Tiêu thụ Năng lượng của Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Những tác động đến Mức tiêu thụ Điện và Dấu chân Carbon của Mạng lưới Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Mức tiêu thụ năng lượng của Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Các chủ đề liên quan {#related-topics}

- [Chuỗi Hải Đăng](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)
