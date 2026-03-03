---
title: "Transações"
description: "Uma visão geral das transações no Ethereum: como elas funcionam, sua estrutura de dados e como enviá-las através de um aplicativo."
lang: pt-br
---

Transações são instruções assinadas criptograficamente de contas. Uma conta iniciará uma transação para atualizar o estado da rede Ethereum. A transação mais simples é transferir ETH de uma conta para outra.

## Pré-requisitos {#prerequisites}

Para ajudar você a entender melhor esta página, recomendamos que você leia primeiro [Contas](/developers/docs/accounts/) e nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## O que é uma transação? {#whats-a-transaction}

Uma transação Ethereum refere-se a uma ação iniciada por uma conta de propriedade externa, ou seja, uma conta gerenciada por um ser humano, não um contrato. Por exemplo, se Bob enviar a Alice 1 ETH, a conta de Bob deverá ser debitada e a de Alice deverá ser creditada. Esta ação de mudança de estado ocorre no âmbito de uma transação.

![Diagrama mostrando uma transação causando mudança de estado](./tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transações que alteram o estado da EVM precisam ser transmitidas para toda a rede. Qualquer nó pode transmitir uma solicitação para que uma transação seja executada na EVM; depois que isso acontecer, um validador executará a transação e propagará a mudança de estado resultante para o restante da rede.

As transações exigem uma taxa e devem ser incluídas em um bloco validado. Para tornar esta visão geral mais simples, cobriremos as taxas de gás e validação em outro lugar.

Uma transação enviada inclui as seguintes informações:

- `from` – o endereço do remetente, que assinará a transação. Ela será uma conta de propriedade externa, pois as contas de contrato não podem enviar transações
- `to` – o endereço de recebimento (se for uma conta de propriedade externa, a transação transferirá valor. Se for uma conta de contrato, a transação executará o código do contrato)
- `signature` – o identificador do remetente. Ele é gerado quando a chave privada do remetente assina a transação e confirma que o remetente autorizou essa transação.
- `nonce` - um contador de incremento sequencial que indica o número da transação da conta
- `value` – quantia de ETH a ser transferida do remetente para o destinatário (denominada em WEI, em que 1 ETH é igual a 1e+18 wei)
- `input data` – campo opcional para incluir dados arbitrários
- `gasLimit` – a quantidade máxima de unidades de gás que pode ser consumida pela transação. A [EVM](/developers/docs/evm/opcodes) especifica as unidades de gás necessárias para cada etapa computacional
- `maxPriorityFeePerGas` - o preço máximo do gás consumido a ser incluído como uma gorjeta para o validador
- `maxFeePerGas` - a taxa máxima por unidade de gás que se está disposto a pagar pela transação (incluindo `baseFeePerGas` e `maxPriorityFeePerGas`)

Gás é uma referência ao cálculo necessário para processar a transação por um validador. Os usuários têm que pagar uma taxa por este cálculo. O `gasLimit` e o `maxPriorityFeePerGas` determinam a taxa máxima de transação paga ao validador. [Mais sobre gás](/developers/docs/gas/).

O objeto da transação ficará um pouco assim:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Mas um objeto de transação deve ser assinado usando a chave privada do remetente. Isso prova que a transação só poderia ter vindo do remetente e não foi enviada fraudulentamente.

Um cliente Ethereum como o Geth irá lidar com este processo de assinatura.

Exemplo de chamada [JSON-RPC](/developers/docs/apis/json-rpc):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Exemplo de resposta:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- o `raw` é a transação assinada em formato codificado com [Prefixo de Comprimento Recursivo (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- o `tx` é a transação assinada em formato JSON

Com o hash da assinatura, a transação pode ser provada criptograficamente de que veio do remetente e enviada para a rede.

### O campo de dados {#the-data-field}

A grande maioria das transações acessa um contrato de uma conta de propriedade externa.
A maioria dos contratos é escrita em Solidity e interpreta seu campo de dados de acordo com a [interface binária de aplicação (ABI)](/glossary/#abi).

Os primeiros quatro bytes especificam qual função chamar, usando o hash do nome e dos argumentos da função.
Às vezes, você pode identificar a função do seletor usando [este banco de dados](https://www.4byte.directory/signatures/).

O resto do calldata são os argumentos, [codificados conforme especificado nas especificações da ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Por exemplo, vamos dar uma olhada [nesta transação](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Use **Clique para ver mais** para ver o calldata.

O seletor de função é `0xa9059cbb`. Existem várias [funções conhecidas com esta assinatura](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
Neste caso, [o código-fonte do contrato](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) foi carregado no Etherscan, então sabemos que a função é `transfer(address,uint256)`.

O resto dos dados é:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

De acordo com as especificações da ABI, valores inteiros (como endereços, que são inteiros de 20 bytes) aparecem na ABI como palavras de 32 bytes, preenchidos com zeros na frente.
Então, sabemos que o endereço `to` é [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
O `value` é 0x3b0559f4 = 990206452.

## Tipos de transações {#types-of-transactions}

Existem alguns tipos diferentes de transações no Ethereum:

- Transações regulares: uma transação de uma conta para outra.
- Transações de implantação do contrato: uma transação sem um endereço 'para', onde o campo de dados é usado para o código do contrato.
- Execução de um contrato: uma transação que interage com um contrato inteligente implantado. Nesse caso, o endereço "para" é o endereço do contrato inteligente.

### Sobre o gás {#on-gas}

Como mencionado, as transações custam [gás](/developers/docs/gas/) para serem executadas. Transações de transferência simples requerem 21.000 unidades de gás.

Então, para Bob enviar 1 ETH para Alice com um `baseFeePerGas` de 190 gwei e `maxPriorityFeePerGas` de 10 gwei, Bob precisará pagar a seguinte taxa:

```
(190 + 10) * 21000 = 4.200.000 gwei
--ou--
0,0042 ETH
```

A conta de Bob será debitada em **-1,0042 ETH** (1 ETH para Alice + 0,0042 ETH em taxas de gás)

A conta de Alice será creditada em **+1,0 ETH**

A taxa base será queimada **-0,00399 ETH**

O validador fica com a gorjeta **+0,000210 ETH**

![Diagrama mostrando como o gás não utilizado é reembolsado](./gas-tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Qualquer gás não usado em uma transação é reembolsado para a conta do usuário.

### Interações de contratos inteligentes {#smart-contract-interactions}

Gás é necessário para qualquer transação que envolva um contrato inteligente.

Contratos inteligentes também podem conter funções conhecidas como funções [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) ou [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), que não alteram o estado do contrato. Dessa maneira, nenhum gás é necessário ao chamar essas funções de um EOA. A chamada RPC subjacente para este cenário é [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Diferentemente de quando são acessadas usando `eth_call`, essas funções `view` ou `pure` também são comumente chamadas internamente (ou seja, do próprio contrato ou de outro contrato), o que custa gás.

## Ciclo de vida da transação {#transaction-lifecycle}

Quando uma transação é enviada, acontece o seguinte:

1. Um hash de transação é gerado criptograficamente:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. A transação é então transmitida para a rede e adicionada a um pool de transações que compreende todas as outras transações de rede pendentes.
3. Um validador deve escolher sua transação e incluí-la em um bloco para verificar a transação e considerá-la "bem-sucedida".
4. Com o passar do tempo, o bloco que contém sua transação será atualizado para "justificado" e depois "finalizado". Essas atualizações tornam muito
   mais certo que sua transação foi bem-sucedida e nunca será alterada. Uma vez que um bloco é "finalizado", ele só poderia ser alterado
   por um ataque em nível de rede que custaria muitos bilhões de dólares.

## Uma demonstração visual {#a-visual-demo}

Assista Austin mostrar as transações, gás e mineração.

<YouTube id="er-0ihqFQB0" />

## Envelope de Transação Tipada {#typed-transaction-envelope}

O Ethereum originalmente tinha um formato para transações. Cada transação possuía um emissor, custo de "queima", parâmetro de "queima", endereçamentos, valores, dados, v, r, e s. Esses campos são [codificados com RLP](/developers/docs/data-structures-and-encoding/rlp/), para se parecer com algo assim:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

O Ethereum evoluiu para suportar múltiplos tipos de transações para permitir que novos recursos, como listas de acesso e o [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), sejam implementados sem afetar os formatos de transação legados.

O [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) é o que permite este comportamento. Transações são interpretadas como:

`TransactionType || TransactionPayload`

Onde os campos são definidos como:

- `TransactionType` - um número entre 0 e 0x7f, para um total de 128 tipos de transação possíveis.
- `TransactionPayload` - uma matriz de bytes arbitrária definida pelo tipo de transação.

Com base no valor de `TransactionType`, uma transação pode ser classificada como:

1. **Transações do Tipo 0 (Legado):** O formato de transação original usado desde o lançamento do Ethereum. Elas não incluem recursos do [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), como cálculos dinâmicos de taxas de gás ou listas de acesso para contratos inteligentes. As transações legadas não possuem um prefixo específico que indique seu tipo em sua forma serializada, começando com o byte `0xf8` ao usar a codificação [Prefixo de Comprimento Recursivo (RLP)](/developers/docs/data-structures-and-encoding/rlp). O valor de TransactionType para essas transações é `0x0`.

2. **Transações do Tipo 1:** Introduzidas no [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) como parte da [Atualização Berlim](/ethereum-forks/#berlin) do Ethereum, essas transações incluem um parâmetro `accessList`. Esta lista especifica os endereços e as chaves de armazenamento que a transação espera acessar, ajudando a reduzir potencialmente os custos de [gás](/developers/docs/gas/) para transações complexas que envolvem contratos inteligentes. As alterações de mercado da taxa EIP-1559 não estão incluídas nas transações do Tipo 1. As transações do tipo 1 também incluem um parâmetro `yParity`, que pode ser `0x0` ou `0x1`, indicando a paridade do valor-y da assinatura secp256k1. Elas são identificadas começando com o byte `0x01`, e seu valor de TransactionType é `0x1`.

3. **Transações do tipo 2**, comumente chamadas de transações EIP-1559, são transações introduzidas no [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), na [Atualização Londres](/ethereum-forks/#london) do Ethereum. Elas se tornaram o tipo de transação padrão na rede Ethereum. Essas transações introduzem um novo mecanismo de mercado de taxas que melhora a previsibilidade ao separar a taxa de transação em uma taxa base e uma taxa de prioridade. Elas começam com o byte `0x02` e incluem campos como `maxPriorityFeePerGas` e `maxFeePerGas`. As transações do Tipo 2 agora são o padrão devido à sua flexibilidade e eficiência, especialmente preferidas durante períodos de alta congestão na rede por sua capacidade de ajudar os usuários a gerenciar as taxas de transação de forma mais previsível. O valor de TransactionType para essas transações é `0x2`.

4. **Transações do Tipo 3 (Blob)** foram introduzidas no [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) como parte da [Atualização Dencun](/ethereum-forks/#dencun) do Ethereum. Essas transações são projetadas para manipular dados "blob" (Binary Large Objects) de forma mais eficiente, beneficiando particularmente os rollups da Layer 2, pois fornecem uma maneira de postar dados na rede Ethereum a um custo menor. As transações blob incluem campos adicionais, como `blobVersionedHashes`, `maxFeePerBlobGas` e `blobGasPrice`. Elas começam com o byte `0x03`, e seu valor de TransactionType é `0x3`. As transações de blobs representam uma melhoria significativa na disponibilidade de dados e nos recursos de dimensionamento do Ethereum.

5. **Transações do Tipo 4** foram introduzidas no [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) como parte da [Atualização Pectra](/roadmap/pectra/) do Ethereum. Essas transações são projetadas para serem compatíveis com a abstração de conta. Elas permitem que as EOAs se comportem temporariamente como contas de contrato inteligente sem comprometer sua funcionalidade original. Elas incluem um parâmetro `authorization_list`, que especifica o contrato inteligente para o qual a EOA delega sua autoridade. Após a transação, o campo de código da EOA terá o endereço do contrato inteligente delegado.

## Leitura adicional {#further-reading}

- [EIP-2718: Envelope de transação tipada](https://eips.ethereum.org/EIPS/eip-2718)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_

## Tópicos relacionados {#related-topics}

- [Contas](/developers/docs/accounts/)
- [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/)
- [Gás](/developers/docs/gas/)
