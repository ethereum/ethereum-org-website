---
title: "Componentes de servidor e agentes para aplicativos web3"
description: "Após ler este tutorial, você será capaz de escrever servidores TypeScript que escutam eventos em uma blockchain e respondem de acordo com suas próprias transações. Isso permitirá que você escreva aplicativos centralizados (porque o servidor é um ponto de falha), mas que podem interagir com entidades web3. As mesmas técnicas também podem ser usadas para escrever um agente que responde a eventos onchain sem um humano no circuito."

author: Ori Pomerantz
lang: pt-br
tags: ["agente", "servidor", "offchain", "dapps"]
skill: beginner
breadcrumb: Componentes de servidor
published: 2024-07-15
---

## Introdução {#introduction}

Na maioria dos casos, um aplicativo descentralizado (dapp) usa um servidor para distribuir o software, mas toda a interação real acontece entre o cliente (normalmente, o navegador da web) e a blockchain.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

No entanto, há alguns casos em que um aplicativo se beneficiaria de ter um componente de servidor que é executado de forma independente. Esse servidor seria capaz de responder a eventos e a solicitações que vêm de outras fontes, como uma API, emitindo transações.

![The interaction with the addition of a server](./fig-2.svg)

Existem várias tarefas possíveis que esse servidor poderia cumprir.

- Detentor de estado secreto. Em jogos, muitas vezes é útil não ter todas as informações que o jogo conhece disponíveis para os jogadores. No entanto, _não há segredos na blockchain_, qualquer informação que esteja na blockchain é fácil de ser descoberta por qualquer pessoa. Portanto, se parte do estado do jogo deve ser mantida em segredo, ela deve ser armazenada em outro lugar (e possivelmente ter os efeitos desse estado verificados usando [provas de conhecimento zero](/zero-knowledge-proofs)).

- Oráculo centralizado. Se os riscos forem suficientemente baixos, um servidor externo que lê algumas informações online e depois as publica na cadeia pode ser bom o suficiente para ser usado como um [oráculo](/developers/docs/oracles/).

- Agente. Nada acontece na blockchain sem uma transação para ativá-la. Um servidor pode agir em nome de um usuário para realizar ações como [arbitragem](/developers/docs/mev/#mev-examples-dex-arbitrage) quando a oportunidade se apresentar.

## Programa de exemplo {#sample-program}

Você pode ver um servidor de exemplo [no GitHub](https://github.com/qbzzt/20240715-server-component). Este servidor escuta eventos vindos [deste contrato](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), uma versão modificada do Greeter do Hardhat. Quando a saudação é alterada, ele a altera de volta.

Para executá-lo:

1. Clone o repositório.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Instale os pacotes necessários. Se você ainda não o tem, [instale o Node primeiro](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Edite `.env` para especificar a chave privada de uma conta que tenha ETH na rede de teste Holesky. Se você não tem ETH na Holesky, você pode [usar este faucet](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. Inicie o servidor.

   ```sh copy
   npm start
   ```

5. Acesse [um explorador de blocos](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) e, usando um endereço diferente daquele que possui a chave privada, modifique a saudação. Veja que a saudação é automaticamente modificada de volta.

### Como isso funciona? {#how-it-works}

A maneira mais fácil de entender como escrever um componente de servidor é analisar o exemplo linha por linha.

#### `src/app.ts` {#src-app-ts}

A grande maioria do programa está contida em [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Criando os objetos de pré-requisito

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Estas são as entidades do [Viem](https://viem.sh/) que precisamos, funções e [o tipo `Address`](https://viem.sh/docs/glossary/types#address). Este servidor é escrito em [TypeScript](https://www.typescriptlang.org/), que é uma extensão do JavaScript que o torna [fortemente tipado](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Esta função](https://viem.sh/docs/accounts/privateKey) nos permite gerar as informações da carteira, incluindo o endereço, correspondentes a uma chave privada.

```typescript
import { holesky } from "viem/chains"
```

Para usar uma blockchain no Viem, você precisa importar sua definição. Neste caso, queremos nos conectar à blockchain de teste [Holesky](https://github.com/eth-clients/holesky).

```typescript
// É assim que adicionamos as definições do .env ao process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

É assim que lemos o `.env` para o ambiente. Precisamos dele para a chave privada (veja mais adiante).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Para usar um contrato, precisamos do seu endereço e da [ABI](/glossary/#abi) para ele. Nós fornecemos ambos aqui.

No JavaScript (e, portanto, no TypeScript), você não pode atribuir um novo valor a uma constante, mas você _pode_ modificar o objeto que está armazenado nela. Ao usar o sufixo `as const`, estamos dizendo ao TypeScript que a própria lista é constante e não pode ser alterada.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Crie um [cliente público](https://viem.sh/docs/clients/public.html) do Viem. Clientes públicos não têm uma chave privada anexada e, portanto, não podem enviar transações. Eles podem chamar [funções `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), ler saldos de contas, etc.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

As variáveis de ambiente estão disponíveis em [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). No entanto, o TypeScript é fortemente tipado. Uma variável de ambiente pode ser qualquer string, ou vazia, então o tipo para uma variável de ambiente é `string | undefined`. No entanto, uma chave é definida no Viem como `0x${string}` (`0x` seguido por uma string). Aqui dizemos ao TypeScript que a variável de ambiente `PRIVATE_KEY` será desse tipo. Se não for, teremos um erro de tempo de execução.

A função [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) então usa essa chave privada para criar um objeto de conta completo.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Em seguida, usamos o objeto de conta para criar um [cliente de carteira](https://viem.sh/docs/clients/wallet). Este cliente tem uma chave privada e um endereço, então ele pode ser usado para enviar transações.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Agora que temos todos os pré-requisitos, podemos finalmente criar uma [instância de contrato](https://viem.sh/docs/contract/getContract). Usaremos esta instância de contrato para nos comunicarmos com o contrato onchain.

##### Lendo da blockchain

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

As funções do contrato que são apenas de leitura ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) e [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) estão disponíveis em `read`. Neste caso, nós o usamos para acessar a função [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), que retorna a saudação.

O JavaScript é single-threaded, então quando disparamos um processo de longa duração, precisamos [especificar que o fazemos de forma assíncrona](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Chamar a blockchain, mesmo para uma operação apenas de leitura, requer uma viagem de ida e volta entre o computador e um nó da blockchain. Essa é a razão pela qual especificamos aqui que o código precisa usar `await` (aguardar) pelo resultado.

Se você estiver interessado em como isso funciona, você pode [ler sobre isso aqui](https://www.w3schools.com/js/js_promise.asp), mas em termos práticos, tudo o que você precisa saber é que você usa `await` nos resultados se iniciar uma operação que leva muito tempo, e que qualquer função que faça isso deve ser declarada como `async`.

##### Emitindo transações

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Esta é a função que você chama para emitir uma transação que altera a saudação. Como esta é uma operação longa, a função é declarada como `async`. Devido à implementação interna, qualquer função `async` precisa retornar um objeto `Promise`. Neste caso, `Promise<any>` significa que não especificamos o que exatamente será retornado no `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

O campo `write` da instância do contrato tem todas as funções que gravam no estado da blockchain (aquelas que exigem o envio de uma transação), como [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Os parâmetros, se houver, são fornecidos como uma lista, e a função retorna o hash da transação.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Relate o hash da transação (como parte de um URL para o explorador de blocos para visualizá-la) e retorne-o.

##### Respondendo a eventos

```typescript
greeter.watchEvent.SetGreeting({
```

[A função `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) permite especificar que uma função deve ser executada quando um evento é emitido. Se você se importa apenas com um tipo de evento (neste caso, `SetGreeting`), você pode usar esta sintaxe para se limitar a esse tipo de evento.

```typescript
    onLogs: logs => {
```

A função `onLogs` é chamada quando há entradas de log. No Ethereum, "log" e "evento" geralmente são intercambiáveis.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Poderia haver vários eventos, mas por simplicidade, nos importamos apenas com o primeiro. `logs[0].args` são os argumentos do evento, neste caso `sender` e `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Se o remetente _não_ for este servidor, use `setGreeting` para alterar a saudação.

#### `package.json` {#package-json}

[Este arquivo](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) controla a configuração do [Node.js](https://nodejs.org/en). Este artigo explica apenas as definições importantes.

```json
{
  "main": "dist/index.js",
```

Esta definição especifica qual arquivo JavaScript executar.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Os scripts são várias ações do aplicativo. Neste caso, o único que temos é `start`, que compila e depois executa o servidor. O comando `tsc` faz parte do pacote `typescript` e compila TypeScript em JavaScript. Se você quiser executá-lo manualmente, ele está localizado em `node_modules/.bin`. O segundo comando executa o servidor.

```json
  "type": "module",
```

Existem vários tipos de aplicativos de nó JavaScript. O tipo `module` nos permite ter `await` no código de nível superior, o que é importante quando você faz operações lentas (e, portanto, assíncronas).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Estes são pacotes que são necessários apenas para o desenvolvimento. Aqui precisamos do `typescript` e, como o estamos usando com o Node.js, também estamos obtendo os tipos para variáveis e objetos do nó, como `process`. [A notação `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) significa essa versão ou uma versão superior que não tenha alterações de quebra (breaking changes). Veja [aqui](https://semver.org) para mais informações sobre o significado dos números de versão.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Estes são pacotes que são necessários em tempo de execução, ao executar `dist/app.js`.

## Conclusão {#conclusion}

O servidor centralizado que criamos aqui faz o seu trabalho, que é atuar como um agente para um usuário. Qualquer outra pessoa que queira que o dapp continue funcionando e esteja disposta a gastar o gás pode executar uma nova instância do servidor com seu próprio endereço.

No entanto, isso só funciona quando as ações do servidor centralizado podem ser facilmente verificadas. Se o servidor centralizado tiver alguma informação de estado secreta ou executar cálculos difíceis, ele é uma entidade centralizada na qual você precisa confiar para usar o aplicativo, o que é exatamente o que as blockchains tentam evitar. Em um artigo futuro, planejo mostrar como usar [provas de conhecimento zero](/zero-knowledge-proofs) para contornar esse problema.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).