---
title: "Componentes de servidor e agentes para aplicativos web3"
description: "Após ler este tutorial, você será capaz de escrever servidores TypeScript que escutam eventos em uma cadeia de blocos e respondem de acordo com suas próprias transações. Isso permitirá que você escreva aplicações centralizadas (porque o servidor é um ponto de falha), mas que podem interagir com entidades web3. As mesmas técnicas também podem ser usadas para escrever um agente que responde a eventos em cadeia sem um humano no ciclo."

author: Ori Pomerantz
  Ori Pomerantz
lang: pt-br
tags: [ "agente", "servidor", "fora da cadeia" ]
skill: beginner
published: 2024-07-15
---

## Introdução {#introduction}

Na maioria dos casos, um aplicativo descentralizado usa um servidor para distribuir o software, mas toda a interação real acontece entre o cliente (normalmente, o navegador da web) e a cadeia de blocos.

![Interação normal entre o servidor web, o cliente e a cadeia de blocos](./fig-1.svg)

No entanto, há alguns casos em que uma aplicação se beneficiaria de ter um componente de servidor que é executado de forma independente. Tal servidor seria capaz de responder a eventos e a solicitações que vêm de outras fontes, como uma API, emitindo transações.

![A interação com a adição de um servidor](./fig-2.svg)

Existem várias tarefas possíveis que tal servidor poderia cumprir.

- Detentor de estado secreto. Em jogos, muitas vezes é útil não ter todas as informações que o jogo conhece disponíveis para os jogadores. No entanto, _não há segredos na cadeia de blocos_, qualquer informação que esteja na cadeia de blocos é fácil para qualquer um descobrir. Portanto, se parte do estado do jogo deve ser mantida em segredo, ela tem que ser armazenada em outro lugar (e possivelmente ter os efeitos desse estado verificados usando [provas de conhecimento zero](/zero-knowledge-proofs)).

- Oráculo centralizado. Se os valores em jogo forem suficientemente baixos, um servidor externo que lê algumas informações online e depois as publica na cadeia pode ser bom o suficiente para usar como um [oráculo](/developers/docs/oracles/).

- Agente. Nada acontece na cadeia de blocos sem uma transação para ativá-la. Um servidor pode agir em nome de um usuário para executar ações como [arbitragem](/developers/docs/mev/#mev-examples-dex-arbitrage) quando a oportunidade se apresenta.

## Programa de exemplo {#sample-program}

Você pode ver um servidor de exemplo [no github](https://github.com/qbzzt/20240715-server-component). Este servidor escuta eventos vindos [deste contrato](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), uma versão modificada do Greeter da Hardhat. Quando a saudação é alterada, ele a altera de volta.

Para executá-lo:

1. Clone o repositório.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Instale os pacotes necessários. Se você ainda não o tiver, [instale o Node primeiro](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Edite o `.env` para especificar a chave privada de uma conta que tenha ETH na rede de teste Holesky. Se você não tiver ETH na Holesky, pode [usar esta faucet](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <a chave privada vai aqui>
   ```

4. Inicie o servidor.

   ```sh copy
   npm start
   ```

5. Vá para [um explorador de blocos](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) e, usando um endereço diferente daquele que tem a chave privada, modifique a saudação. Veja que a saudação é modificada de volta automaticamente.

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

Estas são as entidades do [Viem](https://viem.sh/) que precisamos, funções e [o tipo `Address`](https://viem.sh/docs/glossary/types#address). Este servidor foi escrito em [TypeScript](https://www.typescriptlang.org/), que é uma extensão do JavaScript que o torna [fortemente tipado](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Esta função](https://viem.sh/docs/accounts/privateKey) nos permite gerar as informações da carteira, incluindo o endereço, correspondente a uma chave privada.

```typescript
import { holesky } from "viem/chains"
```

Para usar uma cadeia de blocos no Viem, você precisa importar sua definição. Neste caso, queremos nos conectar à cadeia de blocos de teste [Holesky](https://github.com/eth-clients/holesky).

```typescript
// É assim que adicionamos as definições em .env a process.env.
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

Para usar um contrato, precisamos do seu endereço e da [IAB](/glossary/#abi) para ele. Fornecemos ambos aqui.

Em JavaScript (e, portanto, em TypeScript), você não pode atribuir um novo valor a uma constante, mas você _pode_ modificar o objeto que está armazenado nela. Ao usar o sufixo `as const`, estamos dizendo ao TypeScript que a lista em si é constante e não pode ser alterada.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Crie um [cliente público](https://viem.sh/docs/clients/public.html) Viem. Clientes públicos não têm uma chave privada anexada e, portanto, não podem enviar transações. Eles podem chamar [funções `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), ler saldos de contas, etc.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

As variáveis de ambiente estão disponíveis em [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). No entanto, o TypeScript é fortemente tipado. Uma variável de ambiente pode ser qualquer string, ou vazia, então o tipo para uma variável de ambiente é `string | undefined`. No entanto, uma chave é definida no Viem como `0x${string}` (`0x` seguido por uma string). Aqui nós dizemos ao TypeScript que a variável de ambiente `PRIVATE_KEY` será desse tipo. Se não for, teremos um erro de tempo de execução.

A função [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) então usa esta chave privada para criar um objeto de conta completo.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Em seguida, usamos o objeto da conta para criar um [cliente de carteira](https://viem.sh/docs/clients/wallet). Este cliente tem uma chave privada e um endereço, então ele pode ser usado para enviar transações.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Agora que temos todos os pré-requisitos, podemos finalmente criar uma [instância de contrato](https://viem.sh/docs/contract/getContract). Usaremos esta instância de contrato para nos comunicarmos com o contrato na cadeia.

##### Lendo da cadeia de blocos

```typescript
console.log(`Saudação atual:`, await greeter.read.greet())
```

As funções de contrato que são somente leitura ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) e [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) estão disponíveis em `read`. Neste caso, usamos ela para acessar a função [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), que retorna a saudação.

O JavaScript é de thread único, então, quando disparamos um processo de longa duração, precisamos [especificar que o fazemos de forma assíncrona](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Chamar a cadeia de blocos, mesmo para uma operação de somente leitura, requer uma viagem de ida e volta entre o computador e um nó da cadeia de blocos. É por isso que especificamos aqui que o código precisa `await` (aguardar) pelo resultado.

Se você estiver interessado em como isso funciona, pode [ler sobre isso aqui](https://www.w3schools.com/js/js_promise.asp), mas, em termos práticos, tudo o que você precisa saber é que você usa `await` nos resultados se iniciar uma operação que leva muito tempo, e que qualquer função que faça isso precisa ser declarada como `async`.

##### Emitindo transações

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Esta é a função que você chama para emitir uma transação que altera a saudação. Como esta é uma operação longa, a função é declarada como `async`. Devido à implementação interna, qualquer função `async` precisa retornar um objeto `Promise`. Neste caso, `Promise<any>` significa que não especificamos o que exatamente será retornado na `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

O campo `write` da instância do contrato tem todas as funções que escrevem no estado da cadeia de blocos (aquelas que exigem o envio de uma transação), como [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Os parâmetros, se houver, são fornecidos como uma lista, e a função retorna o hash da transação.

```typescript
    console.log(`Trabalhando em uma correção, veja https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Informe o hash da transação (como parte de um URL para o explorador de blocos para visualizá-lo) e retorne-o.

##### Respondendo a eventos

```typescript
greeter.watchEvent.SetGreeting({
```

[A função `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) permite que você especifique que uma função deve ser executada quando um evento é emitido. Se você se importa apenas com um tipo de evento (neste caso, `SetGreeting`), pode usar esta sintaxe para se limitar a esse tipo de evento.

```typescript
    onLogs: logs => {
```

A função `onLogs` é chamada quando há entradas de log. No Ethereum, "log" e "evento" são geralmente intercambiáveis.

```typescript
console.log(
  `O endereço ${logs[0].args.sender} alterou a saudação para ${logs[0].args.greeting}`
)
```

Pode haver vários eventos, mas por simplicidade nos importamos apenas com o primeiro. `logs[0].args` são os argumentos do evento, neste caso, `sender` e `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insiste que seja Olá!`)
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

Os scripts são várias ações da aplicação. Neste caso, o único que temos é o `start`, que compila e depois executa o servidor. O comando `tsc` faz parte do pacote `typescript` e compila TypeScript em JavaScript. Se você quiser executá-lo manualmente, ele está localizado em `node_modules/.bin`. O segundo comando executa o servidor.

```json
  "type": "module",
```

Existem vários tipos de aplicações Node de JavaScript. O tipo `module` nos permite ter `await` no código de nível superior, o que é importante quando você faz operações lentas (e, portanto, assíncronas).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Estes são pacotes que são necessários apenas para o desenvolvimento. Aqui precisamos do `typescript` e, como estamos usando com Node.js, também estamos obtendo os tipos para variáveis e objetos do Node, como o `process`. [A notação `^<versão>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) significa essa versão ou uma versão superior que não tenha alterações que quebrem a compatibilidade. Veja [aqui](https://semver.org) para mais informações sobre o significado dos números de versão.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Estes são pacotes que são necessários em tempo de execução, ao executar `dist/app.js`.

## Conclusão {#conclusion}

O servidor centralizado que criamos aqui cumpre seu papel, que é atuar como um agente para um usuário. Qualquer outra pessoa que queira que o dapp continue funcionando e esteja disposta a gastar o gás pode executar uma nova instância do servidor com seu próprio endereço.

No entanto, isso só funciona quando as ações do servidor centralizado podem ser facilmente verificadas. Se o servidor centralizado tiver alguma informação de estado secreta ou executar cálculos difíceis, é uma entidade centralizada na qual você precisa confiar para usar a aplicação, que é exatamente o que as cadeias de blocos tentam evitar. Em um artigo futuro, pretendo mostrar como usar [provas de conhecimento zero](/zero-knowledge-proofs) para contornar este problema.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
