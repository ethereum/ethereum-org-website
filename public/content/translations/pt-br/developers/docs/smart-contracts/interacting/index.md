---
title: Interagindo com contratos inteligentes
description: Aprenda como ler e escrever em contratos inteligentes que já estão implantados na Ethereum.
lang: pt-br
---

Você nem sempre precisa escrever e implantar seu próprio contrato inteligente. Na maioria das vezes, como desenvolvedor, você vai querer interagir com contratos inteligentes que outras pessoas já implantaram na rede Ethereum.

Esta página aborda as duas maneiras fundamentais de interagir com um contrato inteligente — **lendo** dados e **escrevendo** dados — e as ferramentas necessárias para fazer ambos.

## Pré-requisitos {#prerequisites}

Você deve entender:

- [Como funcionam os contratos inteligentes](/developers/docs/smart-contracts/)
- [Contas Ethereum e como elas assinam transações](/developers/docs/accounts/)
- [O que é uma transação](/developers/docs/transactions/)

## Duas maneiras de interagir com um contrato inteligente {#two-ways}

A interação com um contrato inteligente se divide em duas categorias:

### Lendo de um contrato {#reading-from-a-contract}

A leitura é uma operação **gratuita** que não cria uma transação e não altera nenhum estado na blockchain.

Quando você lê de um contrato, está simplesmente consultando dados que já existem. Por exemplo:

- Verificar o saldo de um token ERC-20
- Ler o preço atual de uma corretora descentralizada
- Obter o proprietário de um NFT

Como as leituras não modificam o estado, elas não custam [gás](/developers/docs/gas/) e podem ser realizadas por qualquer pessoa sem a necessidade de ETH.

### Escrevendo em um contrato {#writing-to-a-contract}

A escrita é uma operação de **mudança de estado** que requer uma transação e custa gás.

Quando você escreve em um contrato, está acionando uma função que modifica o estado da blockchain. Por exemplo:

- Transferir tokens
- Trocar tokens em uma corretora descentralizada
- Cunhar um NFT

A escrita sempre requer:

1. Uma [Conta de Propriedade Externa (EOA)](/developers/docs/accounts/#types-of-account) com ETH suficiente para o gás
2. Uma transação assinada pela chave privada da conta
3. Que a transação seja minerada e incluída em um bloco

Com a [abstração de conta](/roadmap/account-abstraction/), uma conta de contrato inteligente também pode iniciar escritas, e um pagador pode cobrir o gás em nome do usuário — portanto, uma EOA com ETH não é estritamente necessária.

## Entendendo as ABIs de contratos {#understanding-contract-abis}

Para interagir com um contrato inteligente, seu aplicativo precisa saber *o que* o contrato pode fazer. É aqui que entra a **Interface Binária de Aplicação (ABI)**.

Uma ABI é um documento JSON que descreve:

- Cada função que o contrato expõe (nome, entradas, saídas)
- Cada evento que o contrato pode emitir
- Como codificar e decodificar dados ao se comunicar com o contrato

Pense na ABI como o manual de instruções do contrato — sem ela, seu aplicativo não sabe quais funções existem ou quais parâmetros elas esperam.

### Onde encontrar a ABI de um contrato {#where-to-find-abis}

- **Contratos verificados no Etherscan** - O [Etherscan](https://etherscan.io) expõe automaticamente a ABI para código-fonte verificado
- **Do desenvolvedor** - muitos projetos publicam suas ABIs em suas documentações ou pacotes npm
- **Gerar a partir do código-fonte** - se você tiver o código-fonte em Solidity, pode [compilá-lo](/developers/docs/smart-contracts/compiling/) para produzir a ABI

## Ferramentas e bibliotecas para interagir com contratos {#tools-and-libraries}

Os desenvolvedores geralmente usam uma biblioteca JavaScript/TypeScript para interagir com contratos a partir de um aplicativo web, backend ou script.

### Bibliotecas de cliente (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Interface TypeScript moderna e leve para Ethereum com segurança de tipo de primeira classe
- **[ethers.js](https://docs.ethers.org/)** - Biblioteca testada em batalha para interagir com a blockchain Ethereum
- **[Web3.js](https://web3js.org/)** - A API JavaScript original da Ethereum

### Bibliotecas de backend {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Também funciona em Node.js para scripts do lado do servidor e bots
- **[Web3.py](https://web3py.readthedocs.io/)** - Biblioteca Python para interação com a Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Biblioteca oficial em Go da equipe do Geth

### Exemplo: lendo o saldo de um token com Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Endereço do contrato USDC e ABI (parcial, para balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC tem 6 decimais
```

### Exemplo: enviando uma transação com ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI de transferência ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // aguardar a transação ser minerada
console.log(`Transferred! TX: ${tx.hash}`)
```

## Eventos e logs {#events-and-logs}

Contratos inteligentes podem emitir **eventos** para sinalizar que algo aconteceu. Seu aplicativo pode escutar esses eventos para reagir em tempo real.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Observar eventos de transferência de USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Simulando transações {#simulating}

Antes de enviar uma transação, você pode **simulá-la** para verificar se ela seria bem-sucedida — e para ver seu valor de retorno — sem gastar gás. Isso é útil para detectar erros precocemente e para visualizar os resultados.

A maioria das bibliotecas de cliente suporta isso através de `eth_call`:

```ts
// Com Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Carteiras e assinatura {#wallets-and-signing}

Em um dapp, a carteira do usuário (como MetaMask, Rainbow ou WalletConnect) lida com a assinatura. Você não gerencia chaves privadas diretamente.

[Bibliotecas de carteira e ferramentas de conexão](/developers/docs/apis/javascript/) abstraem isso para que você possa se concentrar na construção da lógica do seu aplicativo.

## Tutoriais relacionados {#related-tutorials}

- [Chamando um contrato inteligente a partir do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Enviando transações usando Web3.js e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Como visualizar seu NFT na sua carteira](/developers/tutorials/how-to-view-nft-in-metamask/)

## Leitura adicional {#further-reading}

- [Documentação do Viem: Lendo e escrevendo em contratos](https://viem.sh/docs/contract/readContract)
- [Documentação do ethers.js: Contratos](https://docs.ethers.org/v6/api/contract/)
- [Especificação da ABI do Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [O que é uma ABI? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Tópicos relacionados {#related-topics}

- [Compilação de contratos inteligentes](/developers/docs/smart-contracts/compiling/)
- [Implantando contratos inteligentes](/developers/docs/smart-contracts/deploying/)
- [APIs JavaScript](/developers/docs/apis/javascript/)
- [APIs de backend](/developers/docs/apis/backend/)