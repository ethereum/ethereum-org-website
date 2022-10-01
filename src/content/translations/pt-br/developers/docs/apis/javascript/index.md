---
title: Bibliotecas de API JavaScript
description: Uma introdução às bibliotecas de cliente JavaScript que permitem que você interaja com a cadeia de blocos de seu aplicativo.
lang: pt-br
---

Para que um aplicativo web interaja com a cadeia de blocos Ethereum (ou seja, leia os dados da cadeia de blocos e/ou envie transações para a rede), ele deve se conectar a um nó Ethereum.

Para isso, cada cliente Ethereum implementa a especificação [JSON-RPC](/developers/docs/apis/json-rpc/), então há um conjunto uniforme de [endpoints](/developers/docs/apis/json-rpc/endpoints/) com os quais os aplicativos podem contar.

Se você quiser usar JavaScript para se conectar a um nó Ethereum, é possível usar o JavaScript vanilla, mas existem várias bibliotecas convenientes dentro do ecossistema que tornam isso muito mais fácil. Com essas bibliotecas, desenvolvedores podem escrever métodos intuitivos, one-line para inicializar solicitações JSON RPC (sob o capô) que interagem com Ethereum.

## Pré-requisitos {#prerequisites}

Além de entender o JavaScript, pode ser útil entender a [pilha de Ethereum](/developers/docs/ethereum-stack/) e [clientes Ethereum](/developers/docs/nodes-and-clients/).

## Por que usar uma biblioteca? {#why-use-a-library}

Essas bibliotecas abstraem muito da complexidade de interagir diretamente com um nó Ethereum. Eles também fornecem funções de utilidade (por exemplo, Convertendo ETH para Gwei) para que como desenvolvedor, você possa passar menos tempo lidando com as complexidades de clientes da Ethereum e mais tempo focado na funcionalidade única do seu aplicativo.

## Recursos da biblioteca {#library-features}

### Conectar aos nós da Ethereum {#connect-to-ethereum-nodes}

Usando provedores, essas bibliotecas permitem que você se conecte à Ethereum e leia os seus dados, seja por meio de JSON-RPC, INFURA, Etherscan, Alquimia ou MetaMask.

**Exemplo de Ethers**

```js
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// Para isso, precisamos do signatário da conta...
const signer = provider.getSigner()
```

**Exemplo Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// ou
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// mudar provedor
web3.etProvider("ws://localhost:8546")
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

Uma vez configurado, você poderá consultar a cadeia de blocos para:

- numero de blocos
- estimativas de gás
- eventos de contratos inteligentes
- id da rede
- e mais...

### Funcionalidade de carteira {#wallet-functionality}

Essas bibliotecas oferecem a funcionalidade de criar carteiras, gerenciar chaves e assinar transações.

Aqui estão alguns exemplos de Ethers

```js
// Cria uma instância de carteira de um mnemonic...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...ou de uma chave privada
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Endereço como uma Promise para Signer API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Um endereço da carteira também está disponível de forma síncrona
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Componentes internos criptográficos
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

// Nota: Uma carteira criada com chave privada não possui
//       um mnemônico (a derivação previne isso)
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

// O método connect retorna uma nova instância da carteira conectada a um provedor
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

### Interaja com funções de contrato inteligentes {#interact-with-smart-contract-functions}

JavaScript client libraries allow your application to call smart contract functions by reading the Application Binary Interface (ABI) of a compiled contract.

O ABI essencialmente explica as funções do contrato em um formato JSON e permite que você use-o como um objeto JavaScript normal.

Então, o seguinte contrato de Solidity:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

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
- Estimar o gás que um método de execução consumirá quando executado no EVM
- Implantar um contrato
- E mais...

### Funções utilitárias {#utility-functions}

Funções utilitárias lhe dão atalhos úteis que facilitam um pouco a construção com a Ethereum.

Os valores ETH estão em Wei por padrão. 1 ETH = 1.000.000.000.000.000.000 WEI – isso significa que você está lidando com muitos números! `web3.utils.toWei` converte ether para Wei pra você.

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

- [Funções utilitárias da Web3js](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#)
- [Funções utilitárias da EthersJs](https://docs.ethers.io/v5/api/utils/)

## Bibliotecas disponíveis {#available-libraries}

**Web3.js -** **_API para Ethereum em JavaScript._**

- [Documentação](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Implementação completa de uma carteira Ethereum e utilidades em JavaScript e TypeScript._**

- [Documentação](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Um protocolo para indexação de dados de Ethereum e IPFS e sua consulta usando GraphQL._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Documentação](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Uma biblioteca em alto nível reativa em JS otimizada para clientes leves._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Alternativa ao Web3.js em Typescript._**

- [Documentação](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Wrapper em torno de Web3.js com tentativas automáticas e apis aprimoradas._**

- [Documentação](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API -** **_API for fetching NFT data, including ownership, metadata attributes and more._**

- [Documentação](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que ajudou você? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Estruturas de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais relacionados {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instructions for getting web3.js set up in your project._
- [Chamando um contrato inteligente do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando o token do DAI, veja como os contratos de chamadas funcionam usando JavaScript._
- [Enviando transações usando web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Passo a passo para enviar transações pelo backend._
