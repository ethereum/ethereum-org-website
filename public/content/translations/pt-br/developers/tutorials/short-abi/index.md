---
title: "ABIs curtas para otimização de dados de chamada"
description: Otimizando contratos inteligentes para Optimistic Rollups
author: Ori Pomerantz
lang: pt-br
tags: ["camada 2 (L2)"]
skill: intermediate
breadcrumb: ABIs curtas
published: 2022-04-01
---

## Introdução {#introduction}

Neste artigo, você aprenderá sobre [optimistic rollups](/developers/docs/scaling/optimistic-rollups), o custo das transações neles e como essa estrutura de custos diferente exige que otimizemos para coisas diferentes do que na Rede Principal do Ethereum.
Você também aprenderá como implementar essa otimização.

### Divulgação total {#full-disclosure}

Sou um funcionário em tempo integral da [Optimism](https://www.optimism.io/), então os exemplos neste artigo serão executados na Optimism.
No entanto, a técnica explicada aqui deve funcionar tão bem para outros rollups.

### Terminologia {#terminology}

Ao discutir rollups, o termo 'camada 1 (L1)' é usado para a Mainnet, a rede Ethereum de produção.
O termo 'camada 2 (L2)' é usado para o rollup ou qualquer outro sistema que dependa da L1 para segurança, mas faça a maior parte de seu processamento offchain.

## Como podemos reduzir ainda mais o custo das transações na L2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

Os [optimistic rollups](/developers/docs/scaling/optimistic-rollups) precisam preservar um registro de cada transação histórica para que qualquer pessoa possa analisá-las e verificar se o estado atual está correto.
Quando este artigo foi escrito, a maneira mais barata de inserir dados na Rede Principal do Ethereum era gravá-los como dados de chamada.
Esta solução foi escolhida tanto pela [Optimism](https://docs.optimism.io/op-stack/protocol/overview) quanto pela [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
Desde a atualização Dencun (março de 2024), os rollups podem publicar esses dados em [blobs](/roadmap/danksharding/), que são muito mais baratos.

### Custo das transações na L2 {#cost-of-l2-transactions}

O custo das transações na L2 é composto por dois componentes:

1. Processamento na L2, que geralmente é extremamente barato
2. Armazenamento na L1, que está vinculado aos custos de gás da Mainnet

Quando escrevi este artigo em 2022, na Optimism o custo do gás na L2 era de 0,001 [gwei](/developers/docs/gas/#what-is-gas).
O custo do gás na L1, por outro lado, era de aproximadamente 40 gwei.

Um byte de dados de chamada custa 4 de gás (se for zero) ou 16 de gás (se for qualquer outro valor).
Uma das operações mais caras na EVM é a gravação no armazenamento.
O custo máximo de gravar uma palavra de 32 bytes no armazenamento na L2 é de 22.100 de gás. Na época, isso era 22,1 gwei.
Portanto, se pudéssemos economizar um único byte zero de dados de chamada, seríamos capazes de gravar cerca de 200 bytes no armazenamento e ainda sair no lucro.

#### Como os custos da L2 mudaram em 2024 {#how-l2-costs-changed-in-2024}

A fórmula da [taxa de dados da L1](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) do OP Stack mudou duas vezes desde que este artigo foi escrito:

- Com a [atualização Ecotone](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (março de 2024), as cadeias do OP Stack começaram a publicar dados de transação em blobs, que são precificados por uma taxa básica de blob separada (e geralmente muito menor).
- Com a [atualização Fjord](https://docs.optimism.io/op-stack/transactions/fees#fjord) (julho de 2024), a taxa de dados da L1 é baseada em uma estimativa do tamanho da transação após a compressão [FastLZ](https://github.com/ariya/FastLZ), com um mínimo de 100 bytes por transação ([veja a especificação](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Isso muda a análise no restante deste artigo de três maneiras:

1. Bytes zero são bem comprimidos, então eles são quase gratuitos.
   Os valores de 4 e 16 de gás por byte abaixo são o custo dos dados de chamada da L1, não o que você paga por dados de transação em uma cadeia do OP Stack hoje.
2. Abaixo do mínimo de 100 bytes, dados de chamada mais curtos não economizam nada.
   Por exemplo, em outubro de 2026 na OP Mainnet, um `transfer` ERC-20 padrão (68 bytes de dados de chamada) e a versão curta de 23 bytes neste artigo teriam pago exatamente a mesma taxa de dados da L1, o mínimo, cerca de 1 gwei (10<sup>-9</sup> ETH).
3. Como o espaço de blob é barato, a taxa de execução da L2 agora costuma ser maior do que a taxa de dados da L1.
   A um preço do gás na L2 de 0,001 gwei, 1000 de gás custam 1 gwei, o mesmo que toda aquela taxa de dados da L1, então o gás de execução extra de passar por um contrato proxy pode custar mais do que os bytes que ele economiza.

O princípio ainda se mantém: menos bytes comprimidos significam uma taxa de dados da L1 menor.
ABIs curtas fazem mais sentido para transações com muitos dados que não são bem comprimidos, e em cadeias ou em momentos em que os dados da L1 são caros.
Para ver o que uma transação específica pagaria, chame `getL1Fee` no [pré-implante `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) com a transação não assinada.
Por exemplo, usando o `cast` do [Foundry](https://getfoundry.sh/introduction/installation/):

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

O resultado é em Wei.

### A ABI {#the-abi}

A grande maioria das transações acessa um contrato a partir de uma conta de propriedade externa (EOA).
A maioria dos contratos é escrita em Solidity e interpreta seu campo de dados de acordo com [a Interface Binária de Aplicação (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

No entanto, a ABI foi projetada para a L1, onde um byte de dados de chamada custa aproximadamente o mesmo que quatro operações aritméticas, e não para a L2, onde (a preços de 2022) um byte de dados de chamada custa mais de mil operações aritméticas.
Os dados de chamada são divididos assim:

| Seção               | Comprimento | Bytes | Bytes desperdiçados | Gás desperdiçado | Bytes necessários | Gás necessário |
| ------------------- | ----------: | ----: | ------------------: | ---------------: | ----------------: | -------------: |
| Seletor de função   |           4 |   0-3 |                   3 |               48 |                 1 |             16 |
| Zeros               |          12 |  4-15 |                  12 |               48 |                 0 |              0 |
| Endereço de destino |          20 | 16-35 |                   0 |                0 |                20 |            320 |
| Quantia             |          32 | 36-67 |                  17 |               68 |                15 |            240 |
| Total               |          68 |       |                     |              164 |                   |            576 |

Explicação:

- **Seletor de função**: O contrato tem menos de 256 funções, então podemos distingui-las com um único byte.
  Esses bytes geralmente são diferentes de zero e, portanto, [custam dezesseis de gás](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeros**: Esses bytes são sempre zero porque um endereço de vinte bytes não requer uma palavra de trinta e dois bytes para armazená-lo.
  Bytes que contêm zero custam quatro de gás ([veja o yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Apêndice G,
  p. 27, o valor para `G`<sub>`txdatazero`</sub>).
- **Quantia**: Se assumirmos que neste contrato `decimals` é dezoito (o valor normal) e a quantia máxima de tokens que transferimos será 10<sup>18</sup>, obtemos uma quantia máxima de 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, então quinze bytes são suficientes.

Um desperdício de 164 de gás na L1 normalmente é insignificante. Uma transação custa pelo menos [21.000 de gás](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), então 0,8% a mais não importa.
No entanto, na L2 em 2022, as coisas eram diferentes. Quase todo o custo da transação era gravá-la na L1.
Além dos dados de chamada da transação, há 109 bytes de cabeçalho da transação (endereço de destino, assinatura, etc.).
O custo total é, portanto, `109*16+576+164=2484`, e estamos desperdiçando cerca de 6,6% disso.

## Reduzindo custos quando você não controla o destino {#reducing-costs-when-you-dont-control-the-destination}

Supondo que você não tenha controle sobre o contrato de destino, você ainda pode usar uma solução semelhante a [esta](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

Para executá-la, você precisa do [Node.js](https://nodejs.org/) e do git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

O teste implanta os contratos na rede local integrada do Hardhat, então você não precisa de nenhum ETH.
O repositório usa o Hardhat 2.9, então nas versões atuais do Node.js ele avisa que sua versão do Node.js não é suportada, mas o teste ainda passa.

Vamos analisar os arquivos relevantes.

### Token.sol {#token-sol}

[Este é o contrato de destino](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
É um contrato ERC-20 padrão, com um recurso adicional.
Esta função `faucet` permite que qualquer usuário obtenha algum token para usar.
Isso tornaria um contrato ERC-20 de produção inútil, mas facilita a vida quando um ERC-20 existe apenas para facilitar os testes.

```solidity
    /**
     * @dev Dá ao chamador 1000 tokens para brincar
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Este é o contrato que as transações devem chamar com dados de chamada mais curtos](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Vamos analisá-lo linha por linha.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Precisamos da função do token para saber como chamá-la.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

O endereço do token para o qual somos um proxy.

```solidity

    /**
     * @dev Especifica o endereço do token
     * @param tokenAddr_ endereço do contrato ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // construtor
```

O endereço do token é o único parâmetro que precisamos especificar.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Lê um valor dos dados de chamada.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Vamos carregar uma única palavra de 32 bytes (256 bits) na memória e remover os bytes que não fazem parte do campo que queremos.
Este algoritmo não funciona para valores maiores que 32 bytes e, claro, não podemos ler além do final dos dados de chamada.
Na L1, pode ser necessário pular esses testes para economizar gás, mas na L2 o gás é extremamente barato, o que permite quaisquer verificações de sanidade que possamos imaginar.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Poderíamos ter copiado os dados da chamada para `fallback()` (veja abaixo), mas é mais fácil usar [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), a linguagem assembly da EVM.

Aqui usamos [o código de operação CALLDATALOAD](https://www.evm.codes/#35) para ler os bytes `startByte` a `startByte+31` para a pilha.
Em geral, a sintaxe de um código de operação em Yul é `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Apenas os `length` bytes mais significativos fazem parte do campo, então fazemos um [deslocamento para a direita](https://en.wikipedia.org/wiki/Logical_shift) para nos livrarmos dos outros valores.
Isso tem a vantagem adicional de mover o valor para a direita do campo, de modo que seja o próprio valor em vez do valor vezes 256<sup>alguma coisa</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Quando uma chamada a um contrato Solidity não corresponde a nenhuma das assinaturas de função, ela chama [a função `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (supondo que haja uma).
No caso de `CalldataInterpreter`, _qualquer_ chamada chega aqui porque não há outras funções `external` ou `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lê o primeiro byte dos dados de chamada, que nos diz a função.
Existem dois motivos pelos quais uma função não estaria disponível aqui:

1. Funções que são `pure` ou `view` não alteram o estado e não custam gás (quando chamadas offchain).
   Não faz sentido tentar reduzir o custo de gás delas.
2. Funções que dependem de [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   O valor de `msg.sender` será o endereço de `CalldataInterpreter`, não o do chamador.

Infelizmente, [olhando para as especificações do ERC-20](https://eips.ethereum.org/EIPS/eip-20), isso deixa apenas uma função padrão, `transfer` (porque podemos chamar `transferFrom`).
Nosso token de teste também tem `faucet`, que podemos suportar porque podemos transferir os tokens de volta para quem nos chamou.

```solidity

        // Chama os métodos de alteração de estado do token usando
        // informações dos dados de chamada

        // faucet
        if (_func == 1) {
```

Uma chamada para `faucet()`, que não tem parâmetros.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Depois de chamarmos `token.faucet()`, recebemos tokens. No entanto, como o contrato proxy, nós não **precisamos** de tokens.
A EOA (conta de propriedade externa) ou o contrato que nos chamou precisa.
Então, transferimos todos os nossos tokens para quem nos chamou.

```solidity
        // transferência (assumindo que temos uma permissão para isso)
        if (_func == 2) {
```

A transferência de tokens requer dois parâmetros: o endereço de destino e a quantia.

```solidity
            token.transferFrom(
                msg.sender,
```

Permitimos apenas que os chamadores transfiram tokens que possuem

```solidity
                address(uint160(calldataVal(1, 20))),
```

O endereço de destino começa no byte #1 (o byte #0 é a função).
Como um endereço, ele tem 20 bytes de comprimento.

```solidity
                calldataVal(21, 2)
```

Para este contrato em particular, assumimos que o número máximo de tokens que alguém gostaria de transferir cabe em dois bytes (menos de 65536).

```solidity
            );
        }
```

No geral, uma transferência leva 23 bytes de dados de chamada:

| Seção               | Comprimento | Bytes |
| ------------------- | ----------: | ----: |
| Seletor de função   |           1 |     0 |
| Endereço de destino |          20 |  1-20 |
| Quantia             |           2 | 21-22 |

```solidity
    }   // fallback

}       // contrato CalldataInterpreter
```

### test.js {#test-js}

[Este teste de unidade em JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nos mostra como usar esse mecanismo (e como verificar se ele funciona corretamente).
Vou assumir que você entende de [chai](https://www.chaijs.com/) e [ethers](https://docs.ethers.org/v5/) e explicarei apenas as partes que se aplicam especificamente ao contrato.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Começamos implantando ambos os contratos.

```javascript
    // Obter tokens para brincar
    const faucetTx = {
```

Não podemos usar as funções de alto nível que normalmente usaríamos (como `token.faucet()`) para criar transações, porque não seguimos a ABI.
Em vez disso, temos que construir a transação nós mesmos e depois enviá-la.

```javascript
      to: cdi.address,
      data: "0x01"
```

Existem dois parâmetros que precisamos fornecer para a transação:

1. `to`, o endereço de destino.
   Este é o contrato interpretador de dados de chamada.
2. `data`, os dados de chamada a serem enviados.
   No caso de uma chamada de faucet, os dados são um único byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Chamamos [o método `sendTransaction` do signatário](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) porque já especificamos o destino (`faucetTx.to`) e precisamos que a transação seja assinada.

```javascript
// Verificar se o faucet fornece os tokens corretamente
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Aqui verificamos o saldo.
Não há necessidade de economizar gás em funções `view`, então apenas as executamos normalmente.

```javascript
// Dar ao CDI uma permissão (aprovações não podem ser feitas por proxy)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Dê ao interpretador de dados de chamada uma permissão para poder fazer transferências.

```javascript
// Transferir tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Crie uma transação de transferência. O primeiro byte é "0x02", seguido pelo endereço de destino e, finalmente, a quantia (0x0100, que é 256 em decimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Verificar se temos 256 tokens a menos
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // E que nosso destino os recebeu
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Reduzindo o custo quando você controla o contrato de destino {#reducing-the-cost-when-you-do-control-the-destination-contract}

Se você tiver controle sobre o contrato de destino, poderá criar funções que ignoram as verificações de `msg.sender` porque elas confiam no interpretador de dados de chamada.
[Você pode ver um exemplo de como isso funciona aqui, na ramificação `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
Para executá-lo, mude para essa ramificação no repositório que você clonou anteriormente e execute o teste novamente:

```sh
git checkout control-contract
npx hardhat test
```

Se o contrato estivesse respondendo apenas a transações externas, poderíamos nos virar com apenas um contrato.
No entanto, isso quebraria a [composabilidade](/developers/docs/smart-contracts/composability/).
É muito melhor ter um contrato que responda a chamadas ERC-20 normais e outro contrato que responda a transações com dados de chamada curtos.

### Token.sol {#token-sol-2}

Neste exemplo, podemos modificar `Token.sol`.
Isso nos permite ter várias funções que apenas o proxy pode chamar.
Aqui estão as novas partes:

```solidity
    // O único endereço permitido para especificar o endereço do CalldataInterpreter
    address owner;

    // O endereço do CalldataInterpreter
    address proxy = address(0);
```

O contrato ERC-20 precisa saber a identidade do proxy autorizado.
No entanto, não podemos definir essa variável no construtor, porque ainda não sabemos o valor.
Este contrato é instanciado primeiro porque o proxy espera o endereço do token em seu construtor.

```solidity
    /**
     * @dev Chama o construtor do ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

O endereço do criador (chamado `owner`) é armazenado aqui porque esse é o único endereço com permissão para definir o proxy.

```solidity
    /**
     * @dev define o endereço para o proxy (o CalldataInterpreter).
     * Só pode ser chamado uma vez pelo proprietário
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

O proxy tem acesso privilegiado, porque pode ignorar as verificações de segurança.
Para garantir que podemos confiar no proxy, permitimos apenas que `owner` chame essa função, e apenas uma vez.
Uma vez que `proxy` tenha um valor real (não zero), esse valor não pode mudar, então mesmo que o proprietário decida se tornar malicioso, ou a frase mnemônica para ele seja revelada, ainda estamos seguros.

```solidity
    /**
     * @dev Algumas funções só podem ser chamadas pelo proxy.
     */
    modifier onlyProxy {
```

Esta é uma [função `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), ela modifica a maneira como outras funções trabalham.

```solidity
      require(msg.sender == proxy);
```

Primeiro, verifique se fomos chamados pelo proxy e por mais ninguém.
Se não, `revert`.

```solidity
      _;
    }
```

Se sim, execute a função que modificamos.

```solidity
   /* Funções que permitem que o proxy realmente atue como proxy para contas */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Estas são três operações que normalmente exigem que a mensagem venha diretamente da entidade que transfere tokens ou aprova uma permissão.
Aqui temos uma versão proxy dessas operações que:

1. É modificada por `onlyProxy()` para que ninguém mais tenha permissão para controlá-las.
2. Obtém o endereço que normalmente seria `msg.sender` como um parâmetro extra.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

O interpretador de dados de chamada é quase idêntico ao acima, exceto que as funções com proxy recebem um parâmetro `msg.sender` e não há necessidade de uma permissão para `transfer`.

```solidity
        // transfer (sem necessidade de permissão)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Existem algumas mudanças entre o código de teste anterior e este.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Precisamos dizer ao contrato ERC-20 em qual proxy confiar

```js
console.log("CalldataInterpreter addr:", cdi.address)

// São necessários dois signatários para verificar as permissões
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Para verificar `approve()` e `transferFrom()`, precisamos de um segundo signatário.
Nós o chamamos de `poorSigner` porque ele não recebe nenhum de nossos tokens (ele precisa ter ETH, é claro).

```js
// Transferir tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Como o contrato ERC-20 confia no proxy (`cdi`), não precisamos de uma permissão para retransmitir transferências.

```js
// aprovação e transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Verificar se a combinação approve / transferFrom foi feita corretamente
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Teste as duas novas funções.
Observe que `transferFromTx` requer dois parâmetros de endereço: o doador da permissão e o receptor.

## Conclusão {#conclusion}

Tanto a [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) quanto a [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) agora comprimem os dados que gravam na L1 e cobram cada transação com base em seu tamanho comprimido, para reduzir o custo das transações.
No entanto, como provedores de infraestrutura em busca de soluções genéricas, nossas habilidades são limitadas.
Como desenvolvedor de dapp, você tem conhecimento específico do aplicativo, o que permite otimizar seus dados de chamada muito melhor do que poderíamos em uma solução genérica.
Esperamos que este artigo ajude você a encontrar a solução ideal para suas necessidades.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).

