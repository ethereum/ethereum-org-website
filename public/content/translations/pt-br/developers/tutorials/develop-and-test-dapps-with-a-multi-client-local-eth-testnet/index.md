---
title: "Como desenvolver e testar um dApp em uma rede de teste local com vários clientes"
description: "Este guia primeiro mostrará como instanciar e configurar uma rede de teste local do Ethereum com vários clientes antes de usar a rede de teste para implantar e testar um dApp."
author: "Tedi Mitiku"
tags:
  [
    "clientes",
    "nós",
    "contratos inteligentes",
    "compunibilidade",
    "camada de consenso",
    "camada de execução",
    "tes",
  ]
skill: intermediate
breadcrumb: "Rede de teste com vários clientes"
lang: pt-br
published: 2023-04-11
---

## Introdução {#introduction}

Este guia orienta você no processo de instanciar uma rede de teste local configurável do Ethereum, implantar um contrato inteligente nela e usar a rede de teste para executar testes em seu dApp. Este guia foi desenvolvido para desenvolvedores de dApps que desejam desenvolver e testar seus dApps localmente em diferentes configurações de rede antes de implantar em uma rede de teste ativa ou na Mainnet.

Neste guia, você irá:

- Instanciar uma rede de teste local do Ethereum com o [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) usando o [Kurtosis](https://www.kurtosis.com/),
- Conectar seu ambiente de desenvolvimento de dApp Hardhat à rede de teste local para compilar, implantar e testar um dApp, e
- Configurar a rede de teste local, incluindo parâmetros como o número de nós e pares específicos de clientes de execução/consenso (EL/CL), para permitir fluxos de trabalho de desenvolvimento e teste em várias configurações de rede.

### O que é o Kurtosis? {#what-is-kurtosis}

O [Kurtosis](https://www.kurtosis.com/) é um sistema de compilação compunível projetado para configurar ambientes de teste com vários contêineres. Ele permite especificamente que os desenvolvedores criem ambientes reprodutíveis que exigem lógica de configuração dinâmica, como redes de teste de blockchain.

Neste guia, o `ethereum-package` do Kurtosis, mantido pela [ethPandaOps](https://ethpandaops.io/), inicia uma rede de teste local do Ethereum. Ele suporta todos os principais clientes da camada de execução (EL), como [`geth`](https://geth.ethereum.org/), e clientes da camada de consenso (CL), como [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) e [`lodestar`](https://lodestar.chainsafe.io/). Este pacote serve como uma alternativa configurável e compunível para redes em frameworks como Hardhat Network e Anvil. O Kurtosis oferece aos desenvolvedores maior controle e flexibilidade sobre as redes de teste que utilizam, o que é um dos principais motivos pelos quais as equipes de clientes do Ethereum o utilizam para testar atualizações de rede.

## Configurando o Kurtosis {#setting-up-kurtosis}

Antes de prosseguir, certifique-se de ter:

- [Instalado e iniciado o mecanismo do Docker](https://docs.kurtosis.com/install/#i-install--start-docker) em sua máquina local
- [Instalado a CLI do Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (ou atualizado para a versão mais recente, se você já tiver a CLI instalada)
- Instalado o [Node.js](https://nodejs.org/en) (para o seu ambiente de dApp)

## Instanciando uma rede de teste local do Ethereum {#instantiate-testnet}

Para iniciar uma rede de teste local do Ethereum, execute:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Nota: Este comando nomeia sua rede como "local-eth-testnet" usando a flag `--enclave`.

O Kurtosis imprimirá as etapas que está realizando internamente enquanto trabalha para interpretar, validar e, em seguida, executar as instruções. No final, ele imprime um resumo do enclave que criou. O resumo inclui uma lista de **artefatos de arquivos** (files artifacts) e uma lista de **serviços de usuário** (user services). Com a configuração padrão, os serviços de usuário incluem um único nó:

- `el-1-geth-lighthouse`, o cliente de execução `geth`
- `cl-1-lighthouse-geth`, o nó do Beacon `lighthouse`
- `vc-1-geth-lighthouse`, o cliente validador `lighthouse`

Cada serviço é listado com as portas que expõe e a porta local para a qual cada uma está mapeada. Por exemplo, a porta `rpc` do serviço `el-1-geth-lighthouse` é o endpoint JSON-RPC que suas ferramentas de dApp usarão. Os serviços exatos e os números das portas serão diferentes em sua máquina.

Você pode visualizar este resumo novamente a qualquer momento executando:

```sh
kurtosis enclave inspect local-eth-testnet
```

Parabéns! Você usou o Kurtosis para instanciar uma rede de teste local do Ethereum, com um cliente CL (`lighthouse`) e um cliente EL (`geth`), sobre o Docker.

### Revisão {#review-instantiate-testnet}

Nesta seção, você executou um comando que direcionou o Kurtosis a usar o [`ethereum-package` hospedado remotamente no GitHub](https://github.com/ethpandaops/ethereum-package) para iniciar uma rede de teste local do Ethereum dentro de um [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) do Kurtosis. Dentro do seu enclave, você encontrará tanto "artefatos de arquivos" quanto "serviços de usuário".

Os [Artefatos de Arquivos](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) em seu enclave incluem todos os dados gerados e utilizados para inicializar os clientes EL e CL, como os arquivos genesis e as chaves do validador. Os dados genesis foram criados usando o [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Os serviços de usuário exibem todos os serviços em contêineres operando em seu enclave. Você notará que um único nó, apresentando tanto um cliente EL quanto um cliente CL, foi criado.

## Conecte seu ambiente de desenvolvimento de dApp à rede de teste local do Ethereum {#connect-your-dapp}

### Configure o ambiente de desenvolvimento de dApp {#set-up-dapp-env}

Agora que você tem uma rede de teste local em execução, pode conectar seu ambiente de desenvolvimento de dApp para usar sua rede de teste local. O framework Hardhat será usado neste guia para implantar um dApp de blackjack em sua rede de teste local.

Para configurar seu ambiente de desenvolvimento de dApp, clone o repositório que contém nosso dApp de exemplo e instale suas dependências, execute:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

A flag `--legacy-peer-deps` é necessária porque alguns dos plugins do Hardhat do projeto de exemplo declaram versões conflitantes de dependências de pares (peer dependencies).

A pasta [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) usada aqui contém a configuração típica para um desenvolvedor de dApp usando o framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contém alguns contratos inteligentes simples para um dApp de Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contém um script para implantar um contrato de token em sua rede local do Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contém um teste .js simples para o seu contrato de token para confirmar que cada jogador em nosso dApp de Blackjack tem 1000 cunhados para eles
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configura sua instalação do Hardhat

### Configure o Hardhat para usar a rede de teste local {#configure-hardhat}

Com seu ambiente de desenvolvimento de dApp configurado, agora você conectará o Hardhat para usar a rede de teste local do Ethereum gerada usando o Kurtosis. Primeiro, encontre o endereço local do endpoint JSON-RPC do cliente de execução:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

A saída é um URL como `http://127.0.0.1:32769`. Sua porta será diferente. Substitua `<PORT>` na estrutura `localnet` em seu arquivo de configuração `hardhat.config.ts` por esta porta.

Exemplo em `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: SUBSTITUA <PORT> PELA PORTA DE UM URI DE NÓ PRODUZIDO PELO PACOTE KURTOSIS DA REDE ETH
  // Estas são chaves privadas associadas a contas de teste pré-financiadas criadas pelo eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Essas chaves privadas são chaves de teste conhecidas publicamente. Nunca as use na Mainnet ou em qualquer rede pública.

Depois de salvar seu arquivo, seu ambiente de desenvolvimento de dApp Hardhat agora está conectado à sua rede de teste local do Ethereum! Você pode verificar se sua rede de teste está funcionando executando:

```sh
npx hardhat balances --network localnet
```

A saída lista o endereço e o saldo de cada uma das contas acima. Por exemplo, a primeira linha deve ser parecida com esta:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Isso confirma que o Hardhat está usando sua rede de teste local e detecta as contas pré-financiadas criadas pelo `ethereum-package`.

### Implante e teste seu dApp localmente {#deploy-and-test-dapp}

Com o ambiente de desenvolvimento de dApp totalmente conectado à rede de teste local do Ethereum, agora você pode executar fluxos de trabalho de desenvolvimento e teste em seu dApp usando a rede de teste local.

Para compilar e implantar o contrato inteligente `ChipToken.sol` para prototipagem e desenvolvimento local, execute:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

A saída deve ser algo como:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Agora tente executar o teste `ChipToken.js` em seu dApp local para confirmar que cada jogador em nosso dApp de Blackjack tem 1000 cunhados para eles. O teste de exemplo ainda usa a função `deployed()` do ethers v5, que o ethers v6 substituiu por `waitForDeployment()`, então atualize-o primeiro:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Em seguida, execute o teste:

```sh
npx hardhat test --network localnet
```

A saída deve ser algo parecido com isto:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Revisão {#review-dapp-workflows}

Neste ponto, você configurou um ambiente de desenvolvimento de dApp, conectou-o a uma rede local do Ethereum criada pelo Kurtosis e compilou, implantou e executou um teste simples em seu dApp.

Agora vamos explorar como você pode configurar a rede subjacente para testar nossos dApps sob várias configurações de rede.

## Configurando a rede de teste local do Ethereum {#configure-testnet}

### Alterando as configurações do cliente e o número de nós {#configure-client-config-and-num-nodes}

Sua rede de teste local do Ethereum pode ser configurada para usar diferentes pares de clientes EL e CL, bem como um número variável de nós, dependendo do cenário e da configuração de rede específica que você deseja desenvolver ou testar. Isso significa que, uma vez configurada, você pode iniciar uma rede de teste local personalizada e usá-la para executar os mesmos fluxos de trabalho (implantação, testes, etc.) sob várias configurações de rede para garantir que tudo funcione conforme o esperado. Para saber mais sobre os outros parâmetros que você pode modificar, consulte [a documentação de configuração do `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Experimente! Você pode passar várias opções de configuração para o `ethereum-package` por meio de um arquivo YAML. Este arquivo de parâmetros de rede fornece as configurações específicas que o Kurtosis usará para configurar a rede local do Ethereum.

Crie um arquivo chamado `network_params.yaml` que inicia três nós com diferentes pares EL/CL:

- Nó 1 com `geth`/`lighthouse`
- Nó 2 com `geth`/`lodestar`
- Nó 3 com `geth`/`teku`

Esta configuração cria uma rede heterogênea de implementações de nós do Ethereum para testar seu dApp. Seu arquivo de configuração deve ser parecido com:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Cada entrada em `participants` mapeia para um nó na rede, então 3 entradas `participants` dirão ao Kurtosis para iniciar 3 nós em sua rede. Cada entrada permite que você especifique o par EL e CL usado para aquele nó específico. Quaisquer parâmetros que você não especificar manterão seus valores padrão.

A estrutura `network_params` configura as definições de rede que são usadas para criar os arquivos genesis para cada nó, bem como outras configurações, como os segundos por slot da rede.

Salve seu arquivo de parâmetros e, em seguida, use-o para executar seu pacote Kurtosis executando:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Nota: o comando `kurtosis clean -a` é usado aqui para instruir o Kurtosis a destruir a antiga rede de teste e seu conteúdo antes de iniciar uma nova.

Novamente, o Kurtosis trabalhará um pouco e imprimirá as etapas individuais que estão ocorrendo. Eventualmente, ele imprime o resumo do enclave. Desta vez, os serviços de usuário incluem três nós, por exemplo `el-1-geth-lighthouse`, `el-2-geth-lodestar` e `el-3-geth-teku` para os clientes de execução, juntamente com os clientes de consenso e validadores correspondentes.

Parabéns! Você configurou com sucesso sua rede de teste local para ter 3 nós em vez de 1. Para executar os mesmos fluxos de trabalho que você fez antes em seu dApp (implantar e testar), execute as mesmas operações que fizemos antes substituindo a `<PORT>` na estrutura `localnet` em seu arquivo de configuração `hardhat.config.ts` pela porta `rpc` de qualquer serviço `el-<num>-...` em sua nova rede de teste local de 3 nós.

## Conclusão {#conclusion}

E é isso! Para recapitular este breve guia, você:

- Criou uma rede de teste local do Ethereum sobre o Docker usando o Kurtosis
- Conectou seu ambiente de desenvolvimento de dApp local à rede local do Ethereum
- Implantou um dApp e executou um teste simples nele na rede local do Ethereum
- Configurou a rede Ethereum subjacente para ter 3 nós

Adoraríamos ouvir de você sobre o que funcionou bem, o que poderia ser melhorado ou responder a qualquer uma de suas perguntas. Não hesite em entrar em contato via [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Outros exemplos e guias {#other-examples-guides}

Incentivamos você a conferir nosso [guia de início rápido](https://docs.kurtosis.com/quickstart) e nossos outros exemplos em nosso [repositório awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis).

O `ethereum-package` também pode iniciar serviços adicionais junto com sua rede, como um spammer de transações (para simular transações), um explorador de blocos e instâncias conectadas do Grafana e Prometheus. Para ativá-los, liste-os em `additional_services` em seu arquivo de parâmetros, conforme descrito na [documentação do pacote](https://github.com/ethpandaops/ethereum-package#configuration).
