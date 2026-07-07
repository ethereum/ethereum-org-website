---
title: "Execute um nó da Ethereum no Raspberry Pi 4"
description: "Grave a imagem no seu Raspberry Pi 4, conecte um cabo ethernet, conecte o disco SSD e ligue o dispositivo para transformar o Raspberry Pi 4 em um nó completo da Ethereum + validador"
author: "EthereumOnArm"
tags: ["clientes", "camada de execução", "camada de consenso", "nós"]
lang: pt-br
skill: intermediate
breadcrumb: "Nó no Rasp Pi"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm é uma imagem Linux personalizada que pode transformar um Raspberry Pi em um nó da Ethereum.**

Para usar o Ethereum on Arm para transformar um Raspberry Pi em um nó da Ethereum, recomenda-se o seguinte hardware:

- Placa Raspberry 4 (modelo B 8GB), Odroid M1 ou Rock 5B (8GB/16GB de RAM)
- Cartão MicroSD (mínimo de 16 GB Classe 10)
- Disco SSD USB 3.0 de no mínimo 2 TB ou um SSD com um adaptador USB para SATA.
- Fonte de alimentação
- Cabo ethernet
- Encaminhamento de porta (veja os clientes para mais informações)
- Um gabinete com dissipador de calor e ventoinha
- Teclado USB, monitor e cabo HDMI (micro-HDMI) (Opcional)

## Por que executar a Ethereum em ARM? {#why-run-ethereum-on-arm}

As placas ARM são computadores pequenos, flexíveis e muito acessíveis. Elas são boas escolhas para executar nós da Ethereum porque podem ser compradas por um preço baixo, configuradas para que todos os seus recursos se concentrem apenas no nó, tornando-as eficientes, consomem pouca energia e são fisicamente pequenas, podendo caber de forma discreta em qualquer casa. Também é muito fácil iniciar nós porque o MicroSD do Raspberry Pi pode simplesmente ser gravado com uma imagem pré-construída, sem a necessidade de baixar ou compilar software.

## Como funciona? {#how-does-it-work}

O cartão de memória do Raspberry Pi é gravado com uma imagem pré-construída. Esta imagem contém tudo o que é necessário para executar um nó da Ethereum. Com um cartão gravado, tudo o que o usuário precisa fazer é ligar o Raspberry Pi. Todos os processos necessários para executar o nó são iniciados automaticamente. Isso funciona porque o cartão de memória contém um sistema operacional (SO) baseado em Linux, sobre o qual processos em nível de sistema são executados automaticamente, transformando a unidade em um nó da Ethereum.

A Ethereum não pode ser executada usando o popular SO Linux do Raspberry Pi, o "Raspbian", porque o Raspbian ainda usa uma arquitetura de 32 bits, o que leva os usuários da Ethereum a terem problemas de memória, e os clientes de consenso não suportam binários de 32 bits. Para superar isso, a equipe do Ethereum on Arm migrou para um SO nativo de 64 bits chamado "Armbian".

**As imagens cuidam de todas as etapas necessárias**, desde a configuração do ambiente e formatação do disco SSD até a instalação e execução do software da Ethereum, bem como o início da sincronização da blockchain.

## Nota sobre clientes de execução e de consenso {#note-on-execution-and-consensus-clients}

A imagem do Ethereum on Arm inclui clientes de execução e de consenso pré-construídos como serviços. Um nó da Ethereum exige que ambos os clientes estejam sincronizados e em execução. Você só precisa baixar e gravar a imagem e, em seguida, iniciar os serviços. A imagem vem pré-carregada com os seguintes clientes de execução:

- Geth
- Nethermind
- Besu

e os seguintes clientes de consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Você deve escolher um de cada para executar - todos os clientes de execução são compatíveis com todos os clientes de consenso. Se você não selecionar explicitamente um cliente, o nó usará seus padrões - Geth e Lighthouse - e os executará automaticamente quando a placa for ligada. Você deve abrir a porta 30303 no seu roteador para que o Geth possa encontrar e se conectar aos pares.

## Baixando a imagem {#downloading-the-image}

A imagem da Ethereum para o Raspberry Pi 4 é uma imagem "plug and play" que instala e configura automaticamente os clientes de execução e de consenso, configurando-os para se comunicarem entre si e se conectarem à rede Ethereum. Tudo o que o usuário precisa fazer é iniciar seus processos usando um comando simples.

Baixe a imagem do Raspberry Pi no [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) e verifique o hash SHA256:

```sh
# Do diretório contendo a imagem baixada
shasum -a 256 ethonarm_22.04.00.img.zip
# O hash deve retornar: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Observe que as imagens para as placas Rock 5B e Odroid M1 estão disponíveis na [página de downloads](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) do Ethereum-on-Arm.

## Gravando o MicroSD {#flashing-the-microsd}

O cartão MicroSD que será usado para o Raspberry Pi deve primeiro ser inserido em um desktop ou laptop para que possa ser gravado. Em seguida, os seguintes comandos de terminal gravarão a imagem baixada no cartão SD:

```shell
# verifique o nome do cartão MicroSD
sudo fdisk -l

>> sdxxx
```

É muito importante acertar o nome porque o próximo comando inclui `dd` que apaga completamente o conteúdo existente do cartão antes de enviar a imagem para ele. Para continuar, navegue até o diretório que contém a imagem compactada:

```shell
# descompacte e grave a imagem
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

O cartão agora está gravado, então pode ser inserido no Raspberry Pi.

## Inicie o nó {#start-the-node}

Com o cartão SD inserido no Raspberry Pi, conecte o cabo ethernet e o SSD e, em seguida, ligue a energia. O SO inicializará e começará a executar automaticamente as tarefas pré-configuradas que transformam o Raspberry Pi em um nó da Ethereum, incluindo a instalação e compilação do software cliente. Isso provavelmente levará de 10 a 15 minutos.

Assim que tudo estiver instalado e configurado, faça login no dispositivo por meio de uma conexão ssh ou usando o terminal diretamente se um monitor e teclado estiverem conectados à placa. Use a conta `ethereum` para fazer login, pois ela tem as permissões necessárias para iniciar o nó.

```shell
User: ethereum
Password: ethereum
```

O cliente de execução padrão, o Geth, será iniciado automaticamente. Você pode confirmar isso verificando os logs usando o seguinte comando de terminal:

```sh
sudo journalctl -u geth -f
```

O cliente de consenso precisa ser iniciado explicitamente. Para fazer isso, primeiro abra a porta 9000 no seu roteador para que o Lighthouse possa encontrar e se conectar aos pares. Em seguida, ative e inicie o serviço do Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Verifique o cliente usando os logs:

```sh
sudo journalctl -u lighthouse-beacon
```

Observe que o cliente de consenso será sincronizado em alguns minutos porque usa a sincronização de ponto de verificação. O cliente de execução levará mais tempo - potencialmente várias horas, e não será iniciado até que o cliente de consenso já tenha terminado a sincronização (isso ocorre porque o cliente de execução precisa de um alvo para sincronizar, o qual o cliente de consenso sincronizado fornece).

Com os serviços do Geth e do Lighthouse em execução e sincronizados, seu Raspberry Pi agora é um nó da Ethereum! É mais comum interagir com a rede Ethereum usando o console JavaScript do Geth, que pode ser anexado ao cliente Geth na porta 8545. Também é possível enviar comandos formatados como objetos JSON usando uma ferramenta de solicitação como o Curl. Veja mais na [documentação do Geth](https://geth.ethereum.org/).

O Geth é pré-configurado para relatar métricas para um painel do Grafana que pode ser visualizado no navegador. Usuários mais avançados podem querer usar esse recurso para monitorar a integridade de seu nó navegando até `ipaddress:3000`, passando `user: admin` e `passwd: ethereum`.

## Validadores {#validators}

Um validador também pode ser adicionado opcionalmente ao cliente de consenso. O software do validador permite que seu nó participe ativamente do consenso e fornece à rede segurança criptoeconômica. Você é recompensado por esse trabalho em ETH. Para executar um validador, você deve primeiro ter 32 ETH, que devem ser depositados no contrato de depósito. O depósito pode ser feito seguindo o guia passo a passo no [Launchpad](https://launchpad.ethereum.org/). Faça isso em um desktop/laptop, mas não gere chaves — isso pode ser feito diretamente no Raspberry Pi.

Abra um terminal no Raspberry Pi e execute o seguinte comando para gerar as chaves de depósito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Ou baixe o [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) para executar em uma máquina isolada da rede (airgapped) e execute o comando `deposit new-mnemnonic`)

Mantenha a frase mnemônica segura! O comando acima gerou dois arquivos no repositório de chaves do nó: as chaves do validador e um arquivo de dados de depósito. Os dados de depósito precisam ser enviados para o launchpad, portanto, devem ser copiados do Raspberry Pi para o desktop/laptop. Isso pode ser feito usando uma conexão ssh ou qualquer outro método de copiar/colar.

Assim que o arquivo de dados de depósito estiver disponível no computador que executa o launchpad, ele poderá ser arrastado e solto no `+` na tela do launchpad. Siga as instruções na tela para enviar uma transação para o contrato de depósito.

De volta ao Raspberry Pi, um validador pode ser iniciado. Isso requer a importação das chaves do validador, a configuração do endereço para coletar recompensas e, em seguida, o início do processo do validador pré-configurado. O exemplo abaixo é para o Lighthouse — instruções para outros clientes de consenso estão disponíveis na [documentação do Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importe as chaves do validador
lighthouse account validator import --directory=/home/ethereum/validator_keys

# defina o endereço de recompensa
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# inicie o validador
sudo systemctl start lighthouse-validator
```

Parabéns, agora você tem um nó completo da Ethereum e um validador em execução em um Raspberry Pi!

## Mais detalhes {#more-details}

Esta página forneceu uma visão geral de como configurar um nó Geth-Lighthouse e um validador usando o Raspberry Pi. Instruções mais detalhadas estão disponíveis no [site do Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Agradecemos o feedback {#feedback-appreciated}

Sabemos que o Raspberry Pi tem uma enorme base de usuários que pode ter um impacto muito positivo na integridade da rede Ethereum.
Por favor, aprofunde-se nos detalhes deste tutorial, tente executar em redes de teste, confira o GitHub do Ethereum on Arm, dê feedback, levante problemas (issues) e solicitações de pull (pull requests) e ajude a avançar a tecnologia e a documentação!

## Referências {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org