---
title: Chạy một nút Ethereum trên Raspberry Pi 4
description: Flash Raspberry Pi 4 của bạn, cắm cáp ethernet, kết nối ổ đĩa SSD và bật nguồn thiết bị để biến Raspberry Pi 4 thành một nút Ethereum đầy đủ + trình xác thực
author: "EthereumOnArm"
tags: ["ứng dụng khách", "lớp thực thi", "lớp đồng thuận", "nút"]
lang: vi
skill: intermediate
breadcrumb: Nút Rasp Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm là một image Linux tùy chỉnh có thể biến một Raspberry Pi thành một nút Ethereum.**

Để sử dụng Ethereum on Arm nhằm biến một Raspberry Pi thành một nút Ethereum, phần cứng sau đây được khuyến nghị:

- Bo mạch Raspberry 4 (model B 8GB), Odroid M1 hoặc Rock 5B (RAM 8GB/16GB)
- Thẻ MicroSD (tối thiểu 16 GB Class 10)
- Ổ đĩa USB 3.0 SSD tối thiểu 2 TB hoặc SSD có vỏ chuyển đổi USB sang SATA.
- Nguồn điện
- Cáp ethernet
- Chuyển tiếp cổng (xem các ứng dụng khách để biết thêm thông tin)
- Vỏ máy có tản nhiệt và quạt
- Bàn phím USB, Màn hình và cáp HDMI (micro-HDMI) (Tùy chọn)

## Tại sao nên chạy Ethereum trên ARM? {#why-run-ethereum-on-arm}

Bo mạch ARM là những máy tính nhỏ gọn, linh hoạt và rất phải chăng. Chúng là những lựa chọn tốt để chạy các nút Ethereum vì có thể mua với giá rẻ, được cấu hình để toàn bộ tài nguyên chỉ tập trung vào nút, giúp chúng hoạt động hiệu quả, tiêu thụ ít điện năng và có kích thước vật lý nhỏ gọn nên có thể đặt gọn gàng trong bất kỳ ngôi nhà nào. Việc khởi chạy các nút cũng rất dễ dàng vì thẻ MicroSD của Raspberry Pi có thể được flash đơn giản bằng một image dựng sẵn, không cần tải xuống hay xây dựng phần mềm.

## Nó hoạt động như thế nào? {#how-does-it-work}

Thẻ nhớ của Raspberry Pi được flash bằng một image dựng sẵn. Image này chứa mọi thứ cần thiết để chạy một nút Ethereum. Với một thẻ đã được flash, tất cả những gì người dùng cần làm là bật nguồn Raspberry Pi. Tất cả các quy trình cần thiết để chạy nút sẽ tự động bắt đầu. Điều này hoạt động vì thẻ nhớ chứa một hệ điều hành (OS) dựa trên Linux, trên đó các quy trình cấp hệ thống được tự động chạy để biến thiết bị thành một nút Ethereum.

Ethereum không thể chạy bằng hệ điều hành Linux phổ biến của Raspberry Pi là "Raspbian" vì Raspbian vẫn sử dụng kiến trúc 32-bit, điều này dẫn đến việc người dùng Ethereum gặp phải các vấn đề về bộ nhớ và các ứng dụng khách đồng thuận không hỗ trợ các tệp nhị phân 32-bit. Để khắc phục điều này, nhóm Ethereum on Arm đã chuyển sang một hệ điều hành 64-bit gốc có tên là "Armbian".

**Các image sẽ lo liệu tất cả các bước cần thiết**, từ việc thiết lập môi trường và định dạng ổ đĩa SSD đến việc cài đặt và chạy phần mềm Ethereum cũng như bắt đầu quá trình đồng bộ hóa chuỗi khối.

## Lưu ý về máy khách thực thi và ứng dụng khách đồng thuận {#note-on-execution-and-consensus-clients}

Image Ethereum on Arm bao gồm các máy khách thực thi và ứng dụng khách đồng thuận được dựng sẵn dưới dạng các dịch vụ. Một nút Ethereum yêu cầu cả hai máy khách/ứng dụng khách này phải được đồng bộ hóa và đang chạy. Bạn chỉ cần tải xuống và flash image, sau đó khởi động các dịch vụ. Image được tải sẵn các máy khách thực thi sau:

- Geth
- Nethermind
- Besu

và các ứng dụng khách đồng thuận sau:

- Lighthouse
- Nimbus
- Prysm
- Teku

Bạn nên chọn một trong mỗi loại để chạy - tất cả các máy khách thực thi đều tương thích với tất cả các ứng dụng khách đồng thuận. Nếu bạn không chọn rõ ràng một máy khách/ứng dụng khách nào, nút sẽ quay về mặc định - Geth và Lighthouse - và tự động chạy chúng khi bo mạch được bật nguồn. Bạn phải mở cổng 30303 trên bộ định tuyến của mình để Geth có thể tìm và kết nối với các máy ngang hàng.

## Tải xuống Image {#downloading-the-image}

Image Ethereum cho Raspberry Pi 4 là một image "cắm và chạy" tự động cài đặt và thiết lập cả máy khách thực thi và ứng dụng khách đồng thuận, cấu hình chúng để giao tiếp với nhau và kết nối với mạng lưới Ethereum. Tất cả những gì người dùng cần làm là bắt đầu các quy trình của chúng bằng một lệnh đơn giản.

Tải xuống image Raspberry Pi từ [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) và xác minh mã băm SHA-256:

```sh
# Từ thư mục chứa tệp ảnh đã tải xuống
shasum -a 256 ethonarm_22.04.00.img.zip
# Mã băm sẽ xuất ra: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Lưu ý rằng các image cho bo mạch Rock 5B và Odroid M1 có sẵn tại [trang tải xuống](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) của Ethereum-on-Arm.

## Flash thẻ MicroSD {#flashing-the-microsd}

Thẻ MicroSD sẽ được sử dụng cho Raspberry Pi trước tiên nên được cắm vào máy tính để bàn hoặc máy tính xách tay để có thể flash. Sau đó, các lệnh terminal sau sẽ flash image đã tải xuống vào thẻ SD:

```shell
# kiểm tra tên thẻ MicroSD
sudo fdisk -l

>> sdxxx
```

Việc nhập đúng tên là rất quan trọng vì lệnh tiếp theo bao gồm `dd` sẽ xóa hoàn toàn nội dung hiện có của thẻ trước khi đẩy image vào đó. Để tiếp tục, hãy điều hướng đến thư mục chứa image đã nén:

```shell
# giải nén và ghi tệp ảnh
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Thẻ hiện đã được flash, vì vậy nó có thể được cắm vào Raspberry Pi.

## Khởi động nút {#start-the-node}

Với thẻ SD đã được cắm vào Raspberry Pi, hãy kết nối cáp ethernet và SSD rồi bật nguồn. Hệ điều hành sẽ khởi động và tự động bắt đầu thực hiện các tác vụ đã được cấu hình sẵn để biến Raspberry Pi thành một nút Ethereum, bao gồm cài đặt và xây dựng phần mềm máy khách. Quá trình này có thể sẽ mất 10-15 phút.

Khi mọi thứ đã được cài đặt và cấu hình, hãy đăng nhập vào thiết bị thông qua kết nối ssh hoặc sử dụng trực tiếp terminal nếu có màn hình và bàn phím được gắn vào bo mạch. Sử dụng tài khoản `ethereum` để đăng nhập, vì tài khoản này có các quyền cần thiết để khởi động nút.

```shell
User: ethereum
Password: ethereum
```

Máy khách thực thi mặc định, Geth, sẽ tự động khởi động. Bạn có thể xác nhận điều này bằng cách kiểm tra nhật ký bằng lệnh terminal sau:

```sh
sudo journalctl -u geth -f
```

Ứng dụng khách đồng thuận cần phải được khởi động một cách rõ ràng. Để làm điều này, trước tiên hãy mở cổng 9000 trên bộ định tuyến của bạn để Lighthouse có thể tìm và kết nối với các máy ngang hàng. Sau đó kích hoạt và khởi động dịch vụ lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Kiểm tra ứng dụng khách bằng cách sử dụng nhật ký:

```sh
sudo journalctl -u lighthouse-beacon
```

Lưu ý rằng ứng dụng khách đồng thuận sẽ đồng bộ hóa trong vài phút vì nó sử dụng đồng bộ hóa điểm kiểm tra. Máy khách thực thi sẽ mất nhiều thời gian hơn - có thể lên đến vài giờ, và nó sẽ không bắt đầu cho đến khi ứng dụng khách đồng thuận đã hoàn tất việc đồng bộ hóa (điều này là do máy khách thực thi cần một mục tiêu để đồng bộ hóa, mà ứng dụng khách đồng thuận đã đồng bộ hóa sẽ cung cấp).

Với các dịch vụ Geth và Lighthouse đang chạy và đã được đồng bộ hóa, Raspberry Pi của bạn hiện là một nút Ethereum! Cách phổ biến nhất để tương tác với mạng lưới Ethereum là sử dụng bảng điều khiển JavaScript của Geth, có thể được gắn vào máy khách Geth trên cổng 8545. Bạn cũng có thể gửi các lệnh được định dạng dưới dạng đối tượng JSON bằng cách sử dụng một công cụ yêu cầu như Curl. Xem thêm trong [tài liệu Geth](https://geth.ethereum.org/).

Geth được cấu hình sẵn để báo cáo các số liệu tới bảng điều khiển Grafana có thể xem được trên trình duyệt. Những người dùng nâng cao hơn có thể muốn sử dụng tính năng này để theo dõi tình trạng nút của họ bằng cách điều hướng đến `ipaddress:3000`, truyền `user: admin` và `passwd: ethereum`.

## Trình xác thực {#validators}

Một trình xác thực cũng có thể được thêm tùy chọn vào ứng dụng khách đồng thuận. Phần mềm trình xác thực cho phép nút của bạn tham gia tích cực vào sự đồng thuận và cung cấp cho mạng lưới tính bảo mật kinh tế mật mã. Bạn sẽ được thưởng cho công việc này bằng ETH. Để chạy một trình xác thực, trước tiên bạn phải có 32 ETH, số tiền này phải được gửi vào hợp đồng tiền gửi. Việc gửi tiền có thể được thực hiện bằng cách làm theo hướng dẫn từng bước trên [Launchpad](https://launchpad.ethereum.org/). Hãy thực hiện việc này trên máy tính để bàn/máy tính xách tay, nhưng đừng tạo khóa — việc này có thể được thực hiện trực tiếp trên Raspberry Pi.

Mở một terminal trên Raspberry Pi và chạy lệnh sau để tạo các khóa tiền gửi:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Hoặc tải xuống [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) để chạy trên một máy tính cách ly mạng, và chạy lệnh `deposit new-mnemnonic`)

Hãy giữ cụm từ ghi nhớ an toàn! Lệnh trên đã tạo ra hai tệp trong kho khóa của nút: các khóa trình xác thực và một tệp dữ liệu tiền gửi. Dữ liệu tiền gửi cần được tải lên launchpad, vì vậy nó phải được sao chép từ Raspberry Pi sang máy tính để bàn/máy tính xách tay. Việc này có thể được thực hiện bằng kết nối ssh hoặc bất kỳ phương pháp sao chép/dán nào khác.

Khi tệp dữ liệu tiền gửi đã có sẵn trên máy tính đang chạy launchpad, nó có thể được kéo và thả vào `+` trên màn hình launchpad. Làm theo các hướng dẫn trên màn hình để gửi một giao dịch đến hợp đồng tiền gửi.

Quay lại Raspberry Pi, một trình xác thực có thể được khởi động. Điều này yêu cầu nhập các khóa trình xác thực, thiết lập địa chỉ để thu thập phần thưởng, và sau đó khởi động quy trình trình xác thực đã được cấu hình sẵn. Ví dụ dưới đây là dành cho Lighthouse—hướng dẫn cho các ứng dụng khách đồng thuận khác có sẵn trên [tài liệu Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# nhập khóa trình xác thực
lighthouse account validator import --directory=/home/ethereum/validator_keys

# đặt Địa chỉ phần thưởng
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# khởi động trình xác thực
sudo systemctl start lighthouse-validator
```

Xin chúc mừng, bạn hiện đã có một nút Ethereum đầy đủ và trình xác thực đang chạy trên một Raspberry Pi!

## Thêm chi tiết {#more-details}

Trang này đã cung cấp một cái nhìn tổng quan về cách thiết lập một nút Geth-Lighthouse và trình xác thực bằng Raspberry Pi. Các hướng dẫn chi tiết hơn có sẵn trên [trang web Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Rất mong nhận được phản hồi {#feedback-appreciated}

Chúng tôi biết Raspberry Pi có một cơ sở người dùng khổng lồ có thể tác động rất tích cực đến tình trạng của mạng lưới Ethereum.
Vui lòng tìm hiểu sâu các chi tiết trong hướng dẫn này, thử chạy trên các mạng thử nghiệm, kiểm tra GitHub của Ethereum on Arm, đưa ra phản hồi, nêu vấn đề và tạo yêu cầu kéo để giúp thúc đẩy công nghệ và tài liệu!

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org