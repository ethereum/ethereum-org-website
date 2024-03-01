---
title: InfluxDB ve Grafana ile Geth'i İzleme
description:
author: "Mario Havel"
tags:
  - "istemciler"
  - "düğümler"
skill: intermediate
lang: tr
published: 2021-01-13
---

Bu öğretici, Geth düğümünüzün performansını daha iyi anlayabilmeniz ve olası sorunları belirleyebilmeniz için izleme kurmanıza yardımcı olacaktır.

## Ön koşullar {#prerequisites}

- Zaten bir Geth örneği çalıştırıyor olmalısınız.
- Adımların ve örneklerin çoğu linux ortamı içindir, temel terminal bilgisi yardımcı olacaktır.
- Geth'in ölçüm paketine dair bu genel bakış videosuna göz atın: [Bir Ethereum altyapısını izleme - Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## İzleme yığını {#monitoring-stack}

Bir Ethereum istemcisi, kronolojik bir veri tabanı şeklinde okunabilecek çok sayıda veri toplar. İzlemeyi kolaylaştırmak için bunu veri görselleştirme yazılımına aktarabilirsiniz. Birden fazla seçenek mevcuttur:

- [Prometheus](https://prometheus.io/) (çekme modeli)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (itme modeli)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ayrıca InfluxDB ve Grafana ile önceden yapılandırılmış olan bir seçenek olan [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) bulunmaktadır. RPi 4 için docker ve [Ethbian OS](https://ethbian.org/index.html) kullanarak kolayca kurabilirsiniz.

Bu öğreticide, Geth istemcinizi bir veri tabanı oluşturmak için InfluxDB'ye ve verilerin grafik görselleştirmesini oluşturmak için Grafana'ya veri gönderecek şekilde ayarlayacağız. Bunu manuel olarak yapmak; süreci daha iyi anlamanıza, değiştirmenize ve farklı ortamlarda dağıtmanıza yardımcı olacaktır.

## InfluxDB kurulumu {#setting-up-influxdb}

Öncelikle InfluxDB'yi indirip kuralım. [Influxdata yayın sayfasında](https://portal.influxdata.com/downloads/) çeşitli indirme seçenekleri bulunabilir. Ortamınıza uygun olanı seçin. Ayrıca bir [depodan](https://repos.influxdata.com/) da indirebilirsiniz. Örnek olarak Debian temelli bir dağıtımda:

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

InfluxDB'yi başarıyla yükledikten sonra, arka planda çalıştığından emin olun. Varsayılan olarak, `localhost:8086`'da erişilebilir. `influx` istemcisini kullanmadan önce, admin yetkileri olan yeni bir kullanıcı yaratmalısınız. Bu kullanıcı, üst düzey yönetim, veri tabanları ve kullanıcılar oluşturmaya hizmet edecektir.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Şimdi influx istemcisini bu kullanıcı ile [InfluxDB kabuğuna](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) girmek için kullanabilirsiniz.

```
influx -username 'username' -password 'password'
```

Kabuğunun içinden InfluxDB ile doğrudan iletişim kurarak, geth ölçümleri için veri tabanı ve kullanıcı oluşturabilirsiniz.

```
create database geth
create user geth with password choosepassword
```

Oluşturulan girdileri şöyle doğrulayın:

```
show databases
show users
```

InfluxDB kabuğundan çıkın.

```
exit
```

InfluxDB, Geth'ten gelen ölçümleri depolamak için çalışıyor ve yapılandırıldı.

## Geth'i hazırlama {#preparing-geth}

Veri tabanını kurduktan sonra Geth'te ölçüm toplamayı etkinleştirmemiz gerekiyor. `geth --help` içindeki `METRICS AND STATS OPTIONS`'a dikkat edin. Orada birden fazla seçenek bulunabilir, bu durumda Geth'in verileri InfluxDB'ye göndermesini istiyoruz. Temel kurulum, InfluxDB'nin erişilebilir olduğu uç noktayı ve veri tabanı için kimlik doğrulamasını belirtir.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Bu bayraklar, istemciyi başlatan bir komuta eklenebilir veya yapılandırma dosyasına kaydedilebilir.

Geth'in verileri başarıyla ilettiğini, örneğin veri tabanındaki ölçümleri listeleyerek doğrulayabilirsiniz. InfluxDB kabuğunda:

```
use geth
show measurements
```

## Grafana kurulumu {#setting-up-grafana}

Bir sonraki adım, verileri grafiksel olarak yorumlayacak olan Grafana'yı kurmaktır. Grafana belgelerinde ortamınız için kurulum sürecini takip edin. Başka türlü istemiyorsanız, OSS sürümünü yüklediğinizden emin olun. Depo kullanan Debian dağıtımları için örnek kurulum adımları:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana'yı çalıştırdığınızda, `localhost:3000` adresinden erişilebilir olmalıdır. Bu yola erişmek için tercih ettiğiniz tarayıcıyı kullanın, ardından varsayılan kimlik bilgileriyle oturum açın (kullanıcı: `admin` ve şifre: `admin`). İstendiğinde, varsayılan şifreyi değiştirin ve kaydedin.

![](./grafana1.png)

Grafana ana sayfasına yönlendirileceksiniz. İlk olarak, kaynak verinizi hazırlayın. Sol çubuktaki yapılandırma simgesine tıklayın ve "Data sources"'ı (Veri kaynakları) seçin.

![](./grafana2.png)

Henüz oluşturulmuş veri kaynağı yok, birini tanımlamak için "Add data source"a (Veri kaynağı ekle) tıklayın.

![](./grafana3.png)

Bu kurulum için "InfluxDB"yi seçin ve devam edin.

![](./grafana4.png)

Araçları aynı makinede çalıştırıyorsanız, veri kaynağı yapılandırması oldukça basittir. Veri tabanına erişmek için InfluxDB adresini ve ayrıntılarını ayarlamanız gerekir. Aşağıdaki resme başvurun.

![](./grafana5.png)

Her şey tamamlandıysa ve InfluxDB erişilebilir durumdaysa, "Save and test"e (Kaydet ve test et) tıklayın ve onayın görünmesini bekleyin.

![](./grafana6.png)

Grafana artık InfluxDB'den veri okumak üzere ayarlanmıştır. Şimdi, onu yorumlayacak ve gösterecek bir gösterge paneli oluşturmanız gerekiyor. Gösterge paneli özellikleri, herkes tarafından oluşturulabilen ve kolayca içe aktarılabilen JSON dosyalarında kodlanmıştır. Sol çubukta, "Create and Import"a (Oluştur ve İçe Aktar) tıklayın.

![](./grafana7.png)

Bir Geth izleme gösterge paneli için [bu gösterge panelinin](https://grafana.com/grafana/dashboards/13877/) kimliğini kopyalayın ve Grafana'daki "Import page"e (İçe Aktarma sayfası) yapıştırın. Gösterge panelini kaydettikten sonra şöyle görünmelidir:

![](./grafana8.png)

Gösterge panellerinizi değiştirebilirsiniz. Her panel düzenlenebilir, taşınabilir, kaldırılabilir veya eklenebilir. Yapılandırmalarınızı değiştirebilirsiniz. Size kalmış! Eğer gösterge panellerin nasıl çalıştığı hakkında dahasını öğrenmek istiyorsanız, [Grafana'nın belgelerine](https://grafana.com/docs/grafana/latest/dashboards/) başvurun. Ayrıca [Alerting](https://grafana.com/docs/grafana/latest/alerting/) ilginizi çekebilir. Bu, ölçümler belirli değerlere ulaştığında uyarı bildirimleri ayarlamanıza olanak tanır. Çeşitli iletişim kanalları desteklenir.
