---
title: Como transformar o Raspberry Pi 4 em um nó apenas instalando o cartão MicroSD
description: Piscar seu Raspberry Pi 4, plugar em um cabo ethernet, conectar o disco SSD e ligar o dispositivo para transformar o Raspberry Pi 4 em um nó Ethereum completo + validador
author: "EthereumOnArm"
tags:
  - "clientes"
  - "camada de execução"
  - "camada de consenso"
  - "nós"
lang: pt-br
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**A Ethereum on Arm é uma imagem personalizada de Linux que pode transformar um Raspberry Pi em um nó Ethereum.**

Para usar Ethereum on Arm para transformar um Raspberry Pi em um nó Ethereum, recomenda-se o seguinte hardware:

- Raspberry 4 (modelo B 8 GB), placa mãe Odroid M1 ou Rock 5B (8 GB/16 GB RAM)
- Cartão MicroSD (mínimo 16 GB Classe 10)
- 2 TB SSD minimum USB 3.0 disk ou um SSD com USB para SATA case.
- Fonte de alimentação
- Cabo da Ethernet
- Encaminhamento de porta (consulte os clientes para obter mais informações)
- Uma case com dissipador de calor e cooler
- Teclado USB, Monitor e cabo HDMI (micro-HDMI) (Opcional)

## Por que executar Ethereum no ARM? {#why-run-ethereum-on-arm}

Os painéis ARM são computadores muito acessíveis, flexíveis e pequenos. Eles são boas escolhas para rodar os nós do Ethereum porque são baratos, configurados de forma que todos os recursos foquem em apenas um nó, tornando-os mais eficiente; eles consomem energia e são fisicamente menores, assim cabendo em qualquer casa. Também é muito fácil de rodar nós porque o cartão de memória do Raspberry Pi pode simplesmente ser ligado com uma imagem pré montada, sem precisar de download ou software de montagem.

## Como funciona? {#how-does-it-work}

O cartão de memória do Raspberry Pi já vem com uma imagem pré montada. Esta imagem contém tudo o que é necessário para executar um nó da Ethereum. Com um cartão flash, tudo o que o usuário precisa fazer é ligar o Raspberry Pi. Todos os processos necessários para executar o nó são iniciados automaticamente. Isso funciona porque o cartão de memória contém um sistema operacional baseado no Linux (OS) na qual os processos em nível de sistema rodam automaticamente e se tornam a unidade em um nó de Ethereum.

O Ethereum não pode rodar usando o popular Raspberry Pi Linux "Raspbian" porque o Raspbian ainda usa uma arquitetura de 32 bits que leva os Usuários do Ethereum a ter problemas com memória e o cliente de consenso não suporta binários de 32-bits. Para superar isso, a Ethereum on Arm migrou para um OS nativo de 64 bits chamado "Armbian".

**As imagens cuidam de todos os passos necessários**, desde configurar o ambiente e formatar o disco SSD até instalar e executar o “software” Ethereum, bem como iniciar a sincronização da blockchain.

## Execução de acoplamento e clientes de consenso {#note-on-execution-and-consensus-clients}

A imagem do Ethereum on Arm incluí uma execução pré construída e o cliente de consenso como serviços. Um nó Ethereum exige que ambos os clientes estejam sincronizados e executados. Você só precisa fazer o download, instalar a imagem flash e iniciar os serviços. A imagem é pré carregada com os seguintes clientes de execução:

- Geth
- Nethermind
- Besu

e os seguintes clientes de consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Você deve escolher um de cada para executar - todos os clientes de execução são compatíveis com todos os clientes de consenso. Se você não selecionar explicitamente um cliente, o nó vai voltar aos seus padrões - Geth e Lighthouse - e executá-los automaticamente quando o quadro estiver ligado. Você precisa abrir a porta 30303 no seu roteador para o Geth Encontrar e conectar-se aos pares.

## Baixando imagem {#downloading-the-image}

A imagem Ethereum Raspberry Pi 4 é uma imagem "plug and play" que vai instalar automaticamente e configurar ambos clientes de consenso e de execução, configurando-os para conversarem entre si e conectarem-se à rede Ethereum. Tudo o que o usuário precisa fazer é iniciar seus processos usando um simples comando.

Baixe a imagem do Raspberry Pi em [Ethereum no Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) e verifique o hash SHA256:

```sh
# From directory containing the downloaded image
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash should output: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Note que as imagens para as placas Rock 5B e Odroid M1 estão disponíveis no Ethereum-On-Arm [página de downloads](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html).

## Instalando o MicroSD {#flashing-the-microsd}

O cartão MicroSD que vai ser usado no Raspberry Pi deve ser primeiro inserido em um desktop ou laptop para que seja instalado. Em seguida, os seguintes comandos do terminal instalarão a imagem baixada no cartão SD:

```shell
# check the MicroSD card name
sudo fdisk -l

>> sdxxx
```

É muito importante se atentar ao nome correto pois o próximo comando inclui`dd` que apaga completamente o conteúdo existente do cartão antes de instalar a imagem dentro nele. Para continuar, navegue até o diretório que contém a imagem compactada:

```shell
# unzip and flash image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

O cartão esta instalado, para que seja inserido no Raspberry Pi.

## Inicie o nó {#start-the-node}

Com o cartão SD inserido no Raspberry Pi, conecte o cabo Ethernet e SSD e então ligue o aparelho. O OS vai iniciar e automaticamente começará a executar as tarefas pré-configuradas que transformam o Raspberry Pi em um nó de Ethereum, incluindo a instalação e construção de um software cliente. Isso levará provavelmente 10-15 minutos.

Assim que tudo estiver instalado e configurado, faça login no dispositivo via uma conecção ssh ou usando o terminal diretamente se um monitor e teclado estiverem conectados à placa. Use a conta `ethereum` para logar, pois isso tem as permissões necessárioas para iniciar o nó.

```shell
Usuário: ethereum
Senha: Ethereum
```

O cliente de execução padrão, Geth, irá iniciar automaticamente. Você pode confirmar isso checando os logs usando o seguinte comando no terminal:

```sh
sudo journalctl -u geth -f
```

O cliente de consenso precisa de ser iniciado explicitamente. Para fazer isso, primeiro abra a porta 9000 no seu roteador para que o farol possa encontrar e se conectar a pares. Então habilite e inicie o serviço de lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Verifique o cliente usando os logs:

```sh
sudo journalctl -u lighthouse-beacon
```

Observe que o cliente de consenso irá sincronizar em alguns minutos porque ele usa a sincronização do ponto de controle. O cliente de execução vai levar mais tempo - Potencialmente algumas horas, e ele não vai executar até que o cliente de consenso termine de sincronizar (isso porque o cliente de execução precisa de um alvo para sincronizar, que o cliente de consenso sincronizado fornece).

Com os serviços Geth e Lighthouse sincronizados e rodando, seu Raspberry Pi agora é um nó de Ethereum! É mais comum interagir com a rede Ethereum utilizando o console Javascript do Geth, que pode ser anexado ao cliente Geth na porta 8545. Também é possível enviar comandos formatados como objetos JSON usando uma ferramenta de solicitação como o Curl. Veja mais em [Documentação Geth](https://geth.ethereum.org/).

Geth é pré configurado para enviar relatórios pro painel Grafana, que pode ser visto no seu navegador. Usuários mais avançados podem querer usar este recurso para monitorar a saúde do seu nó navegando para `ipaddress.3000`, passing`usuário: admin` e `senha:ethereum`.

## Validadores {#validators}

Um validador também pode ser opcionalmente adicionado ao cliente de consenso. O software validador permite seu nó de participar ativamente no consenso e fornece a rede com segurança criptoeconomica. Você será recompensado por este trabalho em ETH. Para rodar um validador, você precisa primeiro ter 32 ETH, que precisa ser depositado em um contrato de depósito. **Este é um termo de compromisso a longo prazo - ainda não é possível sacar este ETH!**. O depósito pode ser feito seguindo o passo a passo no [Launchpad](https://launchpad.ethereum.org/). Faça isso em um desktop/laptop, mas não gere chaves — isso pode ser feito diretamente no Raspberry Pi.

Abra um terminal no Raspberry Pi e execute o seguinte comando para gerar as chaves de depósito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

Mantenha a frase mnemônica segura! O comando acima gerou dois arquivos no keystore: as chaves validadoras e um arquivo de dados de depósito. Os dados do depósito precisam ser carregados no launchpad, portanto, devem ser copiados do Raspberry Pi para o desktop/laptop. Isso pode ser feito usando uma conexão ssh ou qualquer outro método de copiar/colar.

Uma vez que o arquivo de dados do depósito estiver disponível no computador que executa o launchpad, ele pode ser arrastado e solto no `+` na tela do launchpad. Siga as instruções na tela para enviar uma transação para o contrato de depósito.

De volta ao Raspberry Pi, um validador pode ser iniciado. Isso requer importar as chaves do validador, definir o endereço para coletar recompensas e, em seguida, iniciar o processo do validador pré-configurado. O exemplo abaixo é para o Lighthouse - instruções para outros clientes de consenso estão disponíveis na [Ethereum on Arm docs](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# import the validator keys
lighthouse account validator import --directory=/home/ethereum/validator_keys

# set the reward address
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# start the validator
sudo systemctl start lighthouse-validator
```

Parabéns, agora você tem um nó Ethereum completo e um validador rodando em um Raspberry Pi!

## Mais detalhes {#more-details}

Esta página deu uma visão geral de como configurar um nó e validador Geth-Lighthouse usando Raspberry Pi. Instruções mais detalhadas estão disponíveis no [site Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Agradecemos o feedback {#feedback-appreciated}

Sabemos que o Raspberry Pi tem uma enorme base de usuários, que pode ter um impacto muito positivo na saúde da rede Ethereum. Por favor, explore os detalhes deste tutorial, tente rodar em redes de teste, confira o Ethereum on Arm pelo GitHub, dê feedback, levante questões e pull requests e ajude a avançar a tecnologia e a documentação!

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
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
