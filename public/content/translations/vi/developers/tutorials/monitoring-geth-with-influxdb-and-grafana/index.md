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
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Nếu bạn thích Prometheus hơn, Geth cũng có thể hiển thị các số liệu của nó ở định dạng Prometheus. Khởi động Geth với `--metrics --metrics.addr 127.0.0.1` và trỏ Prometheus tới `http://127.0.0.1:6060/debug/metrics/prometheus`.

Trong hướng dẫn này, chúng ta sẽ thiết lập máy khách Geth của bạn để đẩy dữ liệu đến InfluxDB nhằm tạo cơ sở dữ liệu và Grafana để tạo trực quan hóa dữ liệu bằng biểu đồ. Việc thực hiện thủ công sẽ giúp bạn hiểu rõ hơn về quy trình, thay đổi nó và triển khai trong các môi trường khác nhau.

## Thiết lập InfluxDB {#setting-up-influxdb}

Đầu tiên, hãy tải xuống và cài đặt InfluxDB. Hướng dẫn này sử dụng InfluxDB 1.x (OSS), mà Geth hỗ trợ với các cờ `--metrics.influxdb` bên dưới. Các phiên bản InfluxDB mới hơn sử dụng một thiết lập khác với các tổ chức, bucket và token thay vì cơ sở dữ liệu và người dùng. Geth hỗ trợ InfluxDB 2.x với các cờ `--metrics.influxdbv2`, nhưng các bước thiết lập trong hướng dẫn này chỉ áp dụng cho 1.x.

Làm theo [hướng dẫn cài đặt InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) cho môi trường của bạn. Ví dụ: trên Debian hoặc Ubuntu, bạn có thể cài đặt nó từ kho lưu trữ InfluxData. Kiểm tra hướng dẫn cài đặt để biết dấu vân tay khóa ký hiện tại trước khi tin cậy khóa:

```sh
curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
sudo mkdir -p /etc/apt/keyrings
gpg --dearmor < influxdata-archive.key | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdata.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
```

Gói `influxdb` bao gồm máy khách dòng lệnh `influx`.

Sau khi cài đặt thành công InfluxDB, hãy đảm bảo nó đang chạy ở chế độ nền. Theo mặc định, nó có thể truy cập được tại `localhost:8086`.
Trước khi sử dụng máy khách `influx`, bạn phải tạo người dùng mới với quyền quản trị viên. Người dùng này sẽ phục vụ cho việc quản lý cấp cao, tạo cơ sở dữ liệu và người dùng.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Bây giờ bạn có thể sử dụng máy khách influx để vào [InfluxDB shell](https://docs.influxdata.com/influxdb/v1/tools/shell/) với người dùng này.

```sh
influx -username 'username' -password 'password'
```

Giao tiếp trực tiếp với InfluxDB trong shell của nó, bạn có thể tạo cơ sở dữ liệu và người dùng cho các số liệu của geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Xác minh các mục đã tạo bằng:

```sql
show databases
show users
```

Rời khỏi InfluxDB shell.

```
exit
```

InfluxDB đang chạy và được cấu hình để lưu trữ các số liệu từ Geth.

## Chuẩn bị Geth {#preparing-geth}

Sau khi thiết lập cơ sở dữ liệu, chúng ta cần bật tính năng thu thập số liệu trong Geth. Chú ý đến `METRICS AND STATS OPTIONS` trong `geth --help`. Có thể tìm thấy nhiều tùy chọn ở đó, trong trường hợp này chúng ta muốn Geth đẩy dữ liệu vào InfluxDB.
Thiết lập cơ bản chỉ định endpoint nơi InfluxDB có thể truy cập được và xác thực cho cơ sở dữ liệu.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Sử dụng cùng một mật khẩu bạn đã đặt khi tạo người dùng `geth`. Các cờ này có thể được thêm vào lệnh khởi động máy khách hoặc được lưu vào tệp cấu hình.

Bạn có thể xác minh rằng Geth đang đẩy dữ liệu thành công, ví dụ bằng cách liệt kê các số liệu trong cơ sở dữ liệu. Trong InfluxDB shell:

```sql
use geth
show measurements
```

## Thiết lập Grafana {#setting-up-grafana}

Bước tiếp theo là cài đặt Grafana, công cụ này sẽ diễn giải dữ liệu bằng đồ họa. Làm theo [quy trình cài đặt cho môi trường của bạn](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) trong tài liệu của Grafana. Đảm bảo cài đặt phiên bản OSS trừ khi bạn cần thứ khác.
Các bước cài đặt ví dụ cho Debian hoặc Ubuntu sử dụng kho lưu trữ Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Khi bạn đã chạy Grafana, nó có thể truy cập được tại `localhost:3000`.
Sử dụng trình duyệt ưa thích của bạn để truy cập đường dẫn này, sau đó đăng nhập bằng thông tin xác thực mặc định (người dùng: `admin` và mật khẩu: `admin`). Khi được nhắc, hãy thay đổi mật khẩu mặc định và lưu lại.

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 1)](./grafana1.png)

Bạn sẽ được chuyển hướng đến trang chủ Grafana. Đầu tiên, hãy thiết lập dữ liệu nguồn của bạn. Mở menu và chọn **Connections > Data sources**. Các ảnh chụp màn hình trong hướng dẫn này là từ phiên bản cũ hơn của Grafana, vì vậy màn hình của bạn có thể trông hơi khác một chút.

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 2)](./grafana2.png)

Chưa có bất kỳ nguồn dữ liệu nào được tạo, hãy nhấp vào "Add data source" để xác định một nguồn.

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 3)](./grafana3.png)

Đối với thiết lập này, hãy chọn "InfluxDB" và tiếp tục.

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 4)](./grafana4.png)

Cấu hình nguồn dữ liệu khá đơn giản nếu bạn đang chạy các công cụ trên cùng một máy. Bạn cần đặt địa chỉ InfluxDB và thông tin chi tiết để truy cập cơ sở dữ liệu. Tham khảo hình ảnh bên dưới.

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 5)](./grafana5.png)

Nếu mọi thứ đã hoàn tất và InfluxDB có thể truy cập được, hãy nhấp vào "Save and test" và đợi xác nhận bật lên.

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 6)](./grafana6.png)

Grafana hiện đã được thiết lập để đọc dữ liệu từ InfluxDB. Bây giờ bạn cần tạo một bảng điều khiển sẽ diễn giải và hiển thị dữ liệu đó. Các thuộc tính của bảng điều khiển được mã hóa trong các tệp JSON có thể được tạo bởi bất kỳ ai và dễ dàng nhập vào. Mở menu và chọn **Dashboards**, sau đó nhấp vào **New > Import**.

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 7)](./grafana7.png)

Đối với bảng điều khiển giám sát Geth, hãy sao chép ID của [bảng điều khiển này](https://grafana.com/grafana/dashboards/13877/) và dán vào "Import page" trong Grafana. Sau khi lưu bảng điều khiển, nó sẽ trông như thế này:

![Ảnh chụp màn hình bảng điều khiển Grafana để giám sát Geth (bảng 8)](./grafana8.png)

Bạn có thể sửa đổi các bảng điều khiển của mình. Mỗi bảng có thể được chỉnh sửa, di chuyển, xóa hoặc thêm. Bạn có thể thay đổi cấu hình của mình. Tùy thuộc vào bạn! Để tìm hiểu thêm về cách hoạt động của bảng điều khiển, hãy tham khảo [tài liệu của Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Bạn cũng có thể quan tâm đến [Cảnh báo](https://grafana.com/docs/grafana/latest/alerting/). Điều này cho phép bạn thiết lập thông báo cảnh báo khi các số liệu đạt đến các giá trị nhất định. Nhiều kênh liên lạc khác nhau được hỗ trợ.
