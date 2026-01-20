---
title: Usando conhecimento zero para um estado secreto
description: "Os jogos em cadeia são limitados porque não conseguem manter nenhuma informação oculta. Após ler este tutorial, o leitor será capaz de combinar provas de conhecimento zero e componentes de servidor para criar jogos verificáveis com um estado secreto, fora da cadeia, componente. A técnica para fazer isso será demonstrada com a criação de um jogo de campo minado."
author: |
  Ori Pomerantz
tags:
  [
    "servidor",
    "fora da cadeia",
    "centralizado",
    "conhecimento zero",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: pt-br
published: 2025-03-15
---

_Não há segredos na blockchain_. Tudo o que é publicado na cadeia de blocos é aberto para que todos leiam. Isso é necessário, porque a cadeia de blocos se baseia na capacidade de qualquer pessoa poder verificá-la. No entanto, os jogos geralmente dependem de um estado secreto. Por exemplo, o jogo de [campo minado](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) não faz o menor sentido se você puder simplesmente acessar um explorador da cadeia de blocos e ver o mapa.

A solução mais simples é usar um [componente de servidor](/developers/tutorials/server-components/) para manter o estado secreto. No entanto, a razão pela qual usamos a cadeia de blocos é para impedir que o desenvolvedor do jogo trapaceie. Precisamos garantir a honestidade do componente do servidor. O servidor pode fornecer um hash do estado e usar [provas de conhecimento zero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) para provar que o estado usado para calcular o resultado de um movimento é o correto.

Após ler este artigo, você saberá como criar este tipo de servidor que detém o estado secreto, um cliente para mostrar o estado e um componente em cadeia para comunicação entre os dois. As principais ferramentas que usaremos serão:

| Ferramenta                                    | Propósito                                            |                    Verificado na versão |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Provas de conhecimento zero e sua verificação        |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Linguagem de programação para o servidor e o cliente |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Executando o servidor                                | 20.18.2 |
| [Viem](https://viem.sh/)                      | Comunicação com a cadeia de blocos                   |  2.9.20 |
| [MUD](https://mud.dev/)                       | Gerenciamento de dados em cadeia                     |  2.0.12 |
| [React](https://react.dev/)                   | Interface do usuário do cliente                      |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Servindo o código do cliente                         |   4.2.1 |

## Exemplo de Campo Minado {#minesweeper}

[Campo Minado](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) é um jogo que inclui um mapa secreto com um campo minado. O jogador escolhe cavar em um local específico. Se esse local tiver uma mina, o jogo acaba. Caso contrário, o jogador obtém o número de minas nos oito quadrados ao redor daquele local.

Esta aplicação é escrita usando [MUD](https://mud.dev/), uma estrutura que nos permite armazenar dados em cadeia usando um [banco de dados chave-valor](https://aws.amazon.com/nosql/key-value/) e sincronizar esses dados automaticamente com componentes fora da cadeia. Além da sincronização, o MUD facilita o controle de acesso e permite que outros usuários [estendam](https://mud.dev/guides/extending-a-world) nossa aplicação sem permissão.

### Executando o exemplo de Campo Minado {#running-minesweeper-example}

Para executar o exemplo do Campo Minado:

1. Certifique-se de que você [tenha os pré-requisitos instalados](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) e [`mprocs`](https://github.com/pvolok/mprocs).

2. Clone o repositório.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Instale os pacotes.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Se o Foundry foi instalado como parte do `pnpm install`, você precisa reiniciar o shell da linha de comando.

4. Compile os contratos

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Inicie o programa (incluindo uma cadeia de blocos [anvil](https://book.getfoundry.sh/anvil/)) e aguarde.

   ```sh copy
   mprocs
   ```

   Observe que a inicialização leva muito tempo. Para ver o progresso, primeiro use a seta para baixo para rolar até a guia _contracts_ para ver os contratos MUD sendo implantados. Quando você receber a mensagem _Waiting for file changes…_, os contratos serão implantados e o progresso adicional ocorrerá na guia _server_. Lá, você espera até receber a mensagem _Verifier address: 0x...._.

   Se esta etapa for bem-sucedida, você verá a tela `mprocs`, com os diferentes processos à esquerda e a saída do console para o processo atualmente selecionado à direita.

   ![A tela mprocs](./mprocs.png)

   Se houver um problema com `mprocs`, você pode executar os quatro processos manualmente, cada um em sua própria janela de linha de comando:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contratos**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Servidor**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Cliente**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Agora você pode navegar para [o cliente](http://localhost:3000), clicar em **Novo Jogo** e começar a jogar.

### Tabelas {#tables}

Precisamos de [várias tabelas](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) em cadeia.

- `Configuration`: esta tabela é um singleton, não tem chave e um único registro. É usada para manter informações de configuração do jogo:
  - `height`: a altura de um campo minado
  - `width`: a largura de um campo minado
  - `numberOfBombs`: o número de bombas em cada campo minado

- `VerifierAddress`: esta tabela também é um singleton. É usada para conter uma parte da configuração, o endereço do contrato do verificador (`verifier`). Poderíamos ter colocado essa informação na tabela `Configuration`, mas ela é definida por um componente diferente, o servidor, então é mais fácil colocá-la em uma tabela separada.

- `PlayerGame`: a chave é o endereço do jogador. Os dados são:

  - `gameId`: valor de 32 bytes que é o hash do mapa em que o jogador está jogando (o identificador do jogo).
  - `win`: um booleano que indica se o jogador ganhou o jogo.
  - `lose`: um booleano que indica se o jogador perdeu o jogo.
  - `digNumber`: o número de escavações bem-sucedidas no jogo.

- `GamePlayer`: esta tabela contém o mapeamento inverso, do `gameId` para o endereço do jogador.

- `Map`: a chave é uma tupla de três valores:

  - `gameId`: valor de 32 bytes que é o hash do mapa em que o jogador está jogando (o identificador do jogo).
  - coordenada `x`
  - coordenada `y`

  O valor é um único número. É 255 se uma bomba foi detectada. Caso contrário, é o número de bombas ao redor desse local mais um. Não podemos usar apenas o número de bombas, porque, por padrão, todo o armazenamento na EVM e todos os valores de linha no MUD são zero. Precisamos distinguir entre "o jogador ainda não cavou aqui" e "o jogador cavou aqui e descobriu que há zero bombas por perto".

Além disso, a comunicação entre o cliente e o servidor ocorre por meio do componente em cadeia. Isso também é implementado usando tabelas.

- `PendingGame`: solicitações não atendidas para iniciar um novo jogo.
- `PendingDig`: solicitações não atendidas para cavar em um local específico em um jogo específico. Esta é uma [tabela fora da cadeia](https://mud.dev/store/tables#types-of-tables), o que significa que não é gravada no armazenamento da EVM, é apenas legível fora da cadeia usando eventos.

### Fluxos de execução e de dados {#execution-data-flows}

Esses fluxos coordenam a execução entre o cliente, o componente em cadeia e o servidor.

#### Inicialização {#initialization-flow}

Quando você executa `mprocs`, estas etapas ocorrem:

1. [`mprocs`](https://github.com/pvolok/mprocs) executa quatro componentes:

   - [Anvil](https://book.getfoundry.sh/anvil/), que executa uma cadeia de blocos local
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), que compila (se necessário) e implanta os contratos para o MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), que executa o [Vite](https://vitejs.dev/) para servir a UI e o código do cliente para navegadores da web.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), que executa as ações do servidor

2. O pacote `contracts` implanta os contratos MUD e, em seguida, executa [o script `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Este script define a configuração. O código do GitHub especifica [um campo minado de 10x5 com oito minas nele](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [O servidor](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) começa por [configurar o MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Entre outras coisas, isso ativa a sincronização de dados, para que uma cópia das tabelas relevantes exista na memória do servidor.

4. O servidor inscreve uma função para ser executada [quando a tabela `Configuration` muda](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Esta função](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) é chamada depois que `PostDeploy.s.sol` é executado e modifica a tabela.

5. Quando a função de inicialização do servidor tem a configuração, [ela chama `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) para inicializar [a parte de conhecimento zero do servidor](#using-zokrates-from-typescript). Isso não pode acontecer até que obtenhamos a configuração, porque as funções de conhecimento zero devem ter a largura e a altura do campo minado como constantes.

6. Depois que a parte de conhecimento zero do servidor é inicializada, o próximo passo é [implantar o contrato de verificação de conhecimento zero na cadeia de blocos](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) e definir o endereço do verificador no MUD.

7. Finalmente, nos inscrevemos para atualizações para que vejamos quando um jogador solicita [iniciar um novo jogo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) ou [cavar em um jogo existente](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Novo jogo {#new-game-flow}

Isto é o que acontece quando o jogador solicita um novo jogo.

1. Se não houver nenhum jogo em andamento para este jogador, ou se houver um, mas com um gameId de zero, o cliente exibe um [botão de novo jogo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Quando o usuário pressiona este botão, o [React executa a função `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) é uma chamada `System`. No MUD, todas as chamadas são roteadas através do contrato `World` e, na maioria dos casos, você chama `<namespace>__<function name>`. Nesse caso, a chamada é para `app__newGame`, que o MUD então roteia para [`newGame` em `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. A função em cadeia verifica se o jogador não tem um jogo em andamento e, se não houver, [adiciona a solicitação à tabela `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. O servidor detecta a alteração em `PendingGame` e [executa a função inscrita](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Essa função chama [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), que por sua vez chama [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. A primeira coisa que `createGame` faz é [criar um mapa aleatório com o número apropriado de minas](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Em seguida, ele chama [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) para criar um mapa com bordas em branco, o que é necessário para o Zokrates. Finalmente, `createGame` chama [`calculateMapHash`](#calculateMapHash) para obter o hash do mapa, que é usado como o ID do jogo.

6. A função `newGame` adiciona o novo jogo a `gamesInProgress`.

7. A última coisa que o servidor faz é chamar [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), que está em cadeia. Esta função está em um `System` diferente, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), para habilitar o controle de acesso. O controle de acesso é definido no [arquivo de configuração MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   A lista de acesso permite que apenas um único endereço chame o `System`. Isso restringe o acesso às funções do servidor a um único endereço, para que ninguém possa se passar pelo servidor.

8. O componente em cadeia atualiza as tabelas relevantes:

   - Crie o jogo em `PlayerGame`.
   - Defina o mapeamento reverso em `GamePlayer`.
   - Remova a solicitação de `PendingGame`.

9. O servidor identifica a alteração em `PendingGame`, mas não faz nada porque [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) é falso.

10. No cliente, [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) é definido para a entrada `PlayerGame` para o endereço do jogador. Quando `PlayerGame` muda, `gameRecord` muda também.

11. Se houver um valor em `gameRecord` e o jogo não tiver sido ganho ou perdido, o cliente [exibe o mapa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Cavar {#dig-flow}

1. O jogador [clica no botão da célula do mapa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), que chama a [função `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Essa função chama [`dig` em cadeia](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. O componente em cadeia [realiza uma série de verificações de sanidade](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) e, se bem-sucedido, adiciona a solicitação de escavação a [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. O servidor [detecta a alteração em `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Se for válido](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), ele [chama o código de conhecimento zero](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (explicado abaixo) para gerar tanto o resultado quanto uma prova de que ele é válido.

4. [O servidor](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) chama [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) em cadeia.

5. `digResponse` faz duas coisas. Primeiro, ele verifica a [prova de conhecimento zero](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Então, se a prova for verificada, ele chama [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) para processar o resultado.

6. `processDigResult` verifica se o jogo foi [perdido](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) ou [ganho](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) e [atualiza o `Map`, o mapa em cadeia](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. O cliente recebe as atualizações automaticamente e [atualiza o mapa exibido para o jogador](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190) e, se aplicável, informa ao jogador se é uma vitória ou uma derrota.

## Usando Zokrates {#using-zokrates}

Nos fluxos explicados acima, pulamos as partes de conhecimento zero, tratando-as como uma caixa preta. Agora vamos abri-la e ver como esse código é escrito.

### Hashing do mapa {#hashing-map}

Podemos usar [este código JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) para implementar [Poseidon](https://www.poseidon-hash.info), a função de hash do Zokrates que usamos. No entanto, embora isso fosse mais rápido, também seria mais complicado do que simplesmente usar a função de hash do Zokrates para fazê-lo. Este é um tutorial e, portanto, o código é otimizado para simplicidade, não para desempenho. Portanto, precisamos de dois programas Zokrates diferentes, um para apenas calcular o hash de um mapa (`hash`) e outro para realmente criar uma prova de conhecimento zero do resultado da escavação em um local no mapa (`dig`).

### A função de hash {#hash-function}

Esta é a função que calcula o hash de um mapa. Vamos analisar este código linha por linha.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Essas duas linhas importam duas funções da [biblioteca padrão do Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [A primeira função](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) é um [hash Poseidon](https://www.poseidon-hash.info/). Ela recebe um array de elementos [`field`](https://zokrates.github.io/language/types.html#field) e retorna um `field`.

O elemento de campo no Zokrates é normalmente menor que 256 bits, mas não por muito. Para simplificar o código, restringimos o mapa a até 512 bits e fazemos o hash de um array de quatro campos, e em cada campo usamos apenas 128 bits. [A função `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) transforma um array de 128 bits em um `field` para este propósito.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Esta linha inicia uma definição de função. `hashMap` recebe um único parâmetro chamado `map`, um array `bool`(eano) bidimensional. O tamanho do mapa é `width+2` por `height+2` por razões que são [explicadas abaixo](#why-map-border).

Podemos usar `${width+2}` e `${height+2}` porque os programas Zokrates são armazenados nesta aplicação como [template strings](https://www.w3schools.com/js/js_string_templates.asp). O código entre `${` e `}` é avaliado pelo JavaScript e, dessa forma, o programa pode ser usado para diferentes tamanhos de mapa. O parâmetro do mapa tem uma borda de um local de largura ao seu redor sem nenhuma bomba, que é a razão pela qual precisamos adicionar dois à largura e à altura.

O valor de retorno é um `field` que contém o hash.

```
   bool[512] mut map1d = [false; 512];
```

O mapa é bidimensional. No entanto, a função `pack128` não funciona com arrays bidimensionais. Então, primeiro achatamos o mapa em um array de 512 bytes, usando `map1d`. Por padrão, as variáveis do Zokrates são constantes, mas precisamos atribuir valores a este array em um loop, então o definimos como [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Precisamos inicializar o array porque o Zokrates não tem `undefined`. A expressão `[false; 512]` significa [um array de 512 valores `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Também precisamos de um contador para distinguir entre os bits que já preenchemos em `map1d` e os que não preenchemos.

```
   for u32 x in 0..${width+2} {
```

É assim que se declara um [loop `for`](https://zokrates.github.io/language/control_flow.html#for-loops) no Zokrates. Um loop `for` do Zokrates tem que ter limites fixos, porque embora pareça ser um loop, o compilador na verdade o "desenrola". A expressão `${width+2}` é uma constante em tempo de compilação porque `width` é definida pelo código TypeScript antes de chamar o compilador.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Para cada local no mapa, coloque esse valor no array `map1d` e incremente o contador.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

Usamos `pack128` para criar um array de quatro valores `field` a partir de `map1d`. No Zokrates, `array[a..b]` significa a fatia do array que começa em `a` e termina em `b-1`.

```
    return poseidon(hashMe);
}
```

Use `poseidon` para converter este array em um hash.

### O programa de hash {#hash-program}

O servidor precisa chamar `hashMap` diretamente para criar identificadores de jogo. No entanto, Zokrates só pode chamar a função `main` em um programa para iniciar, então criamos um programa com uma `main` que chama a função de hash.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### O programa dig {#dig-program}

Este é o coração da parte de conhecimento zero da aplicação, onde produzimos as provas que são usadas para verificar os resultados da escavação.

```
${hashFragment}

// O número de minas no local (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Por que borda do mapa {#why-map-border}

As provas de conhecimento zero usam [circuitos aritméticos](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), que não têm um equivalente fácil para uma declaração `if`. Em vez disso, eles usam o equivalente do [operador condicional](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Se `a` pode ser zero ou um, você pode calcular `if a { b } else { c }` como `ab+(1-a)c`.

Por causa disso, uma instrução `if` do Zokrates sempre avalia ambas as ramificações. Por exemplo, se você tiver este código:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Ele vai dar erro, porque precisa calcular `arr[10]`, mesmo que esse valor seja posteriormente multiplicado por zero.

Esta é a razão pela qual precisamos de uma borda com uma casa de largura em todo o mapa. Precisamos calcular o número total de minas ao redor de um local, e isso significa que precisamos ver o local uma linha acima e abaixo, à esquerda e à direita, do local onde estamos cavando. O que significa que esses locais precisam existir no array do mapa que é fornecido ao Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Por padrão, as provas Zokrates incluem suas entradas. Não adianta saber que há cinco minas ao redor de um ponto, a menos que você saiba qual é o ponto (e você não pode simplesmente combiná-lo com sua solicitação, porque então o provador poderia usar valores diferentes e não lhe contar sobre isso). No entanto, precisamos manter o mapa em segredo, enquanto o fornecemos ao Zokrates. A solução é usar um parâmetro `private`, que _não_ é revelado pela prova.

Isso abre outra via para abuso. O provador poderia usar as coordenadas corretas, mas criar um mapa com qualquer número de minas ao redor do local, e possivelmente no próprio local. Para evitar esse abuso, fazemos com que a prova de conhecimento zero inclua o hash do mapa, que é o identificador do jogo.

```
   return (hashMap(map),
```

O valor de retorno aqui é uma tupla que inclui o array de hash do mapa, bem como o resultado da escavação.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Usamos 255 como um valor especial caso o próprio local tenha uma bomba.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Se o jogador não atingiu uma mina, some as contagens de minas da área ao redor do local e retorne isso.

### Usando Zokrates a partir do TypeScript {#using-zokrates-from-typescript}

O Zokrates tem uma interface de linha de comando, mas neste programa nós o usamos no [código TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

A biblioteca que contém as definições do Zokrates é chamada [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importe as [ligações JavaScript do Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Só precisamos da função [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) porque ela retorna uma promessa que resolve para todas as definições do Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Semelhante ao próprio Zokrates, também exportamos apenas uma função, que também é [assíncrona](https://www.w3schools.com/js/js_async.asp). Quando ela finalmente retorna, ela fornece várias funções, como veremos abaixo.

```typescript
const zokrates = await zokratesInitialize()
```

Inicialize o Zokrates, obtenha tudo o que precisamos da biblioteca.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

A seguir, temos a função de hash e dois programas Zokrates que vimos acima.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Aqui compilamos esses programas.

```typescript
// Crie as chaves para a verificação de conhecimento zero.
// Em um sistema de produção, você desejaria usar uma cerimônia de configuração.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Em um sistema de produção, poderíamos usar uma [cerimônia de configuração](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) mais complicada, mas isso é suficiente para uma demonstração. Não é um problema que os usuários possam conhecer a chave do provador - eles ainda não podem usá-la para provar coisas, a menos que sejam verdadeiras. Como especificamos a entropia (o segundo parâmetro, `""`), os resultados serão sempre os mesmos.

**Observação:** a compilação de programas Zokrates e a criação de chaves são processos lentos. Não há necessidade de repeti-los sempre, apenas quando o tamanho do mapa muda. Em um sistema de produção, você os faria uma vez e depois armazenaria a saída. A única razão pela qual não estou fazendo isso aqui é por uma questão de simplicidade.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

A função [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) realmente executa o programa Zokrates. Ela retorna uma estrutura com dois campos: `output`, que é a saída do programa como uma string JSON, e `witness`, que é a informação necessária para criar a prova de conhecimento zero do resultado. Aqui só precisamos da saída.

A saída é uma string no formato `"31337"`, um número decimal entre aspas. Mas a saída que precisamos para o `viem` é um número hexadecimal no formato `0x60A7`. Portanto, usamos `.slice(1,-1)` para remover as aspas e, em seguida, `BigInt` para transformar a string restante, que é um número decimal, em um [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` converte este `BigInt` em uma string hexadecimal, e `"0x"+` adiciona o marcador para números hexadecimais.

```typescript
// Escave e retorne uma prova de conhecimento zero do resultado
// (código do lado do servidor)
```

A prova de conhecimento zero inclui as entradas públicas (`x` e `y`) e os resultados (hash do mapa e número de bombas).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Tentando cavar fora do mapa")
```

É um problema verificar se um índice está fora dos limites no Zokrates, então fazemos isso aqui.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Execute o programa dig.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Use [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) e retorne a prova.

```typescript
const solidityVerifier = `
        // Tamanho do mapa: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Um verificador Solidity, um contrato inteligente que podemos implantar na cadeia de blocos e usar para verificar as provas geradas por `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Finalmente, retorne tudo o que outro código possa precisar.

## Testes de segurança {#security-tests}

Os testes de segurança são importantes porque um bug de funcionalidade acabará por se revelar. Mas se a aplicação for insegura, é provável que isso permaneça oculto por muito tempo antes de ser revelado por alguém que trapaceia e obtém recursos que pertencem a outros.

### Permissões {#permissions}

Há uma entidade privilegiada neste jogo, o servidor. É o único usuário autorizado a chamar as funções em [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Podemos usar [`cast`](https://book.getfoundry.sh/cast/) para verificar se as chamadas para funções permissionadas são permitidas apenas como a conta do servidor.

[A chave privada do servidor está em `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. No computador que executa o `anvil` (a cadeia de blocos), defina estas variáveis de ambiente.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Use `cast` para tentar definir o endereço do verificador como um endereço não autorizado.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   O `cast` não apenas relata uma falha, mas você também pode abrir as **Ferramentas de Desenvolvedor MUD** no jogo no navegador, clicar em **Tabelas** e selecionar **app\_\_VerifierAddress**. Veja que o endereço não é zero.

3. Defina o endereço do verificador como o endereço do servidor.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   O endereço em **app\_\_VerifiedAddress** agora deve ser zero.

Todas as funções MUD no mesmo `System` passam pelo mesmo controle de acesso, então considero este teste suficiente. Caso contrário, você pode verificar as outras funções em [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Abusos de conhecimento zero {#zero-knowledge-abuses}

A matemática para verificar o Zokrates está além do escopo deste tutorial (e das minhas habilidades). No entanto, podemos executar várias verificações no código de conhecimento zero para verificar se, se não for feito corretamente, ele falha. Todos esses testes exigirão que alteremos [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) e reiniciemos toda a aplicação. Não é suficiente reiniciar o processo do servidor, porque isso coloca a aplicação em um estado impossível (o jogador tem um jogo em andamento, mas o jogo não está mais disponível para o servidor).

#### Resposta errada {#wrong-answer}

A possibilidade mais simples é fornecer a resposta errada na prova de conhecimento zero. Para fazer isso, entramos em `zkDig` e [modificamos a linha 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Isso significa que sempre alegaremos que há uma bomba, independentemente da resposta correta. Tente jogar com esta versão e você verá na guia **servidor** da tela `pnpm dev` este erro:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Falha na verificação de conhecimento zero',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Portanto, esse tipo de trapaça falha.

#### Prova errada {#wrong-proof}

O que acontece se fornecermos as informações corretas, mas tivermos os dados de prova errados? Agora, substitua a linha 91 por:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Ele ainda falha, mas agora falha sem motivo, porque acontece durante a chamada do verificador.

### Como um usuário pode verificar o código de confiança zero? {#user-verify-zero-trust}

Contratos inteligentes são relativamente fáceis de verificar. Normalmente, o desenvolvedor publica o código-fonte em um explorador de blocos, e o explorador de blocos verifica se o código-fonte compila para o código na [transação de implantação do contrato](/developers/docs/smart-contracts/deploying/). No caso dos `System`s MUD, isso é [um pouco mais complicado](https://mud.dev/cli/verify), mas não muito.

Isso é mais difícil com conhecimento zero. O verificador inclui algumas constantes e executa alguns cálculos sobre elas. Isso não lhe diz o que está sendo provado.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

A solução, pelo menos até que os exploradores de blocos adicionem a verificação do Zokrates às suas interfaces de usuário, é que os desenvolvedores de aplicações disponibilizem os programas Zokrates, e que pelo menos alguns usuários os compilem com a chave de verificação apropriada.

Para fazer isso:

1. [Instale o Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Crie um arquivo, `dig.zok`, com o programa Zokrates. O código abaixo presume que você manteve o tamanho original do mapa, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // O número de minas no local (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Compile o código Zokrates e crie a chave de verificação. A chave de verificação deve ser criada com a mesma entropia usada no servidor original, [neste caso, uma string vazia](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Crie o verificador Solidity por conta própria e verifique se ele é funcionalmente idêntico ao da cadeia de blocos (o servidor adiciona um comentário, mas isso não é importante).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Decisões de design {#design}

Em qualquer aplicação suficientemente complexa, existem objetivos de design concorrentes que exigem trade-offs. Vamos analisar alguns dos trade-offs e por que a solução atual é preferível a outras opções.

### Por que conhecimento zero {#why-zero-knowledge}

Para o Campo Minado, você não precisa realmente de conhecimento zero. O servidor pode sempre manter o mapa e depois revelá-lo por completo quando o jogo terminar. Então, no final do jogo, o contrato inteligente pode calcular o hash do mapa, verificar se corresponde e, se não, penalizar o servidor ou desconsiderar o jogo completamente.

Não usei essa solução mais simples porque ela só funciona para jogos curtos com um estado final bem definido. Quando um jogo é potencialmente infinito (como no caso dos [mundos autônomos](https://0xparc.org/blog/autonomous-worlds)), você precisa de uma solução que prove o estado _sem_ revelá-lo.

Como um tutorial, este artigo precisava de um jogo curto que fosse fácil de entender, mas essa técnica é mais útil para jogos mais longos.

### Por que Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) não é a única biblioteca de conhecimento zero disponível, mas é semelhante a uma linguagem de programação normal e [imperativa](https://en.wikipedia.org/wiki/Imperative_programming) e suporta variáveis ​​booleanas.

Para sua aplicação, com requisitos diferentes, você pode preferir usar [Circum](https://docs.circom.io/getting-started/installation/) ou [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Quando compilar o Zokrates {#when-compile-zokrates}

Neste programa, compilamos os programas Zokrates [toda vez que o servidor é iniciado](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Isso é claramente um desperdício de recursos, mas este é um tutorial, otimizado para simplicidade.

Se eu estivesse escrevendo uma aplicação de nível de produção, verificaria se tenho um arquivo com os programas Zokrates compilados neste tamanho de campo minado e, se sim, usaria isso. O mesmo vale para implantar um contrato de verificador em cadeia.

### Criando as chaves do verificador e do provador {#key-creation}

A [criação de chaves](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) é outro cálculo puro que não precisa ser feito mais de uma vez para um determinado tamanho de campo minado. Novamente, é feito apenas uma vez por uma questão de simplicidade.

Além disso, poderíamos usar [uma cerimônia de configuração](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). A vantagem de uma cerimônia de configuração é que você precisa da entropia ou de algum resultado intermediário de cada participante para trapacear na prova de conhecimento zero. Se pelo menos um participante da cerimônia for honesto e excluir essa informação, as provas de conhecimento zero estarão seguras contra certos ataques. No entanto, _não há mecanismo_ para verificar se a informação foi excluída de todos os lugares. Se as provas de conhecimento zero são de importância crítica, você vai querer participar da cerimônia de configuração.

Aqui, contamos com [poderes perpétuos de tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), que teve dezenas de participantes. Provavelmente é seguro o suficiente e muito mais simples. Também não adicionamos entropia durante a criação da chave, o que facilita para os usuários [verificarem a configuração de conhecimento zero](#user-verify-zero-trust).

### Onde verificar {#where-verification}

Podemos verificar as provas de conhecimento zero em cadeia (o que custa gás) ou no cliente (usando [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Eu escolhi a primeira, porque isso permite que você [verifique o verificador](#user-verify-zero-trust) uma vez e depois confie que ele não muda, desde que o endereço do contrato para ele permaneça o mesmo. Se a verificação fosse feita no cliente, você teria que verificar o código que recebe cada vez que baixa o cliente.

Além disso, embora este jogo seja para um jogador, muitos jogos de cadeia de blocos são para vários jogadores. a verificação em cadeia significa que você só verifica a prova de conhecimento zero uma vez. Fazer isso no cliente exigiria que cada cliente verificasse independentemente.

### Achatar o mapa em TypeScript ou Zokrates? {#where-flatten}

Em geral, quando o processamento pode ser feito em TypeScript ou Zokrates, é melhor fazê-lo em TypeScript, que é muito mais rápido e não requer provas de conhecimento zero. Essa é a razão, por exemplo, pela qual não fornecemos ao Zokrates o hash e o fazemos verificar se está correto. O hashing deve ser feito dentro do Zokrates, mas a correspondência entre o hash retornado e o hash em cadeia pode ocorrer fora dele.

No entanto, ainda [achatamos o mapa em Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), enquanto poderíamos tê-lo feito em TypeScript. A razão é que as outras opções são, na minha opinião, piores.

- Forneça um array unidimensional de booleanos para o código Zokrates e use uma expressão como `x*(height+2)
  +y` para obter o mapa bidimensional. Isso tornaria [o código](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) um pouco mais complicado, então decidi que o ganho de desempenho não vale a pena para um tutorial.

- Envie ao Zokrates tanto o array unidimensional quanto o array bidimensional. No entanto, esta solução não nos traz nenhum ganho. O código Zokrates teria que verificar se o array unidimensional fornecido é realmente a representação correta do array bidimensional. Portanto, não haveria nenhum ganho de desempenho.

- Achatar o array bidimensional em Zokrates. Esta é a opção mais simples, então eu a escolhi.

### Onde armazenar mapas {#where-store-maps}

Nesta aplicação, [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) é simplesmente uma variável na memória. Isso significa que se o seu servidor parar de funcionar e precisar ser reiniciado, todas as informações armazenadas serão perdidas. Os jogadores não apenas não conseguem continuar o jogo, como também não conseguem iniciar um novo, porque o componente em cadeia pensa que eles ainda têm um jogo em andamento.

Isso é claramente um mau design para um sistema de produção, no qual você armazenaria essa informação em um banco de dados. A única razão pela qual usei uma variável aqui é porque este é um tutorial e a simplicidade é a principal consideração.

## Conclusão: Em que condições esta é a técnica apropriada? {#conclusion}

Então, agora você sabe como escrever um jogo com um servidor que armazena um estado secreto que não pertence à cadeia. Mas em que casos você deve fazer isso? Existem duas considerações principais.

- _Jogo de longa duração_: [Como mencionado acima](#why-zero-knowledge), em um jogo curto, você pode simplesmente publicar o estado quando o jogo terminar e ter tudo verificado então. Mas essa não é uma opção quando o jogo leva um tempo longo ou indefinido, e o estado precisa permanecer secreto.

- _Alguma centralização aceitável_: As provas de conhecimento zero podem verificar a integridade, que uma entidade não está falsificando os resultados. O que elas não podem fazer é garantir que a entidade ainda estará disponível e responderá às mensagens. Em situações em que a disponibilidade também precisa ser descentralizada, as provas de conhecimento zero não são uma solução suficiente, e você precisa de [computação multipartidária](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).

### Agradecimentos {#acknowledgements}

- Alvaro Alonso leu um rascunho deste artigo e esclareceu alguns dos meus mal-entendidos sobre Zokrates.

Quaisquer erros remanescentes são de minha responsabilidade.
