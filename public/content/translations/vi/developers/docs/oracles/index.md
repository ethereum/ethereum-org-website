---
title: Nguồn cấp dữ liệu
description: Nguồn cấp dữ liệu cung cấp cho các hợp đồng thông minh Ethereum quyền truy cập vào dữ liệu thế giới thực, mở khóa nhiều trường hợp sử dụng hơn và mang lại giá trị lớn hơn cho người dùng.
lang: vi
authors: ["Patrick Collins"]
---

Nguồn cấp dữ liệu là các ứng dụng tạo ra các nguồn cấp dữ liệu giúp các nguồn dữ liệu ngoài chuỗi có sẵn trên Chuỗi khối cho các hợp đồng thông minh. Điều này là cần thiết vì các hợp đồng thông minh dựa trên Ethereum, theo mặc định, không thể truy cập thông tin được lưu trữ bên ngoài mạng lưới Chuỗi khối.

Việc cung cấp cho các hợp đồng thông minh khả năng thực thi bằng cách sử dụng dữ liệu ngoài chuỗi sẽ mở rộng tiện ích và giá trị của các ứng dụng phi tập trung (dapp). Ví dụ, các thị trường dự đoán trên chuỗi dựa vào các nguồn cấp dữ liệu để cung cấp thông tin về các kết quả mà chúng sử dụng để xác thực các dự đoán của người dùng. Giả sử Alice đặt cược 20 ETH vào việc ai sẽ trở thành Tổng thống Hoa Kỳ tiếp theo. Trong trường hợp đó, dapp thị trường dự đoán cần một nguồn cấp dữ liệu để xác nhận kết quả bầu cử và xác định xem Alice có đủ điều kiện nhận khoản thanh toán hay không.

## Điều kiện tiên quyết {#prerequisites}

Trang này giả định rằng người đọc đã quen thuộc với các nguyên tắc cơ bản của [Ethereum](/), bao gồm [các nút](/developers/docs/nodes-and-clients/), [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) và [EVM](/developers/docs/evm/). Bạn cũng nên nắm rõ về [hợp đồng thông minh](/developers/docs/smart-contracts/) và [cấu trúc hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/), đặc biệt là [các sự kiện](/glossary/#events).

## Oracle blockchain là gì? {#what-is-a-blockchain-oracle}

Nguồn cấp dữ liệu là các ứng dụng tìm nguồn, xác minh và truyền thông tin bên ngoài (tức là thông tin được lưu trữ ngoài chuỗi) đến các hợp đồng thông minh chạy trên Chuỗi khối. Bên cạnh việc “kéo” dữ liệu ngoài chuỗi và phát sóng nó trên Ethereum, các nguồn cấp dữ liệu cũng có thể “đẩy” thông tin từ Chuỗi khối đến các hệ thống bên ngoài, ví dụ: mở khóa thông minh sau khi người dùng gửi phí thông qua một giao dịch Ethereum.

Nếu không có nguồn cấp dữ liệu, một hợp đồng thông minh sẽ bị giới hạn hoàn toàn trong dữ liệu trên chuỗi.

Các nguồn cấp dữ liệu khác nhau dựa trên nguồn dữ liệu (một hoặc nhiều nguồn), mô hình tin cậy (tập trung hoặc phi tập trung) và kiến trúc hệ thống (đọc ngay lập tức, xuất bản-đăng ký và yêu cầu-phản hồi). Chúng ta cũng có thể phân biệt giữa các nguồn cấp dữ liệu dựa trên việc chúng truy xuất dữ liệu bên ngoài để sử dụng bởi các hợp đồng trên chuỗi (nguồn cấp dữ liệu đầu vào), gửi thông tin từ Chuỗi khối đến các ứng dụng ngoài chuỗi (nguồn cấp dữ liệu đầu ra) hoặc thực hiện các tác vụ tính toán ngoài chuỗi (nguồn cấp dữ liệu tính toán).

## Tại sao các hợp đồng thông minh cần nguồn cấp dữ liệu? {#why-do-smart-contracts-need-oracles}

Nhiều nhà phát triển coi hợp đồng thông minh là mã chạy tại các địa chỉ cụ thể trên Chuỗi khối. Tuy nhiên, một [cái nhìn tổng quát hơn về hợp đồng thông minh](/smart-contracts/) là chúng là các chương trình phần mềm tự thực thi có khả năng thực thi các thỏa thuận giữa các bên khi các điều kiện cụ thể được đáp ứng - do đó có thuật ngữ “hợp đồng thông minh”.

Nhưng việc sử dụng các hợp đồng thông minh để thực thi các thỏa thuận giữa mọi người không hề đơn giản, vì Ethereum có tính tất định. Một [hệ thống tất định](https://en.wikipedia.org/wiki/Deterministic_algorithm) là hệ thống luôn tạo ra cùng một kết quả với một trạng thái ban đầu và một đầu vào cụ thể, nghĩa là không có tính ngẫu nhiên hoặc sự thay đổi trong quá trình tính toán đầu ra từ đầu vào.

Để đạt được việc thực thi tất định, các Chuỗi khối giới hạn các nút trong việc đạt được sự đồng thuận về các câu hỏi nhị phân đơn giản (đúng/sai) _chỉ_ sử dụng dữ liệu được lưu trữ trên chính Chuỗi khối. Ví dụ về các câu hỏi như vậy bao gồm:

- “Chủ sở hữu tài khoản (được xác định bằng khóa công khai) có ký giao dịch này bằng khóa riêng tư được ghép nối không?”
- “Tài khoản này có đủ tiền để trang trải cho giao dịch không?”
- “Giao dịch này có hợp lệ trong bối cảnh của hợp đồng thông minh này không?”, v.v.

Nếu các Chuỗi khối nhận được thông tin từ các nguồn bên ngoài (tức là từ thế giới thực), tính tất định sẽ không thể đạt được, ngăn cản các nút đồng ý về tính hợp lệ của các thay đổi đối với trạng thái của Chuỗi khối. Lấy ví dụ một hợp đồng thông minh thực hiện một giao dịch dựa trên tỷ giá hối đoái ETH-USD hiện tại thu được từ một API giá truyền thống. Con số này có khả năng thay đổi thường xuyên (chưa kể đến việc API có thể bị ngừng hoạt động hoặc bị tấn công), nghĩa là các nút thực thi cùng một mã hợp đồng sẽ đi đến các kết quả khác nhau.

Đối với một Chuỗi khối công khai như Ethereum, với hàng ngàn nút trên khắp thế giới xử lý các giao dịch, tính tất định là rất quan trọng. Khi không có cơ quan trung ương đóng vai trò là nguồn chân lý, các nút cần các cơ chế để đạt được cùng một trạng thái sau khi áp dụng cùng các giao dịch. Trường hợp nút A thực thi mã của hợp đồng thông minh và nhận được kết quả là "3", trong khi nút B nhận được "7" sau khi chạy cùng một giao dịch sẽ khiến sự đồng thuận bị phá vỡ và loại bỏ giá trị của Ethereum như một nền tảng điện toán phi tập trung.

Kịch bản này cũng làm nổi bật vấn đề với việc thiết kế các Chuỗi khối để kéo thông tin từ các nguồn bên ngoài. Tuy nhiên, các nguồn cấp dữ liệu giải quyết vấn đề này bằng cách lấy thông tin từ các nguồn ngoài chuỗi và lưu trữ nó trên Chuỗi khối để các hợp đồng thông minh sử dụng. Vì thông tin được lưu trữ trên chuỗi là không thể thay đổi và có sẵn công khai, các nút Ethereum có thể sử dụng an toàn dữ liệu ngoài chuỗi được nhập bởi nguồn cấp dữ liệu để tính toán các thay đổi trạng thái mà không phá vỡ sự đồng thuận.

Để làm điều này, một nguồn cấp dữ liệu thường được tạo thành từ một hợp đồng thông minh chạy trên chuỗi và một số thành phần ngoài chuỗi. Hợp đồng trên chuỗi nhận các yêu cầu dữ liệu từ các hợp đồng thông minh khác, sau đó nó chuyển cho thành phần ngoài chuỗi (được gọi là nút nguồn cấp dữ liệu). Nút nguồn cấp dữ liệu này có thể truy vấn các nguồn dữ liệu—ví dụ: sử dụng giao diện lập trình ứng dụng (API)—và gửi các giao dịch để lưu trữ dữ liệu được yêu cầu trong bộ nhớ của hợp đồng thông minh.

Về cơ bản, một Oracle blockchain thu hẹp khoảng cách thông tin giữa Chuỗi khối và môi trường bên ngoài, tạo ra các “hợp đồng thông minh lai”. Hợp đồng thông minh lai là hợp đồng hoạt động dựa trên sự kết hợp giữa mã hợp đồng trên chuỗi và cơ sở hạ tầng ngoài chuỗi. Các thị trường dự đoán phi tập trung là một ví dụ tuyệt vời về các hợp đồng thông minh lai. Các ví dụ khác có thể bao gồm các hợp đồng thông minh bảo hiểm mùa màng sẽ thanh toán khi một tập hợp các nguồn cấp dữ liệu xác định rằng các hiện tượng thời tiết nhất định đã diễn ra.

## Vấn đề oracle là gì? {#the-oracle-problem}

Các nguồn cấp dữ liệu giải quyết một vấn đề quan trọng, nhưng cũng đưa ra một số phức tạp, ví dụ:

- Làm thế nào chúng ta xác minh rằng thông tin được đưa vào đã được trích xuất từ đúng nguồn hoặc chưa bị giả mạo?

- Làm thế nào chúng ta đảm bảo rằng dữ liệu này luôn có sẵn và được cập nhật thường xuyên?

Cái gọi là “vấn đề oracle” chứng minh các vấn đề đi kèm với việc sử dụng các Oracle blockchain để gửi đầu vào cho các hợp đồng thông minh. Dữ liệu từ một nguồn cấp dữ liệu phải chính xác để một hợp đồng thông minh thực thi chính xác. Hơn nữa, việc phải ‘tin cậy’ các nhà điều hành nguồn cấp dữ liệu để cung cấp thông tin chính xác làm suy yếu khía cạnh 'không cần tin cậy' của các hợp đồng thông minh.

Các nguồn cấp dữ liệu khác nhau cung cấp các giải pháp khác nhau cho vấn đề oracle, mà chúng ta sẽ khám phá sau. Các nguồn cấp dữ liệu thường được đánh giá dựa trên mức độ chúng có thể xử lý các thách thức sau:

1. **Tính chính xác**: Một nguồn cấp dữ liệu không nên khiến các hợp đồng thông minh kích hoạt các thay đổi trạng thái dựa trên dữ liệu ngoài chuỗi không hợp lệ. Một nguồn cấp dữ liệu phải đảm bảo _tính xác thực_ và _tính toàn vẹn_ của dữ liệu. Tính xác thực có nghĩa là dữ liệu được lấy từ đúng nguồn, trong khi tính toàn vẹn có nghĩa là dữ liệu vẫn nguyên vẹn (tức là không bị thay đổi) trước khi được gửi trên chuỗi.

2. **Tính khả dụng**: Một nguồn cấp dữ liệu không nên trì hoãn hoặc ngăn cản các hợp đồng thông minh thực hiện các hành động và kích hoạt các thay đổi trạng thái. Điều này có nghĩa là dữ liệu từ một nguồn cấp dữ liệu phải _có sẵn theo yêu cầu_ mà không bị gián đoạn.

3. **Tính tương thích của ưu đãi**: Một nguồn cấp dữ liệu nên khuyến khích các nhà cung cấp dữ liệu ngoài chuỗi gửi thông tin chính xác cho các hợp đồng thông minh. Tính tương thích của ưu đãi liên quan đến _khả năng quy kết_ và _trách nhiệm giải trình_. Khả năng quy kết cho phép liên kết một phần thông tin bên ngoài với nhà cung cấp của nó, trong khi trách nhiệm giải trình ràng buộc các nhà cung cấp dữ liệu với thông tin họ đưa ra, để họ có thể được khen thưởng hoặc bị phạt dựa trên chất lượng thông tin được cung cấp.

## Dịch vụ Oracle blockchain hoạt động như thế nào? {#how-does-a-blockchain-oracle-service-work}

### Người dùng {#users}

Người dùng là các thực thể (tức là các hợp đồng thông minh) cần thông tin bên ngoài Chuỗi khối để hoàn thành các hành động cụ thể. Quy trình làm việc cơ bản của một dịch vụ nguồn cấp dữ liệu bắt đầu bằng việc người dùng gửi một yêu cầu dữ liệu đến hợp đồng nguồn cấp dữ liệu. Các yêu cầu dữ liệu thường sẽ trả lời một số hoặc tất cả các câu hỏi sau:

1. Các nút ngoài chuỗi có thể tham khảo những nguồn nào cho thông tin được yêu cầu?

2. Các phóng viên xử lý thông tin từ các nguồn dữ liệu và trích xuất các điểm dữ liệu hữu ích như thế nào?

3. Có bao nhiêu nút nguồn cấp dữ liệu có thể tham gia vào việc truy xuất dữ liệu?

4. Sự khác biệt trong các báo cáo của nguồn cấp dữ liệu nên được quản lý như thế nào?

5. Phương pháp nào nên được thực hiện trong việc lọc các đệ trình và tổng hợp các báo cáo thành một giá trị duy nhất?

### Hợp đồng nguồn cấp dữ liệu {#oracle-contract}

Hợp đồng nguồn cấp dữ liệu là thành phần trên chuỗi cho dịch vụ nguồn cấp dữ liệu. Nó lắng nghe các yêu cầu dữ liệu từ các hợp đồng khác, chuyển tiếp các truy vấn dữ liệu đến các nút nguồn cấp dữ liệu và phát sóng dữ liệu được trả về cho các hợp đồng máy khách. Hợp đồng này cũng có thể thực hiện một số tính toán trên các điểm dữ liệu được trả về để tạo ra một giá trị tổng hợp để gửi đến hợp đồng yêu cầu.

Hợp đồng nguồn cấp dữ liệu hiển thị một số hàm mà các hợp đồng máy khách gọi khi thực hiện một yêu cầu dữ liệu. Khi nhận được một truy vấn mới, hợp đồng thông minh sẽ phát ra một [sự kiện nhật ký](/developers/docs/smart-contracts/anatomy/#events-and-logs) với các chi tiết của yêu cầu dữ liệu. Điều này thông báo cho các nút ngoài chuỗi đã đăng ký nhật ký (thường sử dụng một cái gì đó giống như lệnh JSON-RPC `eth_subscribe`), những người tiến hành truy xuất dữ liệu được xác định trong sự kiện nhật ký.

Dưới đây là một [ví dụ về hợp đồng nguồn cấp dữ liệu](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) của Pedro Costa. Đây là một dịch vụ nguồn cấp dữ liệu đơn giản có thể truy vấn các API ngoài chuỗi theo yêu cầu của các hợp đồng thông minh khác và lưu trữ thông tin được yêu cầu trên Chuỗi khối:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //danh sách các yêu cầu được gửi đến hợp đồng
  uint currentId = 0; //id yêu cầu tăng dần
  uint minQuorum = 2; //số lượng phản hồi tối thiểu cần nhận trước khi công bố kết quả cuối cùng
  uint totalOracleCount = 3; // Số lượng nguồn cấp dữ liệu được mã hóa cứng

  // định nghĩa một yêu cầu API chung
  struct Request {
    uint id;                            //id yêu cầu
    string urlToQuery;                  //url API
    string attributeToFetch;            //thuộc tính json (khóa) cần lấy trong phản hồi
    string agreedValue;                 //giá trị từ khóa
    mapping(uint => string) answers;     //các câu trả lời được cung cấp bởi các nguồn cấp dữ liệu
    mapping(address => uint) quorum;    //các nguồn cấp dữ liệu sẽ truy vấn câu trả lời (1=nguồn cấp dữ liệu chưa bỏ phiếu, 2=nguồn cấp dữ liệu đã bỏ phiếu)
  }

  //sự kiện kích hoạt nguồn cấp dữ liệu bên ngoài Chuỗi khối
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

    // Địa chỉ các nguồn cấp dữ liệu được mã hóa cứng
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // phát một sự kiện để được phát hiện bởi nguồn cấp dữ liệu bên ngoài Chuỗi khối
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // tăng id yêu cầu
    currentId++;
  }

  //được gọi bởi nguồn cấp dữ liệu để ghi lại câu trả lời của nó
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //kiểm tra xem nguồn cấp dữ liệu có nằm trong danh sách các nguồn cấp dữ liệu đáng tin cậy hay không
    //và nếu nguồn cấp dữ liệu chưa bỏ phiếu
    if(currRequest.quorum[address(msg.sender)] == 1){

      //đánh dấu rằng địa chỉ này đã bỏ phiếu
      currRequest.quorum[msg.sender] = 2;

      //lặp qua "mảng" các câu trả lời cho đến khi có một vị trí trống và lưu giá trị được lấy
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //tìm vị trí trống đầu tiên
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //lặp qua danh sách nguồn cấp dữ liệu và kiểm tra xem có đủ nguồn cấp dữ liệu (số lượng đại biểu tối thiểu) hay không
      //đã bỏ phiếu cho cùng một câu trả lời với câu trả lời hiện tại
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

### Các nút nguồn cấp dữ liệu {#oracle-nodes}

Nút nguồn cấp dữ liệu là thành phần ngoài chuỗi của dịch vụ nguồn cấp dữ liệu. Nó trích xuất thông tin từ các nguồn bên ngoài, chẳng hạn như các API được lưu trữ trên các máy chủ của bên thứ ba và đưa nó lên chuỗi để các hợp đồng thông minh sử dụng. Các nút nguồn cấp dữ liệu lắng nghe các sự kiện từ hợp đồng nguồn cấp dữ liệu trên chuỗi và tiến hành hoàn thành nhiệm vụ được mô tả trong nhật ký.

Một nhiệm vụ phổ biến đối với các nút nguồn cấp dữ liệu là gửi một yêu cầu [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) đến một dịch vụ API, phân tích cú pháp phản hồi để trích xuất dữ liệu có liên quan, định dạng thành đầu ra có thể đọc được trên Chuỗi khối và gửi nó lên chuỗi bằng cách đưa nó vào một giao dịch đến hợp đồng nguồn cấp dữ liệu. Nút nguồn cấp dữ liệu cũng có thể được yêu cầu chứng thực tính hợp lệ và tính toàn vẹn của thông tin được gửi bằng cách sử dụng “bằng chứng xác thực”, mà chúng ta sẽ khám phá sau.

Các nguồn cấp dữ liệu tính toán cũng dựa vào các nút ngoài chuỗi để thực hiện các tác vụ tính toán sẽ không thực tế để thực thi trên chuỗi, do chi phí Gas và giới hạn kích thước khối. Ví dụ, nút nguồn cấp dữ liệu có thể được giao nhiệm vụ tạo ra một con số ngẫu nhiên có thể xác minh được (ví dụ: cho các trò chơi dựa trên Chuỗi khối).

## Các mẫu thiết kế nguồn cấp dữ liệu {#oracle-design-patterns}

Các nguồn cấp dữ liệu có nhiều loại khác nhau, bao gồm _đọc ngay lập tức_, _xuất bản-đăng ký_ và _yêu cầu-phản hồi_, với hai loại sau là phổ biến nhất trong số các hợp đồng thông minh Ethereum. Ở đây chúng tôi mô tả ngắn gọn các mô hình xuất bản-đăng ký và yêu cầu-phản hồi.

### Nguồn cấp dữ liệu xuất bản-đăng ký {#publish-subscribe-oracles}

Loại nguồn cấp dữ liệu này hiển thị một “nguồn cấp dữ liệu” mà các hợp đồng khác có thể thường xuyên đọc để lấy thông tin. Dữ liệu trong trường hợp này dự kiến sẽ thay đổi thường xuyên, vì vậy các hợp đồng máy khách phải lắng nghe các bản cập nhật cho dữ liệu trong bộ nhớ của nguồn cấp dữ liệu. Một ví dụ là một nguồn cấp dữ liệu cung cấp thông tin giá ETH-USD mới nhất cho người dùng.

### Nguồn cấp dữ liệu yêu cầu-phản hồi {#request-response-oracles}

Thiết lập yêu cầu-phản hồi cho phép hợp đồng máy khách yêu cầu dữ liệu tùy ý khác với dữ liệu được cung cấp bởi nguồn cấp dữ liệu xuất bản-đăng ký. Các nguồn cấp dữ liệu yêu cầu-phản hồi là lý tưởng khi tập dữ liệu quá lớn để được lưu trữ trong bộ nhớ của hợp đồng thông minh và/hoặc người dùng sẽ chỉ cần một phần nhỏ dữ liệu tại bất kỳ thời điểm nào.

Mặc dù phức tạp hơn các mô hình xuất bản-đăng ký, các nguồn cấp dữ liệu yêu cầu-phản hồi về cơ bản là những gì chúng tôi đã mô tả trong phần trước. Nguồn cấp dữ liệu sẽ có một thành phần trên chuỗi nhận yêu cầu dữ liệu và chuyển nó đến một nút ngoài chuỗi để xử lý.

Người dùng bắt đầu các truy vấn dữ liệu phải trang trải chi phí truy xuất thông tin từ nguồn ngoài chuỗi. Hợp đồng máy khách cũng phải cung cấp tiền để trang trải chi phí Gas phát sinh bởi hợp đồng nguồn cấp dữ liệu trong việc trả về phản hồi thông qua hàm gọi lại được chỉ định trong yêu cầu.

## Nguồn cấp dữ liệu tập trung so với phi tập trung {#types-of-oracles}

### Nguồn cấp dữ liệu tập trung {#centralized-oracles}

Một nguồn cấp dữ liệu tập trung được kiểm soát bởi một thực thể duy nhất chịu trách nhiệm tổng hợp thông tin ngoài chuỗi và cập nhật dữ liệu của hợp đồng nguồn cấp dữ liệu theo yêu cầu. Các nguồn cấp dữ liệu tập trung rất hiệu quả vì chúng dựa vào một nguồn chân lý duy nhất. Chúng có thể hoạt động tốt hơn trong các trường hợp các tập dữ liệu độc quyền được xuất bản trực tiếp bởi chủ sở hữu với một chữ ký được chấp nhận rộng rãi. Tuy nhiên, chúng cũng mang lại những nhược điểm:

#### Đảm bảo tính chính xác thấp {#low-correctness-guarantees}

Với các nguồn cấp dữ liệu tập trung, không có cách nào để xác nhận xem thông tin được cung cấp có chính xác hay không. Ngay cả các nhà cung cấp "có uy tín" cũng có thể hoạt động sai trái hoặc bị tấn công. Nếu nguồn cấp dữ liệu bị hỏng, các hợp đồng thông minh sẽ thực thi dựa trên dữ liệu xấu.

#### Tính khả dụng kém {#poor-availability}

Các nguồn cấp dữ liệu tập trung không được đảm bảo luôn cung cấp dữ liệu ngoài chuỗi cho các hợp đồng thông minh khác. Nếu nhà cung cấp quyết định tắt dịch vụ hoặc một tin tặc chiếm quyền điều khiển thành phần ngoài chuỗi của nguồn cấp dữ liệu, hợp đồng thông minh của bạn có nguy cơ bị tấn công từ chối dịch vụ (DoS).

#### Tính tương thích của ưu đãi kém {#poor-incentive-compatibility}

Các nguồn cấp dữ liệu tập trung thường có các ưu đãi được thiết kế kém hoặc không tồn tại để nhà cung cấp dữ liệu gửi thông tin chính xác/không bị thay đổi. Việc trả tiền cho một nguồn cấp dữ liệu vì tính chính xác không đảm bảo sự trung thực. Vấn đề này trở nên lớn hơn khi lượng giá trị được kiểm soát bởi các hợp đồng thông minh tăng lên.

### Nguồn cấp dữ liệu phi tập trung {#decentralized-oracles}

Các nguồn cấp dữ liệu phi tập trung được thiết kế để khắc phục những hạn chế của các nguồn cấp dữ liệu tập trung bằng cách loại bỏ các điểm lỗi duy nhất. Một dịch vụ nguồn cấp dữ liệu phi tập trung bao gồm nhiều người tham gia trong một mạng lưới ngang hàng hình thành sự đồng thuận về dữ liệu ngoài chuỗi trước khi gửi nó đến một hợp đồng thông minh.

Một nguồn cấp dữ liệu phi tập trung (lý tưởng nhất) nên không cần cấp phép, không cần tin cậy và không bị quản lý bởi một bên trung tâm; trên thực tế, sự phi tập trung giữa các nguồn cấp dữ liệu nằm trên một phổ. Có các mạng lưới nguồn cấp dữ liệu bán phi tập trung nơi bất kỳ ai cũng có thể tham gia, nhưng với một “chủ sở hữu” phê duyệt và loại bỏ các nút dựa trên hiệu suất lịch sử. Các mạng lưới nguồn cấp dữ liệu hoàn toàn phi tập trung cũng tồn tại: chúng thường chạy dưới dạng các Chuỗi khối độc lập và đã xác định các cơ chế đồng thuận để điều phối các nút và trừng phạt hành vi sai trái.

Việc sử dụng các nguồn cấp dữ liệu phi tập trung mang lại những lợi ích sau:

### Đảm bảo tính chính xác cao {#high-correctness-guarantees}

Các nguồn cấp dữ liệu phi tập trung cố gắng đạt được tính chính xác của dữ liệu bằng cách sử dụng các phương pháp tiếp cận khác nhau. Điều này bao gồm việc sử dụng các bằng chứng chứng thực tính xác thực và tính toàn vẹn của thông tin được trả về và yêu cầu nhiều thực thể cùng đồng ý về tính hợp lệ của dữ liệu ngoài chuỗi.

#### Bằng chứng xác thực {#authenticity-proofs}

Bằng chứng xác thực là các cơ chế mật mã cho phép xác minh độc lập thông tin được truy xuất từ các nguồn bên ngoài. Những bằng chứng này có thể xác thực nguồn thông tin và phát hiện các thay đổi có thể có đối với dữ liệu sau khi truy xuất.

Ví dụ về bằng chứng xác thực bao gồm:

**Bằng chứng Bảo mật Lớp Truyền tải (TLS)**: Các nút nguồn cấp dữ liệu thường truy xuất dữ liệu từ các nguồn bên ngoài bằng kết nối HTTP an toàn dựa trên giao thức Bảo mật Lớp Truyền tải (TLS). Một số nguồn cấp dữ liệu phi tập trung sử dụng bằng chứng xác thực để xác minh các phiên TLS (tức là xác nhận việc trao đổi thông tin giữa một nút và một máy chủ cụ thể) và xác nhận rằng nội dung của phiên không bị thay đổi.

**Chứng thực Môi trường Thực thi Tin cậy (TEE)**: Một [môi trường thực thi tin cậy](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) là một môi trường tính toán hộp cát được cách ly khỏi các quy trình hoạt động của hệ thống máy chủ của nó. TEE đảm bảo rằng bất kỳ mã ứng dụng hoặc dữ liệu nào được lưu trữ/sử dụng trong môi trường tính toán đều giữ được tính toàn vẹn, tính bảo mật và tính bất biến. Người dùng cũng có thể tạo một chứng thực để chứng minh một phiên bản ứng dụng đang chạy trong môi trường thực thi tin cậy.

Một số lớp nguồn cấp dữ liệu phi tập trung nhất định yêu cầu các nhà điều hành nút nguồn cấp dữ liệu cung cấp các chứng thực TEE. Điều này xác nhận với người dùng rằng nhà điều hành nút đang chạy một phiên bản của máy khách nguồn cấp dữ liệu trong một môi trường thực thi tin cậy. TEE ngăn chặn các quy trình bên ngoài thay đổi hoặc đọc mã và dữ liệu của một ứng dụng, do đó, những chứng thực đó chứng minh rằng nút nguồn cấp dữ liệu đã giữ thông tin nguyên vẹn và bí mật.

#### Xác thực thông tin dựa trên sự đồng thuận {#consensus-based-validation-of-information}

Các nguồn cấp dữ liệu tập trung dựa vào một nguồn chân lý duy nhất khi cung cấp dữ liệu cho các hợp đồng thông minh, điều này đưa ra khả năng xuất bản thông tin không chính xác. Các nguồn cấp dữ liệu phi tập trung giải quyết vấn đề này bằng cách dựa vào nhiều nút nguồn cấp dữ liệu để truy vấn thông tin ngoài chuỗi. Bằng cách so sánh dữ liệu từ nhiều nguồn, các nguồn cấp dữ liệu phi tập trung làm giảm rủi ro chuyển thông tin không hợp lệ cho các hợp đồng trên chuỗi.

Tuy nhiên, các nguồn cấp dữ liệu phi tập trung phải đối phó với sự khác biệt trong thông tin được truy xuất từ nhiều nguồn ngoài chuỗi. Để giảm thiểu sự khác biệt về thông tin và đảm bảo dữ liệu được chuyển đến hợp đồng nguồn cấp dữ liệu phản ánh ý kiến tập thể của các nút nguồn cấp dữ liệu, các nguồn cấp dữ liệu phi tập trung sử dụng các cơ chế sau:

##### Bỏ phiếu/đặt cọc về tính chính xác của dữ liệu {#availability}

Một số mạng lưới nguồn cấp dữ liệu phi tập trung yêu cầu người tham gia bỏ phiếu hoặc đặt cọc về tính chính xác của các câu trả lời cho các truy vấn dữ liệu (ví dụ: "Ai đã thắng cuộc bầu cử Hoa Kỳ năm 2020?") bằng cách sử dụng token gốc của mạng lưới. Một giao thức tổng hợp sau đó tổng hợp các phiếu bầu và khoản đặt cọc và lấy câu trả lời được đa số ủng hộ làm câu trả lời hợp lệ.

Các nút có câu trả lời sai lệch so với câu trả lời của đa số sẽ bị phạt bằng cách phân phối token của họ cho những người khác cung cấp các giá trị chính xác hơn. Việc buộc các nút phải cung cấp một khoản tiền bảo đảm trước khi cung cấp dữ liệu sẽ khuyến khích các phản hồi trung thực vì họ được coi là các tác nhân kinh tế hợp lý có ý định tối đa hóa lợi nhuận.

Việc đặt cọc/bỏ phiếu cũng bảo vệ các nguồn cấp dữ liệu phi tập trung khỏi [các cuộc tấn công Sybil](/glossary/#sybil-attack) nơi các tác nhân độc hại tạo ra nhiều danh tính để thao túng hệ thống đồng thuận. Tuy nhiên, việc đặt cọc không thể ngăn chặn “sự ăn bám” (các nút nguồn cấp dữ liệu sao chép thông tin từ những người khác) và “xác thực lười biếng” (các nút nguồn cấp dữ liệu làm theo đa số mà không tự xác minh thông tin).

##### Cơ chế điểm Schelling {#good-incentive-compatibility}

[Điểm Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) là một khái niệm lý thuyết trò chơi giả định rằng nhiều thực thể sẽ luôn mặc định một giải pháp chung cho một vấn đề khi không có bất kỳ sự giao tiếp nào. Các cơ chế điểm Schelling thường được sử dụng trong các mạng lưới nguồn cấp dữ liệu phi tập trung để cho phép các nút đạt được sự đồng thuận về các câu trả lời cho các yêu cầu dữ liệu.

Một ý tưởng ban đầu cho điều này là [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), một nguồn cấp dữ liệu được đề xuất nơi những người tham gia gửi phản hồi cho các câu hỏi "vô hướng" (các câu hỏi có câu trả lời được mô tả bằng độ lớn, ví dụ: "giá của ETH là bao nhiêu?"), cùng với một khoản tiền gửi. Những người dùng cung cấp các giá trị nằm trong khoảng từ [phân vị](https://en.wikipedia.org/wiki/Percentile) thứ 25 đến 75 sẽ được khen thưởng, trong khi những người có giá trị sai lệch lớn so với giá trị trung vị sẽ bị phạt.

Mặc dù SchellingCoin không tồn tại ngày nay, một số nguồn cấp dữ liệu phi tập trung—đáng chú ý là [Nguồn cấp dữ liệu của Giao thức Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module)—sử dụng cơ chế điểm Schelling để cải thiện độ chính xác của dữ liệu nguồn cấp dữ liệu. Mỗi Nguồn cấp dữ liệu Maker bao gồm một mạng lưới ngang hàng ngoài chuỗi gồm các nút ("người chuyển tiếp" và "nguồn cấp dữ liệu") gửi giá thị trường cho các tài sản thế chấp và một hợp đồng “Medianizer” trên chuỗi tính toán giá trị trung vị của tất cả các giá trị được cung cấp. Khi khoảng thời gian trễ được chỉ định kết thúc, giá trị trung vị này sẽ trở thành giá tham chiếu mới cho tài sản được liên kết.

Các ví dụ khác về các nguồn cấp dữ liệu sử dụng cơ chế điểm Schelling bao gồm [Báo cáo ngoài chuỗi của Chainlink](https://docs.chain.link/architecture-overview/off-chain-reporting) và [Witnet](https://witnet.io/). Trong cả hai hệ thống, các phản hồi từ các nút nguồn cấp dữ liệu trong mạng lưới ngang hàng được tổng hợp thành một giá trị tổng hợp duy nhất, chẳng hạn như giá trị trung bình hoặc trung vị. Các nút được khen thưởng hoặc bị trừng phạt tùy theo mức độ mà các phản hồi của chúng phù hợp hoặc sai lệch so với giá trị tổng hợp.

Các cơ chế điểm Schelling rất hấp dẫn vì chúng giảm thiểu dấu chân trên chuỗi (chỉ cần gửi một giao dịch) trong khi vẫn đảm bảo sự phi tập trung. Điều sau là có thể vì các nút phải ký xác nhận vào danh sách các phản hồi được gửi trước khi nó được đưa vào thuật toán tạo ra giá trị trung bình/trung vị.

### Tính khả dụng {#applications-of-oracles-in-smart-contracts}

Các dịch vụ nguồn cấp dữ liệu phi tập trung đảm bảo tính khả dụng cao của dữ liệu ngoài chuỗi cho các hợp đồng thông minh. Điều này đạt được bằng cách phi tập trung hóa cả nguồn thông tin ngoài chuỗi và các nút chịu trách nhiệm chuyển thông tin lên chuỗi.

Điều này đảm bảo khả năng chịu lỗi vì hợp đồng nguồn cấp dữ liệu có thể dựa vào nhiều nút (những người cũng dựa vào nhiều nguồn dữ liệu) để thực thi các truy vấn từ các hợp đồng khác. Sự phi tập trung ở cấp độ nguồn _và_ nhà điều hành nút là rất quan trọng—một mạng lưới các nút nguồn cấp dữ liệu phục vụ thông tin được truy xuất từ cùng một nguồn sẽ gặp phải vấn đề tương tự như một nguồn cấp dữ liệu tập trung.

Các nguồn cấp dữ liệu dựa trên việc đặt cọc cũng có thể phạt cắt giảm các nhà điều hành nút không phản hồi nhanh chóng các yêu cầu dữ liệu. Điều này khuyến khích đáng kể các nút nguồn cấp dữ liệu đầu tư vào cơ sở hạ tầng chịu lỗi và cung cấp dữ liệu một cách kịp thời.

### Tính tương thích của ưu đãi tốt {#retrieving-financial-data}

Các nguồn cấp dữ liệu phi tập trung thực hiện các thiết kế ưu đãi khác nhau để ngăn chặn hành vi [Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) giữa các nút nguồn cấp dữ liệu. Cụ thể, chúng đạt được _khả năng quy kết_ và _trách nhiệm giải trình_:

1. Các nút nguồn cấp dữ liệu phi tập trung thường được yêu cầu ký vào dữ liệu mà chúng cung cấp để phản hồi các yêu cầu dữ liệu. Thông tin này giúp đánh giá hiệu suất lịch sử của các nút nguồn cấp dữ liệu, sao cho người dùng có thể lọc ra các nút nguồn cấp dữ liệu không đáng tin cậy khi thực hiện các yêu cầu dữ liệu. Một ví dụ là [Hệ thống Danh tiếng Thuật toán](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) của Witnet.

2. Các nguồn cấp dữ liệu phi tập trung—như đã giải thích trước đó—có thể yêu cầu các nút đặt cọc về sự tự tin của họ vào tính xác thực của dữ liệu mà họ gửi. Nếu yêu cầu nhận được kiểm tra là đúng, khoản đặt cọc này có thể được trả lại cùng với phần thưởng cho dịch vụ trung thực. Nhưng nó cũng có thể bị phạt cắt giảm trong trường hợp thông tin không chính xác, điều này cung cấp một số biện pháp về trách nhiệm giải trình.

## Các ứng dụng của nguồn cấp dữ liệu trong các hợp đồng thông minh {#generating-verifiable-randomness}

Sau đây là các trường hợp sử dụng phổ biến cho các nguồn cấp dữ liệu trong Ethereum:

### Truy xuất dữ liệu tài chính {#getting-outcomes-for-events}

Các ứng dụng [tài chính phi tập trung (DeFi)](/defi/) cho phép cho vay, vay mượn và giao dịch tài sản ngang hàng. Điều này thường yêu cầu lấy các thông tin tài chính khác nhau, bao gồm dữ liệu tỷ giá hối đoái (để tính toán giá trị tiền pháp định của tiền mã hóa hoặc so sánh giá token) và dữ liệu thị trường vốn (để tính toán giá trị của các tài sản được token hóa, chẳng hạn như vàng hoặc đô la Mỹ).

Ví dụ, một giao thức cho vay DeFi cần truy vấn giá thị trường hiện tại cho các tài sản (ví dụ: ETH) được gửi làm tài sản thế chấp. Điều này cho phép hợp đồng xác định giá trị của các tài sản thế chấp và xác định số tiền nó có thể vay mượn từ hệ thống.

Các “nguồn cấp giá” phổ biến (như chúng thường được gọi) trong DeFi bao gồm Nguồn cấp giá Chainlink, [Nguồn cấp giá mở](https://compound.finance/docs/prices) của Giao thức Compound, [Giá trung bình theo thời gian (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) của Uniswap và [Nguồn cấp dữ liệu Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Các nhà xây dựng nên hiểu những lưu ý đi kèm với các nguồn cấp giá này trước khi tích hợp chúng vào dự án của họ. [Bài viết](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) này cung cấp một phân tích chi tiết về những gì cần xem xét khi có kế hoạch sử dụng bất kỳ nguồn cấp giá nào được đề cập.

Dưới đây là một ví dụ về cách bạn có thể truy xuất giá ETH mới nhất trong hợp đồng thông minh của mình bằng cách sử dụng nguồn cấp giá Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Mạng lưới: Kovan
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

### Tạo ra tính ngẫu nhiên có thể xác minh {#automating-smart-contracts}

Một số ứng dụng Chuỗi khối nhất định, chẳng hạn như các trò chơi dựa trên Chuỗi khối hoặc các chương trình xổ số, yêu cầu mức độ không thể đoán trước và tính ngẫu nhiên cao để hoạt động hiệu quả. Tuy nhiên, việc thực thi tất định của các Chuỗi khối loại bỏ tính ngẫu nhiên.

Cách tiếp cận ban đầu là sử dụng các hàm mật mã giả ngẫu nhiên, chẳng hạn như `blockhash`, nhưng những hàm này có thể bị [thao túng bởi các thợ đào](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) giải quyết thuật toán Bằng chứng công việc (PoW). Ngoài ra, việc Ethereum [chuyển sang Bằng chứng cổ phần (PoS)](/roadmap/merge/) có nghĩa là các nhà phát triển không còn có thể dựa vào `blockhash` cho tính ngẫu nhiên trên chuỗi. [Cơ chế RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) của Chuỗi Beacon cung cấp một nguồn tính ngẫu nhiên thay thế.

Có thể tạo ra giá trị ngẫu nhiên ngoài chuỗi và gửi nó lên chuỗi, nhưng làm như vậy áp đặt các yêu cầu tin cậy cao đối với người dùng. Họ phải tin rằng giá trị thực sự được tạo ra thông qua các cơ chế không thể đoán trước và không bị thay đổi trong quá trình truyền.

Các nguồn cấp dữ liệu được thiết kế cho tính toán ngoài chuỗi giải quyết vấn đề này bằng cách tạo ra các kết quả ngẫu nhiên một cách an toàn ngoài chuỗi mà chúng phát sóng trên chuỗi cùng với các bằng chứng mật mã chứng thực tính không thể đoán trước của quá trình. Một ví dụ là [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Hàm ngẫu nhiên có thể xác minh), là một trình tạo số ngẫu nhiên (RNG) công bằng và chống giả mạo có thể chứng minh được, hữu ích cho việc xây dựng các hợp đồng thông minh đáng tin cậy cho các ứng dụng dựa trên các kết quả không thể đoán trước.

### Nhận kết quả cho các sự kiện {#use-blockchain-oracles}

Với các nguồn cấp dữ liệu, việc tạo ra các hợp đồng thông minh phản hồi các sự kiện trong thế giới thực rất dễ dàng. Các dịch vụ nguồn cấp dữ liệu làm cho điều này trở nên khả thi bằng cách cho phép các hợp đồng kết nối với các API bên ngoài thông qua các thành phần ngoài chuỗi và sử dụng thông tin từ các nguồn dữ liệu đó. Ví dụ, dapp thị trường dự đoán được đề cập trước đó có thể yêu cầu một nguồn cấp dữ liệu trả về kết quả bầu cử từ một nguồn ngoài chuỗi đáng tin cậy (ví dụ: Associated Press).

Việc sử dụng các nguồn cấp dữ liệu để truy xuất dữ liệu dựa trên các kết quả trong thế giới thực cho phép các trường hợp sử dụng mới lạ khác; ví dụ, một sản phẩm bảo hiểm phi tập trung cần thông tin chính xác về thời tiết, thảm họa, v.v. để hoạt động hiệu quả.

### Tự động hóa các hợp đồng thông minh {#further-reading}

Các hợp đồng thông minh không chạy tự động; thay vào đó, một tài khoản thuộc sở hữu bên ngoài (EOA) hoặc một tài khoản hợp đồng khác, phải kích hoạt các hàm phù hợp để thực thi mã của hợp đồng. Trong hầu hết các trường hợp, phần lớn các hàm của hợp đồng là công khai và có thể được gọi bởi các EOA và các hợp đồng khác.

Nhưng cũng có _các hàm riêng tư_ trong một hợp đồng mà những người khác không thể truy cập được;, nhưng lại rất quan trọng đối với chức năng tổng thể của một dapp. Các ví dụ bao gồm một hàm `mintERC721Token()` định kỳ đúc các NFT mới cho người dùng, một hàm để trao các khoản thanh toán trong một thị trường dự đoán hoặc một hàm để mở khóa các token đã đặt cọc trong một DEX.

Các nhà phát triển sẽ cần kích hoạt các hàm như vậy theo định kỳ để giữ cho ứng dụng chạy trơn tru. Tuy nhiên, điều này có thể dẫn đến việc các nhà phát triển mất nhiều giờ hơn cho các công việc nhàm chán, đó là lý do tại sao việc tự động hóa thực thi các hợp đồng thông minh lại hấp dẫn.

Một số mạng lưới nguồn cấp dữ liệu phi tập trung cung cấp các dịch vụ tự động hóa, cho phép các nút nguồn cấp dữ liệu ngoài chuỗi kích hoạt các hàm của hợp đồng thông minh theo các tham số do người dùng xác định. Thông thường, điều này yêu cầu “đăng ký” hợp đồng mục tiêu với dịch vụ nguồn cấp dữ liệu, cung cấp tiền để trả cho nhà điều hành nguồn cấp dữ liệu và chỉ định các điều kiện hoặc thời gian để kích hoạt hợp đồng.

[Mạng lưới Keeper](https://chain.link/keepers) của Chainlink cung cấp các tùy chọn cho các hợp đồng thông minh để thuê ngoài các nhiệm vụ bảo trì thường xuyên theo cách giảm thiểu sự tin cậy và phi tập trung. Đọc [tài liệu chính thức của Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) để biết thông tin về cách làm cho hợp đồng của bạn tương thích với Keeper và sử dụng dịch vụ Upkeep.

## Cách sử dụng các Oracle blockchain

Có nhiều ứng dụng nguồn cấp dữ liệu mà bạn có thể tích hợp vào dapp Ethereum của mình:

**[Chainlink](https://chain.link/)** - _Các mạng lưới nguồn cấp dữ liệu phi tập trung của Chainlink cung cấp các đầu vào, đầu ra và tính toán chống giả mạo để hỗ trợ các hợp đồng thông minh tiên tiến trên bất kỳ Chuỗi khối nào._

**[Nguồn cấp dữ liệu RedStone](https://redstone.finance/)** - _RedStone là một nguồn cấp dữ liệu mô-đun phi tập trung cung cấp các nguồn cấp dữ liệu được tối ưu hóa Gas. Nó chuyên cung cấp các nguồn cấp giá cho các tài sản mới nổi, chẳng hạn như token staking thanh khoản (LST), token đặt cọc lại thanh khoản (LRT) và các công cụ phái sinh đặt cọc Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle khắc phục những hạn chế hiện tại của việc truyền dữ liệu trên chuỗi bằng cách phát triển các nguồn cấp dữ liệu thực sự có thể mở rộng, tiết kiệm chi phí, phi tập trung và có thể xác minh._

**[Witnet](https://witnet.io/)** - _Witnet là một nguồn cấp dữ liệu không cần cấp phép, phi tập trung và chống kiểm duyệt giúp các hợp đồng thông minh phản ứng với các sự kiện trong thế giới thực với các đảm bảo kinh tế tiền mã hóa mạnh mẽ._

**[Nguồn cấp dữ liệu UMA](https://uma.xyz)** - _Nguồn cấp dữ liệu lạc quan của UMA cho phép các hợp đồng thông minh nhanh chóng nhận được bất kỳ loại dữ liệu nào cho các ứng dụng khác nhau, bao gồm bảo hiểm, các công cụ phái sinh tài chính và các thị trường dự đoán._

**[Tellor](https://tellor.io/)** - _Tellor là một giao thức nguồn cấp dữ liệu minh bạch và không cần cấp phép để hợp đồng thông minh của bạn dễ dàng lấy bất kỳ dữ liệu nào bất cứ khi nào nó cần._

**[Giao thức Band](https://bandprotocol.com/)** - _Giao thức Band là một nền tảng nguồn cấp dữ liệu chuỗi chéo tổng hợp và kết nối dữ liệu thế giới thực và các API với các hợp đồng thông minh._

**[Mạng lưới Pyth](https://pyth.network/)** - _Mạng lưới Pyth là một mạng lưới nguồn cấp dữ liệu tài chính của bên thứ nhất được thiết kế để xuất bản dữ liệu thế giới thực liên tục trên chuỗi trong một môi trường chống giả mạo, phi tập trung và tự duy trì._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO đang cung cấp các giải pháp nguồn cấp dữ liệu của bên thứ nhất mang lại tính minh bạch, bảo mật và khả năng mở rộng nguồn lớn hơn trong một giải pháp phi tập trung cho các hợp đồng thông minh_

**[Supra](https://supra.com/)** - Một bộ công cụ tích hợp theo chiều dọc của các giải pháp chuỗi chéo liên kết tất cả các Chuỗi khối, công khai (L1 và L2) hoặc riêng tư (doanh nghiệp), cung cấp các nguồn cấp giá phi tập trung có thể được sử dụng cho các trường hợp sử dụng trên chuỗi và ngoài chuỗi. 

**[Mạng lưới Gas](https://gas.network/)** - Một nền tảng nguồn cấp dữ liệu phân tán cung cấp dữ liệu giá gas theo thời gian thực trên Chuỗi khối. Bằng cách đưa dữ liệu từ các nhà cung cấp dữ liệu giá gas hàng đầu lên chuỗi, Mạng lưới Gas đang giúp thúc đẩy khả năng tương tác. Mạng lưới Gas hỗ trợ dữ liệu cho hơn 35 chuỗi, bao gồm Mạng chính Ethereum và nhiều L2 hàng đầu.

**[DIA](https://www.diadata.org/)** - Một mạng lưới nguồn cấp dữ liệu chuỗi chéo cung cấp các nguồn cấp dữ liệu có thể xác minh cho hơn 20.000 tài sản trên tất cả các loại tài sản chính. DIA lấy dữ liệu giao dịch thô trực tiếp từ hơn 100 thị trường sơ cấp và tính toán nó trên chuỗi, đảm bảo tính minh bạch và khả năng xác minh dữ liệu hoàn toàn với các cấu hình tùy chỉnh cho bất kỳ trường hợp sử dụng nào.

**[Stork](https://stork.network)** - Stork cung cấp dữ liệu giá ở độ trễ cực thấp, hỗ trợ nhiều trường hợp sử dụng bao gồm các thị trường vĩnh viễn, các giao thức cho vay và các hệ sinh thái DeFi, với các tài sản mới được hỗ trợ nhanh chóng khi niêm yết.

## Đọc thêm

**Bài viết**

- [Oracle blockchain là gì?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Oracle blockchain là gì?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Nguồn cấp dữ liệu phi tập trung: một cái nhìn tổng quan toàn diện](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Triển khai một Oracle blockchain trên Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Tại sao các hợp đồng thông minh không thể thực hiện các lệnh gọi API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Vậy bạn muốn sử dụng một nguồn cấp giá](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Nguồn cấp dữ liệu và sự mở rộng tiện ích của Chuỗi khối](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Hướng dẫn**

- [Cách lấy giá hiện tại của Ethereum trong Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Sử dụng dữ liệu nguồn cấp dữ liệu](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Thử thách nguồn cấp dữ liệu](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Các dự án ví dụ**

- [Dự án khởi đầu Chainlink đầy đủ cho Ethereum trong Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_