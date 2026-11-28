---
title: "InfluxDB ve Grafana ile Geth'i İzleme"
description: "Performansı izlemek ve sorunları belirlemek için InfluxDB ve Grafana kullanarak Geth düğümünüz için izleme ayarlayın."
author: "Mario Havel"
tags: ["istemciler", "düğümler"]
skill: intermediate
breadcrumb: "Geth'i İzleme"
lang: tr
published: 2021-01-13
---

Bu eğitim, performansını daha iyi anlayabilmeniz ve olası sorunları belirleyebilmeniz için Geth düğümünüz için izleme ayarlamanıza yardımcı olacaktır.

## Ön Koşullar {#prerequisites}

- Zaten bir Geth örneği çalıştırıyor olmalısınız.
- Adımların ve örneklerin çoğu Linux ortamı içindir, temel terminal bilgisi faydalı olacaktır.
- Geth'in metrik paketine genel bir bakış sunan bu videoya göz atın: [Péter Szilágyi tarafından Ethereum altyapısını izleme](https://www.youtube.com/watch?v=cOBab8IJMYI).

## İzleme yığını {#monitoring-stack}

Bir Ethereum istemcisi, kronolojik bir veritabanı biçiminde okunabilen çok sayıda veri toplar. İzlemeyi kolaylaştırmak için bunu veri görselleştirme yazılımına aktarabilirsiniz. Birden fazla seçenek mevcuttur:

- [Prometheus](https://prometheus.io/) (çekme modeli)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (itme modeli)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Eğer Prometheus'u tercih ederseniz, Geth metriklerini Prometheus formatında da sunabilir. Geth'i `--metrics --metrics.addr 127.0.0.1` ile başlatın ve Prometheus'u `http://127.0.0.1:6060/debug/metrics/prometheus` adresine yönlendirin.

Bu eğitimde, bir veritabanı oluşturmak için verileri InfluxDB'ye ve verilerin grafik görselleştirmesini oluşturmak için Grafana'ya itecek şekilde Geth istemcinizi ayarlayacağız. Bunu manuel olarak yapmak, süreci daha iyi anlamanıza, değiştirmenize ve farklı ortamlarda dağıtmanıza yardımcı olacaktır.

## InfluxDB'yi ayarlama {#setting-up-influxdb}

İlk olarak, InfluxDB'yi indirip kuralım. Bu eğitim, Geth'in aşağıdaki `--metrics.influxdb` bayraklarıyla desteklediği InfluxDB 1.x (OSS) sürümünü kullanır. Daha yeni InfluxDB sürümleri, veritabanları ve kullanıcılar yerine organizasyonlar, bucket'lar ve token'lar ile farklı bir kurulum kullanır. Geth, InfluxDB 2.x'i `--metrics.influxdbv2` bayraklarıyla destekler, ancak bu eğitimdeki kurulum adımları yalnızca 1.x için geçerlidir.

Ortamınız için [InfluxDB 1.x kurulum talimatlarını](https://docs.influxdata.com/influxdb/v1/introduction/install/) izleyin. Örneğin, Debian veya Ubuntu'da InfluxData deposundan kurabilirsiniz. Anahtara güvenmeden önce mevcut imzalama anahtarı parmak izi için kurulum talimatlarını kontrol edin:

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

`influxdb` paketi, `influx` komut satırı istemcisini içerir.

InfluxDB'yi başarıyla kurduktan sonra, arka planda çalıştığından emin olun. Varsayılan olarak, `localhost:8086` adresinden ulaşılabilir.
`influx` istemcisini kullanmadan önce, yönetici ayrıcalıklarına sahip yeni bir kullanıcı oluşturmanız gerekir. Bu kullanıcı, veritabanları ve kullanıcılar oluşturmak gibi üst düzey yönetim için hizmet edecektir.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Artık bu kullanıcıyla [InfluxDB kabuğuna](https://docs.influxdata.com/influxdb/v1/tools/shell/) girmek için influx istemcisini kullanabilirsiniz.

```sh
influx -username 'username' -password 'password'
```

InfluxDB ile doğrudan kabuğunda iletişim kurarak, geth metrikleri için veritabanı ve kullanıcı oluşturabilirsiniz.

```sql
create database geth
create user geth with password '<geth-password>'
```

Oluşturulan girdileri şununla doğrulayın:

```sql
show databases
show users
```

InfluxDB kabuğundan çıkın.

```
exit
```

InfluxDB çalışıyor ve Geth'ten gelen metrikleri depolamak için yapılandırıldı.

## Geth'i hazırlama {#preparing-geth}

Veritabanını kurduktan sonra, Geth'te metrik toplamayı etkinleştirmemiz gerekiyor. `geth --help` içindeki `METRICS AND STATS OPTIONS` kısmına dikkat edin. Orada birden fazla seçenek bulunabilir, bu durumda Geth'in verileri InfluxDB'ye itmesini istiyoruz.
Temel kurulum, InfluxDB'nin ulaşılabileceği uç noktayı ve veritabanı için kimlik doğrulamayı belirtir.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

`geth` kullanıcısını oluştururken belirlediğiniz aynı parolayı kullanın. Bu bayraklar, istemciyi başlatan bir komuta eklenebilir veya yapılandırma dosyasına kaydedilebilir.

Örneğin veritabanındaki metrikleri listeleyerek Geth'in verileri başarıyla ittiğini doğrulayabilirsiniz. InfluxDB kabuğunda:

```sql
use geth
show measurements
```

## Grafana'yı ayarlama {#setting-up-grafana}

Sonraki adım, verileri grafiksel olarak yorumlayacak olan Grafana'yı kurmaktır. Grafana belgelerindeki [ortamınız için kurulum sürecini](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) izleyin. Başka bir şeye ihtiyacınız yoksa OSS sürümünü kurduğunuzdan emin olun.
Grafana deposunu kullanarak Debian veya Ubuntu için örnek kurulum adımları:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana'yı çalıştırdığınızda, `localhost:3000` adresinden ulaşılabilir olmalıdır.
Bu yola erişmek için tercih ettiğiniz tarayıcıyı kullanın, ardından varsayılan kimlik bilgileriyle (kullanıcı: `admin` ve parola: `admin`) giriş yapın. İstendiğinde, varsayılan parolayı değiştirin ve kaydedin.

![Geth izleme için Grafana panosu ekran görüntüsü (panel 1)](./grafana1.png)

Grafana ana sayfasına yönlendirileceksiniz. İlk olarak, kaynak verilerinizi ayarlayın. Menüyü açın ve **Connections > Data sources** seçeneğini seçin. Bu eğitimdeki ekran görüntüleri Grafana'nın daha eski bir sürümüne aittir, bu nedenle ekranlarınız biraz farklı görünebilir.

![Geth izleme için Grafana panosu ekran görüntüsü (panel 2)](./grafana2.png)

Henüz oluşturulmuş herhangi bir veri kaynağı yok, bir tane tanımlamak için "Add data source" seçeneğine tıklayın.

![Geth izleme için Grafana panosu ekran görüntüsü (panel 3)](./grafana3.png)

Bu kurulum için "InfluxDB"yi seçin ve devam edin.

![Geth izleme için Grafana panosu ekran görüntüsü (panel 4)](./grafana4.png)

Araçları aynı makinede çalıştırıyorsanız veri kaynağı yapılandırması oldukça basittir. InfluxDB adresini ve veritabanına erişim ayrıntılarını ayarlamanız gerekir. Aşağıdaki resme bakın.

![Geth izleme için Grafana panosu ekran görüntüsü (panel 5)](./grafana5.png)

Her şey tamamsa ve InfluxDB'ye ulaşılabiliyorsa, "Save and test" seçeneğine tıklayın ve onayın açılmasını bekleyin.

![Geth izleme için Grafana panosu ekran görüntüsü (panel 6)](./grafana6.png)

Grafana artık InfluxDB'den veri okumak için ayarlandı. Şimdi bunu yorumlayacak ve görüntüleyecek bir pano oluşturmanız gerekiyor. Pano özellikleri, herkes tarafından oluşturulabilen ve kolayca içe aktarılabilen JSON dosyalarında kodlanmıştır. Menüyü açın ve **Dashboards** seçeneğini seçin, ardından **New > Import** seçeneğine tıklayın.

![Geth izleme için Grafana panosu ekran görüntüsü (panel 7)](./grafana7.png)

Bir Geth izleme panosu için, [bu panonun](https://grafana.com/grafana/dashboards/13877/) kimliğini kopyalayın ve Grafana'daki "Import" sayfasına yapıştırın. Panoyu kaydettikten sonra şöyle görünmelidir:

![Geth izleme için Grafana panosu ekran görüntüsü (panel 8)](./grafana8.png)

Panolarınızı değiştirebilirsiniz. Her panel düzenlenebilir, taşınabilir, kaldırılabilir veya eklenebilir. Yapılandırmalarınızı değiştirebilirsiniz. Bu size kalmış! Panoların nasıl çalıştığı hakkında daha fazla bilgi edinmek için [Grafana'nın belgelerine](https://grafana.com/docs/grafana/latest/dashboards/) bakın.
Ayrıca [Uyarılar (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) ile de ilgilenebilirsiniz. Bu, metrikler belirli değerlere ulaştığında uyarı bildirimleri ayarlamanıza olanak tanır. Çeşitli iletişim kanalları desteklenmektedir.
