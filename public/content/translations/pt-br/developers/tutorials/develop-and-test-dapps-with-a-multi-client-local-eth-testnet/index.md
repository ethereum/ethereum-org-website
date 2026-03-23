---
title: Como desenvolver e testar um dApp em uma rede de teste local multicliente
description: "Este guia primeiro o guiará por como instanciar e configurar uma rede de teste local multicliente do Ethereum antes de usar a rede de teste para implantar e testar um dApp."
author: "Tedi Mitiku"
tags:
  [
    "clientes",
    "nós",
    "smart contracts",
    "componibilidade",
    "camada de consenso",
    "camada de execução",
    "testando"
  ]
skill: intermediate
lang: pt-br
published: 2023-04-11
---

## Introdução {#introduction}

Este guia o orienta no processo de instanciar uma rede de teste local configurável do Ethereum, implantar um contrato inteligente nela e usar a rede de teste para executar testes em seu dApp. Este guia foi elaborado para desenvolvedores de dApps que queiram desenvolver e testar seus dApps localmente em diferentes configurações de rede antes de implantar em uma rede de teste ativa ou na rede principal.

Neste guia, você irá:

- Instanciar uma rede de teste local do Ethereum com o [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) usando [Kurtosis](https://www.kurtosis.com/),
- Conectar seu ambiente de desenvolvimento de dApp Hardhat à rede de teste local para compilar, implantar e testar um dApp, e
- Configurar a rede de teste local, incluindo parâmetros como o número de nós e pares de clientes EL/CL específicos, para permitir fluxos de trabalho de desenvolvimento e teste em várias configurações de rede.

### O que é Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) é um sistema de compilação componível projetado para configurar ambientes de teste de múltiplos contêineres. Ele permite especificamente que os desenvolvedores criem ambientes reprodutíveis que exigem lógica de configuração dinâmica, como redes de teste de blockchain.

Neste guia, o eth-network-package da Kurtosis inicia uma rede de teste local do Ethereum com suporte para o cliente da Camada de Execução (EL) [`geth`](https://geth.ethereum.org/), bem como para os clientes da Camada de Consenso (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) e [`lodestar`](https://lodestar.chainsafe.io/). Este pacote serve como uma alternativa configurável e componível para redes em frameworks como Hardhat Network, Ganache e Anvil. O Kurtosis oferece aos desenvolvedores maior controle e flexibilidade sobre as redes de teste que utilizam, que é uma das principais razões pelas quais a [Ethereum Foundation usou o Kurtosis para testar a Fusão](https://www.kurtosis.com/blog/testing-the-ethereum-merge) e continua a usá-lo para testar atualizações de rede.

## Configurando o Kurtosis {#setting-up-kurtosis}

Antes de prosseguir, certifique-se de que você tenha:

- [Instalado e iniciado o motor Docker](https://docs.kurtosis.com/install/#i-install--start-docker) em sua máquina local
- [Instalado o Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (ou o atualizou para a versão mais recente, se você já tiver o CLI instalado)
- Instalado [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) e [npx](https://www.npmjs.com/package/npx) (para o seu ambiente dApp)

## Instanciando uma rede de teste local do Ethereum {#instantiate-testnet}

Para iniciar uma rede de teste local do Ethereum, execute:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Observação: Este comando nomeia sua rede: "local-eth-testnet" usando a flag `--enclave`.

O Kurtosis imprimirá os passos que está a tomar internamente enquanto trabalha para interpretar, validar e executar as instruções. Ao final, você deverá ver um resultado semelhante ao seguinte:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Enclave criado: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Nome:            local-eth-testnet
UUID:            39372d756ae8
Status:          EM EXECUÇÃO
Horário da criação:   Ter, 04 Abr 2023 18:09:03 EDT

========================================= Artefatos de Arquivos =========================================
UUID           Nome
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== Serviços de Usuário ==========================================
UUID           Nome                                           Portas                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    EM EXECUÇÃO
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             EM EXECUÇÃO
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       EM EXECUÇÃO
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <nenhum>                                        PARADO
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <nenhum>                                        PARADO
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <nenhum>                                        PARADO

```

Parabéns! Você usou o Kurtosis para instanciar uma rede de teste local do Ethereum, com um cliente CL (`lighthouse`) e um cliente EL (`geth`), sobre Docker.

### Revisão {#review-instantiate-testnet}

Nesta seção, você executou um comando que instruiu o Kurtosis a usar o [`eth-network-package` hospedado remotamente no GitHub](https://github.com/kurtosis-tech/eth-network-package) para iniciar uma rede de teste local do Ethereum dentro de um [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) do Kurtosis. Dentro do seu enclave, você encontrará "artefatos de arquivo" e "serviços de usuário".

Os [Artefatos de arquivo](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) no seu enclave incluem todos os dados gerados e utilizados para inicializar os clientes EL e CL. Os dados foram criados usando o serviço `prelaunch-data-generator` construído a partir desta [imagem Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Os serviços de usuário exibem todos os serviços em contêineres operando no seu enclave. Você notará que um único nó, com um cliente EL e um cliente CL, foi criado.

## Conecte seu ambiente de desenvolvimento de dApp à rede de teste local do Ethereum {#connect-your-dapp}

### Configure o ambiente de desenvolvimento de dApp {#set-up-dapp-env}

Agora que você tem uma rede de teste local em execução, você pode conectar seu ambiente de desenvolvimento de dApp para usar sua rede de teste local. O framework Hardhat será usado neste guia para implantar um dApp de blackjack na sua rede de teste local.

Para configurar seu ambiente de desenvolvimento de dApp, clone o repositório que contém nosso dApp de exemplo e instale suas dependências, execute:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

A pasta [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) usada aqui contém a configuração típica para um desenvolvedor de dApp usando o framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contém alguns contratos inteligentes simples para um dApp de Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contém um script para implantar um contrato de token em sua rede Ethereum local
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contém um teste .js simples para seu contrato de token para confirmar que cada jogador em nosso dApp de Blackjack tem 1000 tokens emitidos para eles
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configura sua instalação do Hardhat

### Configurar o Hardhat para usar a rede de teste local {#configure-hardhat}

Com seu ambiente de desenvolvimento de dApp configurado, você agora conectará o Hardhat para usar a rede de teste local do Ethereum gerada usando o Kurtosis. Para fazer isso, substitua `<$YOUR_PORT>` na estrutura `localnet` no seu arquivo de configuração `hardhat.config.ts` pela porta da saída do URI rpc de qualquer serviço `el-client-<num>`. Neste caso de exemplo, a porta seria `64248`. Sua porta será diferente.

Exemplo em `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: SUBSTITUA $YOUR_PORT PELA PORTA DE UM URI DE NÓ PRODUZIDO PELO PACOTE DE REDE ETH KURTOSIS

// Estas são chaves privadas associadas a contas de teste pré-financiadas criadas pelo eth-network-package
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Depois de salvar seu arquivo, seu ambiente de desenvolvimento de dApp Hardhat está agora conectado à sua rede de teste local do Ethereum! Você pode verificar se sua rede de teste está funcionando executando:

```python
npx hardhat balances --network localnet
```

A saída deve ser algo como:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Isso confirma que o Hardhat está usando sua rede de teste local e detecta as contas pré-financiadas criadas pelo `eth-network-package`.

### Implantar e testar seu dApp localmente {#deploy-and-test-dapp}

Com o ambiente de desenvolvimento de dApp totalmente conectado à rede de teste local do Ethereum, agora você pode executar fluxos de trabalho de desenvolvimento e teste em seu dApp usando a rede de teste local.

Para compilar e implantar o contrato inteligente `ChipToken.sol` para prototipagem e desenvolvimento local, execute:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

A saída deve se parecer com:

```python
ChipToken implantado em: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Agora tente executar o teste `simple.js` em seu dApp local para confirmar que cada jogador em nosso dApp de Blackjack tem 1000 tokens emitidos para eles:

A saída deve ser algo como:

```python
npx hardhat test --network localnet
```

A saída deve ser algo como:

```python
ChipToken
    emissão
      ✔ deve emitir 1000 fichas para o JOGADOR UM

  1 aprovado (654ms)
```

### Revisão {#review-dapp-workflows}

Neste ponto, você configurou um ambiente de desenvolvimento de dApp, conectou-o a uma rede Ethereum local criada pelo Kurtosis e compilou, implantou e executou um teste simples em seu dApp.

Agora vamos explorar como você pode configurar a rede subjacente para testar nossos dApps sob várias configurações de rede.

## Configurando a rede de teste local do Ethereum {#configure-testnet}

### Alterando as configurações do cliente e o número de nós {#configure-client-config-and-num-nodes}

Sua rede de teste local do Ethereum pode ser configurada para usar diferentes pares de clientes EL e CL, bem como um número variável de nós, dependendo do cenário e da configuração de rede específica que você deseja desenvolver ou testar. Isso significa que, uma vez configurado, você pode iniciar uma rede de teste local personalizada e usá-la para executar os mesmos fluxos de trabalho (implantação, testes, etc.) sob várias configurações de rede para garantir que tudo funcione como esperado. Para saber mais sobre os outros parâmetros que você pode modificar, visite este link.

Experimente! Você pode passar várias opções de configuração para o `eth-network-package` através de um arquivo JSON. Este arquivo JSON de parâmetros de rede fornece as configurações específicas que o Kurtosis usará para configurar a rede Ethereum local.

Pegue o arquivo de configuração padrão e edite-o para iniciar três nós com pares EL/CL diferentes:

- Nó 1 com `geth`/`lighthouse`
- Nó 2 com `geth`/`lodestar`
- Nó 3 com `geth`/`teku`

Essa configuração cria uma rede heterogênea de implementações de nós Ethereum para testar seu dApp. Seu arquivo de configuração deve ficar assim:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Cada estrutura `participants` mapeia para um nó na rede, portanto, 3 estruturas `participants` instruirão o Kurtosis a iniciar 3 nós em sua rede. Cada estrutura `participants` permitirá que você especifique o par EL e CL usado para aquele nó específico.

A estrutura `network_params` configura as definições de rede que são usadas para criar os arquivos de gênese para cada nó, bem como outras configurações, como os segundos por slot da rede.

Salve seu arquivo de parâmetros editado em qualquer diretório que desejar (no exemplo abaixo, ele é salvo na área de trabalho) e, em seguida, use-o para executar seu pacote Kurtosis executando:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Observação: o comando `kurtosis clean -a` é usado aqui para instruir o Kurtosis a destruir a antiga rede de teste e seu conteúdo antes de iniciar uma nova.

Novamente, o Kurtosis trabalhará por um tempo e imprimirá os passos individuais que estão ocorrendo. Eventualmente, a saída deve ser algo como:

```python
Código Starlark executado com sucesso. Nenhum resultado foi retornado.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Enclave criado: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Nome:            local-eth-testnet
UUID:            bef8c192008e
Status:          EM EXECUÇÃO
Horário de criação:   Sex, 07 Abr 2023 11:41:58 EDT

========================================= Artefatos de Arquivos =========================================
UUID           Nome
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== Serviços de Usuário ==========================================
UUID           Nome                                           Portas                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         EM EXECUÇÃO
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                EM EXECUÇÃO
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                EM EXECUÇÃO
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                EM EXECUÇÃO
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                EM EXECUÇÃO
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          EM EXECUÇÃO
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          EM EXECUÇÃO
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          EM EXECUÇÃO
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <nenhum>                                           PARADO
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <nenhum>                                           PARADO
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <nenhum>                                           PARADO
```

Parabéns! Você configurou com sucesso sua rede de teste local para ter 3 nós em vez de 1. Para executar os mesmos fluxos de trabalho que você fez antes em seu dApp (implantar e testar), realize as mesmas operações que fizemos antes, substituindo `<$YOUR_PORT>` na estrutura `localnet` em seu arquivo de configuração `hardhat.config.ts` pela porta da saída do URI rpc de qualquer serviço `el-client-<num>` em sua nova rede de teste local de 3 nós.

## Conclusão {#conclusion}

E é isso! Para recapitular este breve guia, você:

- Criou uma rede de teste local do Ethereum sobre Docker usando o Kurtosis
- Conectou seu ambiente de desenvolvimento de dApp local à rede Ethereum local
- Implantou um dApp e executou um teste simples nele na rede Ethereum local
- Configurou a rede Ethereum subjacente para ter 3 nós

Gostaríamos muito de saber sua opinião sobre o que deu certo para você, o que poderia ser melhorado, ou para responder a qualquer uma de suas perguntas. Não hesite em nos contatar via [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) ou [envie-nos um e-mail](mailto:feedback@kurtosistech.com)!

### Outros exemplos e guias {#other-examples-guides}

Nós o encorajamos a conferir nosso [início rápido](https://docs.kurtosis.com/quickstart) (onde você construirá um banco de dados Postgres e uma API sobre ele) e nossos outros exemplos em nosso [repositório awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) onde você encontrará ótimos exemplos, incluindo pacotes para:

- [Iniciar a mesma rede de teste local do Ethereum](https://github.com/kurtosis-tech/eth2-package), mas com serviços adicionais conectados, como um spammer de transações (para simular transações), um monitor de bifurcação e uma instância conectada do Grafana e do Prometheus
- Executar um [teste de sub-rede](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) na mesma rede Ethereum local
