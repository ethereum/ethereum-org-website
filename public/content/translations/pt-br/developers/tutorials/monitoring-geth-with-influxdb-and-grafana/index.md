---
title: Monitorando o Geth com InfluxDB e Grafana
description: "Configure o monitoramento para o seu nó Geth usando InfluxDB e Grafana para rastrear o desempenho e identificar problemas."
author: "Mario Havel"
tags: ["clientes", "nós"]
skill: intermediate
breadcrumb: Monitorando o Geth
lang: pt-br
published: 2021-01-13
---

Este tutorial ajudará você a configurar o monitoramento para o seu nó Geth, para que você possa entender melhor seu desempenho e identificar possíveis problemas.

## Pré-requisitos {#prerequisites}

- Você já deve estar executando uma instância do Geth.
- A maioria das etapas e exemplos são para o ambiente Linux; conhecimento básico de terminal será útil.
- Confira esta visão geral em vídeo do conjunto de métricas do Geth: [Monitorando uma infraestrutura Ethereum por Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pilha de monitoramento {#monitoring-stack}

Um cliente Ethereum coleta muitos dados que podem ser lidos na forma de um banco de dados cronológico. Para facilitar o monitoramento, você pode alimentar isso em um software de visualização de dados. Existem várias opções disponíveis:

- [Prometheus](https://prometheus.io/) (modelo pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Se você preferir o Prometheus, o Geth também pode expor suas métricas no formato Prometheus. Inicie o Geth com `--metrics --metrics.addr 127.0.0.1` e aponte o Prometheus para `http://127.0.0.1:6060/debug/metrics/prometheus`.

Neste tutorial, configuraremos seu cliente Geth para enviar dados para o InfluxDB para criar um banco de dados e o Grafana para criar uma visualização gráfica dos dados. Fazer isso manualmente ajudará você a entender melhor o processo, alterá-lo e implantar em diferentes ambientes.

## Configurando o InfluxDB {#setting-up-influxdb}

Primeiro, vamos baixar e instalar o InfluxDB. Este tutorial usa o InfluxDB 1.x (OSS), que o Geth suporta com as flags `--metrics.influxdb` abaixo. Versões mais recentes do InfluxDB usam uma configuração diferente com organizações, buckets e tokens em vez de bancos de dados e usuários. O Geth suporta o InfluxDB 2.x com as flags `--metrics.influxdbv2`, mas as etapas de configuração neste tutorial se aplicam apenas à versão 1.x.

Siga as [instruções de instalação do InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) para o seu ambiente. Por exemplo, no Debian ou Ubuntu, você pode instalá-lo a partir do repositório InfluxData. Verifique as instruções de instalação para a impressão digital da chave de assinatura atual antes de confiar na chave:

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

O pacote `influxdb` inclui o cliente de linha de comando `influx`.

Após instalar o InfluxDB com sucesso, certifique-se de que ele esteja sendo executado em segundo plano. Por padrão, ele pode ser acessado em `localhost:8086`.
Antes de usar o cliente `influx`, você deve criar um novo usuário com privilégios de administrador. Este usuário servirá para gerenciamento de alto nível, criando bancos de dados e usuários.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Agora você pode usar o cliente influx para entrar no [shell do InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) com este usuário.

```sh
influx -username 'username' -password 'password'
```

Comunicando-se diretamente com o InfluxDB em seu shell, você pode criar um banco de dados e um usuário para as métricas do Geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Verifique as entradas criadas com:

```sql
show databases
show users
```

Saia do shell do InfluxDB.

```
exit
```

O InfluxDB está em execução e configurado para armazenar métricas do Geth.

## Preparando o Geth {#preparing-geth}

Após configurar o banco de dados, precisamos habilitar a coleta de métricas no Geth. Preste atenção em `METRICS AND STATS OPTIONS` em `geth --help`. Várias opções podem ser encontradas lá, neste caso queremos que o Geth envie dados para o InfluxDB.
A configuração básica especifica o endpoint onde o InfluxDB pode ser acessado e a autenticação para o banco de dados.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Use a mesma senha que você definiu ao criar o usuário `geth`. Essas flags podem ser anexadas a um comando que inicia o cliente ou salvas no arquivo de configuração.

Você pode verificar se o Geth está enviando dados com sucesso, por exemplo, listando as métricas no banco de dados. No shell do InfluxDB:

```sql
use geth
show measurements
```

## Configurando o Grafana {#setting-up-grafana}

O próximo passo é instalar o Grafana, que interpretará os dados graficamente. Siga o [processo de instalação para o seu ambiente](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) na documentação do Grafana. Certifique-se de instalar a versão OSS, a menos que precise de outra coisa.
Exemplo de etapas de instalação para Debian ou Ubuntu usando o repositório do Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Quando o Grafana estiver em execução, ele deverá estar acessível em `localhost:3000`.
Use seu navegador preferido para acessar este caminho e faça login com as credenciais padrão (usuário: `admin` e senha: `admin`). Quando solicitado, altere a senha padrão e salve.

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 1)](./grafana1.png)

Você será redirecionado para a página inicial do Grafana. Primeiro, configure seus dados de origem. Abra o menu e selecione **Connections > Data sources**. As capturas de tela neste tutorial são de uma versão mais antiga do Grafana, então suas telas podem parecer um pouco diferentes.

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 2)](./grafana2.png)

Ainda não há fontes de dados criadas, clique em "Add data source" para definir uma.

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 3)](./grafana3.png)

Para esta configuração, selecione "InfluxDB" e prossiga.

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 4)](./grafana4.png)

A configuração da fonte de dados é bem simples se você estiver executando as ferramentas na mesma máquina. Você precisa definir o endereço do InfluxDB e os detalhes para acessar o banco de dados. Consulte a imagem abaixo.

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 5)](./grafana5.png)

Se tudo estiver concluído e o InfluxDB estiver acessível, clique em "Save and test" e aguarde a confirmação aparecer.

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 6)](./grafana6.png)

O Grafana agora está configurado para ler dados do InfluxDB. Agora você precisa criar um painel (dashboard) que os interpretará e exibirá. As propriedades dos painéis são codificadas em arquivos JSON que podem ser criados por qualquer pessoa e facilmente importados. Abra o menu e selecione **Dashboards**, depois clique em **New > Import**.

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 7)](./grafana7.png)

Para um painel de monitoramento do Geth, copie o ID [deste painel](https://grafana.com/grafana/dashboards/13877/) e cole-o na página "Import" no Grafana. Após salvar o painel, ele deve ficar assim:

![Captura de tela do painel do Grafana para monitoramento do Geth (painel 8)](./grafana8.png)

Você pode modificar seus painéis. Cada painel pode ser editado, movido, removido ou adicionado. Você pode alterar suas configurações. A escolha é sua! Para saber mais sobre como os painéis funcionam, consulte a [documentação do Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Você também pode se interessar por [Alertas (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). Isso permite configurar notificações de alerta para quando as métricas atingirem determinados valores. Vários canais de comunicação são suportados.
