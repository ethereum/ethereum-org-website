---
title: Creați și implementați o aplicație DeFi
description: Depuneți tokenuri ERC20 în contractul inteligent „FarmToken” și emiteţi tokenuri „Farm Token”
author: "strykerin"
tags:
  - "solidity"
  - "defi"
  - "web3.js"
  - "truffle"
  - "ganache"
  - "contracte inteligente"
skill: intermediate
lang: ro
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

În acest tutorial vom construi o aplicație DeFi cu Solidity în care utilizatorii pot depune un token ERC20 în contractul inteligent „FarmToken”, iar acesta va emite și va transfera tokenuri „Farm Token” către utilizatori. Utilizatorii își pot retrage ulterior tokenurile ERC20 prin arderea de tokenuri„Farm Token” de pe contractul inteligent „FarmToken”, iar tokenurile ERC20 le vor fi transferate înapoi.

## Instalați Truffle și Ganache {#install-truffle-and-ganache}

Dacă aceasta este prima dată când scrieți un contract inteligent, va trebui să vă configurați mediul. Vom folosi două instrumente: [Truffle](https://www.trufflesuite.com/) și [Ganache](https://www.trufflesuite.com/ganache).

Truffle este un mediu de dezvoltare și un framework de testare pentru dezvoltarea de contracte inteligente pentru Ethereum. Cu Truffle este ușor să construiți și să implementați contracte inteligente în blockchain. Ganache ne permite să creăm un blockchain Ethereum local pentru a testa contractele inteligente. Acesta simulează funcționalitățile rețelei reale, iar primele 10 conturi sunt finanțate cu 100 de ether de test, făcând astfel ca implementarea și testarea contractelor inteligente să fie gratuită și simplă. Ganache este disponibil ca aplicație pentru desktop și ca instrument de linie de comandă. Pentru acest articol vom folosi aplicația pentru desktop UI.

![Aplicația pentru desktop Ganache UI](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Aplicația pentru desktop Ganache UI_

Pentru a crea proiectul, executați următoarele comenzi

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

Acestea vor crea un proiect gol pentru dezvoltarea și implementarea contractelor noastre inteligente. Structura proiectului creat este următoarea:

- `contracts`: Dosar pentru contractele inteligente solidity

- `migrations`: Dosar pentru scripturile de implementare

- `test`: Dosar pentru testarea contractelor noastre inteligente

- `truffle-config.js`: Fișier de configurare Truffle

## Creați tokenul ERC20 {#create-the-erc20-token}

Mai întâi trebuie să creăm tokenul ERC20 pe care îl vom folosi pentru a miza în contractul inteligent. Pentru a ne crea tokenul fungibil, va trebui mai întâi să instalăm biblioteca OpenZeppelin. Această bibliotecă include implementări ale unor standarde precum ERC20 și ERC721. Pentru a o instala, executați comanda:

```bash
npm install @openzeppelin/contracts
```

Utilizând biblioteca OpenZeppelin, ne putem crea tokenul ERC20 scriind în `contracts/MyToken.sol` cu următorul cod solidity:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

În codul de mai sus, pe:

- Linia 3: Importăm contractul ERC20.sol din openzeppelin care conține implementarea acestui standard de token.

- Linia 5: Moștenim din contractul ERC20.sol.

- Linia 6: Apelăm constructorul ERC20.sol și trecem parametrii „nume” și „simbol” ca fiind `”MyToken”` și, respectiv, `”MTKN”`.

- Linia 7: Vom emite și transfera 1 milion de tokenuri pentru contul care implementează contractul inteligent (folosim cele 18 zecimale implicite pentru tokenul ERC20, ceea ce înseamnă că, dacă vrem să emitem 1 token, îl vom reprezenta ca 10000000000000000000000, 1 cu 18 zerouri).

Putem vedea mai jos implementarea constructorului ERC20.sol, în care câmpul `_decimals` este setat la 18:

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

## Compilați tokenul ERC20 {#compile-the-erc20-token}

Pentru a ne compila contractul inteligent, trebuie mai întâi să verificăm versiunea compilatorului Solidity. Puteți verifica aceasta executând comanda:

```bash
truffle version
```

Versiunea implicită este `Solidity v0.5.16`. Deoarece tokenul nostru este scris folosind versiunea solidity `0.6.2`, dacă executăm comanda de compilare a contractelor noastre, vom primi o eroare de compilare. Pentru a specifica ce versiune de compilator solidity să folosiți, accesați fișierul `truffle-config.js` și setați versiunea de compilator dorită, așa cum se arată mai jos:

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

Acum ne putem compila contractul inteligent prin rularea următoarei comenzi:

```bash
truffle compile
```

## Implementați tokenul ERC20 {#deploy-erc20-token}

Abia acum, după compilare, ne putem implementa tokenul.

În folderul `migration`s, creați un fișier numit `2_deploy_Tokens.js`. Acest fișier este locul în care ne vom implementa atât tokenul ERC20, cât și contractul inteligent „FarmToken”. Codul de mai jos este utilizat pentru a implementa contractul MyToken.sol:

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Deschideți Ganache și selectați opțiunea „Quickstart” („Pornire rapidă”) pentru a porni un blockchain Ethereum local. Pentru a ne implementa contractul, executați:

```bash
truffle migrate
```

Adresa utilizată pentru implementarea contractelor noastre este prima din lista de adrese pe care ne-o arată Ganache. Pentru a verifica aceasta, putem să deschidem aplicația Ganache pentru desktop și să verificăm că soldul de ether pentru primul cont s-a micșorat din cauza costului etherului necesar pentru implementarea contractelor noastre inteligente:

![Aplicația Ganache pentru desktop](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Aplicația Ganache pentru desktop_

Pentru a verifica dacă 1 milion de tokenuri „MyToken” au fost trimise la adresa de implementare, putem folosi Consola Truffle pentru a interacționa cu contractul nostru inteligent implementat.

> [Truffle Console este o consolă interactivă de bază care se conectează la orice client Ethereum.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

Pentru a interacționa cu contractul nostru inteligent, rulați următoarea comandă:

```bash
truffle console
```

Acum putem scrie următoarele comenzi în terminal:

- Obținerea contractului inteligent: `myToken = await MyToken.deployed()`

- Obținerea matricii de conturi din Ganache: `accounts = await web3.eth.getAccounts()`

- Obținerea soldului pentru primul cont: `balance = await myToken.balanceOf(accounts[0])`

- Formatați soldul din 18 zecimale: `web3.utils.fromWei(balance.toString())`

Executând comenzile de mai sus, vom vedea că prima adresă are de fapt 1 milion de tokenuri „MyTokens”:

![Prima adresă are 1000000 MyTokens](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_Prima adresă are 1000000 de tokenuri „MyTokens”_

## Creați contractul inteligent „FarmToken” {#create-farmtoken-smart-contract}

Contractul inteligent „FarmToken” va avea 3 funcții:

- `balance()`: Obțineţi soldul de tokenuri „MyToken” pe contractul inteligent „FarmToken”.

- `deposit(uint256 _amount)`: Transferaţi tokenurile „MyToken” în numele utilizatorului către contractul inteligent „FarmToken”, apoi emiteţi și transferaţi tokenurile „FarmToken” către utilizator.

- `withdraw(uint256 _amount)`: Ardeţi tokenurile „FarmToken” ale utilizatorului, apoi transferaţi tokenurile „MyToken” la adresa utilizatorului.

Să examinăm constructorul contractului inteligent "FarmToken":

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

- Liniile 3-6: Importăm următoarele contracte din openzeppelin: IERC20.sol, Address.sol, SafeERC20.sol și ERC20.sol.

- Linia 8: „FarmToken” va moșteni din contractul ERC20.

- Liniile 14-19: Constructorul „FarmToken” va primi ca parametru adresa contractului „MyToken” și vom atribui contractul său variabilei noastre publice numite `token`.

Haideți să implementăm funcția `balance()`. Acesta nu va primi niciun parametru și va returna soldul de tokenuri „MyToken” pe acest contract inteligent. Este implementat după cum se arată mai jos:

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

În ce privește funcția `depozit(uint256 _amount)`, aceasta va primi ca parametru suma pe care utilizatorul dorește să o depună, apoi va emite și va transfera tokenuri „FarmTokens” către utilizator:

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

În ce privește funcția `withdraw(uint256 _amount)`, vom primi ca parametru suma de tokenuri „FarmTokens” pe care utilizatorul dorește să le ardă și apoi vom transfera aceeași sumă de tokenuri „MyTokens” înapoi către utilizator:

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

În continuare ne vom implementa contractul inteligent. Pentru aceasta, ne vom întoarce la fișierul `2_deploy_Tokens.js` și vom adăuga noul contract care urmează să fie implementat:

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

De reținut că, la implementarea contractului inteligent „FarmToken”, trecem ca parametru adresa contractului MyToken implementat.

Iar acum rulați `truffle compile` și `truffle migrate` pentru a ne implementa contractele.

Acum să ne testăm contractul inteligent. Pentru aceasta, în loc să folosim `truffle console` ca să interacționăm cu contractul nostru inteligent, vom crea un script pentru a automatiza acest proces. Creați un dosar numit `scripts` și adăugați următorul fișier `getMyTokenBalance.js`. Acesta va verifica soldul de tokenuri „MyTokens” din contractul inteligent "FarmToken":

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

Pentru a executa acest script, executați comanda „cli” de mai jos:

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

Vom obține rezultatul preconizat, care este 0. Atunci când primiți o eroare care precizează că implementarea contractului dvs. inteligent „FarmToken” nu s-a efectuat încă, înseamnă că rețeaua Truffle nu a primit cea mai recentă versiune a codului contractului dvs. În acest acaz, închideți Ganache, reporniți-l și nu uitați să rulați `truffle migrate`.

Mai departe vom miza tokenurile „MyToken" pe contractul inteligent. Pentru că funcția `depozit(uint256 _amount)` apelează funcția `safeTransferFrom` din ERC20, utilizatorul trebuie întâi să autorizeze contractul inteligent să transfere tokenurile „MyToken” în numele său. De aceea, în scriptul de mai jos, vom autoriza întâi acest pas și apoi vom apela funcția:

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

Pentru a rula acest script, introduceţi comanda:`truffle exec .\scripts\transferMyTokenToFarmToken.js`. Veți vedea pe consolă:

![rezultatul comenzii „transferMyTokenToFarmToken.js”](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_rezultatul comenzii „transferMyTokenToFarmToken.js”_

După cum se vede, am reuşit să depunem tokenuri "MyTokens" în contractul inteligent "FarmToken", deoarece acest cont are acum tokenuri "FarmTokens".

Pentru a retrage:

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

Pentru a rula scriptul, introduceţi comanda: `truffle exec .\scripts\withdrawMyTokenFromTokenFarm.js`. După cum vedem din rezultatul de mai jos, am recuperat cu succes tokenurile „MyTokens” și am ars tokenurile „FarmTokens”:

![rezultatul comenzii „withdrawMyTokenFromTokenFarm.js”](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_rezultatul comenzii „withdrawMyTokenFromTokenFarm.js”_

## Referințe {#references}

[Contracte - Documente OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/)

[Instrumente simpatice pentru contractele inteligente | Suita Truffle](https://www.trufflesuite.com/)

[Ganache | Suita Truffle](https://www.trufflesuite.com/ganache)

[Ce este DeFi? Un ghid pentru începători (actualizat în 2021) (99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[DeFi - Clasamentul finanțelor descentralizate la DeFi Pulse](https://defipulse.com/)
