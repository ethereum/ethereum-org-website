---
title: Criar e promover um Aplicativo DeFi
description: Deposite tokens ERC20 para o contrato inteligente e crie fazenda de tokens
author: "strykerin"
tags:
  - "solidity"
  - "defi"
  - "web3"
  - "truffle"
  - "ganache"
  - "Contratos Inteligentes"
skill: intermediate
lang: pt-br
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

Neste tutorial, construiremos um aplicativo DeFi com Solidity onde os usuários podem depositar um token ERC20 no contrato inteligente e ele cunhará e transferirá os Tokens Farm para eles. Os usuários podem posteriormente retirar seus tokens ERC20 queimando seu Farm Token em contrato inteligente e os tokens ERC20 serão transferidos de volta para eles.

## Instale o Truffle e o Ganache {#install-truffle-and-ganache}

Se esta for a primeira vez que você está escrevendo um contrato inteligente, você precisará configurar seu ambiente primeiro. Vamos usar duas ferramentas:[Truffle](https://www.trufflesuite.com/) and [Ganache](https://www.trufflesuite.com/ganache).

O Truffle é um ambiente de desenvolvimento e estrutura de teste para o desenvolvimento de contratos inteligentes para o Ethereum. Com o Truffle, é fácil construir e implantar contratos inteligentes na blockchain. O Ganache nos permite criar uma blockchain Ethereum local para testar contratos inteligentes. Ele simula os recursos da rede real e as primeiras 10 contas são financiadas com 100 ether de teste, tornando a implantação e o teste do contrato inteligente gratuitos e fáceis. O Ganache está disponível como um aplicativo de desktop e uma ferramenta de linha de comandos. Para este artigo, usaremos o aplicativo de desktop de interface do usuário.

![Aplicativo de área de trabalho Ganache UI](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Aplicativo de desktop Ganache UI_

Para criar o projeto, execute os seguintes passos

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

Isso criará um projeto em branco para o desenvolvimento e implantação de nossos contratos inteligentes. A estrutura do projeto criada é a seguinte:

- A Pasta para os contratos inteligentes de solidez: `contracts`

- `migrações`: Pasta para os scripts de implantação

- `test`: Pasta para testar nossos contratos inteligentes

- `truffle-config.js`: Arquivo de configuração do Truffle

## Criar o token ERC20 {#create-the-erc20-token}

Primeiro, precisamos criar seu token ERC20 que usaremos para apostar no contrato inteligente. Para criar nosso token fungível, primeiro precisamos instalar a biblioteca OpenZeppelin. Esta biblioteca contém as implementações de padrões como o ERC20 e o ERC721. Para instalá-lo, execute os passos:

```bash
npm install @openzeppelin/contracts
```

Usando a biblioteca OpenZeppelin, podemos criar nosso token ERC20 gravando em `contracts/MyToken.sol` com o seguinte código solidity:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

No código acima em:

- Linha 3: Importamos o contrato ERC20.sol do openzeppelin que contém a implementação para este padrão de token.

- Linha 5: Herdamos do contrato ERC20.sol.

- Linha 6: Estamos chamando o construtor ERC20.sol e passando os parâmetros name e symbol como `"MyToken"` e `"MTKN"` respectivamente.

- Linha 7: Estamos cunhando e transferindo 1 milhão de tokens para a conta que está implantando o contrato inteligente (estamos usando os 18 decimais padrão para o token ERC20, o que significa que, se quisermos cunhar 1 token, você o representará como 1000000000000000000, 1 com 18 zeros).

Podemos ver abaixo a implementação do construtor ERC20.sol onde o campo `_decimals` está definido como 18:

```solidity
string private _name;
string private _symbol;
uint8 private _decimals;

constructor (string memory name_, string memory symbol_) public {
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

## Compilar o token ERC20 {#compile-the-erc20-token}

Para compilar nosso contrato inteligente, devemos primeiro verificar nossa versão do compilador de solidez. Você pode verificar isso executando o comando:

```bash
truffle version
```

A versão padrão é a `Solidity v0.5.16`. Como nosso token é escrito usando a versão solidity `0.6.2`, se executarmos o comando para compilar nossos contratos, obteremos um erro do compilador. Para especificar qual versão do compilador de solidez será usada, acesse o arquivo `truffle-config. s` e são definidos para a versão desejada do compilador como vistos abaixo:

```javascript
// Configure your compilers
compilers: {
  solc: {
    version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    // settings: {          // See the solidity docs for advice about optimization and evmVersion
    //  optimizer: {
    //    enabled: false,
    //    runs: 200
    //  },
    //  evmVersion: "byzantium"
    // }
  }
}
```

Agora podemos compilar nosso contrato inteligente executando o seguinte comando:

```bash
truffle compile
```

## Instalar Token ERC20 {#deploy-erc20-token}

Depois de compilado, podemos publicar nosso token.

Na pasta de `migrations`, crie um arquivo chamado `2_deploy_Tokens.js`. Este arquivo é onde implantaremos nosso token ERC20 e nosso contrato inteligente FarmToken. O código abaixo é usado para publicar nosso contrato MyToken.sol:

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Abra o Ganache e selecione a opção "Quickstart" para iniciar uma blockchain local de Ethereum. Para publicar nosso contrato, execute:

```bash
truffle migrate
```

O endereço usado para implantar nossos contratos é o primeiro da lista de endereços que o Ganache nos mostra. Para verificar isso, podemos abrir o aplicativo de trabalho Ganache e podemos verificar se o saldo de ether para a primeira conta foi reduzido devido ao custo de ether para a implantação dos nossos contratos inteligentes:

![Aplicativo de desktop Ganache Ui](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Aplicativo de desktop Ganache Ui_

Para verificar que 1 milhão de tokens MyToken foram enviados para o endereço de deploy, podemos utilizar o Truffle Console para interagir com o nosso contrato inteligente que foi publicado.

> [Truffle Console é um console básico interativo conectando-se a qualquer cliente Ethereum.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

Para interagir com nosso contrato inteligente, execute o seguinte comando:

```bash
truffle console
```

Agora podemos escrever os seguintes comandos no terminal:

- Obter o contrato inteligente: `meuToken = await MyToken.deployed()`

- Obter o array de contas de Ganache: `contas = aguardar web3.eth.getAccounts()`

- Obter o saldo para a primeira conta: `balance = await myToken.balanceOf(contas[0])`

- Formate o saldo de 18 decimals: `web3.utils.fromWei(balance.toString())`

Executando os comandos acima, vamos ver que o primeiro endereço tem na verdade 1 milhão de MyTokens:

![Primeiro endereço tem 1000000 MyTokens](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_Primeiro endereço tem 1000000 MyTokens_

## Criando FarmToken Smart Contract {#create-farmtoken-smart-contract}

O contrato inteligente FarmToken terá 3 funções:

- `balance()`: Obter o balanço do MyToken no contrato inteligente FarmToken.

- `deposit(uint256 _amount)`: Transfira MyToken em nome do usuário para o contrato inteligente FarmToken e então importe FarmToken para o usuário.

- `withdraw(uint256 _amount)`: Queimar FarmTokens do usuário e transferir MyTokens para o endereço do usuário.

Vamos dar uma olhada no construtor do FarmToken:

```solidity
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }
```

- Linhas 3-6: Estamos importando os seguintes contratos do openzeppelin: IERC20.sol, Address.sol, SafeERC20.sol e ERC20.sol.

- Linha 8: O FarmToken vai herdar do contrato ERC20.

- Linhas 14-19: O construtor FarmToken receberá como parâmetro o endereço do contrato MyToken e atribuiremos seu contrato à nossa variável pública chamada `token`.

Vamos implementar a função `balance()`. Ele não receberá parâmetros e retornará o saldo do MyToken neste contrato inteligente. Ela está implementada como mostrado abaixo:

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

Para a função `deposit(uint256 _amount)`, ele receberá como parâmetro a quantia que o usuário deseja depositar e irá fazer a cunhagem e transferir FarmTokens para o usuário:

```solidity
function deposit(uint256 _amount) public {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");

    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);

    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}
```

Para a função `withdraw(uint256 _amount)`, nós vamos receber como parâmetro a quantidade de FarmTokens que o usuário deseja queimar e então vamos transferir a mesma quantidade de MyTokens de volta para o usuário:

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

Como implantar um contrato inteligente. Para fazer isso, vamos voltar para o arquivo `2_deploy_Tokens.js` e adicionar o novo contrato a ser implantado:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()

  // Deploy Farm Token
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}
```

Note que ao implantar o FarmToken, passamos como parâmetro o endereço do contrato MyToken implantado.

Agora, rode `truffle compilar` e `truffle migrar` para implantar nossos contratos.

Vamos testar o nosso contrato inteligente. Em vez de usar o `truffle console` para interagir com o nosso contrato inteligente, criaremos um script para automatizar esse processo. Crie uma pasta chamada `scripts` e adicione o seguinte arquivo `getMyTokenBalance.js`. Ele irá verificar o saldo dos MyTokens no contrato inteligente do Farmtoken:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  myToken = await MyToken.deployed()
  farmToken = await FarmToken.deployed()
  balance = await myToken.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}
```

Para executar esse script, execute o seguinte comando na linha de comando:

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

Vamos obter o resultado esperado que é 0. Se você receber um erro sobre o FarmToken ainda não foi implantado, a rede truffle não recebeu a versão mais recente do seu código de contratos. Apenas feche o ganache, reinicie o programa rapidamente e certifique-se de executar `a migração de um truffle`.

Agora, vamos fazer o staking do MyToken para o contrato inteligente. Desde a função `deposit(uint256 _amount)` chama a função `safeTransferFrom` do ERC20, primeiro o usuário deve aprovar o contrato inteligente para transferir MyToken em nome do usuário. Então, no script abaixo, primeiro aprovaremos esta etapa e então chamaremos a função:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  )
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Para rodar esse script: `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Você deve ver no seu console:

![output do transferMyTokenToFarmToken.js](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_output do transferMyTokenToFarmToken.js_

Como podemos ver, depositamos MyTokens com sucesso no contrato inteligente já que a primeira conta agora tem FarmTokens.

Para retirar:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))

  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Para rodar esse script: `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Como podemos ver no output abaixo, nós conseguimos de volta os MyTokens com sucesso e acabamos com os FarmTokens:

![output do withdrawMyTokenFromTokenFarm.js](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_output do withdrawMyTokenFromTokenFarm.js_

## Referências {#references}

[Contratos - OpenZeppelin Docs](https://docs.openzeppelin.com/contracts/3.x/)

[Ferramentas Suplentes para Contratos Inteligentes Common Suite](https://www.trufflesuite.com/)

[Ganache | Truffle Suite](https://www.trufflesuite.com/ganache)

[O que é DeFi? Um guia para iniciantes (atualizado em 2021) (99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[DeFi - A classificação da finança descentraliza no DeFi Llama](https://defillama.com/)
