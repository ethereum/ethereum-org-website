---
title: Como transformar o Raspberry Pi 4 em um nó apenas instalando o cartão MicroSD
description: Formate seu Raspberry Pi 4, conecte um cabo de ethernet e um disco SSD, e ligue o dispositivo. Desta maneira, você terá transformado seu Raspberry Pi 4 em um full node de Ethereum, executando a camada de execução, ou a camada de consendo (Beacon Chain/validador)
author: "EthereumOnArm"
tags:
  - "clientes"
  - "camada de execução"
  - "camada de consenso"
  - "nós"
lang: pt-br
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: formate seu Raspberry Pi 4, conecte um cabo de rede e um disco SSD, e ligue o dispositivo. Desta maneira, você terá transformado seu Raspberry Pi 4 em um nó completo do Ethereum, executando a camada de execução, ou a camada de consenso (Beacon Chain/validador)

[Aprenda sobre as implementações no Ethereum](/roadmap/)

Um pouco de contexto primeiro. Como você sabe, tivemos alguns problemas de memória [[1]](/developers/tutorials/run-node-raspberry-pi/#references) com a imagem do Raspberry Pi 4, já que o Raspbian OS ainda está em 32 bits [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (pelo menos no nível de usuário). Embora preferíssemos manter o sistema operacional oficial, chegamos à conclusão que, para resolver esses problemas, precisamos migrar para um sistema operacional nativo de 64 bits.

Além disso, os clientes de consenso não suportam binários de 32 bits, então usar o sistema operacional Raspbian impediria que o Raspberry Pi executasse um nó da camada de consenso (e também a possibilidade de fazer staking).

Portanto, após vários testes, estamos lançando 2 imagens diferentes baseadas no Ubuntu 20.04 de 64 bits [[3]](/developers/tutorials/run-node-raspberry-pi/#references): edições para a camada de execução e para camada de consenso.

Basicamente, ambos são a mesma imagem e incluem as mesmas funcionalidades das imagens baseadas em Raspbian. Mas elas estão configuradas para executar o “software” da camada de execução ou da camada de consenso por padrão.

**As imagens cuidam de todos os passos necessários**, desde configurar o ambiente e formatar o disco SSD até instalar e executar o “software” Ethereum, bem como iniciar a sincronização da blockchain.

## Principais recursos {#main-features}

- Baseado no Ubuntu 20.04 de 64 bits
- Particionamento e formatação automáticas do disco USB
- Adiciona memória de troca (módulo de “kernel” ZRAM + um arquivo de troca) com base no trabalho do Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Muda o nome do computador para algo como "ethnode-e2a3e6fe" baseado no hash MAC
- Executa o “software” como um serviço systemd e começa a sincronizar a Blockchain
- Inclui um repositório APT para instalar e atualizar o “software” Ethereum
- Inclui um painel de monitoramento baseado no Grafana/Prometheus

## Software incluído {#software-included}

Ambas as imagens incluem os mesmos pacotes, a única diferença entre elas é que, por padrão, a versão de execução executa o Geth e a versão de consenso executa o Prysm Beacon Chain.

### Clientes de execução {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (binário oficial)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (compilação cruzada)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (compilação cruzada)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (compilado)

### Clientes de consenso {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (binário oficial)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (compilado)

### Estrutura Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (binário oficial)
- Raiden Network[[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (binário oficial)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (binário oficial)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (compilado)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (binário oficial)

## Guia de instalação e uso {#installation-guide-and-usage}

### Configuração e equipamentos recomendados {#recommended-hardware-and-setup}

- Raspberry 4 (modelo B) - 4GB
- Cartão MicroSD (mínimo 16 GB Classe 10)
- Disco SSD 3.0 (ver seção de armazenamento)
- Fonte de alimentação
- Cabo de rede
- Redirecionamento da porta 30303 (camada de execução) e da porta 13000 (camada de consenso) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Um gabinete com dissipador de calor e ventilador (opcional, mas altamente recomendado)
- Teclado USB, Monitor e cabo HDMI (microHDMI) (opcional)

## Armazenamento {#storage}

Você precisará de um SSD para executar os clientes Ethereum (sem um drive SSD não há absolutamente nenhuma chance de sincronizar a blockchain Ethereum). Existem 2 opções:

- Use um disco SSD portátil USB, como o SSD Portátil Samsung T5.
- Use um disco externo USB 3.0 com um disco SSD. No nosso caso, utilizamos um disco rígido de 2,5 polegadas Inateck FE2011. Certifique-se de comprar um "case" com um chip compatível com UAS, particularmente, um desses: JMicron (JMS567 or JMS578) ou ASMedia (ASM1153E).

Em ambos os casos, evite obter discos SSD de baixa qualidade, pois é um componente fundamental do seu nó e pode afetar drasticamente o desempenho (e o tempo de sincronização).

Tenha em mente que você precisa conectar o disco a uma porta USB 3.0 (azul)

## Download e instalação de imagens {#image-download-and-installation}

### 1. Baixar as imagens das camadas de execução e de consenso {#1-download-execution-or-consensus-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Baixar imagem da camada de execução
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Baixar imagem da camada de consenso
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Instalar a imagem {#2-flash-the-image}

Insira o microSD no seu computador e baixe o arquivo (camada de execução, por exemplo):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstaladod-server-arm64+raspi-eth1.img.zip
```

Nota: Se você não estiver cômodo com a linha de comando ou se estiver executando o Windows, você pode usar o [Etcher](https://etcher.io)

Abra um terminal e verifique o nome do seu MicroSD em execução:

```bash
sudo fdisk -l
```

Você deve ver um dispositivo chamado mmcblk0 ou sdd. Descompactar e instalar a imagem:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Insira o MicroSD no Raspberry Pi 4. Conecte um cabo de rede e conecte o disco SSD USB (certifique-se de estar usando uma porta azul). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Ligue o dispositivo {#4-power-on-the-device}

O sistema operacional Ubuntu se iniciará em menos de um minuto, mas **você precisará esperar aproximadamente 10 minutos** para permitir que o script execute as tarefas necessárias para transformar o dispositivo em um nó Ethereum e reiniciar o Raspberry.

Dependendo da imagem, você estará executando:

- Cliente de execução: Geth como o cliente padrão que sincroniza a blockchain
- Cliente de consenso: Prysm como cliente padrão que sincroniza a Beacon Chain (rede de teste Goerli)

### 5. Iniciar sessão {#5-log-in}

Você pode fazer login através do SSH ou usando o console (se você tiver um monitor e teclado conectados)

```bash
Usuário: ethereum
Senha: Ethereum
```

Você será solicitado a alterar a senha no primeiro login, então você precisará se conectar duas vezes.

### 6. Abra a porta 30303 para Geth e 13000 se estiver executando a Beacon Chain Prysm. Se você não sabe como fazer isso, faça uma busca no Google de "encaminhamento de porta", seguido pelo seu modelo de roteador. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Ver a saída no console {#7-get-console-output}

Você pode ver o que está acontecendo em segundo plano digitando:

```bash
sudo tail -f /var/log/syslog
```

**Parabéns. Agora você está executando um nó Ethereum completo no seu Raspberry Pi 4.**

## Sincronizando a Blockchain {#syncing-the-blockchain}

Agora você precisa esperar que a blockchain seja sincronizada. No caso da camada de execução, esse processo levará alguns dias dependendo de vários fatores, mas você pode esperar algo entre 5 – 7 dias.

Se está executando a rede de teste Goerli para a camada de consenso, você pode esperar entre 1–2 dias para a sincronização da Beacon Chain. Lembre-se de que precisará configurar o validador mais tarde para iniciar o processo de apostas. [Como executar o validador da camada de consenso](/developers/tutorials/run-node-raspberry-pi/#validator)

## Painéis de monitoramento {#monitoring-dashboards}

Para esta primeira versão, incluímos 3 dashboards de monitoramento com base no Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) para monitorar os dados do nó e dos clientes (Geth e Besu). Você pode acessar através do seu navegador:

```bash
URL: http://your_raspberrypi_IP:3000
Usuário: admin
Senha: ethereum
```

## Alternando clientes {#switching-clients}

Todos os clientes são executados como um serviço systemd. Isto é importante porque, se surgir um problema, o sistema recomeçará automaticamente o processo.

Geth and Prysm beacon chain run by default (depending on what you are synchronizing, execution layer or consensus layer) so, if you want to switch to other clients (from Geth to Nethermind, for instance), you need to stop and disable Geth first, and enable and start the other client:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Comandos para habilitar e iniciar cada cliente de execução:

```bash
sudo systemctl habilita besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Clientes de consenso:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable light thouse
```

## Modificando parâmetros {#changing-parameters}

Os arquivos de configuração do cliente estão localizados no diretório /etc/ethereum/. Você pode editar esses arquivos e reiniciar o serviço do sistema para que as alterações tenham efeito. A única exceção é o Nethermind que, além disso, tem um arquivo de configuração Mainnet localizado aqui:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Os dados dos clientes Blockchain são armazenados no diretório inicial da conta Ethereum do seguinte modo (observe o ponto antes do nome do diretório):

### Camada de execução {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Camada de consenso {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind e Hyperledger Besu {#nethermind-and-hyperledger-besu}

Estes 2 grandes clientes de execução tornaram-se uma ótima alternativa ao Geth e Parity. Quanto maior a diversidade na rede melhor. Testá-los contribui para a integridade da rede.

Ambos precisam de mais testes, por isso sinta-se livre para testá-los e compartilhar suas impressões.

## Como gerenciar o validador do consenso (staking) {#validator}

Uma vez que a Beacon Chain da rede de teste Goerli for sincronizada, você vai poder executar um validador no mesmo dispositivo. Você precisará seguir [essas etapas de participação](https://prylabs.net/participate).

Na primeira vez, você precisa criar uma conta manualmente executando o binário "validador" e configurando uma senha. Depois de concluir esta etapa, você pode adicionar a senha a `/etc/ethereum/prysm-validator.conf` e iniciar o validador como um serviço systemd.

## Agradecemos o feedback {#feedback-appreciated}

Nos esforçamos muito para configurar o Raspberry Pi 4 como um nó Ethereum completo, pois sabemos que a base de usuários massiva deste dispositivo pode causar um impacto muito positivo na rede.

Como esta é a primeira imagem baseada no Ubuntu 20.04, pode haver alguns erros. Caso haja, informe o problema no [GitHub](https://github.com/diglos/ethereumonarm) ou entre em contato conosco no [Twitter](https://twitter.com/EthereumOnARM).

## Referências {#references}

1. [geth falha repetidamente com SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. **Note que o OpenEthereum [foi descontinuado](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e não está mais sendo mantido.** Use-o com cuidado e de preferência mude para outra implementação de cliente.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
