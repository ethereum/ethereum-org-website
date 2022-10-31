---
title: Cum să configurați Tellor ca oracol personal
description: Un ghid pentru a începe integrarea oracolului Tellor în protocolul dvs.
author: "Tellor"
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "fluxuri de prețuri"
  - "oracole"
skill: beginner
published: 2021-06-29
source: Documentație Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Pop Quiz: Your protocol is just about finished, but it needs an oracle to get access to off chain data...What do you do?

## (Soft) Condiții prealabile {#soft-prerequisites}

Această postare își propune să faciliteze și să simplifice pe cât posibil accesarea unui flux de oracol. Acestea fiind spuse, vom presupune următoarele despre nivelul dvs. de cunoștințe de programare pentru a ne putea axa pe partea de oracol.

Ipoteze:

- știți să navigați într-un terminal
- aveți npm instalat
- știți cum să folosiți npm pentru a gestiona dependențele

Tellor este un Oracol live și open-source gata de implementare. Acest ghid pentru începători are rolul de a prezenta cât este de ușor să puneți în funcțiune Tellor, oferind astfel proiectului dvs. un oracol complet descentralizat și rezistent la cenzură.

## Prezentare generală {#overview}

Tellor is an oracle system where parties can request the value of an off-chain data point (e.g. BTC/USD) and reporters compete to add this value to an on-chain data-bank, accessible by all Ethereum smart contracts. The inputs to this data-bank are secured by a network of staked reporters. Tellor utilizes crypto-economic incentive mechanisms, rewarding honest data submissions by reporters and punishing bad actors through the issuance of Tellor’s token, Tributes (TRB) and a dispute mechanism.

În acest tutorial vom trece în revistă:

- Configurarea unui set inițial de instrumente necesare pentru punerea în funcțiune.
- Consultarea unui exemplu simplu.
- Consultarea unei liste de adrese testnet ale rețelelor pe care puteți actualmente testa Tellor.

## FolosireaTellor {#usingtellor}

Primul lucru pe care îl aveți de făcut este să instalați instrumentele de bază necesare pentru a utiliza Tellor ca oracol. Use [this package](https://github.com/tellor-io/usingtellor) to install the Tellor User Contracts:

`npm install usingtellor`

Odată instalat, acesta va permite contractelor dvs. să moștenească funcții din contractul „UsingTellor”.

Super! Now that you've got the tools ready, let's go through a simple exercise where we retrieve the bitcoin price:

### Exemplu BTC/USD {#btcusd-example}

Moșteniți contractul „UsingTellor”, trecând adresa Tellor ca argument pentru constructor:

Iată un exemplu:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract BtcPriceContract is UsingTellor {

  //This Contract now has access to all functions in UsingTellor

  bytes btcPrice;
  bytes32 btcQueryId = 0x0000000000000000000000000000000000000000000000000000000000000002;

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {
    bool _didGet;
    uint256 _timestamp;

    (_didGet, btcPrice, _timestamp) = getCurrentValue(btcQueryId);
  }
}
```

**Want to try a different data feed? Check out the list of supported data feeds here: [Current Data Feeds](https://docs.tellor.io/tellor/integration/data-feed-ids)**

## Addresses: {#addresses}

Mainnet: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0#code)

#### Looking to do some testing first? See the list below for our active testnet addresses: {#looking-to-do-some-testing-first-see-the-list-below-for-our-active-testnet-addresses}

Rinkeby: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://rinkeby.etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0#code)

Kovan: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://kovan.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Ropsten: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://ropsten.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Goerli: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://goerli.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

BSC Testnet: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://testnet.bscscan.com/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Polygon Mumbai Testnet: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://mumbai.polygonscan.com/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7/contracts#code)

Arbitrum Testnet: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://rinkeby-explorer.arbitrum.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7)

#### Pentru o implementare mai robustă a oracolului Tellor, consultați lista completă de funcții disponibile [aici.](https://github.com/tellor-io/usingtellor/blob/master/README.md) {#for-a-more-robust-implementation-of-the-tellor-oracle-check-out-the-full-list-of-available-functions-here}
