---
title: "ABIs curtos para otimização de dados de chamada"
description: Otimizando contratos inteligentes para Rollups Otimistas
author: Ori Pomerantz
lang: pt-br
tags:
  - "camada 2"
skill: intermediate
published: 2022-04-01
---

## Introdução {#introduction}

Neste artigo, você aprenderá sobre [optimistic rollups](/developers/docs/scaling/optimistic-rollups), os custos das transações e como essa estrutura de custos diferente nos obriga a otimizar coisas diferentes do que fazemos na Ethereum Mainnet. Você também aprenderá como implementar essa otimização.

### Divulgação completa {#full-disclosure}

Eu sou funcionário em tempo integral da [Optimism](https://www.optimism.io/), então os exemplos neste artigo serão executados na Optimism. No entanto, a técnica explicada aqui deve funcionar para outras rollups também.

### Terminologia {#terminology}

Quando se discute rollups, o termo 'camada 1' (L1) é usado para a Mainnet, a rede Ethereum de produção. O termo 'camada 2' (L2) é usado para a rollup ou qualquer outro sistema que depende do L1 para segurança, mas faz a maior parte de seu processamento fora da cadeia

## Como podemos reduzir ainda mais o custo das transações L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups) tem que preservar um registro de cada transação histórica para que qualquer pessoa possa passar por elas e verificar se o estado atual está correto. A forma mais barata de obter dados na Ethereum Mainnet é escrevê-los como calldata. Esta solução foi escolhida por ambos [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) e [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Custo das transações L2 {#cost-of-l2-transactions}

O custo das transações L2 é composto por dois componentes:

1. Processamento L2, que geralmente é extremamente barato
2. Armazenamento L1, vinculado aos custos de gas da Mainnet

No momento em que escrevo isso, no Optimism, o custo do gas L2 é de 0,001 [Gwei](/developers/docs/gas/#pre-london). O custo do gas na L1 é de aproximadamente 40 gwei. [Você pode ver os preços atuais aqui](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Um byte de dado da chamada custa, ou 4 gas (se for zero), ou 16 gas (se for qualquer outro valor). Uma das operações mais caras no EVM é escrever no storage. O custo máximo de escrever uma palavra de 32 bytes para armazenamento na L2 é de 22100 gas. Atualmente, isso é 22.1 gwei. Portanto, se nós pudermos salvar um único byte zero de calldata, poderemos gravar cerca de 200 bytes no armazenamento e ainda sairemos ganhando.

### O ABI {#the-abi}

A grande maioria das transações acessa um contrato de uma conta de propriedade externa. A maioria dos contratos é escrita em Solidity e interpreta seu campo de dados de acordo com a [interface binária do aplicativo (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

No entanto, a ABI foi projetada para L1, em que um byte de dados da chamada custa aproximadamente o mesmo que quatro operações aritméticas, não para L2, em que um byte de dados da chamada custa mais de mil operações aritméticas. Por exemplo, [aqui está uma transação de transferência ERC-20](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998). Os dados da chamada são divididos da seguinte forma:

| Seção               | Comprimento | Bytes | Bytes gastos | Gas gasto | Bytes necessários | Gas necessário |
| ------------------- | -----------:| -----:| ------------:| ---------:| -----------------:| --------------:|
| Seletor de função   |           4 |   0-3 |            3 |        48 |                 1 |             16 |
| Zeros               |          12 |  4-15 |           12 |        48 |                 0 |              0 |
| Endereço de destino |          20 | 16-35 |            0 |         0 |                20 |            320 |
| Quantidade          |          32 | 16-35 |           17 |        64 |                15 |            240 |
| Total               |          68 |       |              |       576 |                   |            576 |

Explicação:

- **Seletor de funções**: O contrato tem menos de 256 funções, portanto podemos distingui-las com um único byte. Esses bytes são tipicamente diferentes de zero e, portanto, [custam dezesseis gás](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeros**: Esses bytes são sempre zero porque um endereço de vinte bytes não requer uma palavra de trinta e dois bytes para usá-lo. Bytes que possuem zero custam quatro gas ([consulte o yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Apêndice G, pág. 27, o valor para `G`<sub>`txdatazero`</sub>).
- **Quantia**: Se nós assumirmos que neste contrato `decimais` são dezoito (o valor normal) e o valor máximo de tokens que nós transferimos será 10<sup>18</sup>, nós temos uma quantia máxima de 10<sup>36</sup>. 256<sup>15</sup> &gt; 10<sup>36</sup>, então quinze bytes são suficientes.

Um gasto de 160 gas na L1 é normalmente insignificante. Uma transação custa pelo menos [21.000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), então um extra de 0,8% não importa. Entretanto, na L2, as coisas são diferentes. Quase o custo inteiro da transação é escrevendo-o na L1. Em adição ao calldata da transação, há 109 bytes de cabeçalho de transação (endereço de destino, assinatura, etc.). O custo total é portanto `109*16+576+160=2480`, e nós estamos desperdiçando cerca de 6,5% disso.

## Reduzindo custos quando você não controla o destino {#reducing-costs-when-you-dont-control-the-destination}

Assumindo que você não tem controle sobre o contrato de destino, você pode ainda usar uma solução similar a [esta](https://github.com/qbzzt/ethereum.org-20220330-shortABI). Vamos passar pelos arquivos relevantes.

### Token.sol {#token-sol}

[Este é o contrato destino](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol). É um contrato ERC-20 padrão, com um recurso adicional. Esta função `faucet` permite qualquer usuário obter algum token para usar. Ele faria o contrato de produção ERC-20 inútil, mas ele facilita a vida quando um ERC-20 existe somente para facilitar o teste.

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

[Você pode ver um exemplo deste contrato sendo implantado aqui](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Este é o contrato que transações devem chamar com calldata menor](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol). Vamos passar por ele linha a linha.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Nós precisamos da função do token para saber como chamá-lo.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

O endereço do token para o qual nós somos um proxy.

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

O endereço do token é o único parâmetro que nós precisamos especificar.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Ler um valor do calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Nós iremos carregar uma simples palavra de 32-bytes (256-bit) para a memória e remover os bytes que não são parte do campo que nós queremos. Este algoritmo não funciona para valores maiores que 32 bytes, e claro, não podemos ler depois do fim do calldata. Na L1 pode ser necessário pular estes testes para economizar gas, mas na L2 o gas é extremamente barato, o que permite qualquer checagem de sanidade que possamos pensar.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Nós poderiamos ter copiado os dados da chamada ao `fallback()` (veja abaixo), mas é mais fácil usar [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), a linguagem de montagem da EVM.

Aqui nós usamos [o opcode CALLDATALOAD](https://www.evm.codes/#35) para ler bytes `startByte` até `startByte+31` na pilha. Em geral, a sintaxe de um opcode em Yul é `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Somente os bytes mais `length` significantes são parte do campo, então nós fazemos [right-shift](https://en.wikipedia.org/wiki/Logical_shift) para se livrar dos outros valores. Isto tem a vantagem adicional de mover o valor para a direita do campo, então é o valor por ele mesmo, ao invés do valor vezes 256<sup>alguma coisa</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Quando uma chamada a um contrato Solidity não encontra nenhuma das assinaturas de função, ela chama a função [the `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (assumindo que exista uma). No caso de `CalldataInterpreter`, _qualquer_ chamada chega aqui porque não há outras funções `external` ou `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Leia o primeiro byte do calldata, que nos conta a função. Há duas razões porque uma função não estaria disponível aqui:

1. Funções que são `pure` ou `view` não mudam seu estado e não custam gas (quando chamadas off-chain). Não faz sentido tentar reduzir seus custos de gas.
2. Funções que confiam em [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties). O valor de `msg.sender` será o endereço do `CalldataInterpreter`, não o chamador.

Infelizmente, [olhando as especificações do ERC-20](https://eips.ethereum.org/EIPS/eip-20), isto deixa apenas uma função, `transfer`. Isto nos deixa com somente duas funções: `transfer` (porque nós podemos chamar `transferFrom`) e `faucet` (porque nós podemos transferir os tokens de volta a quem quer tenha nos chamado).

```solidity

        // Call the state changing methods of token using
        // information from the calldata

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

Depois que nós chamamos `token.faucet()` nós obtivemos tokens. Entretanto, como o contrato proxy, nós não **precisamos** de tokens. O EOA (externally owned account) ou contrato que nos chamou o faz. Então nós transferimos todos nossos tokens para quem quer tenha nos chamado.

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

Transferir tokens requer dois parâmetros: o endereço de destino e a quantidade.

```solidity
            token.transferFrom(
                msg.sender,
```

Nós apenas permitimos chamadores transferir tokens que eles possuam

```solidity
                address(uint160(calldataVal(1, 20))),
```

O endereço de destino começa no byte 1 (o byte 0 é a função). Como um endereço, ele tem 20-bytes de comprimento.

```solidity
                calldataVal(21, 2)
```

Para esse contrato em particular nós assumimos que o número máximo de tokens que qualquer um poderia querer transferir cabe em dois bytes (menos que 65536).

```solidity
            );
        }
```

Em geral, uma transferência pega 35 bytes de calldata:

| Seção               | Comprimento | Bytes |
| ------------------- | -----------:| -----:|
| Seletor de função   |           1 |     0 |
| Endereço de destino |          32 |  1-32 |
| Quantidade          |           2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Este teste unitário JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nos mostra como usar este mecanismo (e como verificar que ele trabalha corretamente). Parto do princípio que você entendeu [chai](https://www.chaijs.com/) e [ethers](https://docs.ethers.io/v5/) e apenas explicar as partes que especificamente se aplicam ao contrato.

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

Nós começamos por implantar ambos contratos.

```javascript
    // Get tokens to play with
    const faucetTx = {
```

Nós não podemos usar funções de alto nível que nós normalmente usamos (como `token.faucet()`) para criar transações, porque nós não seguimos o ABI. Ao invés disso, nós temos que construir a transação nós mesmos e enviá-la.

```javascript
      to: cdi.address,
      data: "0x01"
```

Há dois parâmetros que nós precisamos fornecer para a transação:

1. `to`, o endereço de destino. Isto é o contrato interpretador do calldata.
2. `data`, o calldata a enviar. No caso de uma chamada de faucet, o dado é um único byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Nós chamamos o método `sendTransaction` do [assinante](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) porque nós já especificamos o destino (`faucetTx.to`) e nós precisamos que a transação seja assinada.

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Aqui nós verificamos o saldo. Não há necessidade de economizar gas em funções `view`, então nós só as rodamos normalmente.

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Dar ao intérprete calldata uma permissão para ser capaz de fazer transferências.

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Criar uma transação de transferência. O primeiro byte é "0x02", seguido pelo endereço de destino, e finalmente a quantia (0x0100, que é 256 em decimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

### Exemplo {#example}

Se você quiser ver estes arquivos em ação sem precisar rodá-los, siga estes links:

1. [Implantação de `OrisUselessToken`](https://kovan-optimistic.etherscan.io/tx/1410744) no [endereço `0x950c753c0edbde44a74d3793db738a318e9c8ce8`](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).
2. [Implantação de `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1410745) no [endereço `0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55`](https://kovan-optimistic.etherscan.io/address/0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55).
3. [Chamada para `faucet()`](https://kovan-optimistic.etherscan.io/tx/1410746).
4. [Chamada para `OrisUselessToken.approve()`](https://kovan-optimistic.etherscan.io/tx/1410747). Esta chamada tem de ir diretamente para o contrato do token porque o processamento confia no `msg.sender`.
5. [Chamada para `transfer()`](https://kovan-optimistic.etherscan.io/tx/1410748).

## Reduzindo o custo quando você controla o contrato destino {#reducing-the-cost-when-you-do-control-the-destination-contract}

Se você realmente tem controle sobre o contrato destino, você pode criar funções que ignoram as checagens do `msg.sender` porque eles acreditam no intérprete do calldata. [Você pode ver um exemplo de como isto funciona aqui, no branch `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Se o contrato estiver respondendo somente para transações externas, nós poderíamos ter apenas um contrato. Entretanto, isso iria quebrar [a capacidade de composição](/developers/docs/smart-contracts/composability/). É bem melhor ter um contrato que responda a chamadas ERC-20 normais, e outro contrato que responda a transações com chamadas curtas de dados.

### Token.sol {#token-sol-2}

Neste exemplo nós podemos modificar `Token.sol`. Isto nos deixa ter um número de funções que somente o proxy pode chamar. Eis aqui as novas partes:

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

O contrato ERC-20 precisa saber a identidade do proxy autorizado. Entretanto, nós não podemos configurar esta variável no construtor, porque nós não sabemos o valor ainda. Este contrato é instanciado primeiro porque o proxy espera o endereço do token no seu construtor.

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

O endereço do criador (chamado`owner`) é armazenado aqui porque este é o único endereço permitido para configurar o proxy.

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

O proxy tem acesso privilegiado, porque ele pode ignorar checagens de segurança. Para garantir que nós podemos acreditar no proxy, nós somente deixamos `owner` chamar esta função, e somente uma vez. Uma vez que `proxy` tenha um valor real (não zero), este valor não pode mudar, então mesmo se o proprietário decide se tornar trapaceiro, ou caso o mnemônico seja revelado a ele, nós ainda estamos seguros.

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

Isto é uma função [`modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), ela modifica a maneira que outras funções trabalham.

```solidity
      require(msg.sender == proxy);
```

Primeiro, verifique que nós fomos chamados pelo proxy e ninguém mais. Se não, `revert`.

```solidity
      _;
    }
```

Neste caso, rode a função que nós modificamos.

```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

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

Há três operações que normalmente requerem que a mensagem venha direto da entidade transferindo tokens ou aprovando uma permissão. Aqui nós temos uma versão de proxy destas operações que:

1. É modificada pelo `onlyProxy()`, de modo que ninguém mais tem permissão de controlá-los.
2. Pega o endereço que seria normalmente `msg.sender` como um parâmetro extra.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

O interpretador calldata é praticamente idêntico ao acima, exceto que as funções com proxy recebem um parâmetro `msg.sender` e não há necessidade de permissão `transfer`.

```solidity
        // transfer (no need for allowance)
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

Há pequenas mudanças entre o código de teste anterior e este.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Nós precisamos contar ao contrato ERC-20 qual proxy acreditar

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Para checar `approve()` e `transferFrom()` nós precisamos de um segundo assinante. Nós o chamamos de `poorSigner` porque ele não pega nenhum de nossos tokens (ele precisa ter ETH, claro).

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Como o contrato ERC-20 confia no proxy (`cdi`), nós não precisamos de uma permissão para confiar em transferências.

```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Teste as duas novas funções. Note que `transferFromTx` requer dois parâmetros de endereço: o que deu a permissão e o recebedor.

### Exemplo {#example-2}

Se você quiser ver estes arquivos em ação sem precisar rodá-los, siga estes links:

1. [Implantação de `OrisUselessToken-2`](https://kovan-optimistic.etherscan.io/tx/1475397) no endereço [`0xb47c1f550d8af70b339970c673bbdb2594011696`](https://kovan-optimistic.etherscan.io/address/0xb47c1f550d8af70b339970c673bbdb2594011696).
2. [Implantação de `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1475400) no endereço [`0x0dccfd03e3aaba2f8c4ea4008487fd0380815892`](https://kovan-optimistic.etherscan.io/address/0x0dccfd03e3aaba2f8c4ea4008487fd0380815892).
3. [Chamada para `transfer()`](https://kovan-optimistic.etherscan.io/tx/1475402).
4. [Chamada para `faucet()`](https://kovan-optimistic.etherscan.io/tx/1475409).
5. [Chamada para `transferProxy()`](https://kovan-optimistic.etherscan.io/tx/1475416).
6. [Chamada para `approveProxy()`](https://kovan-optimistic.etherscan.io/tx/1475419).
7. [Chamada para `transferFromFProxy()`](https://kovan-optimistic.etherscan.io/tx/1475421). Note que esta chamada vem de um endereço diferente dos outros, `poorSigner` ao invés de `signer`.

## Conclusão {#conclusion}

Ambos [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) e [Arbitrum](https://developer.offchainlabs.com/docs/special_features) estão procurando por maneiras de reduzir o tamanho do calldata escrito no L1 e portanto o custo das transações. Entretanto, como provedores de infraestrutura procurando por soluções genéricas, nossas habilidades são limitadas. Como desenvolvedor dapp, você tem conhecimento específico de aplicações, o que te leva a otimizar seu calldata muito melhor do que nós poderíamos com uma solução genérica. Esperamos que este artigo ajude você a encontrar a solução ideal para as suas necessidades.
