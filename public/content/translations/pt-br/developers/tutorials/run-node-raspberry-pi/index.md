---
title: Execute um nó Ethereum em um Raspberry Pi 4
description: Flasheie seu Raspberry Pi 4, conecte um cabo de ethernet, conecte o disco SSD e ligue o dispositivo para transformar o Raspberry Pi 4 em um nó Ethereum completo + validador
author: "EthereumOnArm"
tags:
  [
    "clientes",
    "camada de execução",
    "camada de consenso",
    "nós"
  ]
lang: pt-br
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**O Ethereum on Arm é uma imagem Linux personalizada que pode transformar um Raspberry Pi em um nó Ethereum.**

Para usar o Ethereum on Arm para transformar um Raspberry Pi em um nó Ethereum, o seguinte hardware é recomendado:

- Placa Raspberry 4 (modelo B 8GB), Odroid M1 ou Rock 5B (8GB/16GB de RAM)
- Cartão MicroSD (mínimo de 16 GB Classe 10)
- Disco SSD de no mínimo 2 TB com USB 3.0 ou um SSD com um case USB para SATA.
- Fonte de alimentação
- Cabo de Ethernet
- Encaminhamento de porta (consulte os clientes para obter mais informações)
- Um case com dissipador de calor e ventoinha
- Teclado USB, monitor e cabo HDMI (micro-HDMI) (Opcional)

## Por que executar o Ethereum em ARM? {#why-run-ethereum-on-arm}

As placas ARM são computadores pequenos, flexíveis e muito acessíveis. Elas são boas escolhas para executar nós Ethereum por serem baratas e configuráveis para que todos os seus recursos se concentrem apenas no nó, tornando-as eficientes. Consomem pouca energia e são fisicamente pequenas, cabendo discretamente em qualquer casa. Também é muito fácil iniciar nós, pois o MicroSD do Raspberry Pi pode simplesmente ser gravado com uma imagem pré-construída, sem a necessidade de baixar ou construir nenhum software.

## Como isso funciona? {#how-does-it-work}

O cartão de memória do Raspberry Pi é gravado com uma imagem pré-construída. Esta imagem contém tudo o que é necessário para executar um nó da Ethereum. Com um cartão flasheado, tudo o que o usuário precisa fazer é ligar o Raspberry Pi. Todos os processos necessários para executar o nó são iniciados automaticamente. Isso funciona porque o cartão de memória contém um sistema operacional (SO) baseado em Linux, sobre o qual processos de nível de sistema são executados automaticamente que transformam a unidade em um nó Ethereum.

O Ethereum não pode ser executado usando o popular SO Linux para Raspberry Pi "Raspbian", pois o Raspbian ainda usa uma arquitetura de 32 bits, o que leva os usuários do Ethereum a terem problemas de memória, e os clientes de consenso não suportam binários de 32 bits. Para superar isso, a equipe Ethereum on Arm migrou para um SO nativo de 64 bits chamado "Armbian".

**As imagens cuidam de todas as etapas necessárias**, desde a configuração do ambiente e a formatação do disco SSD até a instalação e execução do software Ethereum, bem como o início da sincronização da cadeia de blocos.

## Nota sobre clientes de execução e de consenso {#note-on-execution-and-consensus-clients}

A imagem do Ethereum on Arm inclui clientes de execução e de consenso pré-construídos como serviços. Um nó Ethereum exige que ambos os clientes estejam sincronizados e em execução. Você só precisa baixar e gravar a imagem e, em seguida, iniciar os serviços. A imagem é pré-carregada com os seguintes clientes de execução:

- Geth
- Nethermind
- Besu

e os seguintes clientes de consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Você deve escolher um de cada para executar. Todos os clientes de execução são compatíveis com todos os clientes de consenso. Se você não selecionar explicitamente um cliente, o nó voltará aos padrões — Geth e Lighthouse — e os executará automaticamente quando a placa for ligada. Você precisa abrir a porta 30303 no seu roteador para que o Geth possa encontrar e se conectar aos pares.

## Baixando a imagem {#downloading-the-image}

A imagem Ethereum para Raspberry Pi 4 é uma imagem "plug and play" que instala e configura automaticamente os clientes de execução e de consenso, configurando-os para se comunicarem e se conectarem à rede Ethereum. Tudo o que o usuário precisa fazer é iniciar seus processos usando um comando simples.

Baixe a imagem do Raspberry Pi do [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) e verifique o hash SHA256:

```sh
# Do diretório que contém a imagem baixada
shasum -a 256 ethonarm_22.04.00.img.zip
# A saída do hash deve ser: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Observe que as imagens para as placas Rock 5B e Odroid M1 estão disponíveis na [página de downloads](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) do Ethereum-on-Arm.

## Gravando a imagem no MicroSD {#flashing-the-microsd}

O cartão MicroSD que será usado para o Raspberry Pi deve primeiro ser inserido em um desktop ou laptop para que possa ser gravado. Em seguida, os seguintes comandos do terminal gravarão a imagem baixada no cartão SD:

```shell
# verifique o nome do cartão MicroSD
sudo fdisk -l

>> sdxxx
```

É muito importante usar o nome correto, pois o próximo comando inclui `dd`, que apaga completamente o conteúdo existente do cartão antes de gravar a imagem nele. Para continuar, navegue até o diretório que contém a imagem compactada:

```shell
# descompacte e grave a imagem
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

O cartão agora está gravado, então pode ser inserido no Raspberry Pi.

## Inicie o nó {#start-the-node}

Com o cartão SD inserido no Raspberry Pi, conecte o cabo de Ethernet e o SSD e, em seguida, ligue o dispositivo. O SO será inicializado e começará a executar automaticamente as tarefas pré-configuradas que transformam o Raspberry Pi em um nó Ethereum, incluindo a instalação e a criação do software do cliente. Isso provavelmente levará de 10 a 15 minutos.

Depois que tudo estiver instalado e configurado, faça login no dispositivo por meio de uma conexão ssh ou usando o terminal diretamente se um monitor e um teclado estiverem conectados à placa. Use a conta `ethereum` para fazer login, pois ela tem as permissões necessárias para iniciar o nó.

```shell
Usuário: ethereum
Senha: ethereum
```

O cliente de execução padrão, Geth, iniciará automaticamente. Você pode confirmar isso verificando os logs com o seguinte comando de terminal:

```sh
sudo journalctl -u geth -f
```

O cliente de consenso precisa ser iniciado explicitamente. Para fazer isso, primeiro abra a porta 9000 no seu roteador para que o Lighthouse possa encontrar e se conectar aos pares. Em seguida, ative e inicie o serviço Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Verifique o cliente usando os logs:

```sh
sudo journalctl -u lighthouse-beacon
```

Observe que o cliente de consenso será sincronizado em poucos minutos, pois ele usa a sincronização por checkpoint. O cliente de execução levará mais tempo (potencialmente várias horas) e não será iniciado até que o cliente de consenso termine a sincronização (isso ocorre porque o cliente de execução precisa de um alvo para sincronizar, que é fornecido pelo cliente de consenso já sincronizado).

Com os serviços Geth e Lighthouse em execução e sincronizados, seu Raspberry Pi agora é um nó Ethereum! É mais comum interagir com a rede Ethereum utilizando o console Javascript do Geth, que pode ser anexado ao cliente Geth na porta 8545. Também é possível enviar comandos formatados como objetos JSON usando uma ferramenta de solicitação como o Curl. Veja mais na [documentação do Geth](https://geth.ethereum.org/).

O Geth é pré-configurado para relatar métricas a um painel do Grafana que pode ser visualizado no navegador. Usuários mais avançados podem querer usar este recurso para monitorar a saúde de seu nó navegando para `ipaddress:3000`, passando `usuário: admin` e `senha: ethereum`.

## Validadores {#validators}

Um validador também pode ser adicionado opcionalmente ao cliente de consenso. O software do validador permite que seu nó participe ativamente do consenso e fornece segurança criptoeconômica à rede. Você é recompensado por este trabalho em ETH. Para executar um validador, você deve primeiro ter 32 ETH, que devem ser depositados no contrato de depósito. O depósito pode ser feito seguindo o guia passo a passo na [Plataforma de lançamento](https://launchpad.ethereum.org/). Faça isso em um desktop/laptop, mas não gere chaves — isso pode ser feito diretamente no Raspberry Pi.

Abra um terminal no Raspberry Pi e execute o seguinte comando para gerar as chaves de depósito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Ou baixe o [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) para executar em uma máquina isolada (air-gapped) e execute o comando `deposit new-mnemnonic`)

Mantenha a frase mnemônica segura! O comando acima gerou dois arquivos no keystore do nó: as chaves do validador e um arquivo de dados de depósito. Os dados de depósito precisam ser carregados na plataforma de lançamento, portanto, eles devem ser copiados do Raspberry Pi para o desktop/laptop. Isso pode ser feito usando uma conexão ssh ou qualquer outro método de copiar/colar.

Quando o arquivo de dados de depósito estiver disponível no computador que executa a plataforma de lançamento, ele poderá ser arrastado e solto no `+` na tela da plataforma de lançamento. Siga as instruções na tela para enviar uma transação para o contrato de depósito.

De volta ao Raspberry Pi, um validador pode ser iniciado. Isso requer importar as chaves do validador, definir o endereço para coletar recompensas e, em seguida, iniciar o processo do validador pré-configurado. O exemplo abaixo é para o Lighthouse — as instruções para outros clientes de consenso estão disponíveis nos [documentos do Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importe as chaves do validador
lighthouse account validator import --directory=/home/ethereum/validator_keys

# defina o endereço de recompensa
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# inicie o validador
sudo systemctl start lighthouse-validator
```

Parabéns, agora você tem um nó e validador Ethereum completos em execução em um Raspberry Pi!

## Mais detalhes {#more-details}

Esta página deu uma visão geral de como configurar um nó e validador Geth-Lighthouse usando Raspberry Pi. Instruções mais detalhadas estão disponíveis no [site do Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Agradecemos o seu feedback {#feedback-appreciated}

Sabemos que o Raspberry Pi tem uma enorme base de usuários, que pode ter um impacto muito positivo na saúde da rede Ethereum.
Por favor, aprofunde-se nos detalhes deste tutorial, tente executá-lo em redes de teste, confira o GitHub do Ethereum on Arm, dê seu feedback, relate problemas e envie pull requests para ajudar no avanço da tecnologia e da documentação!

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
