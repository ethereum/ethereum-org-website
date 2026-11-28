---
title: "InfluxDB மற்றும் Grafana மூலம் Geth-ஐக் கண்காணித்தல்"
description: "செயல்திறனைக் கண்காணிக்கவும் சிக்கல்களைக் கண்டறியவும் InfluxDB மற்றும் Grafana-ஐப் பயன்படுத்தி உங்கள் Geth கணுவிற்கான கண்காணிப்பை அமைக்கவும்."
author: "மரியோ ஹாவெல்"
tags: ["கிளையண்டுகள்", "கணுக்கள்"]
skill: intermediate
breadcrumb: "Geth-ஐக் கண்காணித்தல்"
lang: ta
published: 2021-01-13
---

இந்த வழிகாட்டி உங்கள் Geth கணுவிற்கான கண்காணிப்பை அமைக்க உதவும், இதன் மூலம் அதன் செயல்திறனை நீங்கள் நன்கு புரிந்துகொள்ளவும் சாத்தியமான சிக்கல்களைக் கண்டறியவும் முடியும்.

## முன்நிபந்தனைகள் {#prerequisites}

- நீங்கள் ஏற்கனவே Geth இன் ஒரு நிகழ்வை இயக்கிக் கொண்டிருக்க வேண்டும்.
- பெரும்பாலான படிகள் மற்றும் எடுத்துக்காட்டுகள் Linux சூழலுக்கானவை, அடிப்படை முனைய (terminal) அறிவு பயனுள்ளதாக இருக்கும்.
- Geth இன் அளவீடுகளின் தொகுப்பு குறித்த இந்த வீடியோ கண்ணோட்டத்தைப் பார்க்கவும்: [பீட்டர் சிலாகி (Péter Szilágyi) வழங்கிய எத்திரியம் உள்கட்டமைப்பைக் கண்காணித்தல்](https://www.youtube.com/watch?v=cOBab8IJMYI).

## கண்காணிப்பு அடுக்கு {#monitoring-stack}

ஒரு எத்திரியம் கிளையண்ட் நிறைய தரவுகளைச் சேகரிக்கிறது, இவற்றை ஒரு காலவரிசை தரவுத்தளத்தின் வடிவத்தில் படிக்க முடியும். கண்காணிப்பை எளிதாக்க, இதை நீங்கள் தரவு காட்சிப்படுத்தல் மென்பொருளில் உள்ளிடலாம். இதற்குப் பல விருப்பங்கள் உள்ளன:

- [Prometheus](https://prometheus.io/) (இழுக்கும் மாதிரி)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (தள்ளும் மாதிரி)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

நீங்கள் Prometheus-ஐ விரும்பினால், Geth அதன் அளவீடுகளை Prometheus வடிவத்திலும் வெளிப்படுத்த முடியும். `--metrics --metrics.addr 127.0.0.1` உடன் Geth-ஐத் தொடங்கி, Prometheus-ஐ `http://127.0.0.1:6060/debug/metrics/prometheus` இல் சுட்டிக்காட்டவும்.

இந்த வழிகாட்டியில், ஒரு தரவுத்தளத்தை உருவாக்க InfluxDB-க்கும், தரவின் வரைபடக் காட்சிப்படுத்தலை உருவாக்க Grafana-வுக்கும் தரவைத் தள்ளுவதற்கு உங்கள் Geth கிளையண்டை அமைப்போம். இதை கைமுறையாகச் செய்வது, செயல்முறையைச் சிறப்பாகப் புரிந்துகொள்ளவும், அதை மாற்றியமைக்கவும், வெவ்வேறு சூழல்களில் நிலைநிறுத்தவும் உதவும்.

## InfluxDB-ஐ அமைத்தல் {#setting-up-influxdb}

முதலில், InfluxDB-ஐப் பதிவிறக்கி நிறுவுவோம். இந்த வழிகாட்டி InfluxDB 1.x (OSS)-ஐப் பயன்படுத்துகிறது, இதை Geth கீழே உள்ள `--metrics.influxdb` கொடிகளுடன் ஆதரிக்கிறது. புதிய InfluxDB பதிப்புகள் தரவுத்தளங்கள் மற்றும் பயனர்களுக்குப் பதிலாக நிறுவனங்கள், பக்கெட்டுகள் மற்றும் டோக்கன்களுடன் வேறுபட்ட அமைப்பைப் பயன்படுத்துகின்றன. Geth `--metrics.influxdbv2` கொடிகளுடன் InfluxDB 2.x-ஐ ஆதரிக்கிறது, ஆனால் இந்த வழிகாட்டியில் உள்ள அமைப்புப் படிகள் 1.x-க்கு மட்டுமே பொருந்தும்.

உங்கள் சூழலுக்கான [InfluxDB 1.x நிறுவல் வழிமுறைகளைப்](https://docs.influxdata.com/influxdb/v1/introduction/install/) பின்பற்றவும். எடுத்துக்காட்டாக, Debian அல்லது Ubuntu-வில் நீங்கள் அதை InfluxData களஞ்சியத்திலிருந்து நிறுவலாம். திறவுகோலை நம்புவதற்கு முன், தற்போதைய கையொப்பமிடுதல் திறவுகோல் கைரேகைக்கான நிறுவல் வழிமுறைகளைச் சரிபார்க்கவும்:

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

`influxdb` தொகுப்பில் `influx` கட்டளை வரி கிளையண்ட் அடங்கும்.

InfluxDB-ஐ வெற்றிகரமாக நிறுவிய பின், அது பின்னணியில் இயங்குகிறதா என்பதை உறுதிப்படுத்திக் கொள்ளவும். இயல்புநிலையாக, இதை `localhost:8086` இல் அணுகலாம்.
`influx` கிளையண்டைப் பயன்படுத்துவதற்கு முன், நீங்கள் நிர்வாகி சலுகைகளுடன் புதிய பயனரை உருவாக்க வேண்டும். இந்தப் பயனர் உயர்மட்ட மேலாண்மைக்கும், தரவுத்தளங்கள் மற்றும் பயனர்களை உருவாக்குவதற்கும் சேவை செய்வார்.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

இப்போது இந்தப் பயனருடன் [InfluxDB ஷெல்லில்](https://docs.influxdata.com/influxdb/v1/tools/shell/) நுழைய influx கிளையண்டைப் பயன்படுத்தலாம்.

```sh
influx -username 'username' -password 'password'
```

InfluxDB-இன் ஷெல்லில் நேரடியாகத் தொடர்புகொள்வதன் மூலம், geth அளவீடுகளுக்கான தரவுத்தளத்தையும் பயனரையும் நீங்கள் உருவாக்கலாம்.

```sql
create database geth
create user geth with password '<geth-password>'
```

உருவாக்கப்பட்ட உள்ளீடுகளை இதைக் கொண்டு சரிபார்க்கவும்:

```sql
show databases
show users
```

InfluxDB ஷெல்லிலிருந்து வெளியேறவும்.

```
exit
```

InfluxDB இயங்குகிறது மற்றும் Geth-இலிருந்து அளவீடுகளைச் சேமிக்க உள்ளமைக்கப்பட்டுள்ளது.

## Geth-ஐத் தயார் செய்தல் {#preparing-geth}

தரவுத்தளத்தை அமைத்த பிறகு, Geth-இல் அளவீடுகள் சேகரிப்பை நாம் இயக்க வேண்டும். `geth --help` இல் உள்ள `METRICS AND STATS OPTIONS`-க்குக் கவனம் செலுத்துங்கள். அங்குப் பல விருப்பங்களைக் காணலாம், இந்த நிலையில் Geth தரவை InfluxDB-க்குள் தள்ள வேண்டும் என்று நாங்கள் விரும்புகிறோம்.
அடிப்படை அமைப்பு InfluxDB-ஐ அணுகக்கூடிய இறுதிப்புள்ளியையும் தரவுத்தளத்திற்கான அங்கீகாரத்தையும் குறிப்பிடுகிறது.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

நீங்கள் `geth` பயனரை உருவாக்கியபோது அமைத்த அதே கடவுச்சொல்லைப் பயன்படுத்தவும். இந்தக் கொடிகளை கிளையண்டைத் தொடங்கும் கட்டளையுடன் சேர்க்கலாம் அல்லது உள்ளமைவு கோப்பில் சேமிக்கலாம்.

எடுத்துக்காட்டாக, தரவுத்தளத்தில் அளவீடுகளைப் பட்டியலிடுவதன் மூலம் Geth வெற்றிகரமாகத் தரவைத் தள்ளுகிறதா என்பதை நீங்கள் சரிபார்க்கலாம். InfluxDB ஷெல்லில்:

```sql
use geth
show measurements
```

## Grafana-ஐ அமைத்தல் {#setting-up-grafana}

அடுத்த படி Grafana-ஐ நிறுவுவதாகும், இது தரவை வரைபடமாக விளக்கும். Grafana ஆவணத்தில் உள்ள [உங்கள் சூழலுக்கான நிறுவல் செயல்முறையைப்](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) பின்பற்றவும். உங்களுக்கு வேறு ஏதேனும் தேவைப்படாவிட்டால், OSS பதிப்பை நிறுவுவதை உறுதிசெய்யவும்.
Grafana களஞ்சியத்தைப் பயன்படுத்தி Debian அல்லது Ubuntu-க்கான எடுத்துக்காட்டு நிறுவல் படிகள்:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

நீங்கள் Grafana-ஐ இயக்கியதும், அதை `localhost:3000` இல் அணுக முடியும்.
இந்தப்பாதையை அணுக உங்களுக்கு விருப்பமான உலாவியைப் பயன்படுத்தவும், பின்னர் இயல்புநிலை சான்றளிப்புகளுடன் (பயனர்: `admin` மற்றும் கடவுச்சொல்: `admin`) உள்நுழையவும். கேட்கப்படும்போது, இயல்புநிலை கடவுச்சொல்லை மாற்றிச் சேமிக்கவும்.

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 1)](./grafana1.png)

நீங்கள் Grafana முகப்புப் பக்கத்திற்குத் திருப்பி விடப்படுவீர்கள். முதலில், உங்கள் மூலத் தரவை அமைக்கவும். மெனுவைத் திறந்து **Connections > Data sources** என்பதைத் தேர்ந்தெடுக்கவும். இந்த வழிகாட்டியில் உள்ள ஸ்கிரீன்ஷாட்கள் Grafana-இன் பழைய பதிப்பிலிருந்து வந்தவை, எனவே உங்கள் திரைகள் சற்று வித்தியாசமாகத் தோன்றலாம்.

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 2)](./grafana2.png)

இதுவரை எந்தத் தரவு மூலங்களும் உருவாக்கப்படவில்லை, ஒன்றை வரையறுக்க "Add data source" என்பதைக் கிளிக் செய்யவும்.

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 3)](./grafana3.png)

இந்த அமைப்பிற்கு, "InfluxDB" என்பதைத் தேர்ந்தெடுத்துத் தொடரவும்.

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 4)](./grafana4.png)

நீங்கள் ஒரே கணினியில் கருவிகளை இயக்கினால், தரவு மூல உள்ளமைவு மிகவும் நேரடியானது. தரவுத்தளத்தை அணுகுவதற்கான InfluxDB முகவரி மற்றும் விவரங்களை நீங்கள் அமைக்க வேண்டும். கீழே உள்ள படத்தைப் பார்க்கவும்.

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 5)](./grafana5.png)

எல்லாம் முடிந்து InfluxDB-ஐ அணுக முடிந்தால், "Save and test" என்பதைக் கிளிக் செய்து, உறுதிப்படுத்தல் தோன்றும் வரை காத்திருக்கவும்.

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 6)](./grafana6.png)

Grafana இப்போது InfluxDB-இலிருந்து தரவைப் படிக்க அமைக்கப்பட்டுள்ளது. இப்போது நீங்கள் அதை விளக்கி காண்பிக்கும் ஒரு டாஷ்போர்டை உருவாக்க வேண்டும். டாஷ்போர்டுகளின் பண்புகள் JSON கோப்புகளில் குறியாக்கம் செய்யப்பட்டுள்ளன, இவற்றை யார் வேண்டுமானாலும் உருவாக்கலாம் மற்றும் எளிதாக இறக்குமதி செய்யலாம். மெனுவைத் திறந்து **Dashboards** என்பதைத் தேர்ந்தெடுக்கவும், பின்னர் **New > Import** என்பதைக் கிளிக் செய்யவும்.

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 7)](./grafana7.png)

Geth கண்காணிப்பு டாஷ்போர்டுக்கு, [இந்த டாஷ்போர்டின்](https://grafana.com/grafana/dashboards/13877/) ஐடியை நகலெடுத்து Grafana-இல் உள்ள "Import page"-இல் ஒட்டவும். டாஷ்போர்டைச் சேமித்த பிறகு, அது இப்படித் தோன்றும்:

![Geth கண்காணிப்பிற்கான Grafana டாஷ்போர்டு ஸ்கிரீன்ஷாட் (பேனல் 8)](./grafana8.png)

உங்கள் டாஷ்போர்டுகளை நீங்கள் மாற்றியமைக்கலாம். ஒவ்வொரு பேனலையும் திருத்தலாம், நகர்த்தலாம், அகற்றலாம் அல்லது சேர்க்கலாம். உங்கள் உள்ளமைவுகளை நீங்கள் மாற்றலாம். இது உங்கள் விருப்பம்! டாஷ்போர்டுகள் எவ்வாறு செயல்படுகின்றன என்பதைப் பற்றி மேலும் அறிய, [Grafana-இன் ஆவணத்தைப்](https://grafana.com/docs/grafana/latest/dashboards/) பார்க்கவும்.
[எச்சரிக்கையளிப்பதிலும் (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) நீங்கள் ஆர்வமாக இருக்கலாம். அளவீடுகள் குறிப்பிட்ட மதிப்புகளை அடையும் போது எச்சரிக்கை அறிவிப்புகளை அமைக்க இது உங்களை அனுமதிக்கிறது. பல்வேறு தகவல் தொடர்பு சேனல்கள் ஆதரிக்கப்படுகின்றன.
