---
title: Monitorando o Geth com InfluxDB e Grafana
description:
author: "Mário Havel"
tags:
  - "clientes"
  - "nós"
skill: intermediate
lang: pt-br
published: 2021-01-13
---

Esse tutorial ajudará você a configurar o monitoramento do seu Geth para você poder entender melhor o seu desempenho e identificar possíveis problemas.

## Pré-Requisitos {#prerequisites}

- Você já deveria estar executando uma instância de Geth.
- A maioria dos passos e exemplos são para o ambiente Linux, o conhecimento básico sobre terminais será útil.
- Confira este vídeo da visão geral da suíte de métricas do Geth: [Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Stack de monitoramento {#monitoring-stack}

Um cliente Ethereum coleta muitos dados que podem ser lidos na forma de uma base de dados cronológica. Para facilitar o monitoramento, você pode inserir isso em um software de visualização de dados. Existem múltiplas opções disponíveis:

- [Prometheus](https://prometheus.io/) (modelo pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Também há o [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), uma opção pré-configurada com InfluxDB e Grafana. Você pode configurá-lo facilmente usando docker e [Ethbian OS](https://ethbian.org/index.html) para RPi 4.

Neste tutorial, nós configuramos seu cliente Geth para enviar dados para o InfluxDB para criar um banco de dados e o Grafana para criar um gráfico de visualização dos dados. Fazer isso manualmente ajudará você a entender melhor o processo, alterá-lo e fazer deploy em diferentes ambientes.

## Configurando o InfluxDB {#setting-up-influxdb}

Primeiro, vamos baixar e instalar o InfluxDB. Várias opções de download podem ser encontradas na [página de release do Influxdata](https://portal.influxdata.com/downloads/). Escolha o que mais se adequa ao seu ambiente. Você também pode instalá-lo a partir de um [repositório](https://repos.influxdata.com/). Por exemplo, em uma distribuição baseada em Debian:

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

Após instalar o InfluxDB com sucesso, certifique-se de que ele está sendo executado em segundo plano. Por padrão, ele é acessível em `localhost:8086`. Antes de usar o cliente `influx` você tem que criar um novo usuário com privilégios de administrador. Este usuário servirá para gerenciamento de alto nível, criando bancos de dados e usuários.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Agora você pode usar o cliente influx para entrar no [shell do InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) com este usuário.

```
influx -username 'username' -password 'password'
```

Comunificando diretamente com o InfluxDB em seu shell, você pode criar banco de dados e usuário para métricas do geth.

```
create database geth
create user geth with password choosepassword
```

Verifique as entradas criadas com:

```
show databases
show users
```

Saia do Shell InfluxDB.

```
exit
```

O InfluxDB está rodando e configurado para armazenar métricas do Geth.

## Preparando o Geth {#preparing-geth}

Depois de configurar o banco de dados, precisamos habilitar a coleção de métricas no Geth. Preste atenção em `METRICS AND STATS OPTIONS` com `geth --help`. Várias opções podem ser encontradas lá, neste caso queremos que o Geth envie dados para o InfluxDB. A configuração básica especifica o endpoint onde o InfluxDB é acessível e a autenticação para o banco de dados.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Estas flags podem ser anexadas a um comando que inicie o cliente ou salvas no arquivo de configuração.

Você pode verificar que o Geth está fazendo push de dados com sucesso, por exemplo, listando as métricas no banco de dados. Saia do shell do InfluxDB:

```
use geth
show measurements
```

## Configurando o Grafana {#setting-up-grafana}

O próximo passo é instalar o Grafana que interpretará os dados graficamente. Siga o processo de instalação do seu ambiente na documentação do Grafana. Certifique-se de instalar a versão OSS se você não quiser o contrário. Etapas de instalação de exemplo para distribuições Debian usando o repositório:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Quando você estiver rodando o Grafana, ele deve ser acessível em `localhost:3000`. Use seu navegador preferido para acessar esta URL e, em seguida, faça login com as credenciais padrão (usuário: `admin` e senha: `admin`). Quando solicitado, altere a senha padrão e salve.

![](./grafana1.png)

Você vai ser redirecionado para a página principal do Grafana. Primeiro, configure seu source data. Clique no ícone de configuração na barra esquerda e selecione "Data sources".

![](./grafana2.png)

Ainda não existem data sources criados, clique em "Add data source" para definir um.

![](./grafana3.png)

Para esta configuração, selecione "InfluxDB" e prossiga.

![](./grafana4.png)

A configuração do data source é bem simples se você estiver rodando ferramentas na mesma máquina. Você precisa configurar o endereço e os detalhes do InfluxDB para acessar o banco de dados. Consulte a imagem abaixo.

![](./grafana5.png)

Se tudo estiver completo e o InfluxDB estiver acessível, clique em "Save and test" e aguarde a confirmação aparecer.

![](./grafana6.png)

O Grafana está agora configurado para ler dados do InfluxDB. Agora você precisa criar um painel que o interprete e o exiba. As propriedades dos Dashboards são codificadas em arquivos JSON que podem ser criados por qualquer um e podem ser facilmente importados. Na barra esquerda, clique em "Create and Import".

![](./grafana7.png)

Para um dashboard de monitoramento do Geth, copie o ID [deste dashboard](https://grafana.com/grafana/dashboards/13877/) e cole-o em "Import page" no Grafana. Depois de salvar o dashboard, ele deve ficar assim:

![](./grafana8.png)

Você pode modificar seus dashboards. Cada dashboard pode ser editado, movido, removido ou adicionado. Você pode alterar suas configurações. É com você! Para saber mais sobre como os dashboards funcionam, consulte a [documentação do Grafana](https://grafana.com/docs/grafana/latest/dashboards/). Você também pode estar interessado sobre [Notificações / Alertas](https://grafana.com/docs/grafana/latest/alerting/). Isso permite configurar notificações de alerta para quando as métricas alcançarem certos valores. Vários canais de comunicação são suportados.
