---
title: "Construindo uma interface de usuário para o seu contrato"
description: Usando componentes modernos como TypeScript, React, Vite e Wagmi, analisaremos uma interface de usuário moderna, porém minimalista, e aprenderemos como conectar uma carteira à interface de usuário, chamar um contrato inteligente para ler informações, enviar uma transação para um contrato inteligente e monitorar eventos de um contrato inteligente para identificar alterações.
author: Ori Pomerantz
tags: ["typescript", "react", "vite", "wagmi", "frontend"]
skill: beginner
breadcrumb: Interface de usuário com WAGMI
published: 2023-11-01
lang: pt-br
sidebarDepth: 3
---

Você encontrou um recurso que precisamos no ecossistema Ethereum. Você escreveu os contratos inteligentes para implementá-lo e talvez até algum código relacionado que é executado offchain. Isso é ótimo! Infelizmente, sem uma interface de usuário, você não terá nenhum usuário, e a última vez que você escreveu um site, as pessoas usavam modems discados e o JavaScript era novidade.

Este artigo é para você. Presumo que você saiba programar e talvez um pouco de JavaScript e HTML, mas que suas habilidades de interface de usuário estejam enferrujadas e desatualizadas. Juntos, analisaremos um aplicativo moderno e simples para que você veja como isso é feito hoje em dia.

## Por que isso é importante {#why-important}

Na teoria, você poderia simplesmente fazer com que as pessoas usassem o [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) ou o [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) para interagir com seus contratos. Isso é ótimo para os Ethereans experientes. Mas estamos tentando atender a [mais um bilhão de pessoas](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Isso não acontecerá sem uma ótima experiência de usuário, e uma interface de usuário amigável é uma grande parte disso.

## Aplicativo Greeter {#greeter-app}

Há muita teoria por trás de como a interface de usuário moderna funciona, e [muitos sites bons](https://react.dev/learn/thinking-in-react) [que explicam isso](https://wagmi.sh/core/getting-started). Em vez de repetir o excelente trabalho feito por esses sites, vou presumir que você prefere aprender fazendo e começar com um aplicativo com o qual você possa brincar. Você ainda precisa da teoria para fazer as coisas, e chegaremos lá - vamos apenas passar arquivo fonte por arquivo fonte e discutir as coisas à medida que chegarmos a elas.

### Instalação {#installation}

1. O aplicativo usa a rede de teste [Sepolia](https://sepolia.dev/). Se necessário, [obtenha ETH de teste da Sepolia](/developers/docs/networks/#sepolia) e [adicione a Sepolia à sua carteira](https://chainlist.org/chain/11155111).

2. Clone o repositório do GitHub e instale os pacotes necessários.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. O aplicativo usa pontos de acesso gratuitos, que têm limitações de desempenho. Se você quiser usar um provedor de [Nó como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service/), substitua as URLs em [`src/wagmi.ts`](#wagmi-ts).

4. Inicie o aplicativo.

   ```sh
   npm run dev
   ```

5. Navegue até a URL mostrada pelo aplicativo. Na maioria dos casos, é [http://localhost:5173/](http://localhost:5173/).

6. Você pode ver o código-fonte do contrato, uma versão modificada do Greeter do Hardhat, [em um explorador de blockchain](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Passo a passo dos arquivos {#file-walk-through}

#### `index.html` {#index-html}

Este arquivo é um modelo HTML padrão, exceto por esta linha, que importa o arquivo de script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

A extensão do arquivo indica que este é um [componente React](https://www.w3schools.com/react/react_components.asp) escrito em [TypeScript](https://www.typescriptlang.org/), uma extensão do JavaScript que suporta [verificação de tipos](https://en.wikipedia.org/wiki/Type_system#Type_checking). O TypeScript é compilado para JavaScript, então podemos usá-lo no lado do cliente.

Este arquivo é explicado principalmente caso você esteja interessado. Geralmente você não modifica este arquivo, mas sim o [`src/App.tsx`](#app-tsx) e os arquivos que ele importa.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Importe o código da biblioteca que precisamos.

```tsx
import App from './App.tsx'
```

Importe o componente React que implementa o aplicativo (veja abaixo).

```tsx
import { config } from './wagmi.ts'
```

Importe a configuração do [Wagmi](https://wagmi.sh/), que inclui a configuração da blockchain.

```tsx
const queryClient = new QueryClient()
```

Cria uma nova instância do gerenciador de cache do [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Este objeto armazenará:

- Chamadas RPC em cache
- Leituras de contrato
- Estado de reobtenção (refetching) em segundo plano

Precisamos do gerenciador de cache porque o Wagmi v3 usa o React Query internamente.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Crie o componente React raiz. O parâmetro para `render` é [JSX](https://www.w3schools.com/react/react_jsx.asp), uma linguagem de extensão que usa tanto HTML quanto JavaScript/TypeScript. O ponto de exclamação aqui diz ao componente TypeScript: "você não sabe que `document.getElementById('root')` será um parâmetro válido para `ReactDOM.createRoot`, mas não se preocupe - eu sou o desenvolvedor e estou dizendo que haverá".

```tsx
  <React.StrictMode>
```

O aplicativo vai dentro de [um componente `React.StrictMode`](https://react.dev/reference/react/StrictMode). Este componente diz à biblioteca React para inserir verificações de depuração adicionais, o que é útil durante o desenvolvimento.

```tsx
    <WagmiProvider config={config}>
```

O aplicativo também está dentro de [um componente `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [A biblioteca Wagmi (que vamos criar)](https://wagmi.sh/) conecta as definições de interface de usuário do React com [a biblioteca Viem](https://viem.sh/) para escrever um aplicativo descentralizado (dapp) Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

E, finalmente, adicione um provedor do React Query para que qualquer componente do aplicativo possa usar consultas em cache.

```tsx
        <App />
```

Agora podemos ter o componente para o aplicativo, que realmente implementa a interface de usuário. O `/>` no final do componente diz ao React que este componente não tem nenhuma definição dentro dele, de acordo com o padrão XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Claro, temos que fechar os outros componentes.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Importe as bibliotecas que precisamos, bem como [o componente `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

O ID da cadeia da Sepolia.

```
function App() {
```

Esta é a maneira padrão de criar um componente React: defina uma função que é chamada sempre que precisar ser renderizada. Esta função normalmente contém código TypeScript ou JavaScript, seguido por uma instrução `return` que retorna o código JSX.

```tsx
  const connection = useConnection()
```

Use [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) para obter informações relacionadas à conexão atual, como o endereço e o `chainId`.

Por convenção, no React, funções chamadas `use...` são [hooks](https://www.w3schools.com/react/react_hooks.asp). Essas funções não apenas retornam dados para o componente; elas também garantem que ele seja renderizado novamente (a função do componente é executada novamente e sua saída substitui a anterior no HTML) quando esses dados mudam.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Use [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) para obter informações sobre a conexão da carteira.

```tsx
  const { disconnect } = useDisconnect()
```

[Este hook](https://wagmi.sh/react/api/hooks/useDisconnect) nos dá a função para desconectar da carteira.

```tsx
  const { switchChain } = useSwitchChain()
```

[Este hook](https://wagmi.sh/react/api/hooks/useSwitchChain) nos permite trocar de cadeia.

```tsx
  useEffect(() => {
```

O hook do React [`useEffect`](https://react.dev/reference/react/useEffect) permite que você execute uma função sempre que o valor de uma variável mudar para sincronizar um sistema externo.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Se estivermos conectados, mas não à blockchain da Sepolia, mude para a Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Execute a função novamente toda vez que o status da conexão ou o chainId da conexão mudar.

```tsx
  return (
    <>
```

O JSX de um componente React _deve_ retornar um único componente HTML. Quando temos vários componentes e não precisamos de um contêiner para envolver todos eles, usamos um componente vazio (`<> ... </>`) para combiná-los em um único componente.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
      </div>
```

Forneça informações sobre a conexão atual. Dentro do JSX, `{<expression>}` significa avaliar a expressão como JavaScript.

```tsx
      {connection.status === 'connected' && (
```

A sintaxe `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

Esta é a maneira padrão de colocar instruções if dentro do JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

O JSX segue o padrão XML, que é mais rigoroso que o HTML. Se uma tag não tiver uma tag de fechamento correspondente, ela _deve_ ter uma barra (`/`) no final para terminá-la.

Aqui temos duas dessas tags, `<Greeter />` (que na verdade contém o código HTML que se comunica com o contrato) e [`<HTML-PLACEHOLDER-HTMLTAG-8d9513 />` para uma linha horizontal](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

Se o usuário clicar neste botão, chame a função `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Se _não_ estivermos conectados, mostre as opções necessárias para conectar à carteira.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

Em `connectors` temos uma lista de conectores. Usamos [`map`](https://www.w3schools.com/jsref/jsref_map.asp) para transformá-la em uma lista de botões JSX para exibir.

```tsx
            <button
              key={connector.uid}
```

No JSX, é necessário que as tags "irmãs" (tags que descendem do mesmo pai) tenham identificadores diferentes.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Os botões do conector.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

Forneça informações adicionais. A sintaxe da expressão `<variable>?.<field>` diz ao JavaScript que, se a variável estiver definida, avalie para esse campo. Se a variável não estiver definida, então esta expressão é avaliada como `undefined`.

A expressão `error.message`, quando não há erro, geraria uma exceção. Usar `error?.message` nos permite evitar esse problema.

#### `src/Greeter.tsx` {#greeter-tsx}

Este arquivo contém a maior parte da funcionalidade da interface de usuário. Ele inclui definições que normalmente estariam em vários arquivos, mas como este é um tutorial, o programa é otimizado para ser fácil de entender na primeira vez, em vez de focar em desempenho ou facilidade de manutenção.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Usamos essas funções de biblioteca. Novamente, elas são explicadas abaixo onde são usadas.

```tsx
import { AddressType } from 'abitype'
```

[A biblioteca `abitype`](https://abitype.dev/) nos fornece definições TypeScript para vários tipos de dados do Ethereum, como [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

A ABI para o contrato `Greeter`.
Se você estiver desenvolvendo os contratos e a interface de usuário ao mesmo tempo, normalmente os colocaria no mesmo repositório e usaria a ABI gerada pelo compilador Solidity como um arquivo em seu aplicativo. No entanto, isso não é necessário aqui porque o contrato já está desenvolvido e não mudará.

Usamos [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) para dizer ao TypeScript que esta é uma constante _real_. Normalmente, quando você especifica no JavaScript `const x = {"a": 1}`, você pode alterar o valor em `x`, você apenas não pode atribuir a ele.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

O TypeScript é fortemente tipado. Usamos esta definição para especificar o endereço onde o contrato `Greeter` é implantado em diferentes cadeias. A chave é um número (o chainId) e o valor é um `AddressType` (um endereço).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

O endereço do contrato na [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Componente `Timer` {#timer-component}

O componente `Timer` mostra o número de segundos desde um determinado momento. Isso é importante para fins de usabilidade. Quando os usuários fazem algo, eles esperam uma reação imediata. Em blockchains, isso geralmente é impossível porque nada acontece até que uma transação seja colocada em um bloco. Uma solução é mostrar quanto tempo se passou desde que o usuário executou a ação, para que o usuário possa decidir se o tempo necessário é razoável.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

O componente `Timer` recebe um parâmetro, `lastUpdate`, que é o momento da última ação.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Precisamos ter um estado (uma variável vinculada ao componente) e atualizá-lo para que o componente funcione corretamente. Mas nunca precisamos lê-lo, então não se preocupe em criar uma variável.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

A função [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) nos permite agendar uma função para ser executada periodicamente. Neste caso, a cada segundo. A função chama `setNow` para atualizar o estado, de modo que o componente `Timer` será renderizado novamente. Envolvemos isso dentro de [`useEffect`](https://react.dev/reference/react/useEffect) com uma lista de dependências vazia para que aconteça apenas uma vez, em vez de cada vez que o componente for renderizado.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Calcule o número de segundos desde a última atualização e retorne-o.

##### Componente `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Finalmente, chegamos à definição do componente.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Informações sobre a cadeia e a conta que estamos usando, cortesia do [Wagmi](https://wagmi.sh/). Como este é um hook (`use...`), o componente é renderizado novamente sempre que essas informações mudam.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

O endereço do contrato Greeter, que é `undefined` se não tivermos informações da cadeia, ou se estivermos em uma cadeia sem esse contrato.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Sem argumentos
  })
```

[O hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) chama a função `greet` [do contrato](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

O [hook `useState`](https://www.w3schools.com/react/react_usestate.asp) do React nos permite especificar uma variável de estado, cujo valor persiste de uma renderização do componente para outra. O valor inicial é o parâmetro, neste caso a string vazia.

O hook `useState` retorna uma lista com dois valores:

1. O valor atual da variável de estado.
2. Uma função para modificar a variável de estado quando necessário. Como este é um hook, toda vez que é chamado, o componente é renderizado novamente.

Neste caso, estamos usando uma variável de estado para a nova saudação que o usuário deseja definir.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Se vários usuários estiverem usando o mesmo contrato ao mesmo tempo, eles podem sobrescrever as saudações uns dos outros. Isso pareceria aos usuários como se o aplicativo estivesse com mau funcionamento. Se o aplicativo mostrar quem definiu a saudação por último, o usuário saberá que foi outra pessoa e que o aplicativo está funcionando corretamente.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Os usuários gostam de ver que suas ações têm um efeito imediato. No entanto, em uma blockchain, esse não é o caso. Essas variáveis de estado nos permitem pelo menos exibir algo aos usuários para que eles saibam que sua ação está em andamento.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Se `readResults` acima alterar os dados e não estiver definido como um valor falso (`undefined`, por exemplo), atualize a saudação atual para aquela lida da blockchain. Além disso, atualize o status.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Ouça os eventos `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` significa que se o valor for `false`, ou um valor que seja avaliado como falso, como `undefined`, `0` ou uma string vazia, a expressão geral será `false`. Para qualquer outro valor, é `true`. É uma maneira de converter valores em booleanos, porque se não houver `greeterAddr`, não queremos ouvir eventos.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Quando vemos logs (o que acontece quando vemos um novo evento), significa que a saudação foi modificada. Nesse caso, podemos atualizar `currentGreeting` e `lastSetterAddress` para os novos valores. Além disso, queremos atualizar a exibição do status.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Quando atualizamos o status, queremos fazer duas coisas:

1. Atualizar a string de status (`status`)
2. Atualizar o momento da última atualização de status (`statusTime`) para agora.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Este é o manipulador de eventos para alterações no novo campo de entrada de saudação. Poderíamos especificar o tipo do parâmetro `evt`, mas o TypeScript é uma linguagem de tipo opcional. Como esta função é chamada apenas uma vez, em um manipulador de eventos HTML, não acho que seja necessário.

```tsx
  const { writeContractAsync } = useWriteContract()
```

A função para gravar em um contrato. É semelhante a [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), mas permite melhores atualizações de status.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Este é o processo para enviar uma transação na blockchain da perspectiva do cliente:

1. Envie a transação para um nó na blockchain usando [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Aguarde uma resposta do nó.
3. Quando a resposta for recebida, peça ao usuário para assinar a transação através da carteira. Esta etapa _tem_ que acontecer depois que a resposta do nó for recebida porque o custo do gás da transação é mostrado ao usuário antes de assiná-la.
4. Aguarde a aprovação do usuário.
5. Envie a transação novamente, desta vez usando [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

A etapa 2 provavelmente levará um tempo perceptível, durante o qual os usuários podem se perguntar se o comando deles foi recebido pela interface de usuário e por que ainda não estão sendo solicitados a assinar a transação. Isso cria uma experiência de usuário (UX) ruim.

Uma solução é enviar `eth_estimateGas` toda vez que um parâmetro mudar. Então, quando o usuário realmente quiser enviar a transação (neste caso, pressionando **Update greeting**), o custo do gás é conhecido e o usuário pode ver a página da carteira imediatamente.

```tsx
  return (
```

Agora podemos finalmente criar o HTML real para retornar.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Mostre a saudação atual.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Se soubermos quem definiu a saudação por último, exiba essa informação. O `Greeter` não rastreia essas informações e não queremos olhar para trás em busca de eventos `SetGreeting`, então só as obtemos quando a saudação é alterada enquanto estamos em execução.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Este é o campo de texto de entrada onde o usuário pode definir uma nova saudação. Toda vez que o usuário pressiona uma tecla, chamamos `greetingChange`, que chama `setNewGreeting`. Como `setNewGreeting` vem de `useState`, isso faz com que o componente `Greeter` seja renderizado novamente. Isso significa que:

- Precisamos especificar `value` para manter o valor da nova saudação, porque, caso contrário, ele voltaria ao padrão, a string vazia.
- `simulation` também é atualizado toda vez que `newGreeting` muda, o que significa que obteremos uma simulação com a saudação correta. Isso pode ser relevante porque o custo do gás depende do tamanho dos dados da chamada, que depende do comprimento da string.

```tsx
      <button disabled={!simulation.data}
```

Habilite o botão apenas quando tivermos as informações necessárias para enviar a transação.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Atualize o status. Neste ponto, o usuário precisa confirmar na carteira.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` só retorna depois que a transação é realmente enviada. Isso nos permite mostrar ao usuário há quanto tempo a transação está esperando para ser incluída na blockchain.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Mostre o status e quanto tempo se passou desde que foi atualizado.

```
export {Greeter}
```

Exporte o componente.

#### `src/wagmi.ts` {#wagmi-ts}

Finalmente, várias definições relacionadas ao Wagmi estão em `src/wagmi.ts`. Não vou explicar tudo aqui, porque a maior parte é um modelo padrão que você provavelmente não precisará alterar.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

A configuração do Wagmi inclui as cadeias suportadas por este aplicativo. Você pode ver a [lista de cadeias disponíveis](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Este conector](https://wagmi.sh/core/api/connectors/injected) nos permite falar com uma carteira instalada no navegador.

```ts
  transports: {
    [sepolia.id]: http()
```

O endpoint HTTP padrão que vem com o Viem é bom o suficiente. Se quisermos uma URL diferente, podemos usar `http("https:// hostname ")` ou `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Adicionando outra blockchain {#add-blockchain}

Hoje em dia, existem muitas [soluções de escalabilidade de L2](https://ethereum.org/layer-2/), e você pode querer suportar algumas que o Viem ainda não suporta. Para fazer isso, você modifica `src/wagmi.ts`. Estas instruções explicam como adicionar a [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Edite `src/wagmi.ts`

    A. Importe o tipo `defineChain` do Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Adicione a definição da rede. Você não precisa realmente fazer isso para a Optimism Sepolia, [ela já está em `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), mas desta forma você aprende como adicionar uma blockchain que não está em `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. Adicione a nova cadeia à chamada `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Edite `src/App.tsx` para comentar a mudança automática para a Sepolia. Em um sistema de produção, você provavelmente mostraria botões com links para cada uma das blockchains que você suporta.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  Edite `src/Greeter.tsx` para garantir que o aplicativo conheça o endereço dos seus contratos na nova rede.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  No seu navegador.

    A. Navegue até a [ChainList](https://chainlist.org/chain/11155420?testnets=true) e clique em um dos botões no lado direito da tabela para adicionar a cadeia à sua carteira.

    B. No aplicativo, clique em **Disconnect** e reconecte para alterar a blockchain. Existem maneiras melhores de lidar com isso, mas elas exigiriam alterações no aplicativo.

## Conclusão {#conclusion}

Claro, você não se importa muito em fornecer uma interface de usuário para o `Greeter`. Você quer criar uma interface de usuário para seus próprios contratos. Para criar seu próprio aplicativo, execute estas etapas:

1. Especifique para criar um aplicativo Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Digite `y` para prosseguir.

3. Dê um nome ao aplicativo.

4. Selecione o framework **React**.

5. Selecione a variante **Vite**.

Agora vá e torne seus contratos utilizáveis para o mundo todo.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).