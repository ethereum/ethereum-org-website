---
title: "ABIs curtos para otimização de Calldata"
description: Otimizando contratos inteligentes para Optimistic Rollups
author: |
  Ori Pomerantz
lang: pt-br
tags: [ "camada 2" ]
skill: intermediate
published: 2022-04-01
---

## Introdução {#introduction}

Neste artigo, você aprenderá sobre [optimistic rollups](/developers/docs/scaling/optimistic-rollups), o custo das transações neles, e como essa estrutura de custos diferente exige que otimizemos para coisas diferentes do que na Rede Principal do Ethereum.
Você também aprende como implementar essa otimização.

### Divulgação completa {#full-disclosure}

Sou funcionário em tempo integral da [Optimism](https://www.optimism.io/), então os exemplos deste artigo serão executados na Optimism.
No entanto, a técnica explicada aqui deve funcionar tão bem para outros rollups.

### Terminologia {#terminology}

Ao discutir rollups, o termo 'camada 1' (L1) é usado para a Rede Principal, a rede de produção da Ethereum.
O termo 'camada 2' (L2) é usado para o rollup ou qualquer outro sistema que dependa da L1 para segurança, mas que faça a maior parte de seu processamento fora da cadeia.

## Como podemos reduzir ainda mais o custo das transações L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

Os [Optimistic rollups](/developers/docs/scaling/optimistic-rollups) precisam preservar um registro de todas as transações históricas para que qualquer pessoa possa analisá-las e verificar se o estado atual está correto.
A forma mais barata de inserir dados na Rede Principal do Ethereum é gravá-los como calldata.
Esta solução foi escolhida tanto pela [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) quanto pela [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Custo das transações L2 {#cost-of-l2-transactions}

O custo das transações L2 é composto por dois componentes:

1. Processamento L2, que geralmente é extremamente barato
2. Armazenamento L1, que está atrelado aos custos de gás da Rede Principal

No momento em que escrevo isto, na Optimism o custo do gás L2 é de 0,001 [Gwei](/developers/docs/gas/#pre-london).
O custo do gás na L1, por outro lado, é de aproximadamente 40 gwei.
[Você pode ver os preços atuais aqui](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Um byte de calldata custa 4 de gás (se for zero) ou 16 de gás (se for qualquer outro valor).
Uma das operações mais caras na EVM é gravar no armazenamento.
O custo máximo para gravar uma palavra de 32 bytes no armazenamento em L2 é de 22.100 de gás. Atualmente, isso é 22.1 gwei.
Portanto, se conseguirmos economizar um único byte zero de calldata, poderemos gravar cerca de 200 bytes no armazenamento e ainda sair ganhando.

### A ABI {#the-abi}

A grande maioria das transações acessa um contrato de uma conta de propriedade externa.
A maioria dos contratos é escrita em Solidity e interpreta seu campo de dados de acordo com a [interface binária de aplicação (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

No entanto, a ABI foi projetada para a L1, onde um byte de calldata custa aproximadamente o mesmo que quatro operações aritméticas, e não para a L2, onde um byte de calldata custa mais de mil operações aritméticas.
O calldata é dividido da seguinte forma:

| Seção               | Comprimento | Bytes | Bytes desperdiçados | Gás desperdiçado | Bytes necessários | Gás necessário |
| ------------------- | ----------: | ----: | ------------------: | ---------------: | ----------------: | -------------: |
| Seletor de função   |           4 |   0-3 |                   3 |               48 |                 1 |             16 |
| Zeros               |          12 |  4-15 |                  12 |               48 |                 0 |              0 |
| Endereço de destino |          20 | 16-35 |                   0 |                0 |                20 |            320 |
| Quantidade          |          32 | 36-67 |                  17 |               64 |                15 |            240 |
| Total               |          68 |       |                     |              160 |                   |            576 |

Explicação:

- **Seletor de função**: o contrato tem menos de 256 funções, então podemos distingui-las com um único byte.
  Esses bytes normalmente não são zero e, portanto, [custam dezesseis de gás](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeros**: esses bytes são sempre zero porque um endereço de vinte bytes não requer uma palavra de trinta e dois bytes para o conter.
  Bytes que contêm zero custam quatro de gás ([consulte o yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Apêndice G,
  p. 27, o valor para `G`<sub>`txdatazero`</sub>).
- **Quantidade**: se assumirmos que neste contrato `decimals` é dezoito (o valor normal) e a quantidade máxima de tokens que transferimos será 10<sup>18</sup>, obteremos uma quantidade máxima de 10<sup>36</sup>.
  256<sup>15</sup> > 10<sup>36</sup>, então quinze bytes são suficientes.

Um desperdício de 160 de gás na L1 é normalmente insignificante. Uma transação custa pelo menos [21.000 de gás](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), então 0,8% a mais não importa.
Entretanto, na L2, as coisas são diferentes. Quase todo o custo da transação é para gravá-la na L1.
Além do calldata da transação, há 109 bytes de cabeçalho da transação (endereço de destino, assinatura etc.).
O custo total é, portanto, `109*16+576+160=2480`, e estamos desperdiçando cerca de 6,5% disso.

## Reduzindo custos quando você não controla o destino {#reducing-costs-when-you-dont-control-the-destination}

Assumindo que você não tenha controle sobre o contrato de destino, você ainda pode usar uma solução semelhante a [esta](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Vamos rever os arquivos relevantes.

### Token.sol {#token-sol}

[Este é o contrato de destino](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
É um contrato padrão ERC-20, com um recurso adicional.
Esta função `faucet` permite que qualquer usuário obtenha alguns tokens para usar.
Isso tornaria um contrato de produção ERC-20 inútil, mas facilita as coisas quando um ERC-20 existe apenas para facilitar os testes.

```solidity
    /**
     * @dev Fornece ao chamador 1000 tokens para usar
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Este é o contrato que as transações devem chamar com calldata mais curto](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
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
     * @dev Especifique o endereço do token
     * @param tokenAddr_ Endereço do contrato ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

O endereço do token é o único parâmetro que precisamos especificar.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Leia um valor do calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Vamos carregar uma única palavra de 32 bytes (256 bits) para a memória e remover os bytes que não fazem parte do campo que queremos.
Este algoritmo não funciona para valores maiores que 32 bytes e, claro, não podemos ler além do final do calldata.
Na L1, pode ser necessário pular esses testes para economizar gás, mas na L2 o gás é extremamente barato, o que permite quaisquer verificações de sanidade que possamos imaginar.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Poderíamos ter copiado os dados da chamada para `fallback()` (veja abaixo), mas é mais fácil usar [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), a linguagem assembly da EVM.

Aqui usamos [o opcode CALLDATALOAD](https://www.evm.codes/#35) para ler os bytes de `startByte` a `startByte+31` na pilha.
Em geral, a sintaxe de um opcode em Yul é `<nome do opcode>(<primeiro valor da pilha, se houver>,<segundo valor da pilha, se houver>...).

```solidity

        _retVal = _retVal >> (256-length*8);
```

Apenas os bytes de `comprimento` mais significativos fazem parte do campo, então nós [deslocamos para a direita](https://en.wikipedia.org/wiki/Logical_shift) para nos livrarmos dos outros valores.
Isso tem a vantagem adicional de mover o valor para a direita do campo, então é o valor em si, e não o valor vezes 256<sup>algo</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Quando uma chamada para um contrato Solidity não corresponde a nenhuma das assinaturas de função, ela chama [a função `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (supondo que haja uma).
No caso do `CalldataInterpreter`, _qualquer_ chamada chega aqui porque não há outras funções `external` ou `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Leia o primeiro byte do calldata, que nos diz a função.
Há duas razões pelas quais uma função não estaria disponível aqui:

1. Funções que são `pure` ou `view` não alteram o estado e não custam gás (quando chamadas fora da cadeia).
   Não faz sentido tentar reduzir seu custo de gás.
2. Funções que dependem de [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   O valor de `msg.sender` será o endereço do `CalldataInterpreter`, não o do chamador.

Infelizmente, [olhando para as especificações do ERC-20](https://eips.ethereum.org/EIPS/eip-20), isso deixa apenas uma função, `transfer`.
Isso nos deixa com apenas duas funções: `transfer` (porque podemos chamar `transferFrom`) e `faucet` (porque podemos transferir os tokens de volta para quem nos chamou).

```solidity

        // Chame os métodos de alteração de estado do token usando
        // informações do calldata

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

Depois que chamamos `token.faucet()`, nós recebemos tokens. No entanto, como o contrato de proxy, não **precisamos** de tokens.
A EOA (conta de propriedade externa) ou contrato que nos chamou precisa.
Então, transferimos todos os nossos tokens para quem nos chamou.

```solidity
        // transferir (assumir que temos uma permissão para isso)
        if (_func == 2) {
```

A transferência de tokens requer dois parâmetros: o endereço de destino e a quantidade.

```solidity
            token.transferFrom(
                msg.sender,
```

Nós apenas permitimos que os chamadores transfiram tokens que eles possuem

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

No geral, uma transferência leva 35 bytes de calldata:

| Seção               | Comprimento | Bytes |
| ------------------- | ----------: | ----: |
| Seletor de função   |           1 |     0 |
| Endereço de destino |          32 |  1-32 |
| Quantidade          |           2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Este teste de unidade JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nos mostra como usar este mecanismo (e como verificar se ele funciona corretamente).
Vou supor que você entende [chai](https://www.chaijs.com/) e [ethers](https://docs.ethers.io/v5/) e explicar apenas as partes que se aplicam especificamente ao contrato.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Deve nos permitir usar tokens", async function () {
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
    // Obter tokens para usar
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
   Este é o contrato interpretador de calldata.
2. `data`, o calldata a ser enviado.
   No caso de uma chamada de faucet, os dados são um único byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Chamamos o [método `sendTransaction` do assinante](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) porque já especificamos o destino (`faucetTx.to`) e precisamos que a transação seja assinada.

```javascript
// Verifique se o faucet fornece os tokens corretamente
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Aqui verificamos o saldo.
Não há necessidade de economizar gás em funções `view`, então apenas as executamos normalmente.

```javascript
// Dê ao CDI uma permissão (aprovações não podem ser intermediadas por proxy)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Dê ao interpretador de calldata uma permissão para poder fazer transferências.

```javascript
// Transferir tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Crie uma transação de transferência. O primeiro byte é "0x02", seguido pelo endereço de destino e, finalmente, a quantidade (0x0100, que é 256 em decimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Verifique se temos 256 tokens a menos
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // E que nosso destino os recebeu
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Reduzindo o custo quando você controla o contrato de destino {#reducing-the-cost-when-you-do-control-the-destination-contract}

Se você tiver controle sobre o contrato de destino, poderá criar funções que contornem as verificações do `msg.sender` porque elas confiam no interpretador de calldata.
[Você pode ver um exemplo de como isso funciona aqui, na ramificação `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Se o contrato estivesse respondendo apenas a transações externas, poderíamos nos virar com apenas um contrato.
No entanto, isso quebraria a [componibilidade](/developers/docs/smart-contracts/composability/).
É muito melhor ter um contrato que responda a chamadas normais de ERC-20 e outro contrato que responda a transações com dados de chamada curtos.

### Token.sol {#token-sol-2}

Neste exemplo, podemos modificar `Token.sol`.
Isso nos permite ter várias funções que apenas o proxy pode chamar.
Aqui estão as novas partes:

```solidity
    // O único endereço com permissão para especificar o endereço do CalldataInterpreter
    address owner;

    // O endereço do CalldataInterpreter
    address proxy = address(0);
```

O contrato ERC-20 precisa saber a identidade do proxy autorizado.
No entanto, não podemos definir essa variável no construtor, porque ainda não sabemos o valor.
Este contrato é instanciado primeiro porque o proxy espera o endereço do token em seu construtor.

```solidity
    /**
     * @dev Chama o construtor ERC20.
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
        require(msg.sender == owner, "Só pode ser chamado pelo proprietário");
        require(proxy == address(0), "O proxy já foi definido");

        proxy = _proxy;
    }    // function setProxy
```

O proxy tem acesso privilegiado, porque pode contornar as verificações de segurança.
Para garantir que possamos confiar no proxy, permitimos que apenas `owner` chame esta função, e apenas uma vez.
Uma vez que `proxy` tem um valor real (diferente de zero), esse valor não pode mudar, então mesmo que o proprietário decida se tornar malicioso, ou o mnemônico para ele seja revelado, ainda estamos seguros.

```solidity
    /**
     * @dev Algumas funções só podem ser chamadas pelo proxy.
     */
    modifier onlyProxy {
```

Esta é uma [`função `modifier``](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), que modifica a forma como outras funções funcionam.

```solidity
      require(msg.sender == proxy);
```

Primeiro, verifique se fomos chamados pelo proxy e por mais ninguém.
Se não, `reverta`.

```solidity
      _;
    }
```

Se sim, execute a função que modificamos.

```solidity
   /* Funções que permitem que o proxy realmente atue como proxy para as contas */

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

1. É modificada por `onlyProxy()` para que ninguém mais possa controlá-las.
2. Recebe o endereço que normalmente seria `msg.sender` como um parâmetro extra.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

O interpretador de calldata é quase idêntico ao anterior, exceto que as funções com proxy recebem um parâmetro `msg.sender` e não há necessidade de uma permissão para `transfer`.

```solidity
        // transferir (não é necessária permissão)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // aprovar
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferirDe
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

Existem algumas alterações entre o código de teste anterior e este.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Precisamos dizer ao contrato ERC-20 em qual proxy confiar

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Precisa de dois assinantes para verificar as permissões
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Para verificar `approve()` e `transferFrom()`, precisamos de um segundo assinante.
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
// aprovação e transferirDe
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

// Verifique se a combinação de aprovação / transferirDe foi feita corretamente
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Teste as duas novas funções.
Observe que `transferFromTx` requer dois parâmetros de endereço: o doador da permissão e o receptor.

## Conclusão {#conclusion}

Tanto a [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) quanto a [Arbitrum](https://developer.offchainlabs.com/docs/special_features) estão procurando maneiras de reduzir o tamanho do calldata escrito na L1 e, portanto, o custo das transações.
No entanto, como provedores de infraestrutura em busca de soluções genéricas, nossas habilidades são limitadas.
Como desenvolvedor de dapps, você tem conhecimento específico da aplicação, o que permite otimizar seu calldata muito melhor do que poderíamos em uma solução genérica.
Esperamos que este artigo o ajude a encontrar a solução ideal para suas necessidades.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).

