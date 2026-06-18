---
title: Bibliotecas de API JavaScript
description: Uma introdução às bibliotecas de cliente JavaScript que permitem interagir com a blockchain a partir do seu aplicativo.
lang: pt-br
---

Para que um aplicativo web interaja com a blockchain do Ethereum (ou seja, leia dados da blockchain e/ou envie transações para a rede), ele deve se conectar a um nó do Ethereum.

Para esse propósito, todo cliente Ethereum implementa a especificação [JSON-RPC](/developers/docs/apis/json-rpc/), poutanto, há um conjunto unifoume de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) nos quais os aplicativos podem confiar.

Se você quiser usar JavaScript para se conectar a um nó do Ethereum, é possível usar JavaScript puro, mas existem várias bibliotecas de conveniência no ecossistema que tounam isso muito mais fácil. Com essas bibliotecas, os desenvolvedores podem escrever métodos intuitivos de uma linha para inicializar solicitações JSON-RPC (internamente) que interagem com o Ethereum.

Observe que, desde [The Merge](/roadmap/merge/), dois softwares do Ethereum conectados - um cliente de execução e um cliente de consenso - são necessários para executar um nó. Certifique-se de que seu nó inclua um cliente de execução e um de consenso. Se o seu nó não estiver na sua máquina local (por exemplo, seu nó está sendo executado em uma instância da AWS), atualize os endereços IP no tutorial de acordo. Para obter mais informações, consulte nossa página sobre [como executar um nó](/developers/docs/nodes-and-clients/run-a-node/).

## Pré-requisitos {#prerequisites}

Além de entender JavaScript, pode ser útil entender a [pilha do Ethereum](/developers/docs/ethereum-stack/) e os [clientes Ethereum](/developers/docs/nodes-and-clients/).

## Por que usar uma biblioteca? {#why-use-a-library}

Essas bibliotecas abstraem grande parte da complexidade de interagir diretamente com um nó do Ethereum. Elas também fornecem funções utilitárias (por exemplo, converter ETH para gwei) para que, como desenvolvedor, você possa gastar menos tempo lidando com as complexidades dos clientes Ethereum e mais tempo focado na funcionalidade exclusiva do seu aplicativo.

## Recursos da biblioteca {#library-features}

### Conectar-se a nós do Ethereum {#connect-to-ethereum-nodes}

Usando provedores, essas bibliotecas permitem que você se conecte ao Ethereum e leia seus dados, seja por JSON-RPC, Infura, Etherscan, Alchemy ou MetaMask.

> **Aviso:** A Web3.js foi arquivada em 4 de março de 2025. [Leia o anúncio](https://blog.chainsafe.io/web3-js-sunset/). Considere usar bibliotecas alternativas como [ethers.js](https://ethers.org) ou [viem](https://viem.sh) para novos projetos.

**Exemplo com Ethers**

```js
// Um BrowserProvider envolve um provedor Web3 padrão, que é
// o que a MetaMask injeta como window.ethereum em cada página
const provider = new ethers.BrowserProvider(window.ethereum)

// O plugin da MetaMask também permite assinar transações para
// enviar ether e pagar para alterar o estado dentro da blockchain.
// Para isso, precisamos do assinante da conta...
const signer = provider.getSigner()
```

**Exemplo com Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// alterar provedor
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Usando o provedor IPC no node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // caminho no mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // caminho no mac os
// no windows o caminho é: "\\\\.\\pipe\\geth.ipc"
// no linux o caminho é: "/users/myuser/.ethereum/geth.ipc"
```

Uma vez configurado, você poderá consultar a blockchain para obter:

- números de blocos
- estimativas de gás
- eventos de contratos inteligentes
- ID da rede
- e muito mais...

### Funcionalidade de carteira {#wallet-functionality}

Essas bibliotecas oferecem a funcionalidade de criar carteiras, gerenciar chaves e assinar transações.

Aqui está um exemplo do Ethers

```js
// Criar uma instância de carteira a partir de um mnemônico...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...ou de uma chave privada
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// O endereço como uma Promise de acordo com a API do Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Um endereço de carteira também está disponível de forma síncrona
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Os componentes criptográficos internos
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// O mnemônico da carteira
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Nota: Uma carteira criada com uma chave privada não
//       possui um mnemônico (a derivação impede isso)
walletPrivateKey.mnemonic
// null

// Assinando uma mensagem
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Assinando uma transação
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// O método connect retorna uma nova instância da
// Carteira conectada a um provedor
wallet = walletMnemonic.connect(provider)

// Consultando a rede
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Enviando ether
wallet.sendTransaction(tx)
```

[Leia a documentação completa](https://docs.ethers.io/v5/api/signer/#Wallet)

Uma vez configurado, você poderá:

- criar contas
- enviar transações
- assinar transações
- e muito mais...

### Interagir com funções de contratos inteligentes {#interact-with-smart-contract-functions}

As bibliotecas de cliente JavaScript permitem que seu aplicativo chame funções de contratos inteligentes lendo a Interface Binária de Aplicativo (ABI) de um contrato compilado.

A ABI explica essencialmente as funções do contrato em um formato JSON e permite que você o use como um objeto JavaScript normal.

Portanto, o seguinte contrato em Solidity:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Resultaria no seguinte JSON:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Isso significa que você pode:

- Enviar uma transação para o contrato inteligente e executar seu método
- Fazer uma chamada para estimar o gás que a execução de um método consumirá quando executado na EVM
- Implantar um contrato
- E muito mais...

### Funções utilitárias {#utility-functions}

As funções utilitárias oferecem atalhos práticos que tornam a construção com Ethereum um pouco mais fácil.

Os valores de ETH estão em Wei por padrão. 1 ETH = 1.000.000.000.000.000.000 Wei – isso significa que você está lidando com muitos números! `web3.utils.toWei` converte ether para Wei para você.

E no ethers fica assim:

```js
// Obter o saldo de uma conta (por endereço ou nome ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Frequentemente você precisará formatar a saída para o usuário
// que prefere ver os valores em ether (em vez de Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funções utilitárias do Web3js](https://docs.web3js.org/api/web3-utils)
- [Funções utilitárias do Ethers](https://docs.ethers.org/v6/api/utils/)

## Bibliotecas disponíveis {#available-libraries}

**Web3.js -** **_API JavaScript do Ethereum._**

- [Documentação](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Implementação completa de carteira Ethereum e utilitários em JavaScript e TypeScript._**

- [Página inicial do Ethers.js](https://ethers.org/)
- [Documentação](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Um protocolo para indexar dados do Ethereum e IPFS e consultá-los usando GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Documentação](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Wrapper em torno do Ethers.js com APIs aprimoradas._**

- [Documentação](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Interface TypeScript para Ethereum._**

- [Documentação](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_API de dados de blockchain enriquecidos em tempo real em dezenas de redes._**

- [Documentação](https://docs.codex.io)
- [Explorer](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Metabiblioteca TypeScript com cache integrado, hooks e mocks de teste._**

- [Documentação](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Frameworks de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais relacionados {#related-tutorials}

- [Configurar o Web3js para usar a blockchain do Ethereum em JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instruções para configurar o web3.js no seu projeto._
- [Chamando um contrato inteligente a partir do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando o token DAI, veja como chamar funções de contratos usando JavaScript._
- [Enviando transações usando web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Passo a passo para enviar transações a partir do backend._

## Tutoriais: APIs JavaScript e WebSockets no Ethereum {#tutorials}

- [Usando WebSockets](/developers/tutorials/using-websockets/) _– Como usar WebSockets com Alchemy para se inscrever em eventos do Ethereum e fazer solicitações JSON-RPC em tempo real._