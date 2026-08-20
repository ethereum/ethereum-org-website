---
title: Công nghệ trình xác thực phân tán
description: Công nghệ trình xác thực phân tán cho phép nhiều bên cùng vận hành phân tán một trình xác thực Ethereum.
lang: vi
template: staking
sidebarDepth: 2
summaryPoints:
  - Chia nhỏ khóa ký của trình xác thực trên nhiều máy móc và người vận hành, loại bỏ các điểm lỗi đơn lẻ
  - Giữ cho các trình xác thực luôn trực tuyến bất chấp các lỗi phần cứng, phần mềm hoặc người vận hành riêng lẻ
  - Cơ sở hạ tầng sản xuất được sử dụng hiện nay bởi những người đặt cọc độc lập, các dịch vụ đặt cọc và các nhóm đặt cọc chung
---

## Công nghệ trình xác thực phân tán là gì? {#what-is-dvt}

Công nghệ trình xác thực phân tán (DVT) là một phương pháp bảo mật trình xác thực giúp phân tán việc quản lý khóa và trách nhiệm ký cho nhiều bên, nhằm giảm thiểu các điểm lỗi đơn lẻ và tăng cường khả năng phục hồi của trình xác thực.

DVT phân tán việc quản lý khóa và việc ký bằng cách **chia nhỏ khóa riêng tư** được sử dụng để bảo mật một trình xác thực **trên nhiều máy tính** được tổ chức thành một "cụm". Việc này cho phép một số nút trong cụm ngoại tuyến trong khi vẫn giữ cho nút trình xác thực hoạt động, vì công việc xác thực cần thiết có thể được thực hiện bởi một nhóm nhỏ các máy trong mỗi cụm. Sự phân tán này làm giảm các điểm lỗi đơn lẻ, giúp trình xác thực trở nên mạnh mẽ hơn. Một lợi ích bổ sung của việc phân tán việc ký của DVT là nó khiến những kẻ tấn công rất khó giành được quyền truy cập vào khóa, vì nó không được lưu trữ toàn bộ trên bất kỳ máy đơn lẻ nào.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

DVT không phải là một cách đặt cọc riêng biệt. Nó là một lớp phần mềm mà bất kỳ thiết lập đặt cọc nào cũng có thể sử dụng:
- [Người đặt cọc độc lập](/staking/solo/) có thể hợp tác để cùng nhau chạy một trình xác thực, hoặc một cá nhân đặt cọc độc lập có thể sử dụng DVT để tăng cường khả năng phục hồi cho thiết lập đặt cọc độc lập của họ.
- [Các dịch vụ đặt cọc](/staking/saas/) và [nhóm đặt cọc chung](/staking/pools/) có thể sử dụng DVT để tăng cường khả năng phục hồi và củng cố cơ sở hạ tầng đặt cọc của họ, hoặc để phân tán các hoạt động của trình xác thực cho nhiều người vận hành độc lập.

## Tại sao chúng ta cần DVT? {#why-do-we-need-dvt}

### Bảo mật {#security}

Các trình xác thực tạo ra hai cặp khóa công khai-riêng tư: khóa trình xác thực để tham gia vào đồng thuận và khóa rút tiền để truy cập tiền. Mặc dù các trình xác thực có thể bảo mật khóa rút tiền trong ví lạnh, nhưng các khóa riêng tư của trình xác thực phải trực tuyến 24/7 để ký các nhiệm vụ mà trình xác thực được giao suốt ngày đêm, chẳng hạn như chứng thực và đề xuất khối. Việc giữ một khóa trực tuyến khiến nó có nguy cơ bị đánh cắp và DVT hạn chế rủi ro đó: chỉ có các phần chia sẻ của khóa mới trực tuyến, không bao giờ là toàn bộ khóa.

Nếu khóa riêng tư của trình xác thực bị xâm phạm, kẻ tấn công có thể kiểm soát trình xác thực, có khả năng dẫn đến việc bị phạt cắt giảm hoặc mất ETH của người đặt cọc. DVT giảm thiểu rủi ro này. Với DVT, toàn bộ khóa trình xác thực ban đầu được mã hóa và chia thành các phần chia sẻ khóa. Các phần chia sẻ khóa này tồn tại trực tuyến, được phân tán trên nhiều nút cùng nhau vận hành trình xác thực, trong khi khóa 'chính' toàn vẹn vẫn ngoại tuyến một cách an toàn. Việc phân tán này là khả thi vì các trình xác thực [Ethereum](/) sử dụng chữ ký BLS có tính cộng gộp, nghĩa là toàn bộ khóa có thể được tái tạo bằng cách tính tổng các phần cấu thành của chúng. Các chữ ký một phần được tạo bằng các phần chia sẻ khóa sẽ kết hợp thành một chữ ký hợp lệ cho toàn bộ khóa, do đó bản thân toàn bộ khóa không bao giờ cần thiết cho việc ký hàng ngày. Khi một cụm tạo ra một khóa trình xác thực mới bằng cách sử dụng tính năng tạo khóa phân tán, toàn bộ khóa riêng tư không bao giờ tồn tại trên bất kỳ máy đơn lẻ nào.

### Không có điểm lỗi đơn lẻ {#no-single-point-of-failure}

Khi một trình xác thực được chia cho nhiều người vận hành và nhiều máy móc, nó có thể chịu đựng được các lỗi phần cứng và phần mềm riêng lẻ mà không bị ngoại tuyến. Rủi ro hỏng hóc cũng có thể được giảm bớt bằng cách sử dụng các cấu hình phần cứng và phần mềm đa dạng trên các nút trong một cụm. Việc phân tán cho nhiều người vận hành không có sẵn theo mặc định đối với các cấu hình trình xác thực nút đơn; nó đến từ lớp phần mềm trung gian DVT.

Nếu một trong các thành phần của một máy trong cụm bị hỏng (ví dụ: nếu có bốn người vận hành trong một cụm trình xác thực và một người sử dụng một ứng dụng khách cụ thể có lỗi), những người khác có thể đảm bảo rằng trình xác thực vẫn tiếp tục hoạt động.

### Sự phi tập trung {#decentralization}

Kịch bản lý tưởng cho Ethereum là có càng nhiều trình xác thực được vận hành độc lập càng tốt. Tuy nhiên, một vài nhà cung cấp dịch vụ đặt cọc đã trở nên rất phổ biến và chiếm một phần đáng kể trong tổng số ETH được đặt cọc trên mạng lưới. DVT có thể cho phép các nhà vận hành này tồn tại trong khi vẫn duy trì sự phi tập trung của cổ phần. Điều này là do các khóa cho mỗi trình xác thực được phân tán trên nhiều máy móc và sẽ cần sự thông đồng lớn hơn nhiều để một trình xác thực trở nên độc hại.

Nếu không có DVT, các nhà cung cấp dịch vụ đặt cọc sẽ dễ dàng hơn trong việc chỉ hỗ trợ một hoặc hai cấu hình ứng dụng khách cho tất cả các trình xác thực của họ, làm tăng tác động của một lỗi ứng dụng khách. DVT có thể được sử dụng để phân tán rủi ro trên nhiều cấu hình ứng dụng khách và phần cứng khác nhau, tạo ra khả năng phục hồi thông qua sự đa dạng.

**DVT mang lại những lợi ích sau cho Ethereum:**

1. **Sự phi tập trung** của đồng thuận Bằng chứng cổ phần (PoS) của Ethereum
2. Đảm bảo **tính hoạt động (liveness)** của mạng lưới
3. Tạo ra **khả năng chịu lỗi** cho trình xác thực
4. Hoạt động của trình xác thực **giảm thiểu sự tin cậy**
5. **Giảm thiểu rủi ro phạt cắt giảm** và thời gian ngừng hoạt động
6. **Cải thiện sự đa dạng** (ứng dụng khách, trung tâm dữ liệu, vị trí, quy định, v.v.)
7. **Tăng cường bảo mật** trong việc quản lý khóa của trình xác thực

## DVT hoạt động như thế nào? {#how-does-dvt-work}

Các triển khai DVT thường chạy như một phần mềm bổ sung trên mỗi máy trong một cụm. Phần mềm này hoạt động như một phần mềm trung gian, nằm giữa ứng dụng khách trình xác thực của một nút và ứng dụng khách đồng thuận của nó, nơi nó điều phối với các nút khác trong cụm để các nhiệm vụ của trình xác thực được ký tập thể.

Một giải pháp DVT bao gồm các thành phần sau:

- **[Chia sẻ bí mật của Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Các trình xác thực sử dụng [khóa BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Một khóa riêng tư của trình xác thực có thể được chia thành nhiều "phần chia sẻ khóa" và vì chữ ký BLS có tính cộng gộp, các chữ ký một phần được tạo bằng các phần chia sẻ khóa đó có thể được kết hợp thành một chữ ký duy nhất hợp lệ cho toàn bộ khóa trình xác thực.
- **[Lược đồ chữ ký ngưỡng](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Xác định số lượng các phần chia sẻ khóa riêng lẻ cần thiết cho các nhiệm vụ ký, ví dụ: 3 trên 4.
- **[Tạo khóa phân tán (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Quá trình mật mã học tạo ra các phần chia sẻ khóa và được sử dụng để phân tán các phần chia sẻ của một khóa trình xác thực hiện có hoặc mới cho các nút trong một cụm.
- **[Tính toán đa bên (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Toàn bộ khóa trình xác thực được tạo bí mật bằng cách sử dụng tính toán đa bên. Toàn bộ khóa không bao giờ được biết đến bởi bất kỳ người vận hành cá nhân nào—họ chỉ biết phần của riêng họ (tức là "phần chia sẻ" của họ).
- **Giao thức đồng thuận** - Giao thức đồng thuận chọn một nút làm người đề xuất khối. Họ chia sẻ khối với các nút khác trong cụm, những nút này sẽ thêm phần chia sẻ khóa của họ vào chữ ký tổng hợp. Khi đủ số lượng phần chia sẻ khóa được tổng hợp, khối sẽ được đề xuất trên Ethereum.

Các trình xác thực phân tán có khả năng chịu lỗi tích hợp và có thể tiếp tục hoạt động ngay cả khi một số nút riêng lẻ ngoại tuyến. Cụm của nút trình xác thực có khả năng phục hồi ngay cả khi một số nút bên trong nó trở nên độc hại hoặc lười biếng.

## DVT trong thực tế sản xuất {#dvt-in-production}

Các trình xác thực phân tán hiện đang chạy trên Mạng chính (Mainnet) thông qua việc đặt cọc độc lập, dịch vụ đặt cọc và đặt cọc chung. Hai mạng lưới chiếm phần lớn hoạt động này:

<ProductDisclaimer />

- **Obol** phát triển Charon, một ứng dụng khách phần mềm trung gian DVT mã nguồn mở cho phép một cụm máy móc cùng nhau vận hành một trình xác thực ("đặt cọc theo đội"). Các nhóm thực hiện việc tạo khóa phân tán và cấu hình cụm của họ thông qua [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) của Obol. Các cụm Obol được sử dụng trong thực tế sản xuất bởi [các giao thức đặt cọc](/staking/pools/) và [các dịch vụ đặt cọc](/staking/saas/), bao gồm mô-đun Simple DVT của Lido và chương trình Operation Solo Staker của EtherFi, giúp đưa những người vận hành tại nhà vào các cụm có khả năng chịu lỗi.
- **SSV Network** là một mạng lưới không cần cấp phép gồm các người vận hành nút độc lập. Một khóa trình xác thực được chia thành các phần chia sẻ khóa và phân tán cho một nhóm người vận hành được chọn, những người này sẽ cùng nhau thực hiện các nhiệm vụ của trình xác thực; không một người vận hành đơn lẻ nào nắm giữ toàn bộ khóa. Các dịch vụ đặt cọc và nhóm đặt cọc chung chạy các tập hợp trình xác thực lớn trên SSV, và giống như Obol, nó được sử dụng bởi mô-đun Simple DVT của Lido.

## Các trường hợp sử dụng DVT {#dvt-use-cases}

DVT có những tác động đáng kể đối với ngành công nghiệp đặt cọc nói chung:

### Người đặt cọc độc lập {#solo-stakers}

DVT cho phép **đặt cọc theo đội (squad staking)**: một nhóm nhỏ những người, chẳng hạn như bạn bè, thành viên cộng đồng hoặc những người lạ được điều phối thông qua một launchpad, cùng nhau chạy một trình xác thực duy nhất trên các máy của riêng họ. Một ngưỡng của nhóm (ví dụ: 3 trên 4) phải trực tuyến để trình xác thực thực hiện các nhiệm vụ của nó, do đó không có thời gian ngừng hoạt động, lỗi phần cứng hoặc sai sót của bất kỳ thành viên đơn lẻ nào làm cho trình xác thực bị ngoại tuyến. Khi khóa được tạo bằng tính năng tạo khóa phân tán, không có thành viên nào nắm giữ toàn bộ khóa ký.

DVT cũng cho phép đặt cọc không lưu ký bằng cách cho phép bạn phân tán khóa trình xác thực của mình trên các nút từ xa trong khi vẫn giữ toàn bộ khóa hoàn toàn ngoại tuyến. Điều này có nghĩa là những người đặt cọc không nhất thiết phải chạy phần cứng của riêng họ và việc phân tán các phần chia sẻ khóa giúp bảo vệ chống lại các vụ hack tiềm ẩn.

### Staking như một dịch vụ (SaaS) {#saas}

Các nhà vận hành (chẳng hạn như các nhóm đặt cọc chung và những người đặt cọc tổ chức) quản lý nhiều trình xác thực có thể sử dụng DVT để giảm thiểu rủi ro của họ. Bằng cách phân tán cơ sở hạ tầng của mình, họ có thể thêm tính dự phòng vào các hoạt động của mình và đa dạng hóa các loại phần cứng mà họ sử dụng.

DVT chia sẻ trách nhiệm quản lý khóa trên nhiều nút, nghĩa là một số chi phí vận hành cũng có thể được chia sẻ. DVT cũng có thể giảm rủi ro vận hành và chi phí bảo hiểm cho các nhà cung cấp dịch vụ đặt cọc.

### Nhóm đặt cọc chung {#staking-pools}

Do các thiết lập trình xác thực tiêu chuẩn, các nhóm đặt cọc chung và các nhà cung cấp dịch vụ đặt cọc thanh khoản trước đây đã phải đặt niềm tin đáng kể vào từng người vận hành cá nhân, vì lợi nhuận và thua lỗ được chia sẻ trong toàn bộ nhóm. Họ cũng phụ thuộc vào những người vận hành để bảo vệ các khóa ký vì cho đến khi có DVT, không có lựa chọn nào khác cho họ.

Mặc dù theo truyền thống, những nỗ lực được thực hiện để phân tán rủi ro bằng cách phân bổ các khoản đặt cọc cho nhiều người vận hành, mỗi người vận hành vẫn quản lý một khoản đặt cọc đáng kể một cách độc lập. Việc dựa vào một người vận hành duy nhất gây ra những rủi ro to lớn nếu họ hoạt động kém hiệu quả, gặp phải thời gian ngừng hoạt động, bị xâm phạm hoặc hành động ác ý.

Bằng cách tận dụng DVT, sự tin cậy cần thiết từ mỗi người vận hành cá nhân có thể được giảm bớt. **Các nhóm có thể cho phép những người vận hành nắm giữ các khoản đặt cọc mà không cần lưu ký các khóa trình xác thực** (vì chỉ có các phần chia sẻ khóa được sử dụng). Nó cũng cho phép các khoản đặt cọc được quản lý được phân tán giữa nhiều người vận hành hơn (ví dụ: thay vì có một người vận hành duy nhất quản lý 1000 trình xác thực, DVT cho phép các trình xác thực đó được vận hành tập thể bởi nhiều người vận hành). Các cấu hình người vận hành đa dạng giúp đảm bảo rằng nếu một người vận hành bị hỏng, những người khác vẫn có thể chứng thực. Sự dự phòng và đa dạng hóa mang lại có thể dẫn đến hiệu suất và khả năng phục hồi tốt hơn, đồng thời tối đa hóa phần thưởng.

Một lợi ích khác của việc giảm thiểu sự tin cậy vào người vận hành đơn lẻ là các nhóm đặt cọc chung có thể cho phép sự tham gia của người vận hành cởi mở hơn và không cần cấp phép. Một số nhóm đặt cọc chung đang thực hiện điều này trong thực tế sản xuất hiện nay. Các cụm DVT đa người vận hành cho phép các giao thức ghép nối những người đặt cọc tại nhà và những người vận hành nhỏ hơn với những người vận hành chuyên nghiệp lớn hơn, kết hợp các tập hợp người vận hành được tuyển chọn và không cần cấp phép.

## Những hạn chế tiềm ẩn khi sử dụng DVT {#potential-drawbacks-of-using-dvt}

- **Thành phần bổ sung** - việc giới thiệu một nút DVT thêm vào một phần khác có thể bị lỗi hoặc dễ bị tổn thương. Điều này được giảm thiểu bằng cách có nhiều triển khai phần mềm DVT, giống như có nhiều ứng dụng khách cho lớp đồng thuận và lớp thực thi.
- **Chi phí vận hành** - vì DVT phân tán trình xác thực giữa nhiều bên, nên cần nhiều nút hơn để hoạt động thay vì chỉ một nút duy nhất, điều này làm tăng chi phí vận hành.
- **Khả năng tăng độ trễ** - vì DVT sử dụng một giao thức đồng thuận để đạt được sự đồng thuận giữa nhiều nút vận hành một trình xác thực, nó có khả năng làm tăng độ trễ.

## Các câu hỏi thường gặp {#faq}

<ExpandableCard title="Tôi có cần DVT để đặt cọc không?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Không. Một máy đơn lẻ chạy một ứng dụng khách trình xác thực hoạt động mà không cần bất kỳ phần mềm DVT nào, và đây vẫn là một thiết lập đặt cọc tại nhà phổ biến. DVT là một lớp tùy chọn bổ sung khả năng chịu lỗi và loại bỏ các điểm lỗi đơn lẻ. Điều này hữu ích nếu bạn muốn trình xác thực của mình sống sót qua các lỗi của từng máy riêng lẻ, hoặc nếu bạn muốn chia sẻ trách nhiệm chạy một trình xác thực với những người khác.
</ExpandableCard>

<ExpandableCard title="DVT có chia nhỏ ETH hay các khóa rút tiền của tôi không?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Không. DVT chỉ chia nhỏ khóa _ký_ của trình xác thực, được sử dụng cho các nhiệm vụ đồng thuận như chứng thực và đề xuất khối. Khoản đặt cọc của bạn luôn được kiểm soát bởi địa chỉ rút tiền được thiết lập cho trình xác thực, điều này không bị ảnh hưởng bởi DVT. Kể từ bản nâng cấp Pectra, người nắm giữ địa chỉ rút tiền cũng có thể kích hoạt việc thoát trình xác thực trực tiếp từ lớp thực thi, mà không cần đến khóa ký.
</ExpandableCard>

<ExpandableCard title="Điều gì sẽ xảy ra nếu các nút trong một cụm bị ngoại tuyến?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Miễn là một ngưỡng các nút vẫn trực tuyến (ví dụ: 3 trên 4), trình xác thực vẫn tiếp tục thực hiện các nhiệm vụ của nó. Nếu quá nhiều nút ngoại tuyến cùng một lúc, trình xác thực chỉ đơn giản là ngoại tuyến và bỏ lỡ phần thưởng cho đến khi đủ số nút quay trở lại, giống như bất kỳ trình xác thực ngoại tuyến nào. Việc ngoại tuyến không phải là một vi phạm bị phạt cắt giảm.
</ExpandableCard>

<ExpandableCard title="Một cụm có bắt buộc phải là 3 trên 4 không?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Không. "3 trên 4" chỉ là cấu hình phổ biến nhỏ nhất và nó được sử dụng làm ví dụ xuyên suốt trang này. Kích thước cụm và ngưỡng ký được chọn khi cụm được tạo.

Các cụm thường có kích thước sao cho ngưỡng là đa số tuyệt đối hai phần ba số nút, điều này cho phép cụm tiếp tục ký trong khi vẫn chịu đựng được các thành viên bị lỗi hoặc ngoại tuyến. Một cụm 4 nút ký với 3 và chịu được 1 lỗi; 7 nút ký với 5 và chịu được 2; 10 nút ký với 7 và chịu được 3. Các cụm lớn hơn mang lại khả năng chịu lỗi cao hơn với cái giá là phải chạy nhiều máy hơn và cần nhiều sự điều phối hơn giữa chúng.

[Tìm hiểu thêm về kích thước cụm và khả năng phục hồi](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="DVT có giống với đặt cọc chung không?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Không. Đặt cọc chung kết hợp ETH từ nhiều người để tài trợ cho các trình xác thực và là một trong số [các cách để đặt cọc](/staking/). DVT là cơ sở hạ tầng để _vận hành_ một trình xác thực. Nó phân tán việc ký của một trình xác thực trên nhiều máy móc và người vận hành. Cả hai bổ sung cho nhau; nhiều nhóm sử dụng DVT để phân tán các tập hợp người vận hành của họ, nhưng bản thân DVT không gộp ETH của bất kỳ ai.
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Công nghệ trình xác thực phân tán (DVT) của Ethereum - Giới thiệu đầy đủ](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [DVT là gì và nó cải thiện việc đặt cọc trên Ethereum như thế nào?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Thông số kỹ thuật trình xác thực phân tán của Ethereum (cấp cao)](https://github.com/ethereum/distributed-validator-specs)
- [Thông số kỹ thuật chi tiết trình xác thực phân tán của Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Tài liệu Obol](https://docs.obol.org/)
- [Tài liệu SSV Network](https://docs.ssv.network/)
- [Mô-đun Simple DVT của Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Ứng dụng demo chia sẻ bí mật của Shamir](https://iancoleman.io/shamir/)