---
title: Oracles
description: Oracle cung cấp cho hợp đồng thông minh Ethereum quyền truy cập vào dữ liệu thực tế, mở ra nhiều trường hợp sử dụng hơn và mang lại giá trị lớn hơn cho người dùng.
lang: vi
---

Oracles là các ứng dụng tạo ra dữ liệu cung cấp thông tin từ bên ngoài cho blockchain cho hợp đồng thông minh. Điều này là cần thiết vì các hợp đồng thông minh dựa trên Ethereum không thể truy cập thông tin bên ngoài mạng blockchain theo mặc định.

Việc cung cấp cho các hợp đồng thông minh khả năng thực thi dựa trên dữ liệu ngoài chuỗi mở rộng tiện ích và giá trị của các ứng dụng phi tập trung. Chẳng hạn, các thị trường dự đoán trên chuỗi sử dụng các oracle để cung cấp thông tin về kết quả mà họ dùng để xác thực dự đoán của người dùng. Giả sử Alice đặt cược 20 ETH vào ai sẽ trở thành tổng thống tiếp theo của Hoa Kỳ. Tổng thống. Trong trường hợp đó, dapp dự đoán thị trường cần một oracle để xác nhận kết quả bầu cử và xem Alice có đủ điều kiện nhận tiền thưởng không.

## Điều kiện tiên quyết {#prerequisites}

Trang này giả định rằng người đọc đã quen thuộc với các nguyên tắc cơ bản của Ethereum, bao gồm [các nút](/developers/docs/nodes-and-clients/), [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) và [EVM](/developers/docs/evm/). Bạn cũng nên nắm vững về [hợp đồng thông minh](/developers/docs/smart-contracts/) và [cấu trúc hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/), đặc biệt là [các sự kiện](/glossary/#events).

## Một blockchain oracle là gì? {#what-is-a-blockchain-oracle}

Oracle là các ứng dụng tìm nguồn, xác minh và truyền thông tin bên ngoài (tức là thông tin được lưu trữ ngoài chuỗi) tới các hợp đồng thông minh chạy trên chuỗi khối. Ngoài việc lấy dữ liệu offchain và phát sóng nó trên Ethereum, các oracle còn có thể đẩy thông tin từ blockchain tới các hệ thống bên ngoài, ví dụ như mở khóa một ổ khóa thông minh khi người dùng gửi phí qua giao dịch Ethereum.

Nếu không có oracle, hợp đồng thông minh sẽ bị giới hạn hoàn toàn trong dữ liệu trên chuỗi.

Các oracle khác nhau dựa trên nguồn dữ liệu (một hoặc nhiều nguồn), mô hình tin cậy (tập trung hoặc phi tập trung) và kiến trúc hệ thống (đọc ngay, xuất bản-theo dõi, và yêu cầu-phản hồi). Chúng ta cũng có thể phân biệt các oracle dựa trên việc chúng lấy dữ liệu bên ngoài để sử dụng cho các hợp đồng trên chuỗi (oracle đầu vào), gửi thông tin từ blockchain đến các ứng dụng ngoài chuỗi (oracle đầu ra), hoặc thực hiện các tác vụ tính toán ngoài chuỗi (oracle tính toán).

## Tại sao hợp đồng thông minh lại cần oracle? {#why-do-smart-contracts-need-oracles}

Nhiều lập trình viên coi hợp đồng thông minh như là mã chạy ở những địa chỉ cụ thể trên blockchain. Tuy nhiên, một [quan điểm tổng quát hơn về hợp đồng thông minh](/smart-contracts/) là chúng là các chương trình phần mềm tự thực thi có khả năng thực thi các thỏa thuận giữa các bên khi các điều kiện cụ thể được đáp ứng - do đó có thuật ngữ “hợp đồng thông minh”.

Tuy nhiên, việc sử dụng hợp đồng thông minh để thi hành các thỏa thuận giữa các cá nhân không phải là điều đơn giản, vì Ethereum mang tính nhất quán.” Một [hệ thống xác định](https://en.wikipedia.org/wiki/Deterministic_algorithm) là một hệ thống luôn tạo ra kết quả giống nhau với một trạng thái ban đầu và một đầu vào cụ thể, nghĩa là không có sự ngẫu nhiên hoặc biến đổi trong quá trình tính toán đầu ra từ đầu vào.

Để đạt được sự thực thi có tính xác định, các chuỗi khối giới hạn các nút chỉ đạt được sự đồng thuận về các câu hỏi nhị phân đơn giản (đúng/sai) bằng cách sử dụng _duy nhất_ dữ liệu được lưu trữ trên chính chuỗi khối đó. Ví dụ về những câu hỏi như vậy bao gồm:

- “Chủ sở hữu tài khoản (được xác định bởi một khóa công khai) có ký kết giao dịch này bằng khóa riêng đã được kết nối hay không?”
- “Tài khoản này có đủ tiền để thanh toán giao dịch không?”
- "Giao dịch này có hợp lệ trong bối cảnh hợp đồng thông minh này không?", v.v.

Nếu các chuỗi khối nhận thông tin từ các nguồn bên ngoài (tức là từ thế giới thực), tính xác định sẽ không thể đạt được, ngăn cản các nút thống nhất về tính hợp lệ của các thay đổi đối với trạng thái của chuỗi khối. Ví dụ, một hợp đồng thông minh thực hiện giao dịch dựa trên tỷ giá hối đoái ETH-USD hiện tại được lấy từ một giá API truyền thống. Con số này có khả năng thay đổi thường xuyên (chưa kể rằng API có thể bị ngừng hỗ trợ hoặc bị tấn công), điều này có nghĩa là các nút thực hiện cùng một mã hợp đồng sẽ đạt được những kết quả khác nhau.

Đối với một blockchain công cộng như Ethereum, có hàng ngàn nút xử lý giao dịch trên toàn thế giới, tính nhất quán là rất quan trọng. Với việc không có cơ quan trung ương nào đóng vai trò là nguồn thông tin chính xác, các nút cần có cơ chế để đạt được trạng thái giống nhau sau khi áp dụng cùng một giao dịch. Nếu có trường hợp mà nút A chạy mã hợp đồng thông minh và nhận được '3' như kết quả, trong khi nút B nhận được '7' sau khi chạy cùng một giao dịch, điều đó sẽ dẫn đến sự đồng thuận bị phá hoại và làm mất giá trị của Ethereum như một nền tảng máy tính phi tập trung.

Tình huống này cũng chỉ ra vấn đề với việc thiết kế blockchain để lấy thông tin từ các nguồn bên ngoài. Tuy nhiên, các oracle giải quyết vấn đề này bằng cách lấy thông tin từ các nguồn ngoài chuỗi và lưu trữ nó trên blockchain để hợp đồng thông minh sử dụng. Vì thông tin được lưu trữ trên chuỗi không thể bị thay đổi và có sẵn công khai, các nút Ethereum có thể sử dụng một cách an toàn dữ liệu oracle đã nhập từ ngoài chuỗi để tính toán các thay đổi trạng thái mà không làm mất tính đồng thuận.

Để thực hiện điều này, một oracle thường được cấu thành từ một hợp đồng thông minh hoạt động trên chuỗi và một số thành phần ngoài chuỗi. Hợp đồng onchain nhận các yêu cầu dữ liệu từ các hợp đồng thông minh khác, sau đó chuyển tiếp đến thành phần offchain (gọi là nút oracle). Nút oracle này có thể truy vấn các nguồn dữ liệu—ví dụ như sử dụng các giao diện lập trình ứng dụng (APIs)—và gửi các giao dịch để lưu trữ dữ liệu yêu cầu trong bộ nhớ của hợp đồng thông minh.

Về cơ bản, một oracle blockchain kết nối khoảng cách thông tin giữa blockchain và môi trường bên ngoài, tạo ra các "hợp đồng thông minh lai". Hợp đồng thông minh lai là loại hợp đồng hoạt động dựa trên sự kết hợp giữa mã hợp đồng trên chuỗi và hạ tầng ngoài chuỗi. Các thị trường dự đoán phi tập trung là một ví dụ tuyệt vời về hợp đồng thông minh lai. Một số ví dụ khác có thể bao gồm hợp đồng thông minh bảo hiểm mùa màng mà sẽ thanh toán khi một nhóm oracles xác định rằng một số hiện tượng thời tiết nhất định đã xảy ra.

## Vấn đề oracle là gì? {#the-oracle-problem}

Các Oracle giải quyết một vấn đề quan trọng, nhưng cũng gây ra một số phức tạp, ví dụ:

- Làm sao để chúng ta kiểm tra rằng thông tin đã được thêm vào từ nguồn chuẩn hoặc không bị can thiệp?

- Làm thế nào để chúng ta đảm bảo rằng dữ liệu này luôn sẵn có và được cập nhật thường xuyên?

Nó được gọi là “vấn đề oracle” cho thấy những vấn đề gặp phải khi sử dụng oracle blockchain để gửi dữ liệu vào hợp đồng thông minh. Dữ liệu từ một oracle phải chính xác thì hợp đồng thông minh mới hoạt động đúng. Hơn nữa, việc phải ‘tin tưởng’ vào các nhà điều hành oracle để cung cấp thông tin chính xác làm giảm đi khía cạnh 'không cần tin tưởng' của hợp đồng thông minh.

Các oracle khác nhau đưa ra những giải pháp khác nhau cho vấn đề oracle, mà chúng ta sẽ khám phá sau. Thường thì người ta đánh giá các Oracles dựa trên khả năng xử lý những thách thức sau:

1. **Tính chính xác**: Một oracle không nên khiến các hợp đồng thông minh kích hoạt thay đổi trạng thái dựa trên dữ liệu ngoài chuỗi không hợp lệ. Một oracle phải đảm bảo _tính xác thực_ và _tính toàn vẹn_ của dữ liệu. Tính xác thực có nghĩa là dữ liệu được lấy từ nguồn chính xác, trong khi tính toàn vẹn có nghĩa là dữ liệu vẫn còn nguyên vẹn (tức là không bị thay đổi) trước khi được gửi lên chuỗi.

2. **Tính khả dụng**: Một oracle không nên trì hoãn hoặc ngăn chặn các hợp đồng thông minh thực hiện các hành động và kích hoạt các thay đổi trạng thái. Điều này có nghĩa là dữ liệu từ một oracle phải _sẵn có theo yêu cầu_ mà không bị gián đoạn.

3. **Tính tương thích về ưu đãi**: Một oracle nên khuyến khích các nhà cung cấp dữ liệu ngoài chuỗi gửi thông tin chính xác cho các hợp đồng thông minh. Tính tương thích về ưu đãi bao gồm _khả năng quy kết_ và _trách nhiệm giải trình_. Khả năng quy trách nhiệm cho phép liên kết một phần thông tin bên ngoài với nhà cung cấp của nó, trong khi trách nhiệm buộc các nhà cung cấp dữ liệu phải chịu trách nhiệm về thông tin họ cung cấp, để họ có thể được thưởng hoặc bị phạt dựa trên chất lượng của thông tin được cung cấp.

## Dịch vụ oracle blockchain hoạt động như thế nào? {#how-does-a-blockchain-oracle-service-work}

### Người dùng {#users}

Người dùng là các thực thể (tức là, các hợp đồng thông minh) cần thông tin bên ngoài chuỗi khối để hoàn thành các hành động cụ thể. Quy trình làm việc cơ bản của một dịch vụ oracle bắt đầu bằng việc người dùng gửi yêu cầu dữ liệu đến hợp đồng oracle. Các yêu cầu dữ liệu thường sẽ trả lời một số hoặc tất cả những câu hỏi sau:

1. Những nguồn nào mà các nút offchain có thể tham khảo để lấy thông tin đã yêu cầu?

2. Cách mà các phóng viên xử lý thông tin từ các nguồn dữ liệu và trích xuất các điểm dữ liệu hữu ích là như thế nào?

3. Có bao nhiêu nút oracle có thể tham gia vào việc truy xuất dữ liệu?

4. Làm sao để xử lý sự thiếu nhất quán trong báo cáo oracle?

5. Phương pháp nào nên được áp dụng trong việc lọc các bài nộp và tổng hợp báo cáo thành một giá trị duy nhất?

### Hợp đồng Oracle {#oracle-contract}

Hợp đồng oracle là thành phần onchain của dịch vụ oracle. Nó lắng nghe các yêu cầu dữ liệu từ các hợp đồng khác, chuyển câu hỏi dữ liệu tới các nút oracle, và phát sóng dữ liệu được trả về cho các hợp đồng client. Hợp đồng này có thể thực hiện một số phép toán trên các điểm dữ liệu trả về để tạo ra một giá trị tổng hợp gửi đến hợp đồng yêu cầu.

Hợp đồng oracle cung cấp một số chức năng mà các hợp đồng client gọi đến khi thực hiện yêu cầu dữ liệu. Khi nhận được một truy vấn mới, hợp đồng thông minh sẽ phát ra một [sự kiện nhật ký](/developers/docs/smart-contracts/anatomy/#events-and-logs) với các chi tiết của yêu cầu dữ liệu. Điều này thông báo cho các nút ngoài chuỗi đã đăng ký theo dõi nhật ký (thường sử dụng một lệnh như `eth_subscribe` JSON-RPC), sau đó các nút này sẽ tiến hành truy xuất dữ liệu được xác định trong sự kiện nhật ký.

Dưới đây là một [ví dụ về hợp đồng oracle](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) của Pedro Costa. Đây là một dịch vụ oracle đơn giản có thể truy vấn các API ngoài chuỗi theo yêu cầu của các hợp đồng thông minh khác và lưu trữ thông tin được yêu cầu trên blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //danh sách các yêu cầu được thực hiện cho hợp đồng
  uint currentId = 0; //id yêu cầu tăng dần
  uint minQuorum = 2; //số lượng phản hồi tối thiểu cần nhận trước khi công bố kết quả cuối cùng
  uint totalOracleCount = 3; //Số lượng oracle được mã hóa cứng

  //định nghĩa một yêu cầu api chung
  struct Request {
    uint id;                            //id yêu cầu
    string urlToQuery;                  //url của API
    string attributeToFetch;            //thuộc tính json (khóa) để truy xuất trong phản hồi
    string agreedValue;                 //giá trị từ khóa
    mapping(uint => string) answers;     //câu trả lời do các oracle cung cấp
    mapping(address => uint) quorum;    //các oracle sẽ truy vấn câu trả lời (1=oracle chưa bỏ phiếu, 2=oracle đã bỏ phiếu)
  }

  //sự kiện kích hoạt oracle bên ngoài chuỗi khối
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //được kích hoạt khi có sự đồng thuận về kết quả cuối cùng
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    //Địa chỉ oracle được mã hóa cứng
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    //khởi chạy một sự kiện để oracle bên ngoài chuỗi khối phát hiện
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    //tăng id yêu cầu
    currentId++;
  }

  //được oracle gọi để ghi lại câu trả lời của nó
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //kiểm tra xem oracle có nằm trong danh sách các oracle đáng tin cậy không
    //và nếu oracle chưa bỏ phiếu
    if(currRequest.quorum[address(msg.sender)] == 1){

      //đánh dấu rằng địa chỉ này đã bỏ phiếu
      currRequest.quorum[msg.sender] = 2;

      //lặp qua "mảng" câu trả lời cho đến khi có một vị trí trống và lưu giá trị truy xuất được
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //tìm slot trống đầu tiên
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //lặp qua danh sách oracle và kiểm tra xem có đủ oracle (số đại biểu tối thiểu)
      //đã bỏ phiếu cho cùng một câu trả lời như câu trả lời hiện tại
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Các nút Oracle {#oracle-nodes}

Nút oracle là thành phần offchain của dịch vụ oracle. Nó lấy thông tin từ các nguồn bên ngoài, như API được lưu trữ trên máy chủ của bên thứ ba, và đưa nó lên blockchain để các hợp đồng thông minh sử dụng. Các nút Oracle lắng nghe các sự kiện từ hợp đồng oracle onchain và tiến hành hoàn thành nhiệm vụ được mô tả trong nhật ký.

Một nhiệm vụ phổ biến của các nút oracle là gửi yêu cầu [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) đến một dịch vụ API, phân tích cú pháp phản hồi để trích xuất dữ liệu liên quan, định dạng nó thành một đầu ra mà chuỗi khối có thể đọc được và gửi nó lên chuỗi bằng cách đưa nó vào một giao dịch tới hợp đồng oracle. Nút oracle cũng có thể được yêu cầu xác nhận tính hợp lệ và toàn vẹn của thông tin đã nộp bằng cách sử dụng “bằng chứng xác thực”, mà chúng tôi sẽ khám phá sau.

Các tính toán oracle cũng dựa vào các nút bên ngoài chuỗi để thực hiện các nhiệm vụ tính toán mà sẽ không khả thi để thực hiện onchain, do chi phí gas và giới hạn kích thước khối. Chẳng hạn, nút oracle có thể được giao nhiệm vụ tạo ra một con số ngẫu nhiên có thể xác minh được (ví dụ, cho các trò chơi dựa trên blockchain).

## Các mẫu thiết kế Oracle {#oracle-design-patterns}

Các Oracle có nhiều loại khác nhau, bao gồm _đọc ngay lập tức_, _xuất bản-đăng ký_ và _yêu cầu-phản hồi_, trong đó hai loại sau là phổ biến nhất trong các hợp đồng thông minh của Ethereum. Ở đây chúng ta sẽ nói ngắn gọn về các mô hình publish-subscribe và request-response.

### Oracle xuất bản-đăng ký {#publish-subscribe-oracles}

Mô hình oracle này cung cấp một "dữ liệu cung cấp" mà các hợp đồng khác có thể đọc thường xuyên để lấy thông tin. Dữ liệu trong trường hợp này được dự kiến sẽ thay đổi thường xuyên, vì vậy hợp đồng client phải theo dõi các cập nhật về dữ liệu trong kho của oracle. Một ví dụ là một oracle cung cấp thông tin giá ETH-USD mới nhất cho người dùng.

### Oracle yêu cầu-phản hồi {#request-response-oracles}

Mô hình yêu cầu-phản hồi cho phép hợp đồng client yêu cầu dữ liệu tùy ý ngoài những gì được cung cấp bởi oracle kiểu công bố-đăng ký. Các oracle yêu cầu-phản hồi là lý tưởng khi tập dữ liệu quá lớn để lưu trữ trong bộ nhớ của hợp đồng thông minh, và/hoặc người dùng chỉ cần một phần nhỏ của dữ liệu vào bất kỳ thời điểm nào.Hợp đồng thông minh

Mặc dù phức tạp hơn các mô hình xuất bản-đăng ký, các oracle yêu cầu-phản hồi về cơ bản là những gì chúng tôi đã mô tả ở phần trước. Bộ oracle sẽ có một phần trên chuỗi giúp nhận yêu cầu dữ liệu và chuyển nó cho một nút ngoài chuỗi để xử lý.

Người dùng bắt buộc phải trả phí để lấy thông tin từ nguồn ngoài chuỗi. Hợp đồng client cũng phải cung cấp ngân sách để chi trả cho các chi phí xăng dầu phát sinh bởi hợp đồng oracle trong việc trả lại phản hồi thông qua hàm callback được chỉ định trong yêu cầu.

## Oracle tập trung và phi tập trung {#types-of-oracles}

### Oracle tập trung {#centralized-oracles}

Một oracle tập trung được kiểm soát bởi một thực thể duy nhất chịu trách nhiệm tổng hợp thông tin offchain và cập nhật dữ liệu của hợp đồng oracle theo yêu cầu. Oracle tập trung thì hiệu quả vì chúng dựa vào một nguồn thông tin duy nhất. Chúng có thể hoạt động tốt hơn trong các trường hợp mà các tập dữ liệu độc quyền được công bố trực tiếp bởi chủ sở hữu với một chữ ký được công nhận rộng rãi. Tuy nhiên, chúng cũng mang theo những bất lợi:

#### Đảm bảo tính chính xác thấp {#low-correctness-guarantees}

Với các oracle tập trung, không có cách nào để xác nhận thông tin được cung cấp là chính xác hay không. Ngay cả những nhà cung cấp "có uy tín" cũng có thể trở nên trái đạo đức hoặc bị tấn công mạng. Nếu oracle bị chiếm đoạt, các hợp đồng thông minh sẽ thực thi dựa trên dữ liệu xấu.

#### Tính khả dụng kém {#poor-availability}

Các oracle tập trung không đảm bảo sẽ luôn cung cấp dữ liệu offchain cho các hợp đồng thông minh khác. Nếu nhà cung cấp quyết định tắt dịch vụ hoặc một tin tặc chiếm đoạt thành phần offchain của oracle, hợp đồng thông minh của bạn sẽ có nguy cơ bị 'tấn công từ chối dịch vụ' (DoS).

#### Tính tương thích về ưu đãi kém {#poor-incentive-compatibility}

Các oracle tập trung thường có thiết kế kém hoặc không có chính sách khuyến khích đối với nhà cung cấp dữ liệu để gửi thông tin chính xác/không thay đổi. Trả tiền cho oracle để đảm bảo đúng không có nghĩa là họ sẽ trung thực. Vấn đề này trở nên nghiêm trọng hơn khi lượng giá trị được kiểm soát bởi các hợp đồng thông minh gia tăng.

### Oracle phi tập trung {#decentralized-oracles}

Các oracle phi tập trung được thiết kế để vượt qua những hạn chế của các oracle tập trung bằng cách loại bỏ các điểm lỗi đơn lẻ. Một dịch vụ oracle phi tập trung bao gồm nhiều người tham gia trong một mạng lưới ngang hàng để đạt được sự đồng thuận về dữ liệu ngoài chuỗi trước khi gửi nó đến một hợp đồng thông minh.

Một oracle phi tập trung nên (về lý thuyết) không yêu cầu quyền truy cập, không cần tin cậy và không bị quản lý bởi một bên trung tâm; trên thực tế, sự phân cấp giữa các oracle đang tồn tại trên một phổ. Có những mạng lưới oracle bán phi tập trung, nơi bất kỳ ai cũng có thể tham gia, nhưng có một 'chủ sở hữu' có quyền phê duyệt hoặc loại bỏ các nút dựa trên hiệu suất của chúng trong quá khứ. Cả mạng lưới oracle phi tập trung hoàn toàn cũng tồn tại: thường thì chúng chạy như các blockchain độc lập và có các cơ chế đồng thuận rõ ràng để phối hợp các nút và trừng phạt các hành vi sai trái.

Việc sử dụng các oracle phi tập trung mang lại những lợi ích sau:

### Đảm bảo tính chính xác cao {#high-correctness-guarantees}

Các oracle phi tập trung cố gắng đạt được độ chính xác của dữ liệu bằng cách sử dụng các phương pháp khác nhau. Điều này bao gồm việc sử dụng các chứng cứ chứng minh tính xác thực và toàn vẹn của thông tin đã được trả lại, và yêu cầu nhiều bên cùng đồng thuận về tính hợp lệ của dữ liệu bên ngoài.

#### Bằng chứng xác thực {#authenticity-proofs}

Chứng minh tính xác thực là các cơ chế mã hóa cho phép xác minh độc lập thông tin được lấy từ các nguồn bên ngoài. Những bằng chứng này có thể xác thực nguồn gốc của thông tin và phát hiện những thay đổi có thể có đối với dữ liệu sau khi lấy.

Ví dụ về các bằng chứng xác thực bao gồm:

**Bằng chứng Bảo mật Tầng Vận chuyển (TLS)**: Các nút Oracle thường truy xuất dữ liệu từ các nguồn bên ngoài bằng cách sử dụng kết nối HTTP an toàn dựa trên giao thức Bảo mật Tầng Vận chuyển (TLS). Một số oracle phi tập trung sử dụng bằng chứng xác thực để xác minh các phiên TLS (tức là xác nhận việc trao đổi thông tin giữa một nút và một máy chủ cụ thể) và xác nhận rằng nội dung của phiên đó không bị thay đổi.

**Chứng thực Môi trường Thực thi Đáng tin cậy (TEE)**: [Môi trường thực thi đáng tin cậy](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) là một môi trường tính toán trong hộp cát được cách ly khỏi các quy trình hoạt động của hệ thống máy chủ của nó. TEEs đảm bảo rằng bất kỳ mã ứng dụng nào hoặc dữ liệu được lưu trữ/sử dụng trong môi trường tính toán đều giữ được tính toàn vẹn, bảo mật và không bị thay đổi. Người dùng cũng có thể tạo một bản xác nhận để chứng minh rằng một phiên bản ứng dụng đang chạy trong môi trường thực thi tin cậy.

Một số loại oracle phi tập trung yêu cầu các nhà điều hành nút oracle cung cấp các chứng thực TEE. Điều này xác nhận với người dùng rằng nhà điều hành nút đang chạy một phiên bản của client oracle trong môi trường thực thi đáng tin cậy. TEEs ngăn chặn các quy trình bên ngoài thay đổi hoặc đọc mã và dữ liệu của ứng dụng, do đó, những chứng thực đó chứng minh rằng nút oracle đã giữ thông tin nguyên vẹn và bảo mật.

#### Xác thực thông tin dựa trên sự đồng thuận {#consensus-based-validation-of-information}

Các oracle tập trung dựa vào một nguồn thông tin duy nhất khi cung cấp dữ liệu cho hợp đồng thông minh, điều này có thể dẫn đến việc công bố thông tin không chính xác. Các oracle phi tập trung giải quyết vấn đề này bằng cách dựa vào nhiều nút oracle để truy vấn thông tin onchain. Bằng cách so sánh dữ liệu từ nhiều nguồn khác nhau, các oracle phi tập trung giảm thiểu rủi ro truyền tải thông tin không hợp lệ đến các hợp đồng trên chuỗi.

Tuy nhiên, các oracle phi tập trung phải đối mặt với những khác biệt trong thông tin được thu thập từ nhiều nguồn ngoài chuỗi. Để giảm thiểu sự khác biệt trong thông tin và đảm bảo rằng dữ liệu truyền đến hợp đồng oracle phản ánh ý kiến chung của các nút oracle, các oracle phi tập trung sử dụng những cơ chế sau đây:

##### Bỏ phiếu/staking trên độ chính xác của dữ liệu

Một số mạng lưới oracle phi tập trung yêu cầu người tham gia bỏ phiếu hoặc cược vào độ chính xác của các câu trả lời cho các truy vấn dữ liệu (ví dụ: "Ai đã thắng cuộc bầu cử tổng thống Mỹ năm 2020?") sử dụng token gốc của mạng. Một giao thức tổng hợp sau đó sẽ tổng hợp các phiếu bầu và cổ phần, và lấy câu trả lời được đa số ủng hộ làm câu trả lời hợp lệ.

Những node có câu trả lời khác với phần đa sẽ bị phạt bằng cách phát token của chúng cho những node khác cung cấp giá trị chính xác hơn. Việc buộc các nút phải cung cấp một khoản ký quỹ trước khi cung cấp dữ liệu sẽ khuyến khích những phản hồi trung thực, vì họ được cho là những tác nhân kinh tế hợp lý với mục đích tối đa hóa lợi nhuận.

Việc đặt cọc/bỏ phiếu cũng bảo vệ các oracle phi tập trung khỏi các [cuộc tấn công Sybil](/glossary/#sybil-attack), trong đó các tác nhân độc hại tạo ra nhiều danh tính để lũng đoạn hệ thống đồng thuận. Tuy nhiên, việc staking không thể ngăn chặn việc "freeloading" (các node oracle sao chép thông tin từ người khác) và "xác thực lười biếng" (các node oracle chỉ đi theo số đông mà không tự xác minh thông tin).

##### Cơ chế điểm Schelling

[Điểm Schelling](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) là một khái niệm lý thuyết trò chơi giả định rằng nhiều thực thể sẽ luôn mặc định chọn một giải pháp chung cho một vấn đề trong trường hợp không có bất kỳ sự giao tiếp nào. Cơ chế điểm Schelling thường được sử dụng trong các mạng oracle phi tập trung để giúp các nút đạt được sự đồng thuận về câu trả lời cho các yêu cầu dữ liệu.

Một ý tưởng ban đầu cho việc này là [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), một nguồn cấp dữ liệu được đề xuất nơi những người tham gia gửi câu trả lời cho các câu hỏi "vô hướng" (các câu hỏi mà câu trả lời được mô tả bằng độ lớn, ví dụ: "giá của ETH là bao nhiêu?"), cùng với một khoản tiền gửi. Những người dùng cung cấp các giá trị trong khoảng từ [phân vị](https://en.wikipedia.org/wiki/Percentile) thứ 25 đến thứ 75 sẽ được thưởng, trong khi những người có giá trị sai lệch nhiều so với giá trị trung vị sẽ bị phạt.

Mặc dù SchellingCoin không tồn tại ngày nay, một số oracle phi tập trung—đáng chú ý là [Oracle của Giao thức Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module)—sử dụng cơ chế điểm schelling để cải thiện độ chính xác của dữ liệu oracle. Mỗi Oracle Maker bao gồm một mạng lưới P2P ngoài chuỗi của các nút ("người chuyển tiếp" và "nguồn thông tin") chịu trách nhiệm gửi giá thị trường cho các tài sản thế chấp và một hợp đồng "Medianizer" trên chuỗi để tính toán giá trị trung vị của tất cả các giá trị đã được cung cấp. Khi thời gian trì hoãn được chỉ định đã kết thúc, giá trị trung vị này trở thành mức giá tham chiếu mới cho tài sản liên quan.

Các ví dụ khác về các oracle sử dụng cơ chế điểm Schelling bao gồm [Báo cáo ngoài chuỗi của Chainlink](https://docs.chain.link/architecture-overview/off-chain-reporting) và [Witnet](https://witnet.io/). Trong cả hai hệ thống, các phản hồi từ các nút oracle trong mạng lưới ngang hàng được tổng hợp thành một giá trị tổng hợp duy nhất, chẳng hạn như giá trị trung bình hoặc trung vị. Các nút sẽ nhận được phần thưởng hoặc bị trừng phạt dựa trên mức độ mà câu trả lời của chúng phù hợp hoặc sai lệch so với giá trị tổng hợp.

Cơ chế điểm Schelling rất hấp dẫn vì chúng tối thiểu hóa dấu tích trên chuỗi (chỉ cần gửi một giao dịch) trong khi đảm bảo tính phi tập trung. Điều này có thể xảy ra bởi vì các nút phải phê duyệt danh sách các phản hồi đã được gửi trước khi nó được đưa vào thuật toán để tính toán giá trị trung bình/trung vị.

### Tính khả dụng {#availability}

Dịch vụ oracle phi tập trung đảm bảo khả năng tiệp cận cao đối với dữ liệu ngoài chuỗi cho các hợp đồng thông minh. Điều này được thực hiện bằng cách phân cấp cả nguồn thông tin ngoài chuỗi và các nút chịu trách nhiệm chuyển giao thông tin trên chuỗi.

Điều này đảm bảo khả năng chịu lỗi vì hợp đồng oracle có thể dựa vào nhiều nút (mà cũng phụ thuộc vào nhiều nguồn dữ liệu) để thực hiện các truy vấn từ các hợp đồng khác. Sự phi tập trung ở cấp độ nguồn _và_ cấp độ người vận hành nút là rất quan trọng—một mạng lưới các nút oracle phục vụ thông tin được truy xuất từ cùng một nguồn sẽ gặp phải vấn đề tương tự như một oracle tập trung.

Cũng có khả năng để các oracle dựa trên cổ phần có thể cắt giảm quyền hạn của các nhà điều hành nút, những người không phản hồi nhanh chóng các yêu cầu dữ liệu. Điều này thực sự khuyến khích các node oracle đầu tư vào hạ tầng chịu lỗi và cung cấp dữ liệu một cách kịp thời.

### Tính tương thích về ưu đãi tốt {#good-incentive-compatibility}

Các oracle phi tập trung thực hiện các thiết kế ưu đãi khác nhau để ngăn chặn hành vi [Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) giữa các nút oracle. Cụ thể, chúng đạt được _khả năng quy kết_ và _trách nhiệm giải trình_:

1. Các nút oracle phi tập trung thường phải ký dữ liệu mà họ cung cấp để đáp ứng yêu cầu dữ liệu. Thông tin này giúp đánh giá lịch sử hiệu suất của các nút oracle, để người dùng có thể lọc ra các nút oracle không đáng tin cậy khi thực hiện yêu cầu dữ liệu. Một ví dụ là [Hệ thống Danh tiếng Thuật toán](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) của Witnet.

2. Các oracle phi tập trung—như đã được giải thích trước đó—có thể yêu cầu các nút đặt cọc vào độ tin cậy của dữ liệu mà họ cung cấp. Nếu yêu cầu được xác minh, khoản đặt cọc này có thể được hoàn trả cùng với phần thưởng cho dịch vụ trung thực. Tuy nhiên, nó cũng có thể bị cắt giảm nếu thông tin không chính xác, điều này cung cấp một mức độ trách nhiệm nhất định.

## Các ứng dụng của oracle trong hợp đồng thông minh {#applications-of-oracles-in-smart-contracts}

Dưới đây là một số trường hợp sử dụng phổ biến của oracle trong Ethereum:

### Truy xuất dữ liệu tài chính {#retrieving-financial-data}

Các ứng dụng [tài chính phi tập trung](/defi/) (DeFi) cho phép cho vay, đi vay và giao dịch tài sản ngang hàng. Điều này thường đòi hỏi việc thu thập các thông tin tài chính khác nhau, bao gồm dữ liệu tỷ giá hối đoái (để tính toán giá trị fiat của các loại tiền điện tử hoặc so sánh giá token) và dữ liệu thị trường vốn (để tính toán giá trị của các tài sản được token hóa, chẳng hạn như vàng hoặc đô la Mỹ).

Chẳng hạn, một giao thức cho vay DeFi cần truy vấn giá thị trường hiện tại cho các tài sản (ví dụ: ETH) được gửi làm tài sản đảm bảo. Điều này cho phép hợp đồng xác định giá trị của tài sản thế chấp và xác định số tiền mà nó có thể mượn từ hệ thống.

Các "oracle giá" phổ biến (như chúng thường được gọi) trong DeFi bao gồm Nguồn cấp dữ liệu giá của Chainlink, [Nguồn cấp dữ liệu giá mở](https://compound.finance/docs/prices) của Giao thức Compound, [Giá trung bình theo thời gian (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) của Uniswap và [Oracle của Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Các nhà phát triển nên hiểu rõ những lưu ý đi kèm với những oracle giá này trước khi tích hợp chúng vào dự án của họ. [Bài viết](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) này cung cấp một phân tích chi tiết về những gì cần xem xét khi có kế hoạch sử dụng bất kỳ oracle giá nào đã được đề cập.

Dưới đây là một ví dụ về cách bạn có thể truy xuất giá ETH mới nhất trong hợp đồng thông minh của mình bằng cách sử dụng nguồn cấp dữ liệu giá Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Mạng: Kovan
     * Bộ tổng hợp: ETH/USD
     * Địa chỉ: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Trả về giá mới nhất
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Tạo ra sự ngẫu nhiên có thể xác minh {#generating-verifiable-randomness}

Một số ứng dụng blockchain, chẳng hạn như trò chơi dựa trên blockchain hoặc các hình thức xổ số, đòi hỏi mức độ không thể đoán trước và ngẫu nhiên cao để hoạt động hiệu quả. Tuy nhiên, việc thực thi xác định của các chuỗi khối loại bỏ sự ngẫu nhiên.

Cách tiếp cận ban đầu là sử dụng các hàm mã hóa giả ngẫu nhiên, chẳng hạn như `blockhash`, nhưng những hàm này có thể bị [các thợ đào thao túng](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) giải thuật toán bằng chứng công việc. Ngoài ra, việc Ethereum [chuyển sang bằng chứng cổ phần](/roadmap/merge/) có nghĩa là các nhà phát triển không còn có thể dựa vào `blockhash` cho tính ngẫu nhiên trên chuỗi. [Cơ chế RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) của Chuỗi Beacon cung cấp một nguồn ngẫu nhiên thay thế.

Có thể tạo ra giá trị ngẫu nhiên ở ngoài chuỗi và gửi nó vào chuỗi, nhưng việc làm như vậy đòi hỏi yêu cầu  độ tin cậy cao đối với người dùng. Họ phải tin rằng giá trị được tạo ra thực sự thông qua các cơ chế không thể dự đoán và không bị thay đổi trong quá trình vận chuyển.

Các oracle được thiết kế cho tính toán ngoài chuỗi giải quyết vấn đề này bằng cách tạo ra các kết quả ngẫu nhiên một cách an toàn ngoài chuỗi, sau đó phát sóng lên chuỗi cùng với các bằng chứng mật mã chứng minh tính vô định của quá trình này. Một ví dụ là [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Hàm ngẫu nhiên có thể xác minh), là một trình tạo số ngẫu nhiên (RNG) công bằng và chống giả mạo có thể chứng minh được, hữu ích cho việc xây dựng các hợp đồng thông minh đáng tin cậy cho các ứng dụng dựa trên các kết quả không thể đoán trước.

### Nhận kết quả cho các sự kiện {#getting-outcomes-for-events}

Với các oracle, việc tạo ra smart contracts để phản ứng với các sự kiện thực tế thật dễ dàng. Dịch vụ Oracle giúp điều này trở nên khả thi bằng cách cho phép hợp đồng kết nối với các API bên ngoài thông qua các thành phần offchain và sử dụng thông tin từ những nguồn dữ liệu đó. Chẳng hạn, ứng dụng dự đoán đã đề cập ở trên có thể yêu cầu một oracle trả về kết quả bầu cử từ một nguồn bên ngoài đáng tin cậy (ví dụ: Associated Press).

Việc sử dụng oracle để thu thập dữ liệu dựa trên các kết quả trong thế giới thực mở ra nhiều trường hợp sử dụng mới; ví dụ, một sản phẩm bảo hiểm phi tập trung cần thông tin chính xác về thời tiết, thiên tai, v.v. để hoạt động hiệu quả.

### Tự động hóa hợp đồng thông minh {#automating-smart-contracts}

Hợp đồng thông minh không tự động thực thi; mà thay vào đó, một tài khoản do bên ngoài sở hữu (EOA) hoặc một tài khoản hợp đồng khác phải kích hoạt các hàm phù hợp để thực hiện mã của hợp đồng. Trong hầu hết các trường hợp, phần lớn các hàm của hợp đồng là công khai và có thể được gọi bởi các EOA và các hợp đồng khác.

Nhưng cũng có những _hàm riêng tư_ trong một hợp đồng mà người khác không thể truy cập;, nhưng chúng lại rất quan trọng đối với chức năng tổng thể của một dapp. Các ví dụ bao gồm một hàm `mintERC721Token()` định kỳ đúc NFT mới cho người dùng, một hàm để trao các khoản thanh toán trong một thị trường dự đoán, hoặc một hàm để mở khóa các token đã đặt cọc trong một DEX.

Các nhà phát triển sẽ cần kích hoạt các chức năng như vậy theo khoảng thời gian nhất định để ứng dụng hoạt động mượt mà. Tuy nhiên, điều này có thể dẫn đến việc mất nhiều giờ cho các nhiệm vụ tầm thường của các nhà phát triển, đó là lý do tại sao tự động hóa việc thực hiện hợp đồng thông minh lại hấp dẫn.

Một số mạng lưới oracle phi tập trung cung cấp dịch vụ tự động hóa, cho phép các nút oracle ngoài chuỗi kích hoạt các chức năng hợp đồng thông minh theo các tham số được xác nhận từ người dùng. Thông thường, điều này yêu cầu "đăng ký" hợp đồng mục tiêu với dịch vụ oracle, cung cấp quỹ để thanh toán cho người vận hành oracle, và chỉ định các điều kiện hoặc thời gian để kích hoạt hợp đồng.

[Mạng Keeper](https://chain.link/keepers) của Chainlink cung cấp các tùy chọn cho các hợp đồng thông minh để thuê ngoài các nhiệm vụ bảo trì thường xuyên theo cách giảm thiểu sự tin cậy và phi tập trung. Đọc [tài liệu chính thức của Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) để biết thông tin về việc làm cho hợp đồng của bạn tương thích với Keeper và sử dụng dịch vụ Upkeep.

## Cách sử dụng các oracle chuỗi khối {#use-blockchain-oracles}

Có nhiều ứng dụng oracle mà bạn có thể tích hợp vào dapp Ethereum của mình:

**[Chainlink](https://chain.link/)** - _Các mạng oracle phi tập trung của Chainlink cung cấp các đầu vào, đầu ra và tính toán chống giả mạo để hỗ trợ các hợp đồng thông minh tiên tiến trên bất kỳ chuỗi khối nào._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone là một oracle mô-đun phi tập trung cung cấp các nguồn cấp dữ liệu được tối ưu hóa về gas._ Nó chuyên cung cấp các nguồn cấp dữ liệu giá cho các tài sản mới nổi, chẳng hạn như token đặt cọc thanh khoản (LST), token đặt cọc lại thanh khoản (LRT), và các sản phẩm phái sinh đặt cọc Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle vượt qua những hạn chế hiện tại của việc chuyển dữ liệu trên chuỗi bằng cách phát triển các oracle thực sự có thể mở rộng, tiết kiệm chi phí, phi tập trung và có thể xác minh._

**[Witnet](https://witnet.io/)** - _Witnet là một oracle không cần cấp phép, phi tập trung và chống kiểm duyệt, giúp các hợp đồng thông minh phản ứng với các sự kiện trong thế giới thực với sự đảm bảo kinh tế-mã hóa mạnh mẽ._

**[UMA Oracle](https://uma.xyz)** - _Oracle lạc quan của UMA cho phép các hợp đồng thông minh nhanh chóng nhận bất kỳ loại dữ liệu nào cho các ứng dụng khác nhau, bao gồm bảo hiểm, các công cụ phái sinh tài chính và thị trường dự đoán._

**[Tellor](https://tellor.io/)** - _Tellor là một giao thức oracle minh bạch và không cần cấp phép để hợp đồng thông minh của bạn có thể dễ dàng lấy bất kỳ dữ liệu nào bất cứ khi nào cần._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol là một nền tảng oracle dữ liệu chuỗi chéo, tổng hợp và kết nối dữ liệu thế giới thực và các API với các hợp đồng thông minh._

**[Pyth Network](https://pyth.network/)** - _Mạng Pyth là một mạng oracle tài chính của bên thứ nhất được thiết kế để xuất bản dữ liệu thế giới thực liên tục trên chuỗi trong một môi trường chống giả mạo, phi tập trung và tự duy trì._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO đang cung cấp các giải pháp oracle của bên thứ nhất mang lại sự minh bạch, bảo mật và khả năng mở rộng nguồn lớn hơn trong một giải pháp phi tập trung cho các hợp đồng thông minh_

**[Supra](https://supra.com/)** - Một bộ công cụ tích hợp theo chiều dọc gồm các giải pháp chuỗi chéo liên kết tất cả các chuỗi khối, công khai (L1 và L2) hoặc riêng tư (doanh nghiệp), cung cấp các nguồn cấp dữ liệu giá oracle phi tập trung có thể được sử dụng cho các trường hợp sử dụng trên chuỗi và ngoài chuỗi.

**[Gas Network](https://gas.network/)** - Một nền tảng oracle phân tán cung cấp dữ liệu giá gas theo thời gian thực trên khắp các chuỗi khối. Bằng cách đưa dữ liệu từ các nhà cung cấp dữ liệu giá gas hàng đầu lên chuỗi, Mạng Gas đang giúp thúc đẩy khả năng tương tác. Mạng Gas hỗ trợ dữ liệu cho hơn 35 chuỗi, bao gồm Mạng chính Ethereum và nhiều L2 hàng đầu.

## Đọc thêm {#further-reading}

**Bài viết**

- [Oracle Chuỗi khối là gì?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Oracle Chuỗi khối là gì?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oracle phi tập trung: tổng quan toàn diện](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Triển khai một Oracle Chuỗi khối trên Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Tại sao các hợp đồng thông minh không thể thực hiện các lệnh gọi API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Vì vậy bạn muốn sử dụng một oracle giá](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Oracle và sự mở rộng tiện ích của chuỗi khối](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Hướng dẫn**

- [Cách lấy giá hiện tại của Ethereum trong Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Tiêu thụ Dữ liệu Oracle](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Các dự án mẫu**

- [Dự án khởi đầu Chainlink đầy đủ cho Ethereum trong Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
