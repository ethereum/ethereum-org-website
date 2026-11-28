---
title: "Chạy một nút Ethereum trên Raspberry Pi 5"
description: "Flash Raspberry Pi 5 của bạn, cắm cáp ethernet, kết nối ổ đĩa NVMe và bật nguồn thiết bị để biến Raspberry Pi 5 thành một nút Ethereum đầy đủ + trình xác thực"
author: "EthereumOnArm"
tags: ["ứng dụng khách", "lớp thực thi", "lớp đồng thuận", "nút"]
lang: vi
skill: intermediate
breadcrumb: "Nút Rasp Pi"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm là một image Linux tùy chỉnh có thể biến Raspberry Pi thành một nút Ethereum.**

Để sử dụng Ethereum on Arm nhằm biến Raspberry Pi thành một nút Ethereum, phần cứng sau đây được khuyến nghị:

- Raspberry Pi 5 với 16 GB RAM
- Một NVMe HAT cho Raspberry Pi 5, để kết nối ổ đĩa NVMe
- NVMe SSD (M.2 2280), tối thiểu 4 TB. Tránh các ổ đĩa có bộ điều khiển Phison, vốn có các vấn đề tương thích đã biết.
- Thẻ MicroSD (tối thiểu 16 GB Class 10)
- Nguồn điện
- Cáp Ethernet
- Chuyển tiếp cổng (xem các ứng dụng khách để biết thêm thông tin)
- Một vỏ máy có tản nhiệt
- Bàn phím USB, Màn hình và cáp HDMI (micro-HDMI) (Tùy chọn)

Ethereum on Arm cũng hỗ trợ các bo mạch ARM khác, chẳng hạn như NanoPC T6, Rock 5B và Orange Pi 5 Plus. Các bo mạch này có hỗ trợ NVMe gốc, vì vậy nhóm Ethereum on Arm khuyến nghị chúng thay vì Raspberry Pi 5 nếu bạn đang mua phần cứng mới. Xem [danh sách phần cứng được khuyến nghị](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) để biết chi tiết. Phần còn lại của hướng dẫn này giống nhau đối với tất cả các bo mạch được hỗ trợ, ngoại trừ tệp image bạn tải xuống.

## Tại sao nên chạy Ethereum trên ARM? {#why-run-ethereum-on-arm}

Bo mạch ARM là những máy tính nhỏ gọn, linh hoạt và rất phải chăng. Chúng là những lựa chọn tốt để chạy các nút Ethereum vì có thể mua với giá rẻ, được cấu hình để toàn bộ tài nguyên chỉ tập trung vào nút, giúp chúng hoạt động hiệu quả, tiêu thụ ít điện năng và có kích thước vật lý nhỏ gọn nên có thể đặt gọn gàng trong bất kỳ ngôi nhà nào. Việc khởi chạy các nút cũng rất dễ dàng vì thẻ MicroSD của Raspberry Pi có thể được flash đơn giản bằng một image dựng sẵn, không cần tải xuống hay xây dựng phần mềm.

## Nó hoạt động như thế nào? {#how-does-it-work}

Thẻ nhớ của Raspberry Pi được flash bằng một image dựng sẵn. Image này chứa mọi thứ cần thiết để chạy một nút Ethereum. Với một thẻ đã được flash, tất cả những gì người dùng cần làm là bật nguồn Raspberry Pi. Tất cả các quy trình cần thiết để chạy nút sẽ tự động được bắt đầu. Điều này hoạt động vì thẻ nhớ chứa một hệ điều hành (OS) dựa trên Linux, trên đó các quy trình cấp hệ thống được tự động chạy để biến thiết bị thành một nút Ethereum.

Các image Ethereum on Arm dựa trên bản phân phối Linux 64-bit được tối ưu hóa để chạy một nút Ethereum và chúng bao gồm các ứng dụng khách Ethereum dựng sẵn.

**Các image sẽ lo tất cả các bước cần thiết**, từ việc thiết lập môi trường và định dạng ổ đĩa NVMe đến việc cài đặt phần mềm Ethereum.

## Lưu ý về máy khách thực thi và ứng dụng khách đồng thuận {#note-on-execution-and-consensus-clients}

Image Ethereum on Arm bao gồm các máy khách thực thi và ứng dụng khách đồng thuận dựng sẵn dưới dạng các dịch vụ. Một nút Ethereum yêu cầu cả hai ứng dụng khách phải được đồng bộ hóa và đang chạy. Bạn chỉ cần tải xuống và flash image, sau đó bắt đầu các dịch vụ. Image được tải sẵn một số máy khách thực thi (chẳng hạn như Geth, Nethermind, Besu, Erigon và Reth) và ứng dụng khách đồng thuận (chẳng hạn như Lighthouse, Prysm, Teku, Nimbus và Lodestar). Xem [tài liệu Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) để biết danh sách hiện tại.

Bạn nên chọn một trong mỗi loại để chạy - tất cả các máy khách thực thi đều tương thích với tất cả các ứng dụng khách đồng thuận. Hướng dẫn này sử dụng Geth và Lighthouse.

## Tải xuống Image {#downloading-the-image}

Image Ethereum on Arm là một image "cắm và chạy" tự động cài đặt và thiết lập cả máy khách thực thi và ứng dụng khách đồng thuận, cấu hình chúng để giao tiếp với nhau và kết nối với mạng lưới Ethereum. Tất cả những gì người dùng cần làm là bắt đầu các quy trình của chúng bằng một lệnh đơn giản.

Tải xuống image mới nhất cho bo mạch của bạn từ [trang tải xuống Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). Trang tải xuống cũng liệt kê tổng kiểm tra SHA-256 của mỗi image. Xác minh tệp đã tải xuống với nó:

```sh
# Từ thư mục chứa image đã tải xuống
sha256sum ethonarm_rpi5_<version>.img.zip
# So sánh kết quả đầu ra với checksum trên trang tải xuống
```

## Flash MicroSD {#flashing-the-microsd}

Thẻ MicroSD sẽ được sử dụng cho Raspberry Pi trước tiên nên được cắm vào máy tính để bàn hoặc máy tính xách tay để có thể flash. Sau đó, các lệnh terminal sau sẽ flash image đã tải xuống vào thẻ SD:

```shell
# kiểm tra tên thẻ MicroSD
sudo fdisk -l

>> sdxxx
```

Việc nhập đúng tên là rất quan trọng vì lệnh tiếp theo bao gồm `dd` sẽ xóa hoàn toàn nội dung hiện có của thẻ trước khi đẩy image vào đó. Để tiếp tục, hãy điều hướng đến thư mục chứa image đã nén:

```shell
# giải nén và flash image
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Thẻ hiện đã được flash, vì vậy nó có thể được cắm vào Raspberry Pi.

## Bắt đầu nút {#start-the-node}

Với thẻ SD đã được cắm vào Raspberry Pi, hãy kết nối cáp ethernet và ổ đĩa NVMe sau đó bật nguồn. Hệ điều hành sẽ khởi động và tự động bắt đầu thực hiện các tác vụ được cấu hình sẵn để biến Raspberry Pi thành một nút Ethereum, bao gồm định dạng ổ đĩa NVMe và cài đặt phần mềm ứng dụng khách. Quá trình này có thể sẽ mất 10-15 phút và bo mạch sẽ tự động khởi động lại khi hoàn tất. Không làm gián đoạn nguồn điện trong thời gian này.

Khi mọi thứ đã được cài đặt và cấu hình, hãy đăng nhập vào thiết bị thông qua kết nối ssh hoặc sử dụng terminal trực tiếp nếu màn hình và bàn phím được gắn vào bo mạch. Sử dụng tài khoản `ethereum` để đăng nhập, vì tài khoản này có các quyền cần thiết để bắt đầu nút.

```shell
User: ethereum
Password: ethereum
```

Bạn sẽ được yêu cầu thay đổi mật khẩu mặc định trong lần đăng nhập đầu tiên. Hãy làm điều đó, vì bất kỳ ai có thể tiếp cận nút của bạn đều có thể đăng nhập bằng mật khẩu mặc định. Tường lửa hệ thống bị vô hiệu hóa theo mặc định, vì vậy nếu nút của bạn có địa chỉ IP công cộng, hãy xem [hướng dẫn bảo mật Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) để kích hoạt nó.

Bắt đầu ứng dụng khách đồng thuận trước. Mở cổng 9000 (TCP và UDP) trên bộ định tuyến của bạn để Lighthouse có thể tìm và kết nối với các peer. Sau đó kích hoạt và bắt đầu dịch vụ lighthouse, để nó cũng khởi động lại sau khi khởi động lại máy:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Kiểm tra ứng dụng khách bằng cách sử dụng nhật ký:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Tiếp theo, bắt đầu máy khách thực thi. Mở cổng 30303 (TCP và UDP) trên bộ định tuyến của bạn để Geth có thể tìm và kết nối với các peer. Sau đó kích hoạt và bắt đầu dịch vụ geth:

```sh
sudo systemctl enable --now geth
```

Bạn có thể xác nhận nó đang chạy bằng cách kiểm tra nhật ký:

```sh
sudo journalctl -u geth -f
```

Lưu ý rằng ứng dụng khách đồng thuận sẽ đồng bộ hóa trong vài phút vì nó sử dụng đồng bộ hóa điểm kiểm tra. Máy khách thực thi sẽ mất nhiều thời gian hơn - có thể vài giờ. Cả hai ứng dụng khách chạy cùng một lúc: ứng dụng khách đồng thuận cho máy khách thực thi biết khối nào là phần đầu của chuỗi và máy khách thực thi tải xuống và xác minh các khối cho đến khối đó.

Với các dịch vụ Geth và Lighthouse đang chạy và được đồng bộ hóa, Raspberry Pi của bạn hiện là một nút Ethereum! Cách phổ biến nhất là tương tác với mạng lưới Ethereum bằng bảng điều khiển JavaScript của Geth, có thể được gắn vào ứng dụng khách Geth trên cổng 8545. Cũng có thể gửi các lệnh được định dạng dưới dạng đối tượng JSON bằng công cụ yêu cầu như Curl. Xem thêm trong [tài liệu Geth](https://geth.ethereum.org/).

Image cũng bao gồm một bảng điều khiển Grafana mà những người dùng nâng cao hơn có thể sử dụng để theo dõi tình trạng nút của họ, bằng cách điều hướng đến `ipaddress:3000` trong trình duyệt.

## Trình xác thực {#validators}

Một trình xác thực cũng có thể được thêm tùy chọn vào ứng dụng khách đồng thuận. Phần mềm trình xác thực cho phép nút của bạn tham gia tích cực vào sự đồng thuận và cung cấp cho mạng lưới bảo mật kinh tế tiền điện tử. Bạn nhận được phần thưởng cho công việc này bằng ETH. Để chạy một trình xác thực, trước tiên bạn phải có 32 ETH, số tiền này phải được gửi vào hợp đồng tiền gửi. Khoản tiền gửi có thể được thực hiện bằng cách làm theo hướng dẫn từng bước trên [Launchpad](https://launchpad.ethereum.org/). Thực hiện việc này trên máy tính để bàn/máy tính xách tay, nhưng không tạo khóa — việc này có thể được thực hiện trực tiếp trên Raspberry Pi.

Công cụ [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) tạo các khóa trình xác thực. Các image hiện tại đã bao gồm nó; nếu bạn đang chạy một image cũ hơn, hãy cài đặt nó trước. Sau đó tạo các khóa tiền gửi, thay thế `<YOUR_ETH_ADDRESS>` bằng địa chỉ sẽ nhận các khoản rút tiền của bạn:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Hoặc tải xuống [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) để chạy trên một máy tính cách ly mạng (airgapped) và chạy lệnh `deposit new-mnemonic` ở đó)

Hãy giữ cụm từ ghi nhớ an toàn! Lệnh trên đã tạo hai tệp trong thư mục `validator_keys`: các khóa trình xác thực và một tệp dữ liệu tiền gửi. Dữ liệu tiền gửi cần được tải lên launchpad, vì vậy nó phải được sao chép từ Raspberry Pi sang máy tính để bàn/máy tính xách tay. Việc này có thể được thực hiện bằng kết nối ssh hoặc bất kỳ phương pháp sao chép/dán nào khác.

Khi tệp dữ liệu tiền gửi có sẵn trên máy tính đang chạy launchpad, nó có thể được kéo và thả vào `+` trên màn hình launchpad. Làm theo các hướng dẫn trên màn hình để gửi một giao dịch đến hợp đồng tiền gửi.

Quay lại Raspberry Pi, một trình xác thực có thể được bắt đầu. Điều này yêu cầu nhập các khóa trình xác thực, thiết lập địa chỉ để thu thập phần thưởng và sau đó bắt đầu quy trình trình xác thực được cấu hình sẵn. Ví dụ dưới đây là dành cho Lighthouse—hướng dẫn cho các ứng dụng khách đồng thuận khác có sẵn trên [tài liệu Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# nhập các khóa của trình xác thực
lighthouse account validator import --directory=/home/ethereum/validator_keys

# thiết lập Địa chỉ nhận phần thưởng (thay thế <YOUR_ETH_ADDRESS> bằng Địa chỉ của bạn)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# khởi động trình xác thực
sudo systemctl enable --now lighthouse-validator
```

Xin chúc mừng, bạn hiện có một nút Ethereum đầy đủ và trình xác thực đang chạy trên Raspberry Pi!

## Thêm chi tiết {#more-details}

Trang này đã cung cấp một cái nhìn tổng quan về cách thiết lập một nút Geth-Lighthouse và trình xác thực bằng Raspberry Pi. Các hướng dẫn chi tiết hơn có sẵn trên [trang web Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Rất trân trọng phản hồi {#feedback-appreciated}

Chúng tôi biết Raspberry Pi có một cơ sở người dùng khổng lồ có thể có tác động rất tích cực đến tình trạng của mạng lưới Ethereum.
Vui lòng tìm hiểu sâu các chi tiết trong hướng dẫn này, thử chạy trên các mạng thử nghiệm, xem [GitHub của Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), đưa ra phản hồi, nêu vấn đề và tạo các yêu cầu kéo (pull request) để giúp thúc đẩy công nghệ và tài liệu!

## Tài liệu tham khảo {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
