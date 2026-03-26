---
title: Mkataba Mahiri wa Hello World kwa Wanaoanza - Fullstack
description: Mafunzo ya utangulizi kuhusu kuandika na kusambaza mkataba mahiri rahisi kwenye Ethereum.
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "mikataba mahiri",
    "kusambaza",
    "kichunguzi kizuizi",
    "frontend",
    "miamala",
    "mfumo",
  ]
skill: beginner
lang: sw
published: 2021-10-25
---

Mwongozo huu ni kwa ajili yako ikiwa wewe ni mgeni katika uundaji wa kiambajengo na hujui wapi pa kuanzia au jinsi ya kusambaza na kuingiliana na mikataba mahiri. Tutapitia hatua za kuunda na kusambaza mkataba mahiri rahisi kwenye mtandao wa testnet wa Goerli kwa kutumia [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), na [Alchemy](https://alchemy.com/eth).

Utahitaji akaunti ya Alchemy ili kukamilisha mafunzo haya. [Jisajili kwa akaunti ya bure](https://www.alchemy.com/).

Ikiwa una maswali wakati wowote, jisikie huru kuuliza katika [Alchemy Discord](https://discord.gg/gWuC7zB)!

## Sehemu ya 1 - Unda na Usambaze Mkataba Mahiri wako ukitumia Hardhat {#part-1}

### Unganisha kwenye mtandao wa Ethereum {#connect-to-the-ethereum-network}

Kuna njia nyingi za kufanya maombi kwenye mnyororo wa Ethereum. Kwa urahisi, tutatumia akaunti ya bure kwenye Alchemy, jukwaa la msanidi wa kiambajengo na API inayoturuhusu kuwasiliana na mnyororo wa Ethereum bila kujiendeshea Nodi sisi wenyewe. Alchemy pia ina zana za wasanidi kwa ajili ya ufuatiliaji na uchanganuzi; tutatumia fursa hizi katika mafunzo haya ili kuelewa kinachoendelea nyuma ya pazia katika usambazaji wetu wa mkataba mahiri.

### Unda programu yako na ufunguo wa API {#create-your-app-and-api-key}

Mara tu unapounda akaunti ya Alchemy, unaweza kuzalisha ufunguo wa API kwa kuunda programu. Hii itakuruhusu kufanya maombi kwenye testnet ya Goerli. Ikiwa hufahamu kuhusu testnets unaweza [kusoma mwongozo wa Alchemy wa kuchagua mtandao](https://www.alchemy.com/docs/choosing-a-web3-network).

Kwenye dashibodi ya Alchemy, tafuta menyu kunjuzi ya **Apps** katika upau wa kusogeza na ubofye **Create App**.

![Unda programu ya Hello world](./hello-world-create-app.png)

Ipe programu yako jina la '_Hello World_' na uandike maelezo mafupi. Chagua **Staging** kama mazingira yako na **Goerli** kama mtandao wako.

![mwonekano wa kuunda programu hello world](./create-app-view-hello-world.png)

_Kumbuka: hakikisha umechagua **Goerli**, la sivyo mafunzo haya hayatafanya kazi._

Bofya **Create app**. Programu yako itaonekana kwenye jedwali hapa chini.

### Unda akaunti ya Ethereum {#create-an-ethereum-account}

Unahitaji akaunti ya Ethereum ili kutuma na kupokea miamala. Tutatumia MetaMask, mkoba wa mtandaoni kwenye kivinjari unaoruhusu watumiaji kudhibiti anwani ya akaunti yao ya Ethereum.

Unaweza kupakua na kuunda akaunti ya MetaMask bila malipo [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha umebadilisha kwenda kwenye "Goerli Test Network" upande wa juu kulia (ili tusiwe tunashughulika na pesa halisi).

### Hatua ya 4: Ongeza ether kutoka kwenye Bomba la majaribio {#step-4-add-ether-from-a-faucet}

Ili kusambaza mkataba mahiri wako kwenye mtandao wa majaribio, utahitaji ETH bandia. Ili kupata ETH kwenye mtandao wa Goerli, nenda kwenye bomba la majaribio la Goerli na uweke anwani ya akaunti yako ya Goerli. Kumbuka kwamba mabomba ya majaribio ya Goerli yanaweza kuwa yasiyotegemewa hivi karibuni - tazama [ukurasa wa mitandao ya majaribio](/developers/docs/networks/#goerli) kwa orodha ya chaguo za kujaribu:

_Kumbuka: kutokana na msongamano wa mtandao, hii inaweza kuchukua muda._
``

### Hatua ya 5: Angalia Salio lako {#step-5-check-your-balance}

Ili kuhakikisha kuwa ETH ipo kwenye mkoba wako, hebu tufanye ombi la [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) tukitumia [zana ya kutunga ya Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Hii itarejesha kiasi cha ETH kwenye mkoba wetu. Ili kujifunza zaidi angalia [mafunzo mafupi ya Alchemy kuhusu jinsi ya kutumia zana ya kutunga](https://youtu.be/r6sjRxBZJuU).

Weka anwani ya akaunti yako ya MetaMask na ubofye **Send Request**. Utaona jibu linalofanana na kijisehemu cha msimbo hapa chini.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Kumbuka: Matokeo haya yapo katika wei, si ETH. Wei inatumika kama kiasi kidogo zaidi cha ether._

Phew! Pesa zetu bandia zote zipo hapo.

### Hatua ya 6: Anzisha mradi wetu {#step-6-initialize-our-project}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uweke yafuatayo.

```
mkdir hello-world
cd hello-world
```

Sasa kwa kuwa tuko ndani ya folda yetu ya mradi, tutatumia `npm init` kuanzisha mradi.

> Ikiwa bado hujasakinisha npm, fuata [maagizo haya ili kusakinisha Node.js na npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Kwa madhumuni ya mafunzo haya, haijalishi jinsi unavyojibu maswali ya kuanzisha. Hivi ndivyo tulivyofanya kwa marejeleo:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Idhinisha package.json na tuko tayari kuendelea!

### Hatua ya 7: Pakua Hardhat {#step-7-download-hardhat}

Hardhat ni mazingira ya usanidi ya kukusanya, kusambaza, kujaribu, na kurekebisha programu yako ya Ethereum. Inasaidia wasanidi wanapounda mikataba mahiri na mfumo mtawanyo wa kimamlaka (dapps) ndani ya kompyuta zao kabla ya kusambaza kwenye mnyororo wa moja kwa moja.

Ndani ya mradi wetu wa `hello-world` endesha:

```
npm install --save-dev hardhat
```

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/getting-started/#overview).

### Hatua ya 8: Unda mradi wa Hardhat {#step-8-create-hardhat-project}

Ndani ya folda yetu ya mradi wa `hello-world`, endesha:

```
npx hardhat
```

Kisha unapaswa kuona ujumbe wa kukaribisha na chaguo la kuchagua unachotaka kufanya. Chagua "create an empty hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Hii itazalisha faili la `hardhat.config.js` kwenye mradi. Tutatumia hii baadaye katika mafunzo ili kubainisha usanidi wa mradi wetu.

### Hatua ya 9: Ongeza folda za mradi {#step-9-add-project-folders}

Ili kuweka mradi ukiwa umepangiliwa, hebu tuunde folda mbili mpya. Kwenye mstari wa amri, nenda kwenye saraka kuu ya mradi wako wa `hello-world` na uandike:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ndipo tutakapoweka faili letu la msimbo wa mkataba mahiri wa hello world
- `scripts/` ndipo tutakapoweka hati za kusambaza na kuingiliana na mkataba wetu

### Hatua ya 10: Andika mkataba wetu {#step-10-write-our-contract}

Unaweza kuwa unajiuliza, ni lini tutaandika msimbo? Ni wakati sasa!

Fungua mradi wa hello-world kwenye kihariri chako unachokipenda. Mikataba mahiri mara nyingi huandikwa kwa Solidity, ambayo tutaitumia kuandika mkataba mahiri wetu.‌

1. Nenda kwenye folda ya `contracts` na uunde faili jipya linaloitwa `HelloWorld.sol`
2. Hapa chini kuna sampuli ya mkataba mahiri wa Hello World ambao tutautumia kwa mafunzo haya. Nakili yaliyomo hapa chini kwenye faili la `HelloWorld.sol`.

_Kumbuka: Hakikisha unasoma maoni ili kuelewa kile mkataba huu unafanya._

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Huu ni mkataba mahiri wa msingi unaohifadhi ujumbe unapoundwa. Unaweza kusasishwa kwa kuita kipengele cha `update`.

### Hatua ya 11: Unganisha MetaMask na Alchemy kwenye mradi wako {#step-11-connect-metamask-alchemy-to-your-project}

Tumeunda mkoba wa MetaMask, akaunti ya Alchemy, na kuandika mkataba mahiri wetu, sasa ni wakati wa kuunganisha vyote vitatu.

Kila muamala unaotumwa kutoka kwenye mkoba wako unahitaji saini kwa kutumia ufunguo binafsi wako wa kipekee. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi ufunguo binafsi wetu kwa usalama kwenye faili la mazingira. Pia tutahifadhi ufunguo wa API wa Alchemy hapa.

> Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo haya](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) kuhusu kutuma miamala kwa kutumia web3.

Kwanza, sakinisha kifurushi cha dotenv kwenye saraka yako ya mradi:

```
npm install dotenv --save
```

Kisha, unda faili la `.env` kwenye saraka kuu ya mradi. Ongeza ufunguo binafsi wako wa MetaMask na URL ya HTTP ya API ya Alchemy ndani yake.

Faili lako la mazingira lazima liitwe `.env` la sivyo halitatambuliwa kama faili la mazingira.

Usiliite `process.env` au `.env-custom` au jina lingine lolote.

- Fuata [maagizo haya](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) ili kuhamisha ufunguo binafsi wako
- Tazama hapa chini ili kupata URL ya HTTP ya API ya Alchemy

![Mwongozo wa uhuishaji wa kupata ufunguo wa API wa Alchemy](./get-alchemy-api-key.gif)

Faili lako la `.env` linapaswa kuonekana hivi:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Ili kuunganisha haya kwenye msimbo wetu, tutarejelea vigezo hivi kwenye faili letu la `hardhat.config.js` katika hatua ya 13.

### Hatua ya 12: Sakinisha Ethers.js {#step-12-install-ethersjs}

Ethers.js ni maktaba inayorahisisha kuingiliana na kufanya maombi kwenye Ethereum kwa kufunga [njia za kawaida za JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) na njia zinazofaa zaidi kwa mtumiaji.

Hardhat inaturuhusu kujumuisha [programu-jalizi](https://hardhat.org/plugins/) kwa zana za ziada na utendaji uliopanuliwa. Tutatumia fursa ya [programu-jalizi ya Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) kwa usambazaji wa mkataba.

Kwenye saraka yako ya mradi andika:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Hatua ya 13: Sasisha hardhat.config.js {#step-13-update-hardhat-configjs}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha `hardhat.config.js` ili mradi wetu uzitambue zote.

Sasisha `hardhat.config.js` yako ili ionekane hivi:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Hatua ya 14: Kusanya mkataba wetu {#step-14-compile-our-contract}

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tukusanye mkataba wetu. Kazi ya `compile` ni mojawapo ya kazi zilizojengewa ndani za hardhat.

Kutoka kwenye mstari wa amri endesha:

```bash
npx hardhat compile
```

Unaweza kupata onyo kuhusu `SPDX license identifier not provided in source file`, lakini hakuna haja ya kuwa na wasiwasi kuhusu hilo — tunatumai kila kitu kingine kinaonekana vizuri! Ikiwa sivyo, unaweza kutuma ujumbe kwenye [discord ya Alchemy](https://discord.gg/u72VCg3) wakati wowote.

### Hatua ya 15: Andika hati yetu ya kusambaza {#step-15-write-our-deploy-script}

Sasa kwa kuwa mkataba wetu umeandikwa na faili letu la usanidi liko tayari, ni wakati wa kuandika hati yetu ya kusambaza mkataba.

Nenda kwenye folda ya `scripts/` na uunde faili jipya linaloitwa `deploy.js` , ukiongeza yaliyomo yafuatayo ndani yake:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Anza usambazaji, ukirudisha ahadi inayotatuliwa kuwa kitu cha mkataba
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat inafanya kazi nzuri sana ya kueleza kile kila mstari wa msimbo huu unafanya katika [mafunzo yao ya Mikataba](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), tumetumia maelezo yao hapa.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` katika ethers.js ni dhana inayotumika kusambaza mikataba mahiri mipya, kwa hivyo `HelloWorld` hapa ni [kiwanda](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) cha matukio ya mkataba wetu wa hello world. Unapotumia programu-jalizi ya `hardhat-ethers` `ContractFactory` na `Contract`, matukio huunganishwa kwa mtia saini wa kwanza (mmiliki) kwa chaguo-msingi.

```javascript
const hello_world = await HelloWorld.deploy()
```

Kuita `deploy()` kwenye `ContractFactory` kutaanzisha usambazaji, na kurejesha `Promise` inayotatuliwa kuwa kipengee cha `Contract`. Hiki ndicho kipengee kilicho na mbinu kwa kila moja ya kazi zetu za mkataba mahiri.

### Hatua ya 16: Sambaza mkataba wetu {#step-16-deploy-our-contract}

Hatimaye tuko tayari kusambaza mkataba mahiri wetu! Nenda kwenye mstari wa amri na uendeshe:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Kisha unapaswa kuona kitu kama:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Tafadhali hifadhi anwani hii**. Tutaitumia baadaye katika mafunzo.

Tukienda kwenye [Goerli etherscan](https://goerli.etherscan.io) na kutafuta anwani ya mkataba wetu tunapaswa kuweza kuona kwamba umesambazwa kwa ufanisi. Muamala utaonekana kama hivi:

![](./etherscan-contract.png)

Anwani ya `From` inapaswa kulingana na anwani ya akaunti yako ya MetaMask na anwani ya `To` itasema **Contract Creation**. Tukibofya kwenye muamala tutaona anwani ya mkataba wetu kwenye sehemu ya `To`.

![](./etherscan-transaction.png)

Hongera! Umetoka tu kusambaza mkataba mahiri kwenye testnet ya Ethereum.

Ili kuelewa kinachoendelea nyuma ya pazia, hebu twende kwenye kichupo cha Kichunguzi katika [dashibodi yetu ya Alchemy](https://dashboard.alchemy.com/explorer). Ikiwa una programu nyingi za Alchemy hakikisha unachuja kwa programu na uchague **Hello World**.

![](./hello-world-explorer.png)

Hapa utaona njia chache za JSON-RPC ambazo Hardhat/Ethers ilitutengenezea nyuma ya pazia tulipoiita kazi ya `.deploy()`. Njia mbili muhimu hapa ni [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), ambalo ni ombi la kuandika mkataba wetu kwenye mnyororo wa Goerli, na [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kwa kutumia hashi. Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo yetu kuhusu kutuma miamala kwa kutumia Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Sehemu ya 2: Kuingiliana na Mkataba Mahiri wako {#part-2-interact-with-your-smart-contract}

Kwa kuwa sasa tumefanikiwa kusambaza mkataba mahiri kwenye mtandao wa Goerli hebu tujifunze jinsi ya kuingiliana nao.

### Unda faili la interact.js {#create-a-interactjs-file}

Hili ndilo faili ambapo tutaandika hati yetu ya mwingiliano. Tutakuwa tukitumia maktaba ya Ethers.js uliyosakinisha hapo awali katika Sehemu ya 1.

Ndani ya folda ya `scripts/`, unda faili jipya linaloitwa `interact.js` ongeza msimbo ufuatao:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Sasisha faili lako la .env {#update-your-env-file}

Tutakuwa tukitumia vigezo vipya vya mazingira, kwa hivyo tunahitaji kuvifafanua katika faili la `.env` ambalo [tuliunda mapema](#step-11-connect-metamask-&-alchemy-to-your-project).

Tutahitaji kuongeza ufafanuzi kwa `API_KEY` yetu ya Alchemy na `CONTRACT_ADDRESS` ambapo mkataba mahiri wako ulisambazwa.

Faili lako la `.env` linapaswa kuonekana kama hivi:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Chukua ABI ya mkataba wako {#grab-your-contract-ABI}

[ABI (Application Binary Interface)](/glossary/#abi) ya mkataba wetu ni kiolesura cha kuingiliana na mkataba mahiri wetu. Hardhat inazalisha ABI kiotomatiki na kuihifadhi katika `HelloWorld.json`. Ili kutumia ABI, tutahitaji kuchanganua yaliyomo kwa kuongeza mistari ifuatayo ya msimbo kwenye faili letu la `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Ikiwa unataka kuona ABI unaweza kuichapisha kwenye kiweko chako:

```javascript
console.log(JSON.stringify(contract.abi))
```

Ili kuona ABI yako ikichapishwa kwenye kiweko, nenda kwenye kituo chako na uendeshe:

```bash
npx hardhat run scripts/interact.js
```

### Unda mfano wa mkataba wako {#create-an-instance-of-your-contract}

Ili kuingiliana na mkataba wetu, tunahitaji kuunda mfano wa mkataba katika msimbo wetu. Ili kufanya hivyo na Ethers.js, tutahitaji kufanya kazi na dhana tatu:

1. Mtoa huduma - mtoa huduma wa Nodi anayekupa ufikiaji wa kusoma na kuandika kwenye kiambajengo
2. Mtia saini - inawakilisha akaunti ya Ethereum inayoweza kutia saini miamala
3. Mkataba - kipengee cha Ethers.js kinachowakilisha mkataba maalum uliosambazwa ndani ya mnyororo

Tutatumia ABI ya mkataba kutoka hatua iliyopita ili kuunda mfano wetu wa mkataba:

```javascript
// interact.js

// Mtoa huduma
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Mtia saini
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Mkataba
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Jifunze zaidi kuhusu Watoa huduma, Watia saini, na Mikataba katika [nyaraka za ethers.js](https://docs.ethers.io/v5/).

### Soma ujumbe wa kuanzisha {#read-the-init-message}

Unakumbuka tuliposambaza mkataba wetu na `initMessage = "Hello world!"`? Sasa tutasoma ujumbe huo uliohifadhiwa katika mkataba mahiri wetu na kuuchapisha kwenye kiweko.

Katika JavaScript, vitendaji visivyolingana (asynchronous functions) hutumika wakati wa kuingiliana na mitandao. Ili kujifunza zaidi kuhusu vitendaji visivyolingana, [soma makala haya ya medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Tumia msimbo ulio hapa chini kuita kitendaji cha `message` katika mkataba mahiri wetu na usome ujumbe wa kuanzisha:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Baada ya kuendesha faili kwa kutumia `npx hardhat run scripts/interact.js` kwenye kituo tunapaswa kuona jibu hili:

```
The message is: Hello world!
```

Hongera! Umefanikiwa kusoma data ya mkataba mahiri kutoka kwenye kiambajengo cha Ethereum, kazi nzuri!

### Sasisha ujumbe {#update-the-message}

Badala ya kusoma tu ujumbe, tunaweza pia kusasisha ujumbe uliohifadhiwa katika mkataba mahiri wetu kwa kutumia kitendaji cha `update`! Inapendeza sana, sivyo?

Ili kusasisha ujumbe, tunaweza kuita moja kwa moja kitendaji cha `update` kwenye kipengee chetu cha Mkataba kilichoundwa:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Kumbuka kwamba kwenye mstari wa 11, tunaita `.wait()` kwenye kipengee cha muamala kilichorejeshwa. Hii inahakikisha kwamba hati yetu inasubiri muamala kuchimbwa kwenye kiambajengo kabla ya kutoka kwenye kitendaji. Ikiwa wito wa `.wait()` haujajumuishwa, hati inaweza isione thamani iliyosasishwa ya `message` katika mkataba.

### Soma ujumbe mpya {#read-the-new-message}

Unapaswa kuweza kurudia [hatua iliyopita](#read-the-init-message) ili kusoma thamani iliyosasishwa ya `message`. Chukua muda na uone ikiwa unaweza kufanya mabadiliko yanayohitajika ili kuchapisha thamani hiyo mpya!

Ikiwa unahitaji dokezo, hivi ndivyo faili lako la `interact.js` linapaswa kuonekana kwa wakati huu:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// mtoa huduma - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// mtia saini - wewe
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// mfano wa mkataba
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Sasa endesha tu hati na unapaswa kuweza kuona ujumbe wa zamani, hali ya kusasisha, na ujumbe mpya uliochapishwa kwenye kituo chako!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Wakati unaendesha hati hiyo, unaweza kugundua kuwa hatua ya `Updating the message...` inachukua muda kupakia kabla ya ujumbe mpya kupakia. Hiyo inatokana na mchakato wa uchimbaji; ikiwa una hamu ya kufuatilia miamala wakati inachimbwa, tembelea [mempool ya Alchemy](https://dashboard.alchemyapi.io/mempool) ili kuona hali ya muamala. Ikiwa muamala utaachwa, inasaidia pia kuangalia [Goerli Etherscan](https://goerli.etherscan.io) na kutafuta hashi ya muamala wako.

## Sehemu ya 3: Chapisha Mkataba Mahiri wako kwenye Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Umefanya kazi ngumu yote ya kuleta mkataba mahiri wako kwenye uhalisia; sasa ni wakati wa kuushiriki na ulimwengu!

Kwa kuthibitisha mkataba mahiri wako kwenye Etherscan, mtu yeyote anaweza kutazama msimbo wako wa chanzo na kuingiliana na mkataba mahiri wako. Hebu tuanze!

### Hatua ya 1: Tengeneza Ufunguo wa API kwenye akaunti yako ya Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Ufunguo wa API wa Etherscan ni muhimu ili kuthibitisha kuwa unamiliki mkataba mahiri unaojaribu kuuchapisha.

Ikiwa bado huna akaunti ya Etherscan, [jisajili kwa ajili ya akaunti](https://etherscan.io/register).

Baada ya kuingia, tafuta jina lako la mtumiaji kwenye upau wa kusogeza, weka mshale juu yake na uchague kitufe cha **My profile**.

Kwenye ukurasa wako wa wasifu, unapaswa kuona upau wa kusogeza wa pembeni. Kutoka kwenye upau wa kusogeza wa pembeni, chagua **API Keys**. Kisha, bonyeza kitufe cha "Add" ili kuunda ufunguo mpya wa API, ipatie programu yako jina la **hello-world** na ubonyeze kitufe cha **Create New API Key**.

Ufunguo wako mpya wa API unapaswa kuonekana kwenye jedwali la ufunguo wa API. Nakili ufunguo wa API kwenye ubao wako wa kunakili (clipboard).

Kisha, tunahitaji kuongeza ufunguo wa API wa Etherscan kwenye faili yetu ya `.env`.

Baada ya kuuongeza, faili yako ya `.env` inapaswa kuonekana hivi:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Mikataba mahiri iliyosambazwa na Hardhat {#hardhat-deployed-smart-contracts}

#### Sakinisha hardhat-etherscan {#install-hardhat-etherscan}

Kuchapisha mkataba wako kwenye Etherscan kwa kutumia Hardhat ni rahisi. Kwanza utahitaji kusakinisha programu-jalizi ya `hardhat-etherscan` ili kuanza. `hardhat-etherscan` itathibitisha kiotomatiki msimbo wa chanzo wa mkataba mahiri na ABI kwenye Etherscan. Ili kuongeza hii, katika saraka ya `hello-world` endesha:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Baada ya kusakinishwa, jumuisha taarifa ifuatayo juu ya `hardhat.config.js` yako, na uongeze chaguo za usanidi za Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Ufunguo wako wa API kwa Etherscan
    // Pata moja kwenye https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Thibitisha mkataba mahiri wako kwenye Etherscan {#verify-your-smart-contract-on-etherscan}

Hakikisha faili zote zimehifadhiwa na vigezo vyote vya `.env` vimesanidiwa kwa usahihi.

Endesha jukumu la `verify`, ukipitisha anwani ya mkataba, na mtandao ambapo imesambazwa:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Hakikisha kwamba `DEPLOYED_CONTRACT_ADDRESS` ni anwani ya mkataba mahiri wako uliosambazwa kwenye mtandao wa testnet wa Goerli. Pia, hoja ya mwisho (`'Hello World!'`) lazima iwe thamani sawa ya mfuatano iliyotumika [wakati wa hatua ya kusambaza katika sehemu ya 1](#write-our-deploy-script).

Ikiwa yote yataenda vizuri, utaona ujumbe ufuatao kwenye terminal yako:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https: // goerli.etherscan.io/address/<contract-address>#contracts
```

Hongera! Msimbo wako wa mkataba mahiri upo kwenye Etherscan!

### Angalia mkataba mahiri wako kwenye Etherscan! {#check-out-your-smart-contract-on-etherscan}

Unapoenda kwenye kiungo kilichotolewa kwenye terminal yako, unapaswa kuweza kuona msimbo wako wa mkataba mahiri na ABI iliyochapishwa kwenye Etherscan!

**Wahooo - umefanya vizuri bingwa! Sasa mtu yeyote anaweza kuita au kuandika kwenye mkataba mahiri wako! Hatuwezi kusubiri kuona utajenga nini baadaye!**

## Sehemu ya 4 - Kuunganisha mkataba mahiri wako na frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Kufikia mwisho wa mafunzo haya, utajua jinsi ya:

- Kuunganisha mkoba wa MetaMask kwenye dapp yako
- Kusoma data kutoka kwenye mkataba mahiri wako ukitumia API ya [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Kusaini miamala ya Ethereum ukitumia MetaMask

Kwa dapp hii, tutatumia [React](https://react.dev/) kama mfumo wetu wa frontend; hata hivyo, ni muhimu kutambua kwamba hatutatumia muda mwingi kuchambua misingi yake, kwani tutazingatia zaidi kuleta utendaji wa Web3 kwenye mradi wetu.

Kama sharti, unapaswa kuwa na uelewa wa kiwango cha kuanza wa React. Ikiwa sivyo, tunapendekeza ukamilishe [Mafunzo ya Utangulizi wa React](https://react.dev/learn) rasmi.

### Nakili faili za kuanzia {#clone-the-starter-files}

Kwanza, nenda kwenye [hifadhi ya GitHub ya hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) ili kupata faili za kuanzia za mradi huu na unakili hifadhi hii kwenye mashine yako ya ndani.

Fungua hifadhi iliyonakiliwa ndani ya kompyuta yako. Kumbuka kwamba ina folda mbili: `starter-files` na `completed`.

- `starter-files`- **tutakuwa tukifanya kazi katika saraka hii**, tutaunganisha UI kwenye mkoba wako wa Ethereum na mkataba mahiri tuliouchapisha kwenye Etherscan katika [Sehemu ya 3](#part-3).
- `completed` ina mafunzo yote yaliyokamilika na inapaswa kutumika tu kama rejeleo ikiwa utakwama.

Ifuatayo, fungua nakala yako ya `starter-files` kwenye kihariri chako cha msimbo unachokipenda, na kisha nenda kwenye folda ya `src`.

Msimbo wote tutakaoandika utakuwa chini ya folda ya `src`. Tutakuwa tukihariri kipengele cha `HelloWorld.js` na faili za JavaScript za `util/interact.js` ili kuupa mradi wetu utendaji wa Web3.

### Angalia faili za kuanzia {#check-out-the-starter-files}

Kabla hatujaanza kuandika msimbo, hebu tuchunguze kile tulichopewa kwenye faili za kuanzia.

#### Fanya mradi wako wa react ufanye kazi {#get-your-react-project-running}

Hebu tuanze kwa kuendesha mradi wa React kwenye kivinjari chetu. Uzuri wa React ni kwamba mara tu tunapokuwa na mradi wetu unaoendeshwa kwenye kivinjari chetu, mabadiliko yoyote tunayohifadhi yatasasishwa moja kwa moja kwenye kivinjari chetu.

Ili kufanya mradi ufanye kazi, nenda kwenye saraka kuu ya folda ya `starter-files`, na uendeshe `npm install` kwenye terminal yako ili kusakinisha vitegemezi vya mradi:

```bash
cd starter-files
npm install
```

Mara tu hizo zitakapomaliza kusakinishwa, endesha `npm start` kwenye terminal yako:

```bash
npm start
```

Kufanya hivyo kunapaswa kufungua [http://localhost:3000/](http://localhost:3000/) kwenye kivinjari chako, ambapo utaona frontend ya mradi wetu. Inapaswa kuwa na uwanja mmoja \(mahali pa kusasisha ujumbe uliohifadhiwa kwenye mkataba mahiri wako\), kitufe cha "Connect Wallet", na kitufe cha "Update".

Ikiwa utajaribu kubofya kitufe chochote, utagundua kuwa havifanyi kazi—hiyo ni kwa sababu bado tunahitaji kupanga utendaji wao.

#### Kipengele cha `HelloWorld.js` {#the-helloworld-js-component}

Hebu turudi kwenye folda ya `src` kwenye kihariri chetu na tufungue faili ya `HelloWorld.js`. Ni muhimu sana tuelewe kila kitu katika faili hili, kwani ndicho kipengele kikuu cha React tutakachokuwa tukifanyia kazi.

Juu ya faili hili, utagundua tuna taarifa kadhaa za kuingiza ambazo ni muhimu ili kufanya mradi wetu ufanye kazi, ikiwa ni pamoja na maktaba ya React, ndoano za useEffect na useState, baadhi ya vipengee kutoka `./util/interact.js` (tutavielezea kwa undani zaidi hivi karibuni!), na nembo ya Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Ifuatayo, tuna vigezo vyetu vya hali ambavyo tutavisasisha baada ya matukio maalum.

```javascript
// HelloWorld.js

// Vigezo vya hali
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Hapa kuna kile kila kigezo kinawakilisha:

- `walletAddress` - mfuatano unaohifadhi anwani ya mkoba wa mtumiaji
- `status`- mfuatano unaohifadhi ujumbe wa msaada unaomwongoza mtumiaji jinsi ya kuingiliana na dapp
- `message` - mfuatano unaohifadhi ujumbe wa sasa katika mkataba mahiri
- `newMessage` - mfuatano unaohifadhi ujumbe mpya utakaondikwa kwenye mkataba mahiri

Baada ya vigezo vya hali, utaona vitendaji vitano ambavyo havijatekelezwa: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, na `onUpdatePressed`. Tutafafanua kile wanachofanya hapa chini:

```javascript
// HelloWorld.js

// huitwa mara moja tu
useEffect(async () => {
  // TODO: tekeleza
}, [])

function addSmartContractListener() {
  // TODO: tekeleza
}

function addWalletListener() {
  // TODO: tekeleza
}

const connectWalletPressed = async () => {
  // TODO: tekeleza
}

const onUpdatePressed = async () => {
  // TODO: tekeleza
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- hii ni ndoano ya React inayoitwa baada ya kipengele chako kutolewa. Kwa sababu ina propu ya safu tupu `[]` iliyopitishwa ndani yake \(tazama mstari wa 4\), itaitwa tu kwenye utoaji wa _kwanza_ wa kipengele. Hapa tutapakia ujumbe wa sasa uliohifadhiwa kwenye mkataba mahiri wetu, tutaita wasikilizaji wetu wa mkataba mahiri na mkoba, na kusasisha UI yetu ili kuonyesha ikiwa mkoba tayari umeunganishwa.
- `addSmartContractListener`- kitendaji hiki kinaweka msikilizaji ambaye atatazama tukio la `UpdatedMessages` la mkataba wetu wa HelloWorld na kusasisha UI yetu wakati ujumbe unabadilishwa kwenye mkataba mahiri wetu.
- `addWalletListener`- kitendaji hiki kinaweka msikilizaji anayegundua mabadiliko katika hali ya mkoba wa MetaMask wa mtumiaji, kama vile wakati mtumiaji anapokata muunganisho wa mkoba wao au kubadilisha anwani.
- `connectWalletPressed`- kitendaji hiki kitaitwa ili kuunganisha mkoba wa MetaMask wa mtumiaji kwenye dapp yetu.
- `onUpdatePressed` - kitendaji hiki kitaitwa wakati mtumiaji anataka kusasisha ujumbe uliohifadhiwa kwenye mkataba mahiri.

Karibu na mwisho wa faili hili, tuna UI ya kipengele chetu.

```javascript
// HelloWorld.js

// kiolesura cha mtumiaji cha kijenzi chetu
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Ikiwa utachunguza msimbo huu kwa uangalifu, utagundua mahali tunapotumia vigezo vyetu mbalimbali vya hali katika UI yetu:

- Kwenye mistari ya 6-12, ikiwa mkoba wa mtumiaji umeunganishwa \(yaani, `walletAddress.length > 0`\), tunaonyesha toleo lililofupishwa la `walletAddress` ya mtumiaji kwenye kitufe chenye kitambulisho "walletButton;" vinginevyo inasema tu "Connect Wallet."
- Kwenye mstari wa 17, tunaonyesha ujumbe wa sasa uliohifadhiwa kwenye mkataba mahiri, ambao unanaswa katika mfuatano wa `message`.
- Kwenye mistari ya 23-26, tunatumia [kipengele kinachodhibitiwa](https://legacy.reactjs.org/docs/forms.html#controlled-components) kusasisha kigezo chetu cha hali cha `newMessage` wakati ingizo katika uwanja wa maandishi linabadilika.

Mbali na vigezo vyetu vya hali, utaona pia kwamba vitendaji vya `connectWalletPressed` na `onUpdatePressed` vinaitwa wakati vitufe vyenye vitambulisho `publishButton` na `walletButton` vinapobofywa mtawalia.

Hatimaye, hebu tushughulikie wapi kipengele hiki cha `HelloWorld.js` kinaongezwa.

Ikiwa utaenda kwenye faili ya `App.js`, ambayo ni kipengele kikuu katika React kinachofanya kazi kama chombo cha vipengele vingine vyote, utaona kwamba kipengele chetu cha `HelloWorld.js` kinaingizwa kwenye mstari wa 7.

Mwisho kabisa, hebu tuangalie faili moja zaidi uliyopewa, faili ya `interact.js`.

#### Faili ya `interact.js` {#the-interact-js-file}

Kwa sababu tunataka kufuata dhana ya [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), tutataka faili tofauti ambalo lina vitendaji vyetu vyote vya kusimamia mantiki, data, na sheria za dapp yetu, na kisha kuweza kuhamisha vitendaji hivyo kwenye frontend yetu \(kipengele chetu cha `HelloWorld.js`\).

👆🏽Hili ndilo dhumuni hasa la faili yetu ya `interact.js`!

Nenda kwenye folda ya `util` katika saraka yako ya `src`, na utagundua tumejumuisha faili inayoitwa `interact.js` ambayo itakuwa na mwingiliano wetu wote wa mkataba mahiri na vitendaji na vigezo vya mkoba.

```javascript
// interact.js

// export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Utagundua juu ya faili kwamba tumetoa maoni kwenye kipengee cha `helloWorldContract`. Baadaye katika mafunzo haya, tutaondoa maoni kwenye kipengee hiki na kuanzisha mkataba mahiri wetu katika kigezo hiki, ambacho kisha tutakihamisha kwenye kipengele chetu cha `HelloWorld.js`.

Vitendaji vinne ambavyo havijatekelezwa baada ya kipengee chetu cha `helloWorldContract` vinafanya yafuatayo:

- `loadCurrentMessage` - kitendaji hiki kinashughulikia mantiki ya kupakia ujumbe wa sasa uliohifadhiwa kwenye mkataba mahiri. Kitafanya wito wa _kusoma_ kwenye mkataba mahiri wa Hello World kwa kutumia [API ya Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - kitendaji hiki kitaunganisha MetaMask ya mtumiaji kwenye dapp yetu.
- `getCurrentWalletConnected` - kitendaji hiki kitaangalia ikiwa akaunti ya Ethereum tayari imeunganishwa kwenye dapp yetu wakati wa kupakia ukurasa na kusasisha UI yetu ipasavyo.
- `updateMessage` - kitendaji hiki kitasasisha ujumbe uliohifadhiwa kwenye mkataba mahiri. Kitafanya wito wa _kuandika_ kwenye mkataba mahiri wa Hello World, kwa hivyo mkoba wa MetaMask wa mtumiaji utalazimika kusaini muamala wa Ethereum ili kusasisha ujumbe.

Sasa kwa kuwa tunaelewa kile tunachofanya kazi nacho, hebu tujue jinsi ya kusoma kutoka kwenye mkataba mahiri wetu!

### Hatua ya 3: Soma kutoka kwenye mkataba mahiri wako {#step-3-read-from-your-smart-contract}

Ili kusoma kutoka kwenye mkataba mahiri wako, utahitaji kuweka kwa ufanisi:

- Muunganisho wa API kwenye mnyororo wa Ethereum
- Mfano uliopakiwa wa mkataba mahiri wako
- Kitendaji cha kuita kwenye kitendaji cha mkataba mahiri wako
- Msikilizaji wa kutazama sasisho wakati data unayosoma kutoka kwenye mkataba mahiri inabadilika

Hii inaweza kusikika kama hatua nyingi, lakini usijali! Tutakutembeza jinsi ya kufanya kila moja wapo hatua kwa hatua! :\)

#### Anzisha muunganisho wa API kwenye mnyororo wa Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Kwa hivyo kumbuka jinsi katika Sehemu ya 2 ya mafunzo haya, tulitumia [ufunguo wetu wa Alchemy Web3 kusoma kutoka kwenye mkataba mahiri wetu](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Utahitaji pia ufunguo wa Alchemy Web3 kwenye dapp yako ili kusoma kutoka kwenye mnyororo.

Ikiwa huna tayari, kwanza sakinisha [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kwa kwenda kwenye saraka kuu ya `starter-files` yako na kuendesha yafuatayo kwenye terminal yako:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ni kanga inayozunguka [Web3.js](https://docs.web3js.org/), ikitoa mbinu zilizoboreshwa za API na faida zingine muhimu ili kurahisisha maisha yako kama msanidi wa web3. Imeundwa kuhitaji usanidi mdogo ili uweze kuanza kuitumia kwenye programu yako mara moja!

Kisha, sakinisha kifurushi cha [dotenv](https://www.npmjs.com/package/dotenv) katika saraka ya mradi wako, ili tuwe na mahali salama pa kuhifadhi ufunguo wetu wa API baada ya kuuchukua.

```text
npm install dotenv --save
```

Kwa dapp yetu, **tutatumia ufunguo wetu wa API wa Websockets** badala ya ufunguo wetu wa API wa HTTP, kwani itaturuhusu kuweka msikilizaji anayegundua wakati ujumbe uliohifadhiwa kwenye mkataba mahiri unabadilika.

Mara tu unapokuwa na ufunguo wako wa API, tengeneza faili ya `.env` katika saraka yako kuu na uongeze url yako ya Alchemy Websockets kwake. Baadaye, faili yako ya `.env` inapaswa kuonekana hivi:

```javascript
REACT_APP_ALCHEMY_KEY = wss: // eth-goerli.ws.alchemyapi.io/v2/<key>
```

Sasa, tuko tayari kuweka mwisho wetu wa Alchemy Web3 kwenye dapp yetu! Hebu turudi kwenye `interact.js` yetu, ambayo imewekwa ndani ya folda yetu ya `util` na tuongeze msimbo ufuatao juu ya faili:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

// export const helloWorldContract;
```

Hapo juu, kwanza tuliingiza ufunguo wa Alchemy kutoka kwenye faili yetu ya `.env` na kisha tukapitisha `alchemyKey` yetu kwa `createAlchemyWeb3` ili kuanzisha mwisho wetu wa Alchemy Web3.

Pamoja na mwisho huu kuwa tayari, ni wakati wa kupakia mkataba mahiri wetu!

#### Kupakia mkataba mahiri wako wa Hello World {#loading-your-hello-world-smart-contract}

Ili kupakia mkataba mahiri wako wa Hello World, utahitaji anwani ya mkataba wake na ABI, ambazo zote zinaweza kupatikana kwenye Etherscan ikiwa ulikamilisha [Sehemu ya 3 ya mafunzo haya.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Jinsi ya kupata ABI ya mkataba wako kutoka Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Ikiwa uliruka Sehemu ya 3 ya mafunzo haya, unaweza kutumia mkataba wa HelloWorld wenye anwani [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). ABI yake inaweza kupatikana [hapa](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI ya mkataba ni muhimu kwa kubainisha ni kitendaji gani mkataba utaita na pia kuhakikisha kwamba kitendaji kitarudisha data katika muundo unaotarajia. Mara tu tunaponakili ABI ya mkataba wetu, hebu tuihifadhi kama faili ya JSON inayoitwa `contract-abi.json` katika saraka yako ya `src`.

Faili yako ya contract-abi.json inapaswa kuhifadhiwa kwenye folda yako ya src.

Tukiwa na anwani yetu ya mkataba, ABI, na mwisho wa Alchemy Web3, tunaweza kutumia [mbinu ya mkataba](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kupakia mfano wa mkataba mahiri wetu. Ingiza ABI ya mkataba wako kwenye faili ya `interact.js` na uongeze anwani ya mkataba wako.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Sasa tunaweza hatimaye kuondoa maoni kwenye kigezo chetu cha `helloWorldContract`, na kupakia mkataba mahiri kwa kutumia mwisho wetu wa AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Kwa muhtasari, mistari 12 ya kwanza ya `interact.js` yako sasa inapaswa kuonekana hivi:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Sasa kwa kuwa tumepakia mkataba wetu, tunaweza kutekeleza kitendaji chetu cha `loadCurrentMessage`!

#### Kutekeleza `loadCurrentMessage` katika faili yako ya `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Kitendaji hiki ni rahisi sana. Tutafanya wito rahisi wa async wa web3 kusoma kutoka kwenye mkataba wetu. Kitendaji chetu kitarudisha ujumbe uliohifadhiwa kwenye mkataba mahiri:

Sasisha `loadCurrentMessage` katika faili yako ya `interact.js` kwa yafuatayo:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Kwa kuwa tunataka kuonyesha mkataba mahiri huu kwenye UI yetu, hebu tusasishe kitendaji cha `useEffect` katika kipengele chetu cha `HelloWorld.js` kwa yafuatayo:

```javascript
// HelloWorld.js

// huitwa mara moja tu
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Kumbuka, tunataka tu `loadCurrentMessage` yetu iitwe mara moja wakati wa utoaji wa kwanza wa kipengele. Hivi karibuni tutatekeleza `addSmartContractListener` ili kusasisha UI kiotomatiki baada ya ujumbe kwenye mkataba mahiri kubadilika.

Kabla hatujaingia kwenye msikilizaji wetu, hebu tuangalie kile tulicho nacho hadi sasa! Hifadhi faili zako za `HelloWorld.js` na `interact.js`, na kisha nenda kwenye [http://localhost:3000/](http://localhost:3000/)

Utagundua kuwa ujumbe wa sasa hausemi tena "Hakuna muunganisho kwenye mtandao." Badala yake unaonyesha ujumbe uliohifadhiwa kwenye mkataba mahiri. Safi sana!

#### UI yako sasa inapaswa kuonyesha ujumbe uliohifadhiwa kwenye mkataba mahiri {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Sasa tukizungumzia msikilizaji huyo...

#### Tekeleza `addSmartContractListener` {#implement-addsmartcontractlistener}

Ikiwa unakumbuka faili ya `HelloWorld.sol` tuliyoiandika katika [Sehemu ya 1 ya mfululizo huu wa mafunzo](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), utakumbuka kuwa kuna tukio la mkataba mahiri linaloitwa `UpdatedMessages` ambalo hutolewa baada ya kitendaji cha `update` cha mkataba mahiri wetu kuitwa \(tazama mistari ya 9 na 27\):

```javascript
// HelloWorld.sol

// Inabainisha toleo la Solidity, ikitumia uwekaji matoleo wa kisemantiki.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Inafafanua mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa kazi na data (hali yake). Baada ya kusambazwa, mkataba hukaa kwenye anwani maalum kwenye blockchain ya Ethereum. Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Hutolewa wakati kazi ya kusasisha inapoitwa
   // Matukio ya mkataba mahiri ni njia ya mkataba wako kuwasiliana kwamba kuna kitu kimetokea kwenye blockchain kwenda kwenye front-end ya programu yako, ambayo inaweza kuwa 'inasikiliza' matukio fulani na kuchukua hatua yanapotokea.
   event UpdatedMessages(string oldStr, string newStr);

   // Inatangaza kigezo cha hali `message` cha aina ya `string`.
   // Vigezo vya hali ni vigezo ambavyo thamani zake huhifadhiwa kabisa kwenye hifadhi ya mkataba. Neno kuu `public` hufanya vigezo viweze kufikiwa kutoka nje ya mkataba na huunda kazi ambayo mikataba mingine au wateja wanaweza kuita ili kufikia thamani.
   string public message;

   // Sawa na lugha nyingi zinazoelekezwa kwa vitu zinazotegemea darasa, constructor ni kazi maalum ambayo hutekelezwa tu wakati wa kuunda mkataba.
   // Constructors hutumika kuanzisha data ya mkataba. Jifunze zaidi:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Inakubali hoja ya string `initMessage` na kuweka thamani kwenye kigezo cha hifadhi cha `message` cha mkataba).
      message = initMessage;
   }

   // Kazi ya umma inayokubali hoja ya string na kusasisha kigezo cha hifadhi cha `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Matukio ya mkataba mahiri ni njia ya mkataba wako kuwasiliana kwamba kuna kitu kimetokea \(yaani, kulikuwa na _tukio_\) kwenye kiambajengo kwenda kwenye programu yako ya front-end, ambayo inaweza kuwa 'inasikiliza' matukio maalum na kuchukua hatua yanapotokea.

Kitendaji cha `addSmartContractListener` kitasikiliza haswa tukio la `UpdatedMessages` la mkataba mahiri wetu wa Hello World, na kusasisha UI yetu ili kuonyesha ujumbe mpya.

Badilisha `addSmartContractListener` kwa yafuatayo:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Hebu tuchambue kile kinachotokea wakati msikilizaji anagundua tukio:

- Ikiwa hitilafu itatokea wakati tukio linatolewa, itaonyeshwa kwenye UI kupitia kigezo chetu cha hali cha `status`.
- Vinginevyo, tutatumia kipengee cha `data` kilichorudishwa. `data.returnValues` ni safu iliyoorodheshwa kwenye sifuri ambapo kipengele cha kwanza kwenye safu kinahifadhi ujumbe uliopita na kipengele cha pili kinahifadhi ule uliosasishwa. Kwa ujumla, kwenye tukio lenye mafanikio tutaweka mfuatano wetu wa `message` kwa ujumbe uliosasishwa, kufuta mfuatano wa `newMessage`, na kusasisha kigezo chetu cha hali cha `status` ili kuonyesha kwamba ujumbe mpya umechapishwa kwenye mkataba mahiri wetu.

Hatimaye, hebu tuite msikilizaji wetu katika kitendaji chetu cha `useEffect` ili kianzishwe kwenye utoaji wa kwanza wa kipengele cha `HelloWorld.js`. Kwa ujumla, kitendaji chako cha `useEffect` kinapaswa kuonekana hivi:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Sasa kwa kuwa tunaweza kusoma kutoka kwenye mkataba mahiri wetu, itakuwa vizuri kujua jinsi ya kuandika kwake pia! Hata hivyo, ili kuandika kwenye dapp yetu, lazima kwanza tuwe na mkoba wa Ethereum uliounganishwa kwake.

Kwa hivyo, ifuatayo tutashughulikia kuweka mkoba wetu wa Ethereum \(MetaMask\) na kisha kuuunganisha kwenye dapp yetu!

### Hatua ya 4: Weka mkoba wako wa Ethereum {#step-4-set-up-your-ethereum-wallet}

Ili kuandika chochote kwenye mnyororo wa Ethereum, watumiaji lazima wasaini miamala wakitumia funguo zao binafsi za mkoba wao wa mtandaoni. Kwa mafunzo haya, tutatumia [MetaMask](https://metamask.io/), mkoba wa mtandaoni kwenye kivinjari unaotumika kusimamia anwani ya akaunti yako ya Ethereum, kwani inafanya usainiji huu wa muamala kuwa rahisi sana kwa mtumiaji wa mwisho.

Ikiwa unataka kuelewa zaidi kuhusu jinsi miamala kwenye Ethereum inavyofanya kazi, angalia [ukurasa huu](/developers/docs/transactions/) kutoka kwa taasisi ya Ethereum.

#### Pakua MetaMask {#download-metamask}

Unaweza kupakua na kuunda akaunti ya MetaMask bila malipo [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha unabadilisha kwenda kwenye "Goerli Test Network" upande wa juu kulia \(ili tusiwe tunashughulika na pesa halisi\).

#### Ongeza ether kutoka kwenye Bomba la majaribio {#add-ether-from-a-faucet}

Ili kusaini muamala kwenye kiambajengo cha Ethereum, tutahitaji Eth bandia. Ili kupata Eth unaweza kwenda kwenye [FaucETH](https://fauceth.komputing.org) na uweke anwani yako ya akaunti ya Goerli, bofya "Request funds", kisha chagua "Ethereum Testnet Goerli" kwenye menyu kunjuzi na hatimaye bofya kitufe cha "Request funds" tena. Unapaswa kuona Eth kwenye akaunti yako ya MetaMask muda mfupi baadaye!

#### Angalia Salio lako {#check-your-balance}

Ili kuhakikisha salio letu lipo, hebu tufanye ombi la [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) tukitumia [zana ya mtunzi ya Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Hii itarudisha kiasi cha Eth kwenye mkoba wetu. Baada ya kuweka anwani yako ya akaunti ya MetaMask na kubofya "Send Request", unapaswa kuona jibu kama hili:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**KUMBUKA:** Matokeo haya yako katika wei sio eth. Wei inatumika kama kiasi kidogo zaidi cha ether. Ubadilishaji kutoka wei kwenda eth ni: 1 eth = 10¹⁸ wei. Kwa hivyo ikiwa tutabadilisha 0xde0b6b3a7640000 kuwa desimali tunapata 1\*10¹⁸ ambayo ni sawa na 1 eth.

Phew! Pesa zetu bandia zote zipo! 🤑

### Hatua ya 5: Unganisha MetaMask kwenye UI yako {#step-5-connect-metamask-to-your-UI}

Sasa kwa kuwa mkoba wetu wa MetaMask umewekwa, hebu tuunganishe dapp yetu kwake!

#### Kitendaji cha `connectWallet` {#the-connectWallet-function}

Katika faili yetu ya `interact.js`, hebu tutekeleze kitendaji cha `connectWallet`, ambacho kisha tunaweza kukiita katika kipengele chetu cha `HelloWorld.js`.

Hebu tubadilishe `connectWallet` kwa yafuatayo:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Kwa hivyo kizuizi hiki kikubwa cha msimbo kinafanya nini hasa?

Kweli, kwanza, inaangalia ikiwa `window.ethereum` imewezeshwa kwenye kivinjari chako.

`window.ethereum` ni API ya kimataifa inayoingizwa na MetaMask na watoa huduma wengine wa mkoba ambayo inaruhusu tovuti kuomba akaunti za Ethereum za watumiaji. Ikiidhinishwa, inaweza kusoma data kutoka kwenye viambajengo ambavyo mtumiaji ameunganishwa navyo, na kupendekeza kwamba mtumiaji asaini jumbe na miamala. Angalia [nyaraka za MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) kwa maelezo zaidi!

Ikiwa `window.ethereum` _haipo_, basi hiyo inamaanisha MetaMask haijasakinishwa. Hii inasababisha kipengee cha JSON kurudishwa, ambapo `address` iliyorudishwa ni mfuatano mtupu, na kipengee cha JSX cha `status` kinawasilisha kwamba mtumiaji lazima asakinishe MetaMask.

Sasa ikiwa `window.ethereum` _ipo_, basi hapo ndipo mambo yanapovutia.

Tukitumia kitanzi cha try/catch, tutajaribu kuunganisha kwenye MetaMask kwa kuita [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Kuita kitendaji hiki kutafungua MetaMask kwenye kivinjari, ambapo mtumiaji ataombwa kuunganisha mkoba wao kwenye dapp yako.

- Ikiwa mtumiaji atachagua kuunganisha, `method: "eth_requestAccounts"` itarudisha safu ambayo ina anwani zote za akaunti za mtumiaji zilizounganishwa kwenye dapp. Kwa ujumla, kitendaji chetu cha `connectWallet` kitarudisha kipengee cha JSON ambacho kina `address` ya _kwanza_ katika safu hii \(tazama mstari wa 9\) na ujumbe wa `status` unaomwomba mtumiaji kuandika ujumbe kwenye mkataba mahiri.
- Ikiwa mtumiaji atakataa muunganisho, basi kipengee cha JSON kitakuwa na mfuatano mtupu kwa `address` iliyorudishwa na ujumbe wa `status` unaoonyesha kwamba mtumiaji alikataa muunganisho.

Sasa kwa kuwa tumeandika kitendaji hiki cha `connectWallet`, hatua inayofuata ni kukiita kwenye kipengele chetu cha `HelloWorld.js`.

#### Ongeza kitendaji cha `connectWallet` kwenye Kipengele chako cha UI cha `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Nenda kwenye kitendaji cha `connectWalletPressed` katika `HelloWorld.js`, na ukisasishe kwa yafuatayo:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Unaona jinsi utendaji wetu mwingi unavyotengwa kutoka kwenye kipengele chetu cha `HelloWorld.js` kutoka kwenye faili ya `interact.js`? Hii ni ili tuzingatie dhana ya M-V-C!

Katika `connectWalletPressed`, tunafanya tu wito wa await kwenye kitendaji chetu cha `connectWallet` kilichoingizwa, na kwa kutumia jibu lake, tunasasisha vigezo vyetu vya `status` na `walletAddress` kupitia ndoano zao za hali.

Sasa, hebu tuhifadhi faili zote mbili \(`HelloWorld.js` na `interact.js`\) na tujaribu UI yetu hadi sasa.

Fungua kivinjari chako kwenye ukurasa wa [http://localhost:3000/](http://localhost:3000/), na ubofye kitufe cha "Connect Wallet" upande wa juu kulia wa ukurasa.

Ikiwa umesakinisha MetaMask, unapaswa kuombwa kuunganisha mkoba wako kwenye dapp yako. Kubali mwaliko wa kuunganisha.

Unapaswa kuona kwamba kitufe cha mkoba sasa kinaonyesha kwamba anwani yako imeunganishwa! Ndiyoooo 🔥

Ifuatayo, jaribu kuonyesha upya ukurasa... hii ni ajabu. Kitufe chetu cha mkoba kinatuomba tuunganishe MetaMask, ingawa tayari imeunganishwa...

Hata hivyo, usiwe na hofu! Tunaweza kushughulikia hilo kwa urahisi kwa kutekeleza `getCurrentWalletConnected`, ambayo itaangalia ikiwa anwani tayari imeunganishwa kwenye dapp yetu na kusasisha UI yetu ipasavyo!

#### Kitendaji cha `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Sasisha kitendaji chako cha `getCurrentWalletConnected` katika faili ya `interact.js` kwa yafuatayo:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Msimbo huu unafanana _sana_ na kitendaji cha `connectWallet` tulichokiandika katika hatua iliyopita.

Tofauti kuu ni kwamba badala ya kuita mbinu ya `eth_requestAccounts`, ambayo inafungua MetaMask kwa mtumiaji kuunganisha mkoba wao, hapa tunaita mbinu ya `eth_accounts`, ambayo inarudisha tu safu iliyo na anwani za MetaMask zilizounganishwa kwa sasa kwenye dapp yetu.

Ili kuona kitendaji hiki kikifanya kazi, hebu tukiite katika kitendaji chetu cha `useEffect` cha kipengele chetu cha `HelloWorld.js`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Kumbuka, tunatumia jibu la wito wetu kwa `getCurrentWalletConnected` kusasisha vigezo vyetu vya hali vya `walletAddress` na `status`.

Sasa kwa kuwa umeongeza msimbo huu, hebu tujaribu kuonyesha upya dirisha letu la kivinjari.

Safi sanaaaa! Kitufe kinapaswa kusema kwamba umeunganishwa, na kuonyesha hakikisho la anwani ya mkoba wako uliounganishwa - hata baada ya kuonyesha upya!

#### Tekeleza `addWalletListener` {#implement-addwalletlistener}

Hatua ya mwisho katika usanidi wa mkoba wa dapp yetu ni kutekeleza msikilizaji wa mkoba ili UI yetu isasishwe wakati hali ya mkoba wetu inabadilika, kama vile wakati mtumiaji anapokata muunganisho au kubadilisha akaunti.

Katika faili yako ya `HelloWorld.js`, badilisha kitendaji chako cha `addWalletListener` kama ifuatavyo:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Nina uhakika hata huhitaji msaada wetu kuelewa kinachoendelea hapa kwa wakati huu, lakini kwa madhumuni ya ukamilifu, hebu tuchambue haraka:

- Kwanza, kitendaji chetu kinaangalia ikiwa `window.ethereum` imewezeshwa \(yaani, MetaMask imesakinishwa\).
  - Ikiwa sivyo, tunaweka tu kigezo chetu cha hali cha `status` kwa mfuatano wa JSX unaomwomba mtumiaji kusakinisha MetaMask.
  - Ikiwa imewezeshwa, tunaweka msikilizaji `window.ethereum.on("accountsChanged")` kwenye mstari wa 3 anayesikiliza mabadiliko ya hali katika mkoba wa MetaMask, ambayo ni pamoja na wakati mtumiaji anaunganisha akaunti ya ziada kwenye dapp, kubadilisha akaunti, au kukata muunganisho wa akaunti. Ikiwa kuna angalau akaunti moja iliyounganishwa, kigezo cha hali cha `walletAddress` kinasasishwa kama akaunti ya kwanza katika safu ya `accounts` iliyorudishwa na msikilizaji. Vinginevyo, `walletAddress` inawekwa kama mfuatano mtupu.

Mwisho kabisa, lazima tukiite katika kitendaji chetu cha `useEffect`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Na ndivyo hivyo! Tumekamilisha kwa ufanisi kupanga utendaji wetu wote wa mkoba! Sasa kwenye kazi yetu ya mwisho: kusasisha ujumbe uliohifadhiwa kwenye mkataba mahiri wetu!

### Hatua ya 6: Tekeleza kitendaji cha `updateMessage` {#step-6-implement-the-updateMessage-function}

Sawa jamani, tumefika kwenye hatua ya mwisho! Katika `updateMessage` ya faili yako ya `interact.js`, tutafanya yafuatayo:

1. Hakikisha ujumbe tunaotaka kuchapisha kwenye mkataba mahiri wetu ni halali
2. Saini muamala wetu ukitumia MetaMask
3. Ita kitendaji hiki kutoka kwenye kipengele chetu cha frontend cha `HelloWorld.js`

Hii haitachukua muda mrefu sana; hebu tumalize dapp hii!

#### Kushughulikia hitilafu za ingizo {#input-error-handling}

Kwa kawaida, inaleta maana kuwa na aina fulani ya ushughulikiaji wa hitilafu za ingizo mwanzoni mwa kitendaji.

Tutataka kitendaji chetu kirudi mapema ikiwa hakuna kiendelezi cha MetaMask kilichosakinishwa, hakuna mkoba uliounganishwa \(yaani, `address` iliyopitishwa ni mfuatano mtupu\), au `message` ni mfuatano mtupu. Hebu tuongeze ushughulikiaji ufuatao wa hitilafu kwenye `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Sasa kwa kuwa ina ushughulikiaji sahihi wa hitilafu za ingizo, ni wakati wa kusaini muamala kupitia MetaMask!

#### Kusaini muamala wetu {#signing-our-transaction}

Ikiwa tayari unajisikia vizuri na miamala ya jadi ya web3 ya Ethereum, msimbo tutakaoandika unaofuata utakuwa wa kawaida sana. Chini ya msimbo wako wa kushughulikia hitilafu za ingizo, ongeza yafuatayo kwenye `updateMessage`:

```javascript
// interact.js

// weka vigezo vya muamala
const transactionParameters = {
  to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
  from: address, // lazima ilingane na anwani inayotumika ya mtumiaji.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

// weka saini muamala
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Hebu tuchambue kinachotokea. Kwanza, tunaweka vigezo vyetu vya miamala, ambapo:

- `to` inabainisha anwani ya mpokeaji \(mkataba mahiri wetu\)
- `from` inabainisha msainiji wa muamala, kigezo cha `address` tulichopitisha kwenye kitendaji chetu
- `data` ina wito kwa mbinu ya `update` ya mkataba mahiri wetu wa Hello World, ikipokea kigezo chetu cha mfuatano cha `message` kama ingizo

Kisha, tunafanya wito wa await, `window.ethereum.request`, ambapo tunaiomba MetaMask kusaini muamala. Kumbuka, kwenye mistari ya 11 na 12, tunabainisha mbinu yetu ya eth, `eth_sendTransaction` na kupitisha `transactionParameters` zetu.

Kwa wakati huu, MetaMask itafunguka kwenye kivinjari, na kumwomba mtumiaji kusaini au kukataa muamala.

- Ikiwa muamala utafanikiwa, kitendaji kitarudisha kipengee cha JSON ambapo mfuatano wa JSX wa `status` unamwomba mtumiaji kuangalia Etherscan kwa maelezo zaidi kuhusu muamala wao.
- Ikiwa muamala utashindwa, kitendaji kitarudisha kipengee cha JSON ambapo mfuatano wa `status` unawasilisha ujumbe wa hitilafu.

Kwa ujumla, kitendaji chetu cha `updateMessage` kinapaswa kuonekana hivi:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  // ushughulikiaji wa makosa ya uingizaji
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  // weka vigezo vya muamala
  const transactionParameters = {
    to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
    from: address, // lazima ilingane na anwani inayotumika ya mtumiaji.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  // weka saini muamala
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Mwisho kabisa, tunahitaji kuunganisha kitendaji chetu cha `updateMessage` kwenye kipengele chetu cha `HelloWorld.js`.

#### Unganisha `updateMessage` kwenye frontend ya `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Kitendaji chetu cha `onUpdatePressed` kinapaswa kufanya wito wa await kwenye kitendaji cha `updateMessage` kilichoingizwa na kubadilisha kigezo cha hali cha `status` ili kuonyesha ikiwa muamala wetu ulifanikiwa au ulishindwa:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Ni safi sana na rahisi. Na nadhani nini... DAPP YAKO IMEKAMILIKA!!!

Endelea na ujaribu kitufe cha **Update**!

### Tengeneza dapp yako mwenyewe maalum {#make-your-own-custom-dapp}

Wooooo, umefika mwisho wa mafunzo! Kwa muhtasari, umejifunza jinsi ya:

- Kuunganisha mkoba wa MetaMask kwenye mradi wako wa dapp
- Kusoma data kutoka kwenye mkataba mahiri wako ukitumia API ya [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Kusaini miamala ya Ethereum ukitumia MetaMask

Sasa una vifaa kamili vya kutumia ujuzi kutoka kwenye mafunzo haya ili kujenga mradi wako mwenyewe wa dapp maalum! Kama kawaida, ikiwa una maswali yoyote, usisite kuwasiliana nasi kwa msaada katika [Discord ya Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Mara tu utakapokamilisha mafunzo haya, tujulishe uzoefu wako ulikuwaje au ikiwa una maoni yoyote kwa kututag kwenye Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!