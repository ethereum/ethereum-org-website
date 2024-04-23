---
title: Các tổ chức tự trị phi tập trung (DAO)
description: Tổng quan về DAO trên Ethereum
lang: vi
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /use-cases/dao-2.png
alt: Đại diện cho biểu quyết của tổ chức tự trị phi tập trung (DAO) đối với một đề xuất.
summaryPoint1: Các cộng đồng được sở hữu bởi thành viên mà không cần sự lãnh đạo tập trung.
summaryPoint2: Một cách an toàn để hợp tác với những người lạ trên Internet.
summaryPoint3: Một nơi an toàn để cam kết tài trợ cho một quỹ cụ thể.
---

## Các tổ chức tự trị phi tập trung (DAO) là gì? {#what-are-daos}

A DAO is a collectively-owned organization working towards a shared mission.

Các DAO này cho phép chúng ta làm việc cùng những người đồng chí hướng mà không cần đến một cá nhân lãnh đạo đủ tin cậy để quản lý ngân sách và vận hành của tổ chức. Trong tổ chức không có một CEO nhất định có khả năng tiêu tiền bừa bãi, hay một CFO có quyền hành sửa đổi ngân sách. Các quy tắc dựa trên công nghệ chuỗi khối (blockchain) được viết trong các đoạn mã nguồn sẽ quyết định cách hoạt động của tổ chức, và cách ngân khố được sử dụng.

Chúng có những ngân khố riêng mà không ai có thẩm quyền tiếp cận mà không có sự chấp thuận của nhóm. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice, and everything happens transparently [on-chain](/glossary/#on-chain).

## Tại sao chúng ta lại cần đến các tổ chức tự trị phi tập trung (DAO)? {#why-dao}

Để bắt đầu xây dựng một tổ chức cần có đầu tư và tiền bạc, cộng với sự hợp tác của những người khác. Điều này đòi hỏi phải có rất nhiều sự tin cậy giữa những người mà bạn đang cộng tác. Tuy nhiên, rất khó để tin tưởng ai đó mà bạn mới chỉ tương tác trên Internet. Với các tổ chức tự trị phi tập trung (DAO), bạn không cần phải tin tưởng bất kì ai khác trong nhóm. Bạn chỉ cần tin tưởng vào những đoạn mã của DAO, những đoạn mã này minh bạch 100% và có thể được xác minh bởi bất kì người nào.

Điều này mở ra vô vàn cơ hội mới cho những sự hợp tác và điều phối toàn cầu.

### Một so sánh {#dao-comparison}

| Tổ chức tự trị phi tập trung (DAO)                                                                                                                              | Một tổ chức truyền thống                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Thường có cấu trúc rõ ràng và dân chủ toàn diện.                                                                                                                | Thường có cấu trúc phân tầng.                                                                                                         |
| Đòi hỏi các thành viên phải bỏ phiếu cho bất kì một thay đổi nào.                                                                                               | Tùy vào cấu trúc, thay đổi có thể đến từ một đảng phái duy nhất, hoặc việc bỏ phiếu có thể được phe cầm quyền đề nghị.                |
| Lá phiếu được đếm và kết quả bỏ phiếu được thi hành một cách tự động mà không cần đến một bên trung gian.                                                       | Nếu việc bỏ phiếu được cho phép, lá phiếu được đếm trong nội bộ tổ chức và kết quả của cuộc bỏ phiếu được thi hành một cách thủ công. |
| Những dịch vụ được cung cấp bởi tổ chức được thực hiện một cách tự động theo một phương thức phi tập trung (ví dụ: việc phân bổ của những khoản tiền từ thiện). | Đòi hỏi phải có sự tham gia của con người hoặc sự tự động hóa được điều khiển bởi một quyền lực trung ương, dễ bị thao túng.          |
| Mọi hoạt động đều minh bạch và công khai.                                                                                                                       | Hoạt động thường mang tính riêng tư và không có sự tham gia của cộng đồng.                                                            |

### Những ví dụ về tổ chức tự trị phi tập trung (DAO) {#dao-examples}

Để giúp làm rõ hơn khái niệm này, sau đây là một số ví dụ về các tổ chức tự trị phi tập trung (DAO):

- **A charity** – you could accept donations from anyone in the world and vote on which causes to fund.
- **Collective ownership** – you could purchase physical or digital assets and members can vote on how to use them.
- **Ventures and grants** – you could create a venture fund that pools investment capital and votes on ventures to back. Tiền lời sau đó có thể được tái phân bổ cho những thành viên của tổ chức (DAO).

<iframe src="https://embed.ted.com/talks/lang/en/scott_fitsimones_could_a_dao_build_the_next_great_city" ></p>

<h2 id="how-daos-work" spaces-before="0">
  Những tổ chức tự trị phi tập trung (DAO) hoạt động như thế nào?
</h2>

<p spaces-before="0">
  The backbone of a DAO is its <a href="/glossary/#smart-contract">smart contract</a>, which defines the rules of the organization and holds the group's treasury. Một khi hợp đồng đã được kích hoạt trên Ethereum, không ai có thể thay đổi luật chơi ngoại trừ bằng một cuộc bỏ phiếu. Nếu bất kì ai cố gắng làm một điều gì đó nằm ngoài phạm vi của luật chơi và logic trong đoạn mã đã được lập trình, hành động đó sẽ thất bại. Và bởi vì ngân khố cũng được định nghĩa bởi hợp đồng thông minh nên không ai có thể dùng tiền mà không có sự chấp thuận của nhóm. Điều này đồng nghĩa với việc những tổ chức tự trị phi tập trung (DAO) không cần một thẩm quyền trung ương. Thay vào đó, tổ chức sẽ đưa ra quyết định tập thể và các khoản chi được thông qua một cách tự động khi đã đủ số phiếu.
</p>

<p spaces-before="0">
  Cách tổ chức này là có thể vì những hợp đồng thông minh trở nên không thể bị thay đổi một khi chúng đã được kích hoạt trên Ethereum. Bạn không thể chỉnh sửa những đoạn mã trong hợp đồng (những điều luật của DAO) mà không bị người khác phát hiện vì tất cả đều được công khai.
</p>

<h2 id="ethereum-and-daos" spaces-before="0">
  Ethereum và những tổ chức tự trị phi tập trung (DAO)
</h2>

<p spaces-before="0">
  Ethereum là nền tảng hoàn hảo cho những tổ chức tự trị phi tập trung (DAO) bởi một số lý do sau:
</p>

<ul>
  <li>
    Ethereum’s own consensus is decentralized and established enough for organizations to trust the network.
  </li>
  <li>
    Mã của hợp đồng thông minh không thể chỉnh sửa được một khi được kích hoạt, kể cả bởi những người chủ sở hữu của nó. Điều này cho phép tổ chức tự trị phi tập trung (DAO) vận hành bởi những luật chơi đã được lập trình từ ban đầu.
  </li>
  <li>
    Các hợp đồng thông minh có thể gửi/nhận tiền. Không có chúng, bạn sẽ cần một bên trung gian đủ tin cậy để quản lý ngân khố của nhóm.
  </li>
  <li>
    Cộng đồng của Ethereum mang tính tương hỗ nhiều hơn là cạnh tranh. Điều này cho phép các phương pháp hay nhất và những hệ thống bổ trợ được ra đời một cách nhanh chóng.
  </li>
</ul>

<h2 id="dao-governance" spaces-before="0">
  Các pháp chế của DAO
</h2>

<p spaces-before="0">
  Có rất nhiều yếu tố cần xem xét khi điều hành một DAO, chẳng hạn như cách thức bỏ phiếu và đề xuất hoạt động.
</p>

<h3 id="governance-delegation" spaces-before="0">
  Sự uỷ quyền
</h3>

<p spaces-before="0">
  Sự uy quyền giống như phiên bản DAO của đại diện nền dân chủ. Các chủ sở hữu Token ủy quyền phiếu bầu cho những người dùng tự đề cử và cam kết đảm bảo quản trị giao thức và luôn cập nhật thông tin.
</p>

<h4 id="governance-example" spaces-before="0">
  Một ví dụ phổ biến
</h4>

<p spaces-before="0">
  <a href="https://claim.ens.domains/delegate-ranking">ENS</a> – ENS holders can delegate their votes to engaged community members to represent them.
</p>

<h3 id="governance-example" spaces-before="0">
  Quản lý giao dịch tự động
</h3>

<p spaces-before="0">
  Ở nhiều DAO, các giao dịch sẽ được thực hiện tự động nếu một số thành viên bỏ phiếu đồng ý.
</p>

<h4 id="governance-example" spaces-before="0">
  Một ví dụ nổi tiếng
</h4>

<p spaces-before="0">
  <a href="https://nouns.wtf">Nouns</a> – In Nouns DAO, a transaction is automatically executed if a quorum of votes is met and a majority votes affirmative, as long as it is not vetoed by the founders.
</p>

<h3 id="governance-example" spaces-before="0">
  Quản trị đa chữ ký
</h3>

<p spaces-before="0">
  While DAOs may have thousands of voting members, funds can live in a <a href="/glossary/#wallet">wallet</a> shared by 5-20 active community members who are trusted and usually doxxed (public identities known to the community). After a vote, the <a href="/glossary/#multisig">multisig</a> signers execute the will of the community.
</p>

<h2 id="dao-laws" spaces-before="0">
  Các luật của DAO
</h2>

<p spaces-before="0">
  Vào năm 1977, Wyoming đã phát minh ra LLC để bảo vệ các doanh nhân và giới hạn quyền của họ. Gần đây nhất, họ đã đi tiên phong trong luật DAO thiết lập tư cách pháp lý cho DAO. Hiện tại Wyoming, Vermont và quần đảo Virgin đã có đạo luật DAO dưới một số hình thức.
</p>

<h3 id="law-example" spaces-before="0">
  Một ví dụ phổ biến
</h3>

<p spaces-before="0">
  <a href="https://citydao.io">CityDAO</a> – CityDAO đã sử dụng luật DAO của Wyoming để mua 40 mẫu đất gần Công viên Quốc gia Yellowstone.
</p>

<h2 id="dao-membership" spaces-before="0">
  Hội viên của tổ chức tự trị phi tập trung (DAO membership)
</h2>

<p spaces-before="0">
  Có những mô hình khác nhau cho hội viên của một tổ chức tự trị phi tập trung (DAO). Hội viên có thể quyết định việc bỏ phiếu vận hành như thế nào cũng như phần cốt lõi khác của DAO.
</p>

<h3 id="token-based-membership" spaces-before="0">
  Hội viên dựa trên token
</h3>

<p spaces-before="0">
  Usually fully <a href="/glossary/#permissionless">permissionless</a>, depending on the token used. Mostly these governance tokens can be traded permissionlessly on a <a href="/glossary/#dex">decentralized exchange</a>. Một số khác có thể kiếm được thông qua cung cấp thanh khoản hoặc một vài cơ chế 'proof of work' khác. Dù bằng cách nào thì việc nắm giữ token giúp người sở hữu có quyền bỏ phiếu.
</p>

<p spaces-before="0">
  <em x-id="4">Token thường được dùng để quản trị những giao thức phi tập trung lớn hoặc/và chính những token đó.</em>
</p>

<h4 id="token-example" spaces-before="0">
  Một ví dụ phổ biến
</h4>

<p spaces-before="0">
  <a href="https://makerdao.com">MakerDAO</a> – Token của MakerDAO là MKR có sẵn trên các sàn giao dịch phi tập trung và bất kỳ ai cũng có thể mua để có quyền biểu quyết đối với tương lai của giao thức Maker.
</p>

<h3 id="share-based-membership" spaces-before="0">
  Hội viên dựa trên cổ phần
</h3>

<p spaces-before="0">
  Những tổ chức tự trị phi tập trung (DAO) dựa trên cổ phần cần đến sự cho phép nhiều hơn nhưng vẫn rất cởi mở. Bất kỳ ai cũng có thể đề xuất gia nhập DAO, bằng cách đóng góp cho tổ chức giá trị nào đó, thường dưới dạng token hoặc lao động. Cổ phần đại diện cho quyền bổ phiếu và quyền sở hữu trực tiếp. Hội viên có thể rời bỏ bất cứ lúc nào và được giữ toàn bộ ngân khố tương đương tỉ lệ hội viên đó nắm giữ.
</p>

<p spaces-before="0">
  <em x-id="4">Hình thức này thường được dùng cho những tổ chức có sự gắn kết cao và xoay quanh con người như những quỹ từ thiện, công đoàn và câu lạc bộ đầu tư. Nó cũng có thể quản trị những giao thức và token.</em>
</p>

<h4 id="share-example" spaces-before="0">
  Một ví dụ phổ biến
</h4>

<p spaces-before="0">
  <a href="http://molochdao.com/">MolochDAO</a> – MolochDAO is focused on funding Ethereum projects. Moloch yêu cầu hội viên tiềm năng nộp một đề xuất tham gia. Dự trên đề xuất đó, Moloch có thể đánh giá liệu bạn có kĩ năng chuyên môn và tài chính cần thiết để đưa ra những phán quyết sáng suốt về những ứng viên tương lai hay không. Bạn không thể mua quyền truy cập DAO trên một sàn dịch mở.
</p>

<h3 id="reputation-based-membership" spaces-before="0">
  Tư cách hội viên dựa trên uy tín
</h3>

<p spaces-before="0">
  Độ uy tín đại diện cho bằng chứng về sự tham gia và trao quyền biểu quyết trong DAO. Không giống như token hoặc tư cách hội viên dựa trên cổ phần, các DAO dựa trên uy tín không thể chuyển quyền sở hữu cho những người đóng góp. Độ uy tín không thể mua, chuyển nhượng hoặc ủy quyền; hội viên DAO phải xây dựng uy tín qua sự đóng góp. Bỏ phiếu trên chuỗi không yêu cầu sự cho phép và các hội viên tiềm năng có thể tự do gửi đề xuất tham gia DAO và yêu cầu độ uy tín và token như một phần thưởng để đổi lấy những đóng góp của họ.
</p>

<p spaces-before="0">
  <em x-id="4">Typically used for decentralized development and governance of protocols and <a href="/glossary/#dapp">dapps</a>, but also well suited to a diverse set of organizations like charities, worker collectives, investment clubs, etc.</em>
</p>

<h4 id="reputation-example" spaces-before="0">
  Một ví dụ phổ biến
</h4>

<p spaces-before="0">
  <a href="https://DXdao.eth.link">DXdao</a> - DXdao là một tổ chức có quyền xây dựng và quản lý toàn cầu các giao thức và ứng dụng phi tập trung kể từ năm 2019. It leverages reputation-based governance and <a href="/glossary/#holographic-consensus">holographic consensus</a> to coordinate and manage funds, meaning no one can buy their way into influencing its future.
</p>

<h2 id="join-start-a-dao" spaces-before="0">
  Gia nhập / khởi phát một tổ chức tự trị phi tập trung (DAO)
</h2>

<h3 id="join-a-dao" spaces-before="0">
  Gia nhập một tổ chức tự trị phi tập trung (DAO)
</h3>

<ul>
  <li>
    <a href="/community/get-involved/#decentralized-autonomous-organizations-daos">Những DAO trên Ethereum</a>
  </li>
  <li>
    <a href="https://app.daohaus.club/explore">Danh sách các DAO của DAOHaus</a>
  </li>
  <li>
    <a href="https://www.tally.xyz">Danh sách các DAO của Tally.xyz</a>
  </li>
</ul>

<h3 id="start-a-dao" spaces-before="0">
  Khởi tạo một DAO
</h3>

<ul>
  <li>
    <a href="https://app.daohaus.club/summon">Kêu gọi một DAO với DAOHaus</a>
  </li>
  <li>
    <a href="https://www.tally.xyz/add-a-dao">Bắt đầu một Governor DAO với Tally</a>
  </li>
  <li>
    <a href="https://aragon.org/product">Tạo ra một DAO được hỗ trợ bởi Aragon</a>
  </li>
  <li>
    <a href="https://colony.io/">Khởi phát một thuộc địa</a>
  </li>
  <li>
    <a href="https://alchemy.daostack.io/daos/create">Tạo một DAO với sự đồng thuận đa chiều DAOstack</a>
  </li>
</ul>

<h2 id="further-reading" spaces-before="0">
  Đọc thêm
</h2>

<h3 id="dao-articles" spaces-before="0">
  Những bài viết về DAO
</h3>

<ul>
  <li>
    <a href="https://aragon.org/dao">DAO là gì?</a> – <a href="https://aragon.org/">Aragon</a>
  </li>
  <li>
    <a href="https://wiki.metagame.wtf/docs/great-houses/house-of-daos">Ngôi nhà của các DAO</a> - <a href="https://wiki.metagame.wtf/">Metagame</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for">Một DAO là gì và để làm gì?</a> - <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a">Làm thế nào để khởi phát một cộng đồng số hoạt động dựa trên DAO</a> - <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://coinmarketcap.com/alexandria/article/what-is-a-dao">DAO là gì?</a> - <a href="https://coinmarketcap.com">Coinmarketcap</a>
  </li>
  <li>
    <a href="https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c">Đồng thuận đa chiều là gì?</a> - <a href="https://daostack.io/">DAOstack</a>
  </li>
  <li>
    <a href="https://vitalik.eth.limo/general/2022/09/20/daos.html">DAO không phải là công ty: Khi sự phân quyền trong tổ chức tự trị có vai trò quan trọng, theo Vitalik</a>
  </li>
  <li>
    <a href="https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide">DAO, DAC, DA và Nhiều Hơn Nữa: Hướng Dẫn Thuật Ngữ Không Hoàn Chỉnh</a> - <a href="https://blog.ethereum.org">Ethereum Blog</a>
  </li>
</ul>

<h3 id="videos" spaces-before="0">
  Các đoạn video
</h3>

<ul>
  <li>
    <a href="https://youtu.be/KHm0uUPqmVE">DAO đóng vai trò gì trong tiền mã hóa?</a>
  </li>
  <li>
    <a href="https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city">Một DAO có thể tạo nên một thành phố được không?</a> - <a href="https://www.ted.com/">TED</a>
  </li>
</ul>
