---
title: Creare e distribuire un'App DeFi
description: Deposita i token ERC20 sullo smart contract e conia token Farm
author: "strykerin"
tags:
  - "solidity"
  - "defi"
  - "web3.js"
  - "truffle"
  - "ganache"
  - "Smart Contract"
skill: intermediate
lang: it
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

In questo tutorial creeremo un'applicazione DeFi con Solidity in cui gli utenti possono depositare un token ERC20 sullo smart contract, per poter coniare e trasferire i token Farm. Gli utenti possono quindi prelevare i token ERC20: una volta bruciato il token Farm sullo smart contract, i token ERC20 verranno ritrasferiti.

## Installa Truffle e Ganache {#install-truffle-and-ganache}

Se questa è la prima volta che scrivi uno smart contract, dovrai configurare il tuo ambiente. Useremo due strumenti: [Truffle](https://www.trufflesuite.com/) e [Ganache](https://www.trufflesuite.com/ganache).

Truffle è un ambiente di sviluppo e framework di verifica per lo sviluppo di smart contract per Ethereum. Con Truffle è facile costruire e distribuire gli smart contract alla blockchain. Ganache consente di creare una blockchain locale di Ethereum per poter testare gli smart contract. Simula le funzionalità della rete reale e, i primi 10 conti, sono finanziati con 100 ether di prova, rendendo la distribuzione e i test del contratto intelligente, gratuiti e facili. Ganache è disponibile come applicazione desktop e strumento di riga di comando. Per questo articolo useremo l'applicazione desktop dell'UI.

![Applicazione desktop dell'UI di Ganache](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Applicazione desktop dell'UI di Ganache_

Per creare il progetto, esegui i seguenti comandi

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

Verrà creato un progetto vuoto per lo sviluppo e la distribuzione dei nostri smart contract. La struttura del progetto creato è la seguente:

- `contracts`: Cartella per gli smart contract in Solidity

- `migrations`: Cartella per gli script di distribuzione

- `test`: Cartella per collaudare i nostri smart contract

- `truffle-config.js`: File di configurazione di Truffle

## Crea il Token ERC20 {#create-the-erc20-token}

Innanzi tutto dobbiamo creare il nostro token ERC20, che useremo per lo staking sullo smart contract. Per creare il nostro token fungibile, dovremo prima installare la libreria di OpenZeppelin. Essa contiene le implementazioni di standard come ERC20 ed ERC721. Per installare, esegui il comando:

```bash
npm install @openzeppelin/contracts
```

Usando la libreria di OpenZeppelin possiamo creare il nostro token ERC20 scrivendo in `contracts/MyToken.sol` con il seguente codice in Solidity:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

Nel codice seguente alla:

- Riga 3: Importiamo l'ERC20.sol del contratto da openzeppelin, che contiene l'implementazione per questo standard del token.

- Riga 5: Ereditiamo dal contratto ERC20.sol.

- Riga 6: Chiamiamo il costruttore di ERC20.sol e passiamo per il nome e i parametri del simbolo come `"MyToken"` e `"MTKN"` rispettivamente.

- Riga 7: Coniamo e trasferiamo 1 milione di token per il conto che sta distribuendo il contratto intelligente (usiamo i 18 decimali predefiniti per il token ERC20, il che significa che se vogliamo coniare 1 token, lo rappresenterai come 1000000000000000000, 1 con 18 zeri).

Possiamo vedere di seguito l'implementazione del costruttore di ERC20.sol, dove il campo `_decimals` è impostato a 18:

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

## Compila il Token ERC20 {#compile-the-erc20-token}

Per compilare il nostro smart contract, dobbiamo prima verificare la nostra versione del compilatore in Solidity. Puoi verificarla eseguendo il comando:

```bash
truffle version
```

La versione predefinita è `Solidity v0.5.16`. Poiché il nostro token è scritto usando la versione `0.6.2` di Solidity, se eseguiamo il comando per compilare i nostri contratti otterremo un errore del compilatore. Per poter specificare quale versione del compilatore di Solidity usare, vai al file `truffle-config.js` e imposta sulla versione del compilatore desiderata, come mostrato di seguito:

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

Ora possiamo compilare il nostro smart contract eseguendo il seguente comando:

```bash
truffle compile
```

## Distribuisci il Token ERC20 {#deploy-erc20-token}

Dopo la compilazione, possiamo distribuire il nostro token.

Sulla cartella `migrations`, crea un file denominato `2_deploy_Tokens.js`. Questo file è dove distribuiremo sia il nostro Token ERC20 che il nostro contratto intelligente di FarmToken. Il codice seguente è usato per distribuire il nostro contratto MyToken.sol:

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Apri Ganache e seleziona l'opzione "Avvio Rapido" per avviare una blockchain locale di Ethereum. Per distribuire il nostro contratto, esegui:

```bash
truffle migrate
```

L'indirizzo usato per distribuire i nostri contratti è il primo dall'elenco di indirizzi che Ganache ci mostra. Per verificarlo, possiamo aprire l'applicazione desktop di Ganache e possiamo verificare che il saldo di ether per il primo conto sia stato ridotto a causa del costo di ether per distribuire i nostri contratti intelligenti:

![Applicazione desktop di Ganache](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Applicazione desktop di Ganache_

Per verificare che 1 milione di token MyToken sia stato inviato all'indirizzo del distributore, possiamo usare la Console di Truffle per interagire con il nostro smart contract distribuito.

> [La Console di Truffle è una console interattiva di base che si connette a qualsiasi client di Ethereum.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

Per poter interagire con il nostro smart contract, esegui il seguente comando:

```bash
truffle console
```

Ora possiamo scrivere i seguenti comandi nel terminale:

- Ottieni lo smart contract: `myToken = await MyToken.deployed()`

- Ottieni l'insieme di conti da Ganache: `accounts = await web3.eth.getAccounts()`

- Ottieni il saldo del primo conto: `balance = await myToken.balanceOf(accounts[0])`

- Formatta il saldo da 18 decimali: `web3.utils.fromWei(balance.toString())`

Eseguendo i suddetti comandi, vedremo che il primo indirizzo ha difatti 1 milione di MyToken:

![Il primo indirizzo ha 1000000 MyToken](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_Il primo indirizzo ha 1000000 MyToken_

## Crea lo smart contract del FarmToken {#create-farmtoken-smart-contract}

Lo smart contract FarmToken avrà 3 funzioni:

- `balance()`: Ottieni il saldo di MyToken sullo smart contract di FarmToken.

- `deposit(uint256 _amount)`: Trasferisci MyToken per conto dell'utente dello smart contract di FarmToken, quindi conia e trasferisci il FarmToken all'utente.

- `withdraw(uint256 _amount)`: Brucia i FarmToken dell'utente e trasferisci i MyToken all'indirizzo dell'utente.

Diamo un'occhiata al costruttore del FarmToken:

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

- Righe 3-6: Importiamo i seguenti contratti da OpenZeppelin: IERC20.sol, Address.sol, SafeERC20.sol ed ERC20.sol.

- Riga 8: Il FarmToken erediterà dal contratto ERC20.

- Righe 14-19: Il costruttore del FarmToken riceverà come parametro l'indirizzo del contratto MyToken e ne assegneremo il contratto alla nostra variabile pubblica, chiamata `token`.

Implementiamo la funzione `balance()`. Non riceverà alcun parametro e restituirà il saldo di MyToken su questo smart contract. È implementato come mostrato sotto:

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

Per la funzione `deposit(uint256 _amount)`, riceverà come parametro la quantità che l'utente desidera depositare e conierà e trasferirà i FarmToken all'utente:

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

Per la funzione `withdraw(uint256 _amount)`, riceveremo come parametro l'importo di FarmToken che l'utente vuole bruciare e poi trasferiremo lo stesso importo di MyToken all'utente:

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

Ora distribuiremo il nostro smart contract. Per farlo, torneremo al file `2_deploy_Tokens.js` e aggiungeremo il nuovo contratto da distribuire:

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

Nota che distribuendo il FarmToken, passiamo come parametro l'indirizzo del contratto MyToken distribuito.

Ora, esegui `truffle compile` e `truffle migrate` per distribuire i nostri contratti.

Testiamo il nostro smart contract. Anziché usare la `truffle console` per interagire con il nostro smart contract, creeremo uno script per automatizzare questo processo. Crea una cartella denominata `scripts` e aggiungi il seguente file `getMyTokenBalance.js`. Verificherà il saldo di MyToken sullo smart contract del FarmToken:

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

Per eseguire questo script, esegui il seguente comando CLI:

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

Otterremo il risultato previsto, pari a 0. Se ottieni un errore secondo cui FarmToken non è stato ancora distribuito, la rete di Truffle non ha ricevuto l'ultima versione del codice del contratto. Basta chiudere Ganache, riavviarlo rapidamente e assicurarsi di eseguire `truffle migrate`.

Ora, mettiamo in gioco il MyToken sullo smart contract Poiché la funzione `deposit(uint256_amount)` chiama la funzione `safeTransferFrom` dall'ERC20, l'utente deve prima approvare lo smart contract per trasferire i MyToken per conto dell'utente. Quindi sullo script seguente, approveremo prima questa fase, poi chiameremo la funzione:

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

Per eseguire questo script: `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Dovresti vedere sulla tua console:

![output di transferMyTokenToFarmToken.js](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_output di transferMyTokenToFarmToken.js_

Come possiamo vedere, abbiamo depositato correttamente i MyToken al contratto intelligente, poiché il primo conto ha ora dei FarmToken.

Per poter prelevare:

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

Per eseguire questo script: `truffle exec .\scripts\withdrawMyTokenFromTokenFarm.js`. Come possiamo vedere sull'output seguente, abbiamo correttamente riottenuto i MyToken e abbiamo bruciato i FarmToken:

![output di withdrawMyTokenFromTokenFarm.js](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_output di withdrawMyTokenFromTokenFarm.js_

## Riferimenti {#references}

[Contratti - Documentazione di OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/)

[Sweet Tool per smart contract | Suite di Truffle](https://www.trufflesuite.com/)

[Ganache | Suite di Truffle](https://www.trufflesuite.com/ganache)

[Cos'è la DeFi? Una Guida per Principianti (Aggiornata al 2021) (99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[DeFi - La Classifica di Finanza Decentralizzata, su DeFi Llama](https://defillama.com/)
