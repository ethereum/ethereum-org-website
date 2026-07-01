---
title: "Patrocinando taxas de gás: Como cobrir os custos de transação para seus usuários"
description: "É fácil criar uma chave privada e um endereço; é apenas uma questão de executar o software certo. Mas há muitos lugares no mundo onde obter ETH para enviar transações é muito mais difícil. Neste tutorial, você aprende como cobrir os custos de gás onchain para executar dados estruturados offchain assinados pelo usuário em seu contrato inteligente. Você faz com que o usuário assine uma estrutura contendo as informações da transação, que seu código offchain então envia para a blockchain como uma transação."
author: Ori Pomerantz
tags: ["sem gás", "Solidity", "eip-712", "meta-transações"]
skill: intermediate
breadcrumb: "Patrocínio de gás"
lang: pt-br
published: 2026-02-27
---

## Introdução {#introduction}

Se quisermos que o Ethereum atenda a [mais um bilhão de pessoas](https://blog.ethereum.org/category/next-billion), precisamos remover o atrito e torná-lo o mais fácil de usar possível. Uma fonte desse atrito é a necessidade de ETH para pagar as taxas de gás.

Se você tem um aplicativo descentralizado (dapp) que ganha dinheiro com os usuários, pode fazer sentido permitir que os usuários enviem transações através do seu servidor e você mesmo pague as taxas de transação. Como os usuários ainda assinam uma [mensagem de autorização EIP-712](https://eips.ethereum.org/EIPS/eip-712) em suas carteiras, eles mantêm as garantias de integridade do Ethereum. A disponibilidade depende do servidor que retransmite as transações, portanto, é mais limitada. No entanto, você pode configurar as coisas para que os usuários também possam acessar o contrato inteligente diretamente (se eles obtiverem ETH), e permitir que outros configurem seus próprios servidores se quiserem patrocinar transações.

A técnica neste tutorial só funciona quando você controla o contrato inteligente. Existem outras técnicas, incluindo a [abstração de conta](https://eips.ethereum.org/EIPS/eip-4337), que permitem patrocinar transações para outros contratos inteligentes, as quais espero cobrir em um tutorial futuro.

Nota: Este _não_ é um código de nível de produção. Ele é vulnerável a ataques significativos e carece de recursos importantes. Saiba mais na [seção de vulnerabilidades deste guia](#vulnerabilities).

### Pré-requisitos {#prerequisites}

Para entender este tutorial, você já precisa estar familiarizado com:

- Solidity
- JavaScript
- React e WAGMI. Se você não estiver familiarizado com essas ferramentas de interface de usuário, [temos um tutorial para isso](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## O aplicativo de exemplo {#sample-app}

O aplicativo de exemplo aqui é uma variante do contrato `Greeter` do Hardhat. Você pode vê-lo [no GitHub](https://github.com/qbzzt/260301-gasless). O contrato inteligente já está implantado na [Sepolia](https://sepolia.dev/), no endereço [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Para vê-lo em ação, siga estas etapas.

1. Clone o repositório e instale o software necessário.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Edite `.env` para definir `PRIVATE_KEY` para uma carteira que tenha ETH na Sepolia. Se você precisar de ETH da Sepolia, [use um faucet](/developers/docs/networks/#sepolia). Idealmente, esta chave privada deve ser diferente daquela que você tem na carteira do seu navegador.

3. Inicie o servidor.

   ```sh
   npm run dev
   ```

4. Navegue até o aplicativo na URL [`http://localhost:5173`](http://localhost:5173).

5. Clique em **Connect with Injected** para se conectar a uma carteira. Aprove na carteira e aprove a mudança para a Sepolia, se necessário.

6. Escreva uma nova saudação e clique em **Update greeting via sponsor**.

7. Assine a mensagem.

8. Aguarde cerca de 12 segundos (o tempo de bloco na Sepolia). Enquanto espera, você pode olhar a URL no console do servidor para ver a transação.

9. Veja que a saudação mudou e que o valor do endereço da última atualização agora é o endereço da carteira do seu navegador.

Para entender como isso funciona, precisamos ver como a mensagem é criada na interface do usuário, como ela é retransmitida pelo servidor e como o contrato inteligente a processa.

### A interface do usuário {#ui-changes}

A interface do usuário é baseada no [WAGMI](https://wagmi.sh/); você pode ler sobre isso [neste tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Veja como assinamos a mensagem:

```js
const signGreeting = useCallback(
```

O hook do React [`useCallback`](https://react.dev/reference/react/useCallback) nos permite melhorar o desempenho reutilizando a mesma função quando o componente é redesenhado.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Se não houver conta, levante um erro. Isso nunca deve acontecer porque o botão da interface do usuário que inicia o processo que chama `signGreeting` é desativado nesse caso. No entanto, futuros programadores podem remover essa proteção, então é uma boa ideia verificar essa condição aqui também.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parâmetros para o [separador de domínio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Esse valor é constante, então, em uma implementação mais otimizada, poderíamos calculá-lo uma vez em vez de recalculá-lo cada vez que a função é chamada.

- `name` é um nome legível pelo usuário, como o nome do dapp para o qual estamos produzindo assinaturas.
- `version` é a versão. Versões diferentes não são compatíveis.
- `chainId` é a cadeia que estamos usando, conforme fornecido [pelo WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` é o endereço do contrato que verificará esta assinatura. Não queremos que a mesma assinatura se aplique a vários contratos, caso existam vários contratos `Greeter` e queiramos que eles tenham saudações diferentes.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

O tipo de dados que assinamos. Aqui, temos um único parâmetro, `greeting`, mas sistemas da vida real normalmente têm mais.

```js
        const message = { greeting }
```

A mensagem real que queremos assinar e enviar. `greeting` é tanto o nome do campo quanto o nome da variável que o preenche.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Obtém a assinatura de fato. Esta função é assíncrona porque os usuários levam muito tempo (da perspectiva de um computador) para assinar dados.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

A função retorna um único valor hexadecimal. Aqui nós o dividimos em campos.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Se alguma dessas variáveis mudar, crie uma nova instância da função. Os parâmetros `account` e `chainId` podem ser alterados pelo usuário na carteira. `contractAddr` é uma função do Id da cadeia. `signTypedDataAsync` não deve mudar, mas nós o importamos de [um hook](https://wagmi.sh/react/api/hooks/useSignTypedData), então não podemos ter certeza, e é melhor adicioná-lo aqui.

Agora que a nova saudação está assinada, precisamos enviá-la ao servidor.

```js
  const sponsoredGreeting = async () => {
    try {
```

Esta função pega uma assinatura e a envia para o servidor.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Envia para o caminho `/server/sponsor` no servidor de onde viemos.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Usa `POST` para enviar as informações codificadas em JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Exibe a resposta. Em um sistema de produção, também mostraríamos a resposta ao usuário.

### O servidor {#server}

Gosto de usar o [Vite](https://vite.dev/) como meu front-end. Ele serve automaticamente as bibliotecas React e atualiza o navegador quando o código do front-end muda. No entanto, o Vite não inclui ferramentas de back-end.

A solução está em [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Deixe o Vite cuidar de todo o resto
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Primeiro, registramos um manipulador para as solicitações que nós mesmos lidamos (`POST` para `/server/sponsor`). Em seguida, criamos e usamos um servidor Vite para lidar com todas as outras URLs.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Esta é apenas uma chamada padrão de blockchain do [viem](https://viem.sh/).

### O contrato inteligente {#smart-contract}

Finalmente, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) precisa verificar a assinatura.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

O construtor cria o [separador de domínio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), semelhante ao código da interface do usuário acima. A execução na blockchain é muito mais cara, então nós o calculamos apenas uma vez.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Esta é a estrutura que é assinada. Aqui temos apenas um campo.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Este é o [identificador de estrutura](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Ele é calculado a cada vez na interface do usuário.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Esta função recebe uma solicitação assinada e atualiza a saudação.

```solidity
        // Calcular o digest EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Cria o digest de acordo com a [EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Recuperar signatário
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Usa [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) para obter o endereço do signatário. Note que uma assinatura ruim ainda pode resultar em um endereço válido, apenas um aleatório.

```solidity
        // Aplicar saudação como se o signatário a tivesse chamado
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Atualiza a saudação.

## Vulnerabilidades {#vulnerabilities}

Este _não_ é um código de nível de produção. Ele é vulnerável a ataques significativos e carece de recursos importantes. Aqui estão alguns, juntamente com como resolvê-los.

Para ver alguns desses ataques, clique nos botões sob o título _Attacks_ e veja o que acontece. Para o botão **Invalid signature**, verifique o console do servidor para ver a resposta da transação.

### Negação de serviço no servidor {#dos-on-server}

O ataque mais fácil é um ataque de [negação de serviço](https://en.wikipedia.org/wiki/Denial-of-service_attack) no servidor. O servidor recebe solicitações de qualquer lugar da Internet e, com base nessas solicitações, envia transações. Não há absolutamente nada que impeça um invasor de emitir um monte de assinaturas, válidas ou inválidas. Cada uma causará uma transação. Eventualmente, o servidor ficará sem ETH para pagar pelo gás.

Uma solução para esse problema é limitar a taxa a uma transação por bloco. Se o objetivo é mostrar saudações para [contas de propriedade externa](/developers/docs/accounts/#key-differences), não importa qual seja a saudação no meio do bloco de qualquer maneira.

Outra solução é rastrear os endereços e permitir apenas assinaturas de clientes válidos.

### Assinaturas de saudação incorretas {#wrong-greeting-sigs}

Quando você clica em **Signature for wrong greeting**, você envia uma assinatura válida para um endereço específico (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) e saudação (`Hello`). Mas ele a envia com uma saudação diferente. Isso confunde o `ecrecover`, que altera a saudação, mas tem o endereço errado.

Para resolver esse problema, adicione o endereço à [estrutura assinada](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). Dessa forma, o endereço aleatório do `ecrecover` não corresponderá ao endereço na assinatura, e o contrato inteligente rejeitará a mensagem.

### Ataques de repetição {#replay-attack}

Quando você clica em **Replay attack**, você envia a mesma assinatura "Eu sou 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e, e eu gostaria que a saudação fosse `Hello`", mas com a saudação correta. Como resultado, o contrato inteligente acredita que o endereço (que não é seu) mudou a saudação de volta para `Hello`. As informações para fazer isso estão disponíveis publicamente nas [informações da transação](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Se isso for um problema, uma solução é adicionar um [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Tenha um [mapeamento](https://docs.soliditylang.org/en/latest/types.html#mapping-types) entre endereços e números, e adicione um campo nonce à assinatura. Se o campo nonce corresponder ao mapeamento para o endereço, aceite a assinatura e incremente o mapeamento para a próxima vez. Se não corresponder, rejeite a transação.

Outra solução é adicionar um carimbo de data/hora aos dados assinados e aceitar a assinatura como válida apenas por alguns segundos após esse carimbo de data/hora. Isso é mais simples e barato, mas corremos o risco de ataques de repetição dentro da janela de tempo e da falha de transações legítimas se a janela de tempo for excedida.

## Outros recursos ausentes {#other-missing-features}

Existem recursos adicionais que adicionaríamos em um ambiente de produção.

### Acesso de outros servidores {#other-servers}

Atualmente, permitimos que qualquer endereço envie um `sponsorSetGreeting`. Isso pode ser exatamente o que queremos, no interesse da descentralização. Ou talvez queiramos garantir que as transações patrocinadas passem pelo _nosso_ servidor, caso em que verificaríamos `msg.sender` no contrato inteligente.

De qualquer forma, essa deve ser uma decisão de design consciente, não apenas o resultado de não pensar sobre o problema.

### Tratamento de erros {#error-handling}

Um usuário envia uma saudação. Talvez ela seja atualizada no próximo bloco. Talvez não. Os erros são invisíveis. Em um sistema de produção, o usuário deve ser capaz de distinguir entre esses casos:

- A nova saudação ainda não foi enviada
- A nova saudação foi enviada e está em processamento
- A nova saudação foi rejeitada

## Conclusão {#conclusion}

Neste ponto, você deve ser capaz de criar uma experiência sem gás para os usuários do seu aplicativo descentralizado (dapp), ao custo de alguma centralização.

No entanto, isso só funciona com contratos inteligentes que suportam ERC-712. Para transferir um token ERC-20, por exemplo, é necessário que a transação seja assinada pelo proprietário, em vez de apenas uma mensagem. A solução mais simples é fazer com que os ativos não sejam de propriedade do endereço EOA, mas de um contrato separado (uma forma simples de [abstração de conta](/roadmap/account-abstraction/)). Você pode ler mais sobre isso [no tutorial de continuação](/developers/tutorials/gasless-token).

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
