---
title: InfluxDB ve Grafana ile Geth'i İzleme
description: Performansı izlemek ve sorunları belirlemek için InfluxDB ve Grafana kullanarak Geth düğümünüz için izleme ayarlayın.
author: "Mario Havel"
tags: ["istemciler", "düğümler"]
skill: intermediate
breadcrumb: Geth'i İzleme
lang: tr
published: 2021-01-13
---

Bu eğitim, performansını daha iyi anlayabilmeniz ve olası sorunları belirleyebilmeniz için Geth düğümünüz için izleme ayarlamanıza yardımcı olacaktır.

## Ön Koşullar {#prerequisites}

- Zaten bir Geth örneği çalıştırıyor olmalısınız.
- Adımların ve örneklerin çoğu Linux ortamı içindir, temel terminal bilgisi faydalı olacaktır.
- Geth'in metrik paketine genel bir bakış sunan bu videoya göz atın: [Péter Szilágyi tarafından Ethereum altyapısını izleme](https://www.youtube.com/watch?v=cOBab8IJMYI).

## İzleme yığını {#monitoring-stack}

Bir Ethereum istemcisi, kronolojik bir veritabanı biçiminde okunabilen çok sayıda veri toplar. İzlemeyi kolaylaştırmak için bunu veri görselleştirme yazılımına besleyebilirsiniz. Birden fazla seçenek mevcuttur:

- [Prometheus](https://prometheus.io/) (çekme modeli)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (itme modeli)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ayrıca InfluxDB ve Grafana ile önceden yapılandırılmış bir seçenek olan [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) da bulunmaktadır.

Bu eğitimde, bir veritabanı oluşturmak için verileri InfluxDB'ye ve verilerin grafiksel bir görselleştirmesini oluşturmak için Grafana'ya itecek şekilde Geth istemcinizi ayarlayacağız. Bunu manuel olarak yapmak, süreci daha iyi anlamanıza, değiştirmenize ve farklı ortamlarda dağıtmanıza yardımcı olacaktır.

## InfluxDB'yi Ayarlama {#setting-up-influxdb}

İlk olarak, InfluxDB'yi indirip kuralım. Çeşitli indirme seçenekleri [Influxdata sürüm sayfasında](https://portal.influxdata.com/downloads/) bulunabilir. Ortamınıza uygun olanı seçin.
Ayrıca bir [depodan](https://repos.influxdata.com/) da kurabilirsiniz. Örneğin Debian tabanlı bir dağıtımda:

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

InfluxDB'yi başarıyla kurduktan sonra, arka planda çalıştığından emin olun. Varsayılan olarak, `localhost:8086` adresinden ulaşılabilir.
`influx` istemcisini kullanmadan önce, yönetici ayrıcalıklarına sahip yeni bir kullanıcı oluşturmalısınız. Bu kullanıcı, veritabanları ve kullanıcılar oluşturmak gibi üst düzey yönetim işlemleri için hizmet edecektir.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Artık bu kullanıcıyla [InfluxDB kabuğuna](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) girmek için influx istemcisini kullanabilirsiniz.

```
influx -username 'username' -password 'password'
```

Kabuğunda InfluxDB ile doğrudan iletişim kurarak, geth metrikleri için veritabanı ve kullanıcı oluşturabilirsiniz.

```
create database geth
create user geth with password choosepassword
```

Oluşturulan girdileri şununla doğrulayın:

```
show databases
show users
```

InfluxDB kabuğundan çıkın.

```
exit
```

InfluxDB çalışıyor ve Geth'ten gelen metrikleri depolamak için yapılandırıldı.

## Geth'i Hazırlama {#preparing-geth}

Veritabanını kurduktan sonra, Geth'te metrik toplamayı etkinleştirmemiz gerekiyor. `geth --help` içindeki `METRICS AND STATS OPTIONS` kısmına dikkat edin. Orada birden fazla seçenek bulunabilir, bu durumda Geth'in verileri InfluxDB'ye itmesini istiyoruz.
Temel kurulum, InfluxDB'nin ulaşılabileceği uç noktayı ve veritabanı için kimlik doğrulamayı belirtir.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Bu bayraklar, istemciyi başlatan bir komuta eklenebilir veya yapılandırma dosyasına kaydedilebilir.

Örneğin veritabanındaki metrikleri listeleyerek Geth'in verileri başarıyla ittiğini doğrulayabilirsiniz. InfluxDB kabuğunda:

```
use geth
show measurements
```

## Grafana'yı Ayarlama {#setting-up-grafana}

Sonraki adım, verileri grafiksel olarak yorumlayacak olan Grafana'yı kurmaktır. Grafana belgelerinde ortamınız için kurulum sürecini izleyin. Aksi bir tercihiniz yoksa OSS sürümünü kurduğunuzdan emin olun.
Depo kullanan Debian dağıtımları için örnek kurulum adımları:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana'yı çalıştırdığınızda, `localhost:3000` adresinden ulaşılabilir olmalıdır.
Bu yola erişmek için tercih ettiğiniz tarayıcıyı kullanın, ardından varsayılan kimlik bilgileriyle (kullanıcı: `admin` ve parola: `admin`) giriş yapın. İstendiğinde, varsayılan parolayı değiştirin ve kaydedin.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Grafana ana sayfasına yönlendirileceksiniz. İlk olarak, kaynak verilerinizi ayarlayın. Sol çubuktaki yapılandırma simgesine tıklayın ve "Data sources" (Veri kaynakları) seçeneğini seçin.

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Henüz oluşturulmuş bir veri kaynağı yok, bir tane tanımlamak için "Add data source" (Veri kaynağı ekle) seçeneğine tıklayın.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Bu kurulum için "InfluxDB"yi seçin ve ilerleyin.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Araçları aynı makinede çalıştırıyorsanız veri kaynağı yapılandırması oldukça basittir. InfluxDB adresini ve veritabanına erişim ayrıntılarını ayarlamanız gerekir. Aşağıdaki resme bakın.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Her şey tamamsa ve InfluxDB'ye ulaşılabiliyorsa, "Save and test" (Kaydet ve test et) seçeneğine tıklayın ve onayın açılmasını bekleyin.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana artık InfluxDB'den veri okumak için ayarlandı. Şimdi bunu yorumlayacak ve görüntüleyecek bir pano (dashboard) oluşturmanız gerekiyor. Pano özellikleri, herkes tarafından oluşturulabilen ve kolayca içe aktarılabilen JSON dosyalarında kodlanmıştır. Sol çubukta "Create and Import" (Oluştur ve İçe Aktar) seçeneğine tıklayın.

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Bir Geth izleme panosu için, [bu panonun](https://grafana.com/grafana/dashboards/13877/) kimliğini (ID) kopyalayın ve Grafana'daki "Import page" (İçe aktarma sayfası) içine yapıştırın. Panoyu kaydettikten sonra şöyle görünmelidir:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Panolarınızı değiştirebilirsiniz. Her panel düzenlenebilir, taşınabilir, kaldırılabilir veya eklenebilir. Yapılandırmalarınızı değiştirebilirsiniz. Bu size kalmış! Panoların nasıl çalıştığı hakkında daha fazla bilgi edinmek için [Grafana'nın belgelerine](https://grafana.com/docs/grafana/latest/dashboards/) başvurun.
Ayrıca [Uyarılar (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) ile de ilgilenebilirsiniz. Bu, metrikler belirli değerlere ulaştığında uyarı bildirimleri ayarlamanıza olanak tanır. Çeşitli iletişim kanalları desteklenmektedir.