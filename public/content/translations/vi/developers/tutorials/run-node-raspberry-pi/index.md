---
title: Chạy nút Ethereum trên Raspberry Pi 4
description: Flash chiếc Raspberry Pi 4 của bạn, cắm cáp ethernet, kết nối đĩa SSD và cấp nguồn cho thiết bị để biến Raspberry Pi 4 thành một nút Ethereum đầy đủ + trình xác thực
author: "EthereumOnArm"
tags: [ "máy khách", "lớp thực thi", "lớp đồng thuận", "nút" ]
lang: vi
skill: intermediate
published: 2022-06-10
source: Ethereum trên ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm là một ảnh Linux tùy chỉnh có thể biến Raspberry Pi thành một nút Ethereum.**

Để sử dụng Ethereum trên Arm để biến Raspberry Pi thành một nút Ethereum, phần cứng sau đây được đề xuất:

- Bo mạch Raspberry 4 (model B 8GB), Odroid M1 hoặc Rock 5B (RAM 8GB/16GB)
- Thẻ MicroSD (tối thiểu 16 GB Class 10)
- Đĩa SSD USB 3.0 tối thiểu 2 TB hoặc một SSD với vỏ chuyển đổi USB sang SATA.
- Nguồn cấp điện
- Cáp Ethernet
- Chuyển tiếp cổng (xem máy khách để biết thêm thông tin)
- Vỏ có tản nhiệt và quạt
- Bàn phím USB, Màn hình và cáp HDMI (micro-HDMI) (Tùy chọn)

## Tại sao nên chạy Ethereum trên ARM? {#why-run-ethereum-on-arm}

Các bo mạch ARM là những máy tính nhỏ, linh hoạt và có giá cả rất phải chăng. Chúng là những lựa chọn tốt để chạy các nút Ethereum vì có thể mua chúng với giá rẻ, được cấu hình để tất cả tài nguyên của chúng chỉ tập trung vào nút, giúp chúng hoạt động hiệu quả, tiêu thụ ít điện năng và có kích thước vật lý nhỏ để có thể đặt trong bất kỳ ngôi nhà nào một cách kín đáo. Việc khởi tạo các nút cũng rất dễ dàng vì thẻ MicroSD của Raspberry Pi có thể được nạp một ảnh dựng sẵn, không cần tải xuống hoặc xây dựng phần mềm.

## Nó hoạt động như thế nào? {#how-does-it-work}

Thẻ nhớ của Raspberry Pi được nạp một ảnh dựng sẵn. Ảnh này chứa mọi thứ cần thiết để chạy một nút Ethereum. Với thẻ đã được nạp, tất cả những gì người dùng cần làm là bật nguồn Raspberry Pi. Tất cả các quy trình cần thiết để chạy nút sẽ được tự động khởi động. Điều này hoạt động vì thẻ nhớ chứa một hệ điều hành (OS) dựa trên Linux, trên đó các quy trình cấp hệ thống được chạy tự động để biến thiết bị thành một nút Ethereum.

Không thể chạy Ethereum bằng hệ điều hành Linux phổ biến của Raspberry Pi là \"Raspbian\" vì Raspbian vẫn sử dụng kiến trúc 32-bit, điều này khiến người dùng Ethereum gặp phải các vấn đề về bộ nhớ và các máy khách đồng thuận không hỗ trợ các tệp nhị phân 32-bit. Để khắc phục điều này, nhóm Ethereum on Arm đã chuyển sang một hệ điều hành 64-bit gốc có tên là \"Armbian\".

**Các ảnh sẽ lo tất cả các bước cần thiết**, từ việc thiết lập môi trường và định dạng đĩa SSD đến việc cài đặt và chạy phần mềm Ethereum cũng như bắt đầu đồng bộ hóa chuỗi khối.

## Lưu ý về máy khách thực thi và máy khách đồng thuận {#note-on-execution-and-consensus-clients}

Ảnh Ethereum on Arm bao gồm các máy khách thực thi và đồng thuận dựng sẵn dưới dạng các dịch vụ. Một nút Ethereum yêu cầu cả hai máy khách phải được đồng bộ hóa và đang chạy. Bạn chỉ cần tải xuống và nạp ảnh rồi khởi động các dịch vụ. Ảnh này được tải sẵn các máy khách thực thi sau:

- Geth
- Nethermind
- Besu

và các máy khách đồng thuận sau:

- Lighthouse
- Nimbus
- Prysm
- Teku

Bạn nên chọn một trong mỗi loại để chạy - tất cả các máy khách thực thi đều tương thích với tất cả các máy khách đồng thuận. Nếu bạn không chọn một máy khách một cách rõ ràng, nút sẽ quay lại sử dụng các mặc định của nó - Geth và Lighthouse - và tự động chạy chúng khi bo mạch được cấp nguồn. Bạn phải mở cổng 30303 trên bộ định tuyến của mình để Geth có thể tìm và kết nối với các máy ngang hàng.

## Tải xuống ảnh {#downloading-the-image}

Ảnh Ethereum cho Raspberry Pi 4 là ảnh \"cắm và chạy\" giúp tự động cài đặt và thiết lập cả máy khách thực thi và máy khách đồng thuận, cấu hình chúng để giao tiếp với nhau và kết nối với mạng Ethereum. Tất cả những gì người dùng cần làm là khởi động các quy trình của họ bằng một lệnh đơn giản.

Tải xuống ảnh Raspberry Pi từ [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) và xác minh hàm băm SHA256:

```sh
# Từ thư mục chứa ảnh đã tải xuống
shasum -a 256 ethonarm_22.04.00.img.zip
# Hàm băm sẽ xuất ra: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Lưu ý rằng các ảnh cho bo mạch Rock 5B và Odroid M1 có sẵn tại [trang tải xuống](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) của Ethereum-on-Arm.

## Nạp thẻ MicroSD {#flashing-the-microsd}

Thẻ MicroSD sẽ được sử dụng cho Raspberry Pi trước tiên nên được cắm vào máy tính để bàn hoặc máy tính xách tay để có thể nạp. Sau đó, các lệnh terminal sau sẽ nạp ảnh đã tải xuống vào thẻ SD:

```shell
# kiểm tra tên thẻ MicroSD
sudo fdisk -l

>> sdxxx
```

Việc lấy đúng tên là rất quan trọng vì lệnh tiếp theo bao gồm `dd` sẽ xóa hoàn toàn nội dung hiện có của thẻ trước khi đẩy ảnh vào đó. Để tiếp tục, hãy điều hướng đến thư mục chứa ảnh đã nén:

```shell
# giải nén và nạp ảnh
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Thẻ hiện đã được nạp, vì vậy có thể cắm nó vào Raspberry Pi.

## Khởi động nút {#start-the-node}

Sau khi đã cắm thẻ SD vào Raspberry Pi, hãy kết nối cáp ethernet và SSD rồi bật nguồn. Hệ điều hành sẽ khởi động và tự động bắt đầu thực hiện các tác vụ được cấu hình sẵn để biến Raspberry Pi thành một nút Ethereum, bao gồm cài đặt và xây dựng phần mềm máy khách. Quá trình này có thể sẽ mất 10-15 phút.

Sau khi mọi thứ được cài đặt và cấu hình, hãy đăng nhập vào thiết bị qua kết nối ssh hoặc sử dụng trực tiếp terminal nếu có màn hình và bàn phím được gắn vào bo mạch. Sử dụng tài khoản `ethereum` để đăng nhập, vì tài khoản này có các quyền cần thiết để khởi động nút.

```shell
Người dùng: ethereum
Mật khẩu: ethereum
```

Máy khách thực thi mặc định, Geth, sẽ tự động khởi động. Bạn có thể xác nhận điều này bằng cách kiểm tra nhật ký bằng lệnh terminal sau:

```sh
sudo journalctl -u geth -f
```

Máy khách đồng thuận cần được khởi động một cách rõ ràng. Để làm điều này, trước tiên hãy mở cổng 9000 trên bộ định tuyến của bạn để Lighthouse có thể tìm và kết nối với các máy ngang hàng. Sau đó, bật và khởi động dịch vụ lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Kiểm tra máy khách bằng nhật ký:

```sh
sudo journalctl -u lighthouse-beacon
```

Lưu ý rằng máy khách đồng thuận sẽ đồng bộ hóa trong vài phút vì nó sử dụng đồng bộ hóa điểm kiểm tra. Máy khách thực thi sẽ mất nhiều thời gian hơn - có thể là vài giờ, và nó sẽ không khởi động cho đến khi máy khách đồng thuận đã đồng bộ hóa xong (điều này là do máy khách thực thi cần một mục tiêu để đồng bộ hóa tới, mà máy khách đồng thuận đã được đồng bộ hóa cung cấp).

Với các dịch vụ Geth và Lighthouse đang chạy và đã đồng bộ hóa, Raspberry Pi của bạn giờ đây đã là một nút Ethereum! Cách phổ biến nhất để tương tác với mạng Ethereum là sử dụng bảng điều khiển Javascript của Geth, có thể được gắn vào máy khách Geth trên cổng 8545. Cũng có thể gửi các lệnh được định dạng dưới dạng đối tượng JSON bằng công cụ yêu cầu như Curl. Xem thêm trong [tài liệu Geth](https://geth.ethereum.org/).

Geth được cấu hình sẵn để báo cáo các chỉ số đến một bảng điều khiển Grafana có thể được xem trong trình duyệt. Người dùng nâng cao hơn có thể muốn sử dụng tính năng này để theo dõi tình trạng nút của họ bằng cách điều hướng đến `ipaddress:3000`, truyền `user: admin` và `passwd: ethereum`.

## Người xác thực {#validators}

Một trình xác thực cũng có thể được thêm vào máy khách đồng thuận một cách tùy chọn. Phần mềm trình xác thực cho phép nút của bạn tham gia tích cực vào sự đồng thuận và cung cấp cho mạng lưới bảo mật kinh tế mã hóa. Bạn sẽ được thưởng bằng ETH cho công việc này. Để chạy một trình xác thực, trước tiên bạn phải có 32 ETH, số ETH này phải được gửi vào hợp đồng gửi tiền. Việc gửi tiền có thể được thực hiện bằng cách làm theo hướng dẫn từng bước trên [Launchpad](https://launchpad.ethereum.org/). Thực hiện việc này trên máy tính để bàn/máy tính xách tay, nhưng không tạo khóa — việc này có thể được thực hiện trực tiếp trên Raspberry Pi.

Mở một terminal trên Raspberry Pi và chạy lệnh sau để tạo các khóa gửi tiền:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Hoặc tải xuống [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) để chạy trên một máy tính cách ly mạng, và chạy lệnh `deposit new-mnemnonic`)

Hãy giữ an toàn cụm từ ghi nhớ! Lệnh trên đã tạo ra hai tệp trong kho khóa của nút: các khóa của trình xác thực và một tệp dữ liệu gửi tiền. Dữ liệu gửi tiền cần được tải lên launchpad, vì vậy nó phải được sao chép từ Raspberry Pi sang máy tính để bàn/máy tính xách tay. Điều này có thể được thực hiện bằng kết nối ssh hoặc bất kỳ phương pháp sao chép/dán nào khác.

Khi tệp dữ liệu gửi tiền có sẵn trên máy tính đang chạy launchpad, bạn có thể kéo và thả tệp đó vào dấu `+` trên màn hình launchpad. Làm theo hướng dẫn trên màn hình để gửi một giao dịch đến hợp đồng gửi tiền.

Quay lại Raspberry Pi, một trình xác thực có thể được khởi động. Điều này yêu cầu nhập các khóa của trình xác thực, đặt địa chỉ để thu thập phần thưởng, và sau đó khởi động quy trình xác thực đã được cấu hình sẵn. Ví dụ dưới đây là dành cho Lighthouse—hướng dẫn cho các máy khách đồng thuận khác có sẵn trên [tài liệu Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# nhập các khóa của trình xác thực
lighthouse account validator import --directory=/home/ethereum/validator_keys

# đặt địa chỉ nhận phần thưởng
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# khởi động trình xác thực
sudo systemctl start lighthouse-validator
```

Xin chúc mừng, bạn hiện đã có một nút Ethereum và trình xác thực đầy đủ đang chạy trên Raspberry Pi!

## Chi tiết hơn {#more-details}

Trang này đã cung cấp một cái nhìn tổng quan về cách thiết lập một nút và trình xác thực Geth-Lighthouse bằng Raspberry Pi. Các hướng dẫn chi tiết hơn có sẵn trên [trang web Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Chúng tôi đánh giá cao phản hồi {#feedback-appreciated}

Chúng tôi biết Raspberry Pi có một lượng người dùng khổng lồ có thể có tác động rất tích cực đến sức khỏe của mạng Ethereum.
Vui lòng tìm hiểu chi tiết trong hướng dẫn này, thử chạy trên các mạng thử nghiệm, xem GitHub của Ethereum on Arm, đưa ra phản hồi, nêu các vấn đề và yêu cầu kéo, và giúp cải tiến công nghệ và tài liệu!

## Tài liệu tham khảo {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
