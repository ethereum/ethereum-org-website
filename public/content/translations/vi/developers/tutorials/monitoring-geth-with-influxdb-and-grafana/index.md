---
title: "Giám sát Geth bằng InfluxDB và Grafana"
description: "Thiết lập giám sát cho nút Geth của bạn bằng InfluxDB và Grafana để theo dõi hiệu suất và xác định các sự cố."
author: "Mario Havel"
tags: ["máy khách", "nút"]
skill: intermediate
breadcrumb: "Giám sát Geth"
lang: vi
published: 2021-01-13
---

Hướng dẫn này sẽ giúp bạn thiết lập giám sát cho nút Geth của mình để bạn có thể hiểu rõ hơn về hiệu suất của nó và xác định các vấn đề tiềm ẩn.

## Điều kiện tiên quyết {#prerequisites}

- Bạn đã phải đang chạy một phiên bản của Geth.
- Hầu hết các bước và ví dụ đều dành cho môi trường Linux, kiến thức cơ bản về terminal sẽ rất hữu ích.
- Xem video tổng quan này về bộ số liệu của Geth: [Giám sát cơ sở hạ tầng Ethereum của Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Ngăn xếp giám sát {#monitoring-stack}

Một máy khách Ethereum thu thập rất nhiều dữ liệu có thể được đọc dưới dạng cơ sở dữ liệu theo trình tự thời gian. Để giúp việc giám sát dễ dàng hơn, bạn có thể đưa dữ liệu này vào phần mềm trực quan hóa dữ liệu. Có nhiều tùy chọn có sẵn:

- [Prometheus](https://prometheus.io/) (mô hình pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (mô hình push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ngoài ra còn có [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), một tùy chọn được cấu hình sẵn với InfluxDB và Grafana.

Trong hướng dẫn này, chúng ta sẽ thiết lập máy khách Geth của bạn để đẩy dữ liệu đến InfluxDB nhằm tạo cơ sở dữ liệu và Grafana để tạo trực quan hóa biểu đồ của dữ liệu. Việc thực hiện thủ công sẽ giúp bạn hiểu rõ hơn về quy trình, thay đổi nó và triển khai trong các môi trường khác nhau.

## Thiết lập InfluxDB {#setting-up-influxdb}

Đầu tiên, hãy tải xuống và cài đặt InfluxDB. Bạn có thể tìm thấy nhiều tùy chọn tải xuống tại [trang phát hành Influxdata](https://portal.influxdata.com/downloads/). Hãy chọn tùy chọn phù hợp với môi trường của bạn.
Bạn cũng có thể cài đặt nó từ một [kho lưu trữ (repository)](https://repos.influxdata.com/). Ví dụ trong bản phân phối dựa trên Debian:

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

Sau khi cài đặt thành công InfluxDB, hãy đảm bảo nó đang chạy ở chế độ nền. Theo mặc định, nó có thể truy cập được tại `localhost:8086`.
Trước khi sử dụng máy khách `influx`, bạn phải tạo người dùng mới với quyền quản trị viên (admin). Người dùng này sẽ phục vụ cho việc quản lý cấp cao, tạo cơ sở dữ liệu và người dùng.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Bây giờ bạn có thể sử dụng máy khách influx để truy cập [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) bằng người dùng này.

```
influx -username 'username' -password 'password'
```

Giao tiếp trực tiếp với InfluxDB trong shell của nó, bạn có thể tạo cơ sở dữ liệu và người dùng cho các số liệu của geth.

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

InfluxDB đang chạy và được cấu hình để lưu trữ các số liệu từ Geth.

## Chuẩn bị Geth {#preparing-geth}

Sau khi thiết lập cơ sở dữ liệu, chúng ta cần bật tính năng thu thập số liệu trong Geth. Hãy chú ý đến `METRICS AND STATS OPTIONS` trong `geth --help`. Có thể tìm thấy nhiều tùy chọn ở đó, trong trường hợp này chúng ta muốn Geth đẩy dữ liệu vào InfluxDB.
Thiết lập cơ bản chỉ định điểm cuối (endpoint) nơi có thể truy cập InfluxDB và xác thực cho cơ sở dữ liệu.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Các cờ này có thể được thêm vào lệnh khởi động máy khách hoặc được lưu vào tệp cấu hình.

Bạn có thể xác minh rằng Geth đang đẩy dữ liệu thành công, ví dụ bằng cách liệt kê các số liệu trong cơ sở dữ liệu. Trong InfluxDB shell:

```
use geth
show measurements
```

## Thiết lập Grafana {#setting-up-grafana}

Bước tiếp theo là cài đặt Grafana, công cụ này sẽ diễn giải dữ liệu bằng đồ họa. Làm theo quy trình cài đặt cho môi trường của bạn trong tài liệu của Grafana. Đảm bảo cài đặt phiên bản OSS nếu bạn không có ý định khác.
Ví dụ về các bước cài đặt cho các bản phân phối Debian sử dụng kho lưu trữ:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Khi bạn đã chạy Grafana, nó có thể truy cập được tại `localhost:3000`.
Sử dụng trình duyệt ưa thích của bạn để truy cập đường dẫn này, sau đó đăng nhập bằng thông tin xác thực mặc định (người dùng: `admin` và mật khẩu: `admin`). Khi được nhắc, hãy thay đổi mật khẩu mặc định và lưu lại.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Bạn sẽ được chuyển hướng đến trang chủ Grafana. Đầu tiên, hãy thiết lập dữ liệu nguồn của bạn. Nhấp vào biểu tượng cấu hình ở thanh bên trái và chọn "Data sources".

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Chưa có bất kỳ nguồn dữ liệu nào được tạo, hãy nhấp vào "Add data source" để xác định một nguồn.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Đối với thiết lập này, hãy chọn "InfluxDB" và tiếp tục.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Cấu hình nguồn dữ liệu khá đơn giản nếu bạn đang chạy các công cụ trên cùng một máy. Bạn cần thiết lập địa chỉ InfluxDB và thông tin chi tiết để truy cập cơ sở dữ liệu. Tham khảo hình ảnh bên dưới.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Nếu mọi thứ đã hoàn tất và có thể truy cập InfluxDB, hãy nhấp vào "Save and test" và đợi xác nhận bật lên.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana hiện đã được thiết lập để đọc dữ liệu từ InfluxDB. Bây giờ bạn cần tạo một bảng điều khiển (dashboard) để diễn giải và hiển thị dữ liệu đó. Các thuộc tính của bảng điều khiển được mã hóa trong các tệp JSON mà bất kỳ ai cũng có thể tạo và dễ dàng nhập vào. Trên thanh bên trái, nhấp vào "Create and Import".

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Đối với bảng điều khiển giám sát Geth, hãy sao chép ID của [bảng điều khiển này](https://grafana.com/grafana/dashboards/13877/) và dán vào "Import page" trong Grafana. Sau khi lưu bảng điều khiển, nó sẽ trông như thế này:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Bạn có thể sửa đổi các bảng điều khiển của mình. Mỗi bảng điều khiển có thể được chỉnh sửa, di chuyển, xóa hoặc thêm vào. Bạn có thể thay đổi cấu hình của mình. Tùy thuộc vào bạn! Để tìm hiểu thêm về cách hoạt động của bảng điều khiển, hãy tham khảo [tài liệu của Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Bạn cũng có thể quan tâm đến [Cảnh báo (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). Tính năng này cho phép bạn thiết lập thông báo cảnh báo khi các số liệu đạt đến các giá trị nhất định. Nhiều kênh giao tiếp khác nhau được hỗ trợ.