---
title: Bibliotecas de API JavaScript
description: "Uma introdução às bibliotecas de cliente JavaScript que permitem que você interaja com a cadeia de blocos de seu aplicativo."
lang: pt-br
---

Para que um aplicativo da web interaja com a blockchain Ethereum (ou seja, leia os dados da blockchain e/ou envie transações para a rede), ele deve se conectar a um nó Ethereum.

Para este propósito, cada cliente Ethereum implementa a especificação [JSON-RPC](/developers/docs/apis/json-rpc/), portanto, há um conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) nos quais os aplicativos podem confiar.

Se você quiser usar JavaScript para se conectar a um nó Ethereum, é possível usar o JavaScript vanilla, mas existem várias bibliotecas convenientes dentro do ecossistema que tornam isso muito mais fácil. Com essas bibliotecas, os desenvolvedores podem escrever intuitivamente métodos on-line para iniciar requisições JSON RPC (por debaixo dos panos) que interajam com a Ethereum.

Observe que, desde [A Fusão](/roadmap/merge/), duas partes conectadas do software Ethereum - um cliente de execução e um cliente de consenso - são necessárias para executar um nó. Certifique-se de que seu nó inclui tanto o cliente de execução quanto o consensual. Se o seu nó não estiver na sua máquina local (p. ex., seu nó está sendo executado em uma instância da AWS), atualize os endereços IP no tutorial. Para mais informações, consulte nossa página sobre [como executar um nó](/developers/docs/nodes-and-clients/run-a-node/).

## Pré-requisitos {#prerequisites}

Além de entender JavaScript, pode ser útil entender a [pilha Ethereum](/developers/docs/ethereum-stack/) e os [clientes Ethereum](/developers/docs/nodes-and-clients/).

## Por que usar uma biblioteca? {#why-use-a-library}

Essas bibliotecas abstraem muito da complexidade de interagir diretamente com um nó Ethereum. Elas também fornecem funções utilitárias (p. ex., converter ETH para Gwei), de modo que, como desenvolvedor, você pode gastar menos tempo lidando com as complexidades dos clientes Ethereum e mais tempo focado na funcionalidade exclusiva do seu aplicativo.

## Recursos da biblioteca {#library-features}

### Conectar-se aos nós do Ethereum {#connect-to-ethereum-nodes}

Usando provedores, essas bibliotecas permitem que você se conecte à Ethereum e leia os seus dados, seja por JSON-RPC, INFURA, Etherscan, Alquimia ou MetaMask.

> **Aviso:** O Web3.js foi arquivado em 4 de março de 2025. [Leia o anúncio](https://blog.chainsafe.io/web3-js-sunset/). Considere o uso de bibliotecas alternativas como [ethers.js](https://ethers.org) ou [viem](https://viem.sh) para novos projetos.

**Exemplo de Ethers**

```js
// Um BrowserProvider envolve um provedor Web3 padrão, que é
// o que o MetaMask injeta como window.ethereum em cada página
const provider = new ethers.BrowserProvider(window.ethereum)

// O plug-in MetaMask também permite assinar transações para
// enviar ether e pagar para alterar o estado dentro da blockchain.
// Para isso, precisamos do signatário da conta...
const signer = provider.getSigner()
```

**Exemplo de Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// ou
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// mudar provedor
web3. etProvider("ws://localhost:8546")
// ou
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Usando o provedor IPC em node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // caminho do mac os
// ou
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // Caminho mac os
// no windows o caminho é: "\\\\.\\pipe\\geth.ipc"
// no linux o caminho é: "/users/myuser/.ethereum/geth.ipc"
```

Uma vez configurado, você poderá consultar a blockchain para:

- numero de blocos
- estimativas de gás
- eventos de contratos inteligentes
- id da rede
- e mais...

### Funcionalidade da carteira {#wallet-functionality}

Essas bibliotecas oferecem a funcionalidade de criar carteiras, gerenciar chaves e assinar transações.

Veja alguns exemplos de Ethers

```js
// Crie uma instância de carteira a partir de uma mnemônica...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...ou de uma chave privada
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// O endereço como uma Promise pela API do Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Um endereço de Carteira também está disponível de forma síncrona
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Os componentes criptográficos internos
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// A mnemônica da carteira
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Observação: uma carteira criada com uma chave privada não
//       tem uma mnemônica (a derivação o impede)
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

// O método de conexão retorna uma nova instância da
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

Uma vez configurado você será capaz de:

- criar contas
- enviar transações
- assinar transações
- e mais...

### Interagir com funções de contrato inteligente {#interact-with-smart-contract-functions}

As bibliotecas de clientes Javascript permitem que sua aplicação chame funções de contratos inteligentes lendo a Interface Binária da Aplicação (en: ABI, pt: IBA) de um contrato compilado.

O ABI essencialmente explica as funções do contrato em um formato JSON e permite que você use-o como um objeto JavaScript normal.

Então, o seguinte contrato de Solidity:

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
- Estimar o gás que um método de execução consumirá quando executado na EVM
- Implantar um contrato
- E mais...

### Funções utilitárias {#utility-functions}

Funções utilitárias lhe dão atalhos úteis que facilitam um pouco a construção com a Ethereum.

Os valores ETH estão em Wei por padrão. 1 ETH = 1.000.000.000.000.000.000 WEI – isso significa que você está lidando com muitos números! `web3.utils.toWei` converte ether para Wei para você.

E em ethers fica assim:

```js
// Obtenha o saldo de uma conta (por endereço ou nome ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Muitas vezes você precisará formatar a saída para o usuário
// que preferem ver valores no ether (em vez de wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funções utilitárias do Web3js](https://docs.web3js.org/api/web3-utils)
- [Funções utilitárias do Ethers](https://docs.ethers.org/v6/api/utils/)

## Bibliotecas disponíveis {#available-libraries}

**Web3.js -** **_API JavaScript do Ethereum._**

- [Documentação](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Implementação completa da carteira Ethereum e utilitários em JavaScript e TypeScript._**

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

**Drift -** **_Metabiblioteca TypeScript com cache, ganchos e simulações de teste integrados._**

- [Documentação](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Frameworks de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais relacionados {#related-tutorials}

- [Configurar o Web3js para usar a blockchain Ethereum em JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instruções para configurar o web3.js em seu projeto._
- [Chamando um contrato inteligente a partir do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando o token DAI, veja como chamar funções de contratos usando JavaScript._
- [Enviando transações usando web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Passo a passo para enviar transações pelo back-end._
