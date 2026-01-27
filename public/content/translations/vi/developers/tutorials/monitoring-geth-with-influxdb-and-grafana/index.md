---
title: Giám sát Geth bằng InfluxDB và Grafana
description: Thiết lập giám sát cho nút Geth của bạn bằng InfluxDB và Grafana để theo dõi hiệu suất và xác định các vấn đề.
author: "Mario Havel"
tags: [ "máy khách", "nút" ]
skill: intermediate
lang: vi
published: 2021-01-13
---

Hướng dẫn này sẽ giúp bạn thiết lập giám sát cho nút Geth của mình để bạn có thể hiểu rõ hơn về hiệu suất của nó và xác định các vấn đề tiềm ẩn.

## Điều kiện tiên quyết {#prerequisites}

- Bạn nên đang chạy một phiên bản Geth.
- Hầu hết các bước và ví dụ dành cho môi trường linux, kiến thức cơ bản về thiết bị đầu cuối sẽ hữu ích.
- Hãy xem tổng quan bằng video này về bộ chỉ số của Geth: [Giám sát cơ sở hạ tầng Ethereum của Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Ngăn xếp giám sát {#monitoring-stack}

Một máy khách Ethereum thu thập rất nhiều dữ liệu có thể được đọc dưới dạng cơ sở dữ liệu theo trình tự thời gian. Để giám sát dễ dàng hơn, bạn có thể cung cấp dữ liệu này vào phần mềm trực quan hóa dữ liệu. Có nhiều tùy chọn có sẵn:

- [Prometheus](https://prometheus.io/) (mô hình kéo)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (mô hình đẩy)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ngoài ra còn có [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), một tùy chọn được định cấu hình sẵn với InfluxDB và Grafana.

Trong hướng dẫn này, chúng ta sẽ thiết lập máy khách Geth của bạn để đẩy dữ liệu vào InfluxDB nhằm tạo cơ sở dữ liệu và Grafana để tạo hình ảnh trực quan hóa dữ liệu dưới dạng biểu đồ. Thực hiện theo cách thủ công sẽ giúp bạn hiểu rõ hơn về quy trình, thay đổi nó và triển khai trong các môi trường khác nhau.

## Thiết lập InfluxDB {#setting-up-influxdb}

Đầu tiên, hãy tải xuống và cài đặt InfluxDB. Có thể tìm thấy các tùy chọn tải xuống khác nhau tại [trang phát hành Influxdata](https://portal.influxdata.com/downloads/). Chọn cái phù hợp với môi trường của bạn.
Bạn cũng có thể cài đặt nó từ một [kho lưu trữ](https://repos.influxdata.com/). Ví dụ trong bản phân phối dựa trên Debian:

```
curl -tlsv1.3 --proto =https -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
sudo apt install influxdb-client
```

Sau khi cài đặt thành công InfluxDB, hãy đảm bảo rằng nó đang chạy ngầm. Theo mặc định, có thể truy cập tại `localhost:8086`.
Trước khi sử dụng máy khách `influx`, bạn phải tạo người dùng mới có đặc quyền quản trị. Người dùng này sẽ phục vụ cho việc quản lý cấp cao, tạo cơ sở dữ liệu và người dùng.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Bây giờ bạn có thể sử dụng máy khách influx để vào [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) với người dùng này.

```
influx -username 'username' -password 'password'
```

Giao tiếp trực tiếp với InfluxDB trong shell của nó, bạn có thể tạo cơ sở dữ liệu và người dùng cho các chỉ số của Geth.

```
create database geth
create user geth with password choosepassword
```

Xác minh các mục đã tạo bằng:

```
show databases
show users
```

Thoát khỏi InfluxDB shell.

```
exit
```

InfluxDB đang chạy và được định cấu hình để lưu trữ các chỉ số từ Geth.

## Chuẩn bị Geth {#preparing-geth}

Sau khi thiết lập cơ sở dữ liệu, chúng ta cần bật tính năng thu thập chỉ số trong Geth. Hãy chú ý đến `METRICS AND STATS OPTIONS` trong `geth --help`. Có thể tìm thấy nhiều tùy chọn ở đó, trong trường hợp này, chúng tôi muốn Geth đẩy dữ liệu vào InfluxDB.
Thiết lập cơ bản chỉ định điểm cuối nơi InfluxDB có thể truy cập được và xác thực cho cơ sở dữ liệu.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Cờ này có thể được nối vào một lệnh khởi động máy khách hoặc được lưu vào tệp cấu hình.

Bạn có thể xác minh rằng Geth đang đẩy dữ liệu thành công, ví dụ bằng cách liệt kê các chỉ số trong cơ sở dữ liệu. Trong InfluxDB shell:

```
use geth
show measurements
```

## Thiết lập Grafana {#setting-up-grafana}

Bước tiếp theo là cài đặt Grafana, phần mềm sẽ diễn giải dữ liệu một cách trực quan. Làm theo quy trình cài đặt cho môi trường của bạn trong tài liệu tham khảo của Grafana. Hãy đảm bảo cài đặt phiên bản OSS trừ khi bạn muốn khác đi.
Các bước cài đặt mẫu cho các bản phân phối Debian sử dụng kho lưu trữ:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Khi bạn đã chạy Grafana, nó sẽ có thể truy cập được tại `localhost:3000`.
Sử dụng trình duyệt ưa thích của bạn để truy cập đường dẫn này, sau đó đăng nhập bằng thông tin đăng nhập mặc định (người dùng: `admin` và mật khẩu: `admin`). Khi được nhắc, hãy thay đổi mật khẩu mặc định và lưu.

![](./grafana1.png)

Bạn sẽ được chuyển hướng đến trang chủ Grafana. Đầu tiên, hãy thiết lập dữ liệu nguồn của bạn. Nhấp vào biểu tượng cấu hình trong thanh bên trái và chọn "Nguồn dữ liệu".

![](./grafana2.png)

Chưa có nguồn dữ liệu nào được tạo, hãy nhấp vào "Thêm nguồn dữ liệu" để xác định một nguồn.

![](./grafana3.png)

Đối với thiết lập này, hãy chọn "InfluxDB" và tiếp tục.

![](./grafana4.png)

Cấu hình nguồn dữ liệu khá đơn giản nếu bạn đang chạy các công cụ trên cùng một máy. Bạn cần đặt địa chỉ InfluxDB và các chi tiết để truy cập cơ sở dữ liệu. Tham khảo hình bên dưới.

![](./grafana5.png)

Nếu mọi thứ đã hoàn tất và InfluxDB có thể truy cập được, hãy nhấp vào "Lưu và kiểm tra" và đợi xác nhận bật lên.

![](./grafana6.png)

Grafana hiện đã được thiết lập để đọc dữ liệu từ InfluxDB. Bây giờ bạn cần tạo một bảng điều khiển để diễn giải và hiển thị nó. Thuộc tính của bảng điều khiển được mã hóa trong các tệp JSON mà bất kỳ ai cũng có thể tạo và dễ dàng nhập. Trên thanh bên trái, nhấp vào "Tạo và Nhập".

![](./grafana7.png)

Đối với bảng điều khiển giám sát Geth, hãy sao chép ID của [bảng điều khiển này](https://grafana.com/grafana/dashboards/13877/) và dán vào "Trang nhập" trong Grafana. Sau khi lưu bảng điều khiển, nó sẽ trông như thế này:

![](./grafana8.png)

Bạn có thể sửa đổi bảng điều khiển của mình. Mỗi bảng có thể được chỉnh sửa, di chuyển, xóa hoặc thêm. Bạn có thể thay đổi cấu hình của mình. Tùy thuộc vào bạn! Để tìm hiểu thêm về cách hoạt động của bảng điều khiển, hãy tham khảo [tài liệu tham khảo của Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Bạn cũng có thể quan tâm đến [Cảnh báo](https://grafana.com/docs/grafana/latest/alerting/). Điều này cho phép bạn thiết lập thông báo cảnh báo khi các chỉ số đạt đến các giá trị nhất định. Nhiều kênh liên lạc được hỗ trợ.
