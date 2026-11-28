---
title: "Execute um nó da Ethereum em um Raspberry Pi 5"
description: "Grave a imagem no seu Raspberry Pi 5, conecte um cabo ethernet, conecte o disco NVMe e ligue o dispositivo para transformar o Raspberry Pi 5 em um nó completo da Ethereum + validador"
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

- Raspberry Pi 5 com 16 GB de RAM
- Um NVMe HAT para o Raspberry Pi 5, para conectar um disco NVMe
- SSD NVMe (M.2 2280), mínimo de 4 TB. Evite discos com um controlador Phison, que têm problemas de compatibilidade conhecidos.
- Cartão MicroSD (mínimo de 16 GB Classe 10)
- Fonte de alimentação
- Cabo Ethernet
- Encaminhamento de porta (veja os clientes para mais informações)
- Um case com dissipador de calor
- Teclado USB, monitor e cabo HDMI (micro-HDMI) (Opcional)

O Ethereum on Arm também suporta outras placas ARM, como o NanoPC T6, Rock 5B e Orange Pi 5 Plus. Essas placas têm suporte nativo a NVMe, então a equipe do Ethereum on Arm as recomenda em vez do Raspberry Pi 5 se você estiver comprando hardware novo. Veja a [lista de hardware recomendado](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) para mais detalhes. O restante deste tutorial é o mesmo para todas as placas suportadas, exceto pelo arquivo de imagem que você baixa.

## Por que executar a Ethereum em ARM? {#why-run-ethereum-on-arm}

As placas ARM são computadores pequenos, flexíveis e muito acessíveis. Elas são boas escolhas para executar nós da Ethereum porque podem ser compradas por um preço baixo, configuradas para que todos os seus recursos se concentrem apenas no nó, tornando-as eficientes, consomem pouca energia e são fisicamente pequenas, podendo caber de forma discreta em qualquer casa. Também é muito fácil iniciar nós porque o MicroSD do Raspberry Pi pode simplesmente ser gravado com uma imagem pré-construída, sem a necessidade de baixar ou compilar software.

## Como funciona? {#how-does-it-work}

O cartão de memória do Raspberry Pi é gravado com uma imagem pré-construída. Esta imagem contém tudo o que é necessário para executar um nó da Ethereum. Com um cartão gravado, tudo o que o usuário precisa fazer é ligar o Raspberry Pi. Todos os processos necessários para executar o nó são iniciados automaticamente. Isso funciona porque o cartão de memória contém um sistema operacional (SO) baseado em Linux, sobre o qual processos em nível de sistema são executados automaticamente, transformando a unidade em um nó da Ethereum.

As imagens do Ethereum on Arm são baseadas em uma distribuição Linux de 64 bits otimizada para executar um nó da Ethereum e incluem clientes da Ethereum pré-construídos.

**As imagens cuidam de todas as etapas necessárias**, desde a configuração do ambiente e formatação do disco NVMe até a instalação do software da Ethereum.

## Nota sobre clientes de execução e consenso {#note-on-execution-and-consensus-clients}

A imagem do Ethereum on Arm inclui clientes de execução e de consenso pré-construídos como serviços. Um nó da Ethereum exige que ambos os clientes estejam sincronizados e em execução. Você só precisa baixar e gravar a imagem e, em seguida, iniciar os serviços. A imagem é pré-carregada com vários clientes de execução (como Geth, o Nethermind, Besu, o Erigon e Reth) e clientes de consenso (como Lighthouse, Prysm, Teku, Nimbus e Lodestar). Veja a [documentação do Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) para a lista atual.

Você deve escolher um de cada para executar - todos os clientes de execução são compatíveis com todos os clientes de consenso. Este tutorial usa Geth e Lighthouse.

## Baixando a imagem {#downloading-the-image}

A imagem do Ethereum on Arm é uma imagem "plug and play" que instala e configura automaticamente os clientes de execução e de consenso, configurando-os para se comunicarem entre si e se conectarem à rede Ethereum. Tudo o que o usuário precisa fazer é iniciar seus processos usando um comando simples.

Baixe a imagem mais recente para a sua placa na [página de download do Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). A página de download também lista o checksum SHA-256 de cada imagem. Verifique o arquivo baixado com ele:

```sh
# Do diretório contendo a imagem baixada
sha256sum ethonarm_rpi5_<version>.img.zip
# Compare a saída com o checksum na página de download
```

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
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

O cartão agora está gravado, então pode ser inserido no Raspberry Pi.

## Inicie o nó {#start-the-node}

Com o cartão SD inserido no Raspberry Pi, conecte o cabo ethernet e o disco NVMe e, em seguida, ligue a energia. O SO inicializará e começará automaticamente a executar as tarefas pré-configuradas que transformam o Raspberry Pi em um nó da Ethereum, incluindo a formatação do disco NVMe e a instalação do software cliente. Isso provavelmente levará de 10 a 15 minutos, e a placa reinicia automaticamente quando terminar. Não interrompa a fonte de alimentação durante esse período.

Assim que tudo estiver instalado e configurado, faça login no dispositivo por meio de uma conexão ssh ou usando o terminal diretamente se um monitor e teclado estiverem conectados à placa. Use a conta `ethereum` para fazer login, pois ela tem as permissões necessárias para iniciar o nó.

```shell
User: ethereum
Password: ethereum
```

Você será solicitado a alterar a senha padrão no seu primeiro login. Faça isso, porque qualquer pessoa que possa acessar seu nó poderia fazer login com a senha padrão. O firewall do sistema está desativado por padrão, portanto, se o seu nó tiver um endereço IP público, consulte o [guia de segurança do Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) para ativá-lo.

Inicie o cliente de consenso primeiro. Abra a porta 9000 (TCP e UDP) no seu roteador para que o Lighthouse possa encontrar e se conectar aos pares. Em seguida, ative e inicie o serviço lighthouse, para que ele também reinicie após uma reinicialização:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Verifique o cliente usando os logs:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Em seguida, inicie o cliente de execução. Abra a porta 30303 (TCP e UDP) no seu roteador para que o Geth possa encontrar e se conectar aos pares. Em seguida, ative e inicie o serviço geth:

```sh
sudo systemctl enable --now geth
```

Você pode confirmar que ele está em execução verificando os logs:

```sh
sudo journalctl -u geth -f
```

Observe que o cliente de consenso sincronizará em alguns minutos porque usa a sincronização de ponto de verificação. O cliente de execução levará mais tempo - potencialmente várias horas. Ambos os clientes são executados ao mesmo tempo: o cliente de consenso informa ao cliente de execução qual bloco é o topo da cadeia, e o cliente de execução baixa e verifica os blocos até ele.

Com os serviços Geth e Lighthouse em execução e sincronizados, seu Raspberry Pi agora é um nó da Ethereum! É mais comum interagir com a rede Ethereum usando o console JavaScript do Geth, que pode ser anexado ao cliente Geth na porta 8545. Também é possível enviar comandos formatados como objetos JSON usando uma ferramenta de solicitação como o Curl. Veja mais na [documentação do Geth](https://geth.ethereum.org/).

A imagem também inclui um painel do Grafana que usuários mais avançados podem usar para monitorar a integridade de seu nó, navegando até `ipaddress:3000` em um navegador.

## Validadores {#validators}

Um validador também pode ser adicionado opcionalmente ao cliente de consenso. O software do validador permite que seu nó participe ativamente do consenso e fornece à rede segurança criptoeconômica. Você é recompensado por esse trabalho em ETH. Para executar um validador, você deve primeiro ter 32 ETH, que devem ser depositados no contrato de depósito. O depósito pode ser feito seguindo o guia passo a passo no [Launchpad](https://launchpad.ethereum.org/). Faça isso em um desktop/laptop, mas não gere chaves — isso pode ser feito diretamente no Raspberry Pi.

A ferramenta [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) gera chaves de validador. As imagens atuais a incluem; se você estiver executando uma imagem mais antiga, instale-a primeiro. Em seguida, gere as chaves de depósito, substituindo `<YOUR_ETH_ADDRESS>` pelo endereço que deve receber seus saques:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Ou baixe o [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) para executar em uma máquina isolada da rede (airgapped) e execute o comando `deposit new-mnemonic` lá)

Mantenha a frase mnemônica segura! O comando acima gerou dois arquivos no diretório `validator_keys`: as chaves do validador e um arquivo de dados de depósito. Os dados de depósito precisam ser enviados para o launchpad, portanto, devem ser copiados do Raspberry Pi para o desktop/laptop. Isso pode ser feito usando uma conexão ssh ou qualquer outro método de copiar/colar.

Assim que o arquivo de dados de depósito estiver disponível no computador que executa o launchpad, ele pode ser arrastado e solto no `+` na tela do launchpad. Siga as instruções na tela para enviar uma transação para o contrato de depósito.

De volta ao Raspberry Pi, um validador pode ser iniciado. Isso requer a importação das chaves do validador, a configuração do endereço para coletar recompensas e, em seguida, o início do processo do validador pré-configurado. O exemplo abaixo é para o Lighthouse — instruções para outros clientes de consenso estão disponíveis na [documentação do Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# importe as chaves do validador
lighthouse account validator import --directory=/home/ethereum/validator_keys

# defina o endereço de recompensa (substitua <YOUR_ETH_ADDRESS> pelo seu endereço)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# inicie o validador
sudo systemctl enable --now lighthouse-validator
```

Parabéns, agora você tem um nó completo da Ethereum e um validador em execução em um Raspberry Pi!

## Mais detalhes {#more-details}

Esta página forneceu uma visão geral de como configurar um nó Geth-Lighthouse e um validador usando o Raspberry Pi. Instruções mais detalhadas estão disponíveis no [site do Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Agradecemos o feedback {#feedback-appreciated}

Sabemos que o Raspberry Pi tem uma enorme base de usuários que pode ter um impacto muito positivo na integridade da rede Ethereum.
Por favor, aprofunde-se nos detalhes deste tutorial, tente executar em redes de teste, confira o [GitHub do Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), dê feedback, levante problemas (issues) e pull requests e ajude a avançar a tecnologia e a documentação!

## Referências {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
