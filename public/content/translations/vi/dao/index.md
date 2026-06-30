---
title: "DAO là gì?"
metaTitle: "DAO là gì? | Tổ chức tự trị phi tập trung"
description: "Tổng quan về các DAO trên Ethereum"
lang: vi
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "Hình ảnh minh họa một DAO đang bỏ phiếu cho một đề xuất."
summaryPoints:
  - "Các cộng đồng do thành viên sở hữu mà không có sự lãnh đạo tập trung."
  - "Một cách an toàn để cộng tác với những người lạ trên internet."
  - "Một nơi an toàn để cam kết tài trợ cho một mục đích cụ thể."
---

## DAO là gì? {#what-are-daos}

DAO là một tổ chức thuộc sở hữu tập thể, hoạt động hướng tới một sứ mệnh chung.

Các DAO cho phép chúng ta làm việc với những người cùng chí hướng trên toàn cầu mà không cần phải tin tưởng vào một nhà lãnh đạo nhân từ để quản lý quỹ hoặc hoạt động. Không có CEO nào có thể tùy ý chi tiêu quỹ hay CFO nào có thể thao túng sổ sách. Thay vào đó, các quy tắc dựa trên chuỗi khối được tích hợp vào mã nguồn sẽ xác định cách tổ chức hoạt động và cách quỹ được chi tiêu.

Chúng có các kho bạc được tích hợp sẵn mà không ai có quyền truy cập nếu không có sự chấp thuận của nhóm. Các quyết định được quản trị bằng các đề xuất và bỏ phiếu để đảm bảo mọi người trong tổ chức đều có tiếng nói, và mọi thứ diễn ra minh bạch [trên chuỗi](/glossary/#onchain).

## Tại sao chúng ta cần các DAO? {#why-dao}

Việc bắt đầu một tổ chức với ai đó liên quan đến tài trợ và tiền bạc đòi hỏi rất nhiều sự tin tưởng vào những người bạn đang làm việc cùng. Nhưng thật khó để tin tưởng một người mà bạn chỉ mới tương tác trên internet. Với các DAO, bạn không cần phải tin tưởng bất kỳ ai khác trong nhóm, chỉ cần tin vào mã nguồn của DAO, thứ minh bạch 100% và có thể được xác minh bởi bất kỳ ai.

Điều này mở ra rất nhiều cơ hội mới cho sự cộng tác và phối hợp toàn cầu.

### Bảng so sánh {#dao-comparison}

| DAO                                                                                                                     | Một tổ chức truyền thống                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Thường có cấu trúc phẳng và được dân chủ hóa hoàn toàn.                                                                                   | Thường có cấu trúc phân cấp.                                                                            |
| Yêu cầu các thành viên bỏ phiếu để thực hiện bất kỳ thay đổi nào.                                                           | Tùy thuộc vào cấu trúc, các thay đổi có thể được yêu cầu từ một bên duy nhất, hoặc có thể tổ chức bỏ phiếu.     |
| Các phiếu bầu được kiểm đếm và kết quả được thực hiện tự động mà không cần trung gian đáng tin cậy.                                      | Nếu được phép bỏ phiếu, các phiếu bầu sẽ được kiểm đếm nội bộ và kết quả bỏ phiếu phải được xử lý thủ công. |
| Các dịch vụ được cung cấp sẽ được xử lý tự động theo cách phi tập trung (ví dụ: phân phối các quỹ từ thiện). | Yêu cầu xử lý bởi con người hoặc tự động hóa được kiểm soát tập trung, dễ bị thao túng.              |
| Mọi hoạt động đều minh bạch và hoàn toàn công khai.                                                                           | Hoạt động thường mang tính riêng tư và hạn chế đối với công chúng.                                        |

### Các ví dụ về DAO {#dao-examples}

Để giúp điều này trở nên dễ hiểu hơn, dưới đây là một vài ví dụ về cách bạn có thể sử dụng một DAO:

- **Một tổ chức từ thiện** – bạn có thể nhận quyên góp từ bất kỳ ai trên thế giới và bỏ phiếu cho các mục đích cần tài trợ.
- **Sở hữu tập thể** – bạn có thể mua các tài sản vật chất hoặc kỹ thuật số và các thành viên có thể bỏ phiếu về cách sử dụng chúng.
- **Đầu tư mạo hiểm và tài trợ** – bạn có thể tạo một quỹ đầu tư mạo hiểm tập hợp vốn đầu tư và bỏ phiếu cho các dự án để hỗ trợ. Tiền hoàn trả sau đó có thể được phân phối lại cho các thành viên DAO.

<VideoWatch slug="dao-build-next-great-city" />

## Các DAO hoạt động như thế nào? {#how-daos-work}

Xương sống của một DAO là [hợp đồng thông minh](/glossary/#smart-contract) của nó, thứ xác định các quy tắc của tổ chức và nắm giữ kho bạc của nhóm. Khi hợp đồng đã hoạt động trên [Ethereum](/), không ai có thể thay đổi các quy tắc ngoại trừ thông qua việc bỏ phiếu. Nếu bất kỳ ai cố gắng làm điều gì đó không nằm trong các quy tắc và logic của mã nguồn, nó sẽ thất bại. Và vì kho bạc cũng được xác định bởi hợp đồng thông minh, điều đó có nghĩa là không ai có thể tiêu tiền nếu không có sự chấp thuận của nhóm. Điều này có nghĩa là các DAO không cần một cơ quan trung ương. Thay vào đó, nhóm đưa ra các quyết định tập thể và các khoản thanh toán được tự động ủy quyền khi các cuộc bỏ phiếu được thông qua.

Điều này là có thể vì các hợp đồng thông minh có khả năng chống giả mạo một khi chúng hoạt động trên Ethereum. Bạn không thể chỉ chỉnh sửa mã nguồn (các quy tắc của DAO) mà không ai chú ý vì mọi thứ đều công khai.

## Ethereum và các DAO {#ethereum-and-daos}

Ethereum là nền tảng hoàn hảo cho các DAO vì một số lý do:

- Bản thân sự đồng thuận của Ethereum là phi tập trung và đủ vững chắc để các tổ chức tin tưởng vào mạng lưới.
- Mã nguồn hợp đồng thông minh không thể bị sửa đổi một khi đã hoạt động, ngay cả bởi chủ sở hữu của nó. Điều này cho phép DAO hoạt động theo các quy tắc mà nó đã được lập trình.
- Các hợp đồng thông minh có thể gửi/nhận tiền. Nếu không có điều này, bạn sẽ cần một trung gian đáng tin cậy để quản lý quỹ của nhóm.
- Cộng đồng Ethereum đã chứng minh được tính hợp tác cao hơn là cạnh tranh, cho phép các phương pháp hay nhất và hệ thống hỗ trợ xuất hiện nhanh chóng.

## Quản trị DAO {#dao-governance}

Có nhiều điều cần cân nhắc khi quản trị một DAO, chẳng hạn như cách thức bỏ phiếu và các đề xuất hoạt động.

### Sự ủy quyền {#governance-delegation}

Sự ủy quyền giống như phiên bản DAO của nền dân chủ đại diện. Những người nắm giữ token ủy quyền bỏ phiếu cho những người dùng tự đề cử và cam kết quản lý giao thức cũng như luôn cập nhật thông tin.

#### Một ví dụ nổi tiếng {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Những người nắm giữ ENS có thể ủy quyền bỏ phiếu của họ cho các thành viên cộng đồng tích cực để đại diện cho họ.

### Quản trị giao dịch tự động {#governance-example-2}

Trong nhiều DAO, các giao dịch sẽ được tự động thực thi nếu một số lượng đại biểu (quorum) thành viên bỏ phiếu tán thành.

#### Một ví dụ nổi tiếng {#governance-example-3}

[Nouns](https://nouns.wtf) – Trong Nouns DAO, một giao dịch được tự động thực thi nếu đạt đủ số lượng đại biểu bỏ phiếu và đa số bỏ phiếu tán thành, miễn là nó không bị các nhà sáng lập phủ quyết.

### Quản trị đa chữ ký {#governance-example-4}

Mặc dù các DAO có thể có hàng nghìn thành viên bỏ phiếu, nhưng quỹ có thể nằm trong một [ví](/glossary/#wallet) được chia sẻ bởi 5-20 thành viên cộng đồng tích cực, những người được tin tưởng và thường được công khai danh tính (danh tính công khai được cộng đồng biết đến). Sau một cuộc bỏ phiếu, những người ký [đa chữ ký](/glossary/#multisig) sẽ thực thi ý chí của cộng đồng.

## Luật về DAO {#dao-laws}

Năm 1977, Wyoming đã phát minh ra LLC (Công ty Trách nhiệm Hữu hạn), giúp bảo vệ các doanh nhân và giới hạn trách nhiệm pháp lý của họ. Gần đây hơn, họ đã tiên phong trong luật về DAO nhằm thiết lập tình trạng pháp lý cho các DAO. Hiện tại, Wyoming, Vermont và Quần đảo Virgin đã có luật về DAO dưới một số hình thức.

### Một ví dụ nổi tiếng {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO đã sử dụng luật về DAO của Wyoming để mua 40 mẫu đất gần Công viên Quốc gia Yellowstone.

## Tư cách thành viên DAO {#dao-membership}

Có nhiều mô hình khác nhau cho tư cách thành viên DAO. Tư cách thành viên có thể quyết định cách thức bỏ phiếu hoạt động và các phần quan trọng khác của DAO.

### Tư cách thành viên dựa trên token {#token-based-membership}

Thường hoàn toàn [không cần cấp phép](/glossary/#permissionless), tùy thuộc vào token được sử dụng. Hầu hết các token quản trị này có thể được giao dịch không cần cấp phép trên một [sàn giao dịch phi tập trung](/glossary/#dex). Những token khác phải kiếm được thông qua việc cung cấp thanh khoản hoặc một số 'bằng chứng công việc (PoW)' khác. Dù bằng cách nào, chỉ cần nắm giữ token là có quyền truy cập vào việc bỏ phiếu.

_Thường được sử dụng để quản trị các giao thức phi tập trung rộng lớn và/hoặc chính các token đó._

#### Một ví dụ nổi tiếng {#token-example}

[MakerDAO](https://makerdao.com) – Token MKR của MakerDAO có sẵn rộng rãi trên các sàn giao dịch phi tập trung và bất kỳ ai cũng có thể mua để có quyền bỏ phiếu về tương lai của giao thức Maker.

### Tư cách thành viên dựa trên cổ phần {#share-based-membership}

Các DAO dựa trên cổ phần thì có cấp phép hơn, nhưng vẫn khá cởi mở. Bất kỳ thành viên tiềm năng nào cũng có thể gửi một đề xuất để tham gia DAO, thường là cung cấp một khoản đóng góp có giá trị dưới dạng token hoặc công việc. Cổ phần đại diện cho quyền bỏ phiếu trực tiếp và quyền sở hữu. Các thành viên có thể thoát bất cứ lúc nào với tỷ lệ cổ phần tương ứng của họ trong kho bạc.

_Thường được sử dụng cho các tổ chức gắn kết chặt chẽ hơn, lấy con người làm trung tâm như các tổ chức từ thiện, tập thể công nhân và câu lạc bộ đầu tư. Cũng có thể quản trị các giao thức và token._

### Tư cách thành viên dựa trên danh tiếng {#reputation-based-membership}

Danh tiếng đại diện cho bằng chứng tham gia và cấp quyền bỏ phiếu trong DAO. Không giống như tư cách thành viên dựa trên token hoặc cổ phần, các DAO dựa trên danh tiếng không chuyển giao quyền sở hữu cho những người đóng góp. Danh tiếng không thể được mua, chuyển nhượng hoặc ủy quyền; các thành viên DAO phải kiếm được danh tiếng thông qua việc tham gia. Việc bỏ phiếu trên chuỗi là không cần cấp phép và các thành viên tiềm năng có thể tự do gửi các đề xuất để tham gia DAO và yêu cầu nhận danh tiếng cũng như token như một phần thưởng để đổi lấy những đóng góp của họ.

_Thường được sử dụng cho việc phát triển và quản trị phi tập trung các giao thức và [ứng dụng phi tập trung (dapp)](/glossary/#dapp), nhưng cũng rất phù hợp với một tập hợp đa dạng các tổ chức như tổ chức từ thiện, tập thể công nhân, câu lạc bộ đầu tư, v.v._

#### Một ví dụ nổi tiếng {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao là một tập thể có chủ quyền toàn cầu xây dựng và quản trị các giao thức và ứng dụng phi tập trung kể từ năm 2019. Nó đã tận dụng quản trị dựa trên danh tiếng và [đồng thuận toàn ảnh](/glossary/#holographic-consensus) để điều phối và quản lý quỹ, nghĩa là không ai có thể dùng tiền để mua sức ảnh hưởng đến tương lai hoặc quản trị của nó.

## Tham gia / bắt đầu một DAO {#join-start-a-dao}

### Tham gia một DAO {#join-a-dao}

- [Các DAO của cộng đồng Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Danh sách các DAO của DAOHaus](https://app.daohaus.club/explore)
- [Danh sách các DAO của Tally.xyz](https://www.tally.xyz/explore)
- [Danh sách các DAO của DeGov.AI](https://apps.degov.ai/)

### Bắt đầu một DAO {#start-a-dao}

- [Khởi tạo một DAO với DAOHaus](https://app.daohaus.club/summon)
- [Bắt đầu một Governor DAO với Tally](https://www.tally.xyz/get-started)
- [Tạo một DAO được hỗ trợ bởi Aragon](https://aragon.org/product)
- [Bắt đầu một colony](https://colony.io/)
- [Khởi chạy một DAO với DeGov Launcher](https://docs.degov.ai/integration/deploy)
## Đọc thêm {#further-reading}

### Các bài viết về DAO {#dao-articles}

- [DAO là gì?](https://blog.aragon.org/what-is-a-dao/) – [Aragon](https://aragon.org/)
- [Ngôi nhà của các DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [DAO là gì và nó dùng để làm gì?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Cách bắt đầu một cộng đồng kỹ thuật số được hỗ trợ bởi DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [DAO là gì?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Đồng thuận toàn ảnh là gì?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [Các DAO không phải là tập đoàn: nơi sự phi tập trung trong các tổ chức tự trị có ý nghĩa quan trọng bởi Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA và hơn thế nữa: Hướng dẫn thuật ngữ chưa hoàn chỉnh](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog Ethereum](https://blog.ethereum.org)

### Video {#videos}

- [DAO trong tiền mã hóa là gì?](https://youtu.be/KHm0uUPqmVE)
- [Một DAO có thể xây dựng một thành phố không?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
