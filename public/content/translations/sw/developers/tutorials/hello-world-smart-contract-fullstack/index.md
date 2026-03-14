---
title: Mkataba-erevu wa Hello World kwa Wanaoanza - Fullstack
description: Mafunzo ya utangulizi kuhusu kuandika na kusambaza mkataba-erevu rahisi kwenye Ethereum.
author: "nstrike2"
tags:
  [
    "uimara",
    "hardhat",
    "alchemy",
    "mikataba erevu",
    "upelekaji",
    "kichunguzi cha bloku",
    "frontend",
    "miamala"
  ]
skill: beginner
lang: sw
published: 2021-10-25
---

Mwongozo huu ni kwa ajili yako kama wewe ni mgeni katika utengenezaji wa mnyororo wa bloku na hujui pa kuanzia au jinsi ya kupeleka na kuingiliana na mikataba-erevu. Tutapitia hatua za kuunda na kupeleka mkataba-erevu rahisi kwenye testnet ya Goerli kwa kutumia [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), na [Alchemy](https://alchemy.com/eth).

Utahitaji akaunti ya Alchemy ili kukamilisha mafunzo haya. [Jisajili kwa akaunti ya bure](https://www.alchemy.com/).

Ikiwa una maswali wakati wowote, jisikie huru kuuliza katika [Alchemy Discord](https://discord.gg/gWuC7zB)!

## Sehemu ya 1 - Unda na Upeleke Mkataba-erevu wako kwa kutumia Hardhat {#part-1}

### Unganisha kwenye mtandao wa Ethereum {#connect-to-the-ethereum-network}

Kuna njia nyingi za kufanya maombi kwa mnyororo wa Ethereum. Kwa urahisi, tutatumia akaunti ya bure kwenye Alchemy, jukwaa la wasanidi programu wa mnyororo wa bloku na API inayoturuhusu kuwasiliana na mnyororo wa Ethereum bila kuendesha nodi wenyewe. Alchemy pia ina zana za wasanidi programu kwa ufuatiliaji na uchambuzi; tutatumia fursa hii katika mafunzo haya kuelewa kinachoendelea nyuma ya pazia katika upelekaji wa mkataba-erevu wetu.

### Unda programu yako na ufunguo wa API {#create-your-app-and-api-key}

Baada ya kuunda akaunti ya Alchemy, unaweza kutengeneza ufunguo wa API kwa kuunda programu. Hii itakuruhusu kufanya maombi kwenye testnet ya Goerli. Ikiwa hufahamu testnets unaweza [kusoma mwongozo wa Alchemy wa kuchagua mtandao](https://www.alchemy.com/docs/choosing-a-web3-network).

Kwenye dashibodi ya Alchemy, tafuta menyu kunjuzi ya **Programu** kwenye upau wa urambazaji na ubofye **Unda Programu**.

![Programu ya uundaji wa Hello world](./hello-world-create-app.png)

Ipe programu yako jina '_Hello World_' na uandike maelezo mafupi. Chagua **Staging** kama mazingira yako na **Goerli** kama mtandao wako.

![mwonekano wa programu ya kuunda hello world](./create-app-view-hello-world.png)

_Kumbuka: hakikisha unachagua **Goerli**, la sivyo mafunzo haya hayatafanya kazi._

Bofya **Unda programu**. Programu yako itaonekana kwenye jedwali hapa chini.

### Unda akaunti ya Ethereum {#create-an-ethereum-account}

Unahitaji akaunti ya Ethereum ili kutuma na kupokea miamala. Tutatumia MetaMask, mkoba halisi kwenye kivinjari unaowawezesha watumiaji kudhibiti anwani ya akaunti yao ya Ethereum.

Unaweza kupakua na kuunda akaunti ya MetaMask bure [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha umebadili na kuweka "Mtandao wa Majaribio wa Goerli" juu kulia (ili tusitumie pesa halisi).

### Hatua ya 4: Ongeza ether kutoka kwa Bomba {#step-4-add-ether-from-a-faucet}

Ili kupeleka mkataba-erevu wako kwenye mtandao wa majaribio, utahitaji ETH bandia. Ili kupata ETH kwenye mtandao wa Goerli, nenda kwenye bomba la Goerli na uweke anwani ya akaunti yako ya Goerli. Kumbuka kwamba mabomba ya Goerli yamekuwa hayategemewi sana hivi karibuni - angalia [ukurasa wa mitandao ya majaribio](/developers/docs/networks/#goerli) kwa orodha ya machaguo ya kujaribu:

_Kumbuka: kutokana na msongamano wa mtandao, hii inaweza kuchukua muda._
``

### Hatua ya 5: Angalia Salio lako {#step-5-check-your-balance}

Ili kuhakikisha mara mbili kuwa ETH iko kwenye mkoba wako, hebu tufanye ombi la [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) kwa kutumia [zana ya mtunzi ya Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Hii itarudisha kiasi cha ETH katika mkoba wetu. Ili kujifunza zaidi angalia [mafunzo mafupi ya Alchemy ya jinsi ya kutumia zana ya mtunzi](https://youtu.be/r6sjRxBZJuU).

Weka anwani ya akaunti yako ya MetaMask na ubofye **Tuma Ombi**. Utaona jibu linalofanana na sehemu ya msimbo hapa chini.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Kumbuka: Matokeo haya yako katika wei, sio ETH. Wei hutumika kama thamani ndogo zaidi ya ether._

Phew! Pesa zetu bandia zote zipo.

### Hatua ya 6: Anzisha mradi wetu {#step-6-initialize-our-project}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uweke yafuatayo.

```
mkdir hello-world
cd hello-world
```

Sasa kwa kuwa tuko ndani ya folda ya mradi wetu, tutatumia `npm init` kuanzisha mradi.

> Ikiwa bado hujasakinisha npm, fuata [maelekezo haya ili kusakinisha Node.js na npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Kwa madhumuni ya mafunzo haya, haijalishi jinsi unavyojibu maswali ya uanzishaji. Hivi ndivyo tulivyofanya kwa ajili ya marejeleo:

```
jina la kifurushi: (hello-world)
toleo: (1.0.0)
maelezo: mkataba-erevu wa hello world
mahali pa kuanzia: (index.js)
amri ya majaribio:
hazina ya git:
maneno muhimu:
mwandishi:
leseni: (ISC)

Karibu kuandika kwa /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "mkataba-erevu wa hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Kosa: hakuna jaribio lililobainishwa\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Thibitisha package.json na tuko tayari kwenda!

### Hatua ya 7: Pakua Hardhat {#step-7-download-hardhat}

Hardhat ni mazingira ya usanidi wa kuandaa, kupeleka, kupima, na kutatua programu yako ya Ethereum. Inasaidia wasanidi programu wanapojenga mikataba-erevu na dApps ndani ya nchi kabla ya kupeleka kwenye mnyororo hai.

Ndani ya mradi wetu wa `hello-world` endesha:

```
npm install --save-dev hardhat
```

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/getting-started/#overview).

### Hatua ya 8: Unda mradi wa Hardhat {#step-8-create-hardhat-project}

Ndani ya folda ya mradi wetu wa `hello-world`, endesha:

```
npx hardhat
```

Unapaswa kisha kuona ujumbe wa kukaribisha na chaguo la kuchagua unachotaka kufanya. Chagua “unda hardhat.config.js tupu”:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Karibu kwenye Hardhat v2.0.11 👷‍

Unataka kufanya nini? ...
Unda mradi wa mfano
❯ Unda hardhat.config.js tupu
Acha
```

Hii itatengeneza faili ya `hardhat.config.js` katika mradi. Tutaitumia baadaye katika mafunzo haya kubainisha usanidi wa mradi wetu.

### Hatua ya 9: Ongeza folda za mradi {#step-9-add-project-folders}

Ili kuuweka mradi katika mpangilio, hebu tuunde folda mbili mpya. Katika mstari wa amri, nenda kwenye saraka kuu ya mradi wako wa `hello-world` na uandike:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ni mahali ambapo tutaweka faili la msimbo wa mkataba-erevu wetu wa hello world
- `scripts/` ni mahali ambapo tutaweka hati za kusambaza na kuingiliana na mkataba wetu

### Hatua ya 10: Andika mkataba wetu {#step-10-write-our-contract}

Huenda unajiuliza, ni lini tutaandika msimbo? Muda umefika!

Fungua mradi wa hello-world katika kihariri chako unachopenda. Mikataba-erevu mara nyingi huandikwa kwa Solidity, ambayo tutaitumia kuandika mkataba-erevu wetu.‌

1. Nenda kwenye folda ya `contracts` na uunde faili mpya iitwayo `HelloWorld.sol`
2. Hapa chini kuna sampuli ya mkataba-erevu wa Hello World ambao tutautumia kwa mafunzo haya. Nakili yaliyomo hapa chini kwenye faili ya `HelloWorld.sol`.

_Kumbuka: Hakikisha unasoma maoni ili kuelewa mkataba huu unafanya nini._

```
// Inabainisha toleo la Solidity, kwa kutumia matoleo ya kimantiki.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Inafafanua mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa kazi na data (hali yake). Baada ya kupelekwa, mkataba hukaa kwenye anwani maalum kwenye mnyororo wa bloku wa Ethereum. Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Hutolewa wakati kazi ya sasisho inapoitwa
   // Matukio ya mkataba-erevu ni njia ya mkataba wako kuwasiliana kwamba kitu kilitokea kwenye mnyororo wa bloku kwa programu yako ya mbele, ambayo inaweza kuwa 'inasikiliza' matukio fulani na kuchukua hatua yanapotokea.
   event UpdatedMessages(string oldStr, string newStr);

   // Inatangaza kigezo cha hali `message` cha aina ya `string`.
   // Vigezo vya hali ni vigezo ambavyo thamani zake huhifadhiwa kabisa katika hifadhi ya mkataba. Neno muhimu `public` hufanya vigezo kupatikana kutoka nje ya mkataba na huunda kazi ambayo mikataba mingine au wateja wanaweza kuita ili kupata thamani.
   string public message;

   // Sawa na lugha nyingi za upangaji zinazotegemea darasa, konstruka ni kazi maalum ambayo hutekelezwa tu wakati wa uundaji wa mkataba.
   // Konstruka hutumiwa kuanzisha data ya mkataba. Jifunze zaidi:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Inakubali hoja ya mfuatano `initMessage` na kuweka thamani katika kigezo cha hifadhi cha mkataba `message`).
      message = initMessage;
   }

   // Kazi ya umma inayokubali hoja ya mfuatano na kusasisha kigezo cha hifadhi `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Huu ni mkataba-erevu wa msingi unaohifadhi ujumbe wakati wa uundaji. Inaweza kusasishwa kwa kuita kazi ya `update`.

### Hatua ya 11: Unganisha MetaMask & Alchemy kwenye mradi wako {#step-11-connect-metamask-alchemy-to-your-project}

Tumeunda pochi ya MetaMask, akaunti ya Alchemy, na kuandika mkataba-erevu wetu, sasa ni wakati wa kuunganisha vitu hivi vitatu.

Kila muamala unaotumwa kutoka kwa mkoba wako unahitaji saini kwa kutumia ufunguo wako wa kipekee binafsi. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi ufunguo wetu binafsi kwa usalama katika faili ya mazingira. Pia tutahifadhi ufunguo wa API kwa Alchemy hapa.

> Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo haya](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) kuhusu kutuma miamala kwa kutumia web3.

Kwanza, sakinisha kifurushi cha dotenv katika saraka ya mradi wako:

```
npm install dotenv --save
```

Kisha, unda faili ya `.env` katika saraka kuu ya mradi. Ongeza ufunguo wako binafsi wa MetaMask na URL ya API ya HTTP ya Alchemy humo.

Faili yako ya mazingira lazima iitwe `.env` la sivyo haitatambuliwa kama faili ya mazingira.

Usiite `process.env` au `.env-custom` au jina lingine lolote.

- Fuata [maelekezo haya](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) ili kuhamisha ufunguo wako binafsi
- Angalia hapa chini ili kupata URL ya API ya HTTP ya Alchemy

![](./get-alchemy-api-key.gif)

Faili lako la `.env` linapaswa kuonekana hivi:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/ufunguo-wako-wa-api"
PRIVATE_KEY = "ufunguo-wako-binafsi-wa-metamask"
```

Ili kuunganisha hivi kwenye msimbo wetu, tutarejelea vigezo hivi katika faili letu la `hardhat.config.js` kwenye hatua ya 13.

### Hatua ya 12: Sakinisha Ethers.js {#step-12-install-ethersjs}

Ethers.js ni maktaba inayorahisisha kuingiliana na kufanya maombi kwa Ethereum kwa kufunika [mbinu za kawaida za JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) na mbinu rahisi zaidi kwa mtumiaji.

Hardhat inaturuhusu kuunganisha [plugins](https://hardhat.org/plugins/) kwa zana za ziada na utendaji uliopanuliwa. Tutatumia fursa ya [Ethers plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) kwa upelekaji wa mkataba.

Katika saraka yako ya mradi, andika:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Hatua ya 13: Sasisha hardhat.config.js {#step-13-update-hardhat-configjs}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha `hardhat.config.js` ili mradi wetu uvifahamu vyote.

Sasisha `hardhat.config.js` yako ili ionekane hivi:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

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

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tuandae mkataba wetu. Jukumu la `compile` ni mojawapo ya majukumu yaliyojengewa ndani ya hardhat.

Kutoka kwenye mstari wa amri, endesha:

```bash
npx hardhat compile
```

Unaweza kupata onyo kuhusu `Kitambulisho cha leseni cha SPDX hakijatolewa kwenye faili ya chanzo`, lakini hakuna haja ya kuwa na wasiwasi kuhusu hilo - tunatumai kila kitu kingine kinaonekana vizuri! Ikiwa sivyo, unaweza kutuma ujumbe kila wakati katika [discord ya Alchemy](https://discord.gg/u72VCg3).

### Hatua ya 15: Andika hati yetu ya kupeleka {#step-15-write-our-deploy-script}

Sasa kwa kuwa mkataba wetu umeandikwa na faili yetu ya usanidi iko tayari, ni wakati wa kuandika hati ya kupeleka mkataba wetu.

Nenda kwenye folda ya `scripts/` na uunde faili jipya liitwalo `deploy.js`, na uongeze yaliyomo yafuatayo ndani yake:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Anza upelekaji, ukirudisha ahadi inayotatuliwa kuwa kitu cha mkataba
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Mkataba umepelekwa kwenye anwani:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat hufanya kazi nzuri ya kuelezea kile kila mstari wa msimbo huu unafanya katika [mafunzo yao ya Mikataba](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), tumechukua maelezo yao hapa.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` katika ethers.js ni dhana inayotumika kupeleka mikataba-erevu mpya, kwa hivyo `HelloWorld` hapa ni [kiwanda](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) cha vielelezo vya mkataba wetu wa hello world. Wakati unatumia programu-jalizi ya `hardhat-ethers` `ContractFactory` na `Contract`, vielelezo huunganishwa na mtia saini wa kwanza (mmiliki) kwa chaguo-msingi.

```javascript
const hello_world = await HelloWorld.deploy()
```

Kuita `deploy()` kwenye `ContractFactory` kutaanza upelekaji, na kurudisha `Promise` inayotatuliwa kuwa kitu cha `Contract`. Hiki ndicho kitu ambacho kina mbinu kwa kila moja ya kazi zetu za mkataba-erevu.

### Hatua ya 16: Sambaza mkataba wetu {#step-16-deploy-our-contract}

Hatimaye tuko tayari kupeleka mkataba-erevu wetu! Nenda kwenye mstari wa amri na uendeshe:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Unapaswa kisha kuona kitu kama:

```bash
Mkataba umesambazwa kwa anwani: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Tafadhali hifadhi anwani hii**. Tutaitumia baadaye katika mafunzo.

Tukienda kwenye [Goerli etherscan](https://goerli.etherscan.io) na kutafuta anwani yetu ya mkataba tunapaswa kuona kuwa imesambazwa kwa mafanikio. Muamala utaonekana kitu kama hiki:

![](./etherscan-contract.png)

Anwani ya `Kutoka` inapaswa kufanana na anwani ya akaunti yako ya MetaMask na anwani ya `Kwenda` itasema **Uundaji wa Mkataba**. Tukibofya kwenye muamala tutaona anwani yetu ya mkataba katika sehemu ya `Kwenda`.

![](./etherscan-transaction.png)

Hongera! Umepeleka mkataba-erevu kwenye testnet ya Ethereum.

Ili kuelewa kinachoendelea nyuma ya pazia, hebu tuelekee kwenye kichupo cha Explorer katika [dashibodi yetu ya Alchemy](https://dashboard.alchemy.com/explorer). Ikiwa una programu nyingi za Alchemy hakikisha unachuja kwa programu na uchague **Hello World**.

![](./hello-world-explorer.png)

Hapa utaona mbinu chache za JSON-RPC ambazo Hardhat/Ethers zilitengeneza nyuma ya pazia tulipoiita kazi ya `.deploy()`. Mbinu mbili muhimu hapa ni [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), ambalo ni ombi la kuandika mkataba wetu kwenye mnyororo wa Goerli, na [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kwa kutumia hashi. Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo yetu ya kutuma miamala kwa kutumia Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Sehemu ya 2: Wasiliana na Mkataba wako Mahiri {#part-2-interact-with-your-smart-contract}

Sasa kwa kuwa tumefanikiwa kupeleka mkataba-erevu kwenye mtandao wa Goerli, hebu tujifunze jinsi ya kuingiliana nao.

### Unda faili ya interact.js {#create-a-interactjs-file}

Hii ndiyo faili ambapo tutaandika hati yetu ya mwingiliano. Tutatumia maktaba ya Ethers.js uliyosakinisha hapo awali katika Sehemu ya 1.

Ndani ya folda ya `scripts/`, unda faili mpya inayoitwa `interact.js` na uongeze msimbo ufuatao:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Sasisha faili yako ya .env {#update-your-env-file}

Tutakuwa tukitumia vigezo vipya vya mazingira, kwa hivyo tunahitaji kuvifafanua katika faili ya `.env` ambayo [tuliiunda mapema](#step-11-connect-metamask-&-alchemy-to-your-project).

Tutahitaji kuongeza ufafanuzi wa `API_KEY` yetu ya Alchemy na `CONTRACT_ADDRESS` ambapo mkataba wako mahiri ulitumwa.

Faili yako ya `.env` inapaswa kuonekana kama hii:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<ufunguo-wako-wa-api>"
API_KEY = "<ufunguo-wako-wa-api>"
PRIVATE_KEY = "<ufunguo-wako-binafsi-wa-metamask>"
CONTRACT_ADDRESS = "0x<anwani ya mkataba wako>"
```

### Chukua ABI ya mkataba wako {#grab-your-contract-ABI}

[ABI (Kiolesura cha Maombi cha Mfumo-mbili)](/glossary/#abi) ya mkataba wetu ni kiolesura cha kuingiliana na mkataba-erevu wetu. Hardhat hutengeneza ABI kiotomatiki na kuihifadhi katika `HelloWorld.json`. Ili kutumia ABI, tutahitaji kuchanganua yaliyomo kwa kuongeza mistari ifuatayo ya msimbo kwenye faili yetu ya `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Ikiwa unataka kuona ABI unaweza kuichapisha kwenye koni yako:

```javascript
console.log(JSON.stringify(contract.abi))
```

Ili kuona ABI yako ikichapishwa kwenye koni, nenda kwenye terminal yako na uendeshe:

```bash
npx hardhat run scripts/interact.js
```

### Unda mfano wa mkataba wako {#create-an-instance-of-your-contract}

Ili kuingiliana na mkataba wetu, tunahitaji kuunda mfano wa mkataba katika msimbo wetu. Ili kufanya hivyo na Ethers.js, tutahitaji kufanya kazi na dhana tatu:

1. Mtoa huduma - mtoa huduma wa nodi anayekupa ufikiaji wa kusoma na kuandika kwenye mnyororo wa bloku
2. Mwenye saini - inawakilisha akaunti ya Ethereum inayoweza kusaini miamala
3. Mkataba - kitu cha Ethers.js kinachowakilisha mkataba maalum uliotumwa kwenye mnyororo

Tutatumia ABI ya mkataba kutoka hatua ya awali ili kuunda mfano wetu wa mkataba:

```javascript
// interact.js

// Mtoa huduma
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Mwenye saini
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Mkataba
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Jifunze zaidi kuhusu Watoa huduma, Wanaosaini, na Mikataba katika [nyaraka za ethers.js](https://docs.ethers.io/v5/).

### Soma ujumbe wa kuanzisha {#read-the-init-message}

Unakumbuka tuliposambaza mkataba wetu na `initMessage = "Hello world!"`? Sasa tutasoma ujumbe huo uliohifadhiwa katika mkataba-erevu wetu na kuuchapisha kwenye koni.

Katika JavaScript, kazi za asinkroni hutumiwa wakati wa kuingiliana na mitandao. Ili kujifunza zaidi kuhusu kazi za asinkroni, [soma makala hii ya kati](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Tumia msimbo ulio hapa chini kuita kazi ya `ujumbe` katika mkataba-erevu wetu na kusoma ujumbe wa kuanzisha:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Ujumbe ni: " + message)
}
main()
```

Baada ya kuendesha faili kwa kutumia `npx hardhat run scripts/interact.js` kwenye terminal tunapaswa kuona jibu hili:

```
Ujumbe ni: Hello world!
```

Hongera! Umefanikiwa kusoma data ya mkataba-erevu kutoka kwa mnyororo wa bloku wa Ethereum, hongera sana!

### Sasisha ujumbe {#update-the-message}

Badala ya kusoma tu ujumbe, tunaweza pia kusasisha ujumbe uliohifadhiwa katika mkataba-erevu wetu kwa kutumia kazi ya `sasisho`! Inapendeza, sivyo?

Ili kusasisha ujumbe, tunaweza kuita moja kwa moja kazi ya `sasisho` kwenye kitu chetu cha Mkataba kilichoundwa:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Ujumbe ni: " + message)

  console.log("Inasasisha ujumbe...")
  const tx = await helloWorldContract.update("Huu ndio ujumbe mpya.")
  await tx.wait()
}
main()
```

Kumbuka kuwa kwenye mstari wa 11, tunafanya mwito kwa `.wait()` kwenye kitu cha muamala kilichorudishwa. Hii inahakikisha kwamba hati yetu inasubiri muamala uchimbwe kwenye mnyororo wa bloku kabla ya kutoka kwenye kazi. Ikiwa wito wa `.wait()` haujajumuishwa, hati inaweza isione thamani iliyosasishwa ya `ujumbe` katika mkataba.

### Soma ujumbe mpya {#read-the-new-message}

Unapaswa kuwa na uwezo wa kurudia [hatua ya awali](#read-the-init-message) ili kusoma thamani iliyosasishwa ya `ujumbe`. Chukua muda na uone ikiwa unaweza kufanya mabadiliko muhimu ili kuchapisha thamani hiyo mpya!

Ikiwa unahitaji dokezo, hivi ndivyo faili yako ya `interact.js` inavyopaswa kuonekana kwa sasa:

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

// mtiaji saini - wewe
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// mfano wa mkataba
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Ujumbe ni: " + message)

  console.log("Inasasisha ujumbe...")
  const tx = await helloWorldContract.update("huu ni ujumbe mpya")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Ujumbe mpya ni: " + newMessage)
}

main()
```

Sasa endesha tu hati na unapaswa kuona ujumbe wa zamani, hali ya kusasisha, na ujumbe mpya ukichapishwa kwenye terminal yako!

`npx hardhat run scripts/interact.js --network goerli`

```
Ujumbe ni: Hello World!
Inasasisha ujumbe...
Ujumbe mpya ni: Huu ni ujumbe mpya.
```

Wakati unapoendesha hati hiyo, unaweza kugundua kuwa hatua ya `Inasasisha ujumbe...` inachukua muda kupakia kabla ya ujumbe mpya kupakiwa. Hiyo ni kutokana na mchakato wa uchimbaji; ikiwa una hamu ya kufuatilia miamala inapochimbwa, tembelea [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) ili kuona hali ya muamala. Ikiwa muamala umeacha, inasaidia pia kuangalia [Goerli Etherscan](https://goerli.etherscan.io) na kutafuta hashi ya muamala wako.

## Sehemu ya 3: Chapisha Mkataba-erevu wako kwenye Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Umefanya kazi yote ngumu ya kuufanya mkataba-erevu wako kuwa hai; sasa ni wakati wa kuushiriki na ulimwengu!

Kwa kuthibitisha mkataba-erevu wako kwenye Etherscan, mtu yeyote anaweza kuona msimbo wako chanzo na kuingiliana na mkataba-erevu wako. Tuanze!

### Hatua ya 1: Tengeneza Ufunguo wa API kwenye akaunti yako ya Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Ufunguo wa API wa Etherscan ni muhimu ili kuthibitisha kuwa wewe ndiye mmiliki wa mkataba-erevu unaojaribu kuchapisha.

Ikiwa huna akaunti ya Etherscan tayari, [jisajili kwa akaunti](https://etherscan.io/register).

Baada ya kuingia, tafuta jina lako la mtumiaji kwenye upau wa urambazaji, lielekeze juu yake na uchague kitufe cha **Wasifu wangu**.

Kwenye ukurasa wako wa wasifu, unapaswa kuona upau wa urambazaji wa kando. Kutoka kwenye upau wa urambazaji wa kando, chagua **Vifunguo vya API**. Kisha, bonyeza kitufe cha "Ongeza" ili kuunda ufunguo mpya wa API, ipe jina programu yako **hello-world** na bonyeza kitufe cha **Unda Ufunguo Mpya wa API**.

Ufunguo wako mpya wa API unapaswa kuonekana kwenye jedwali la ufunguo wa API. Nakili ufunguo wa API kwenye ubao wako wa kunakili.

Kisha, tunahitaji kuongeza ufunguo wa API wa Etherscan kwenye faili yetu ya `.env`.

Baada ya kuiongeza, faili yako ya `.env` inapaswa kuonekana hivi:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/ufunguo-wako-wa-api"
PUBLIC_KEY = "anwani-yako-ya-akaunti-ya-umma"
PRIVATE_KEY = "anwani-yako-ya-akaunti-binafsi"
CONTRACT_ADDRESS = "anwani-yako-ya-mkataba"
ETHERSCAN_API_KEY = "ufunguo-wako-wa-etherscan"
```

### Mikataba-erevu iliyotumwa na Hardhat {#hardhat-deployed-smart-contracts}

#### Sakinisha hardhat-etherscan {#install-hardhat-etherscan}

Kuchapisha mkataba wako kwa Etherscan kwa kutumia Hardhat ni rahisi. Kwanza utahitaji kusakinisha programu-jalizi ya `hardhat-etherscan` ili kuanza. `hardhat-etherscan` itathibitisha kiotomatiki msimbo chanzo wa mkataba-erevu na ABI kwenye Etherscan. Ili kuongeza hii, katika saraka ya `hello-world` endesha:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Baada ya kusakinishwa, jumuisha taarifa ifuatayo juu ya `hardhat.config.js` yako, na ongeza chaguzi za usanidi wa Etherscan:

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

#### Thibitisha mkataba-erevu wako kwenye Etherscan {#verify-your-smart-contract-on-etherscan}

Hakikisha faili zote zimehifadhiwa na vigezo vyote vya `.env` vimesanidiwa ipasavyo.

Endesha kazi ya `kuthibitisha`, ukipitisha anwani ya mkataba, na mtandao ambapo umewekwa:

```text
npx hardhat verify --network goerli ANWANI_YA_MKATABA_ULIOPELEKWA 'Hello World!'
```

Hakikisha kwamba `ANWANI_YA_MKATABA_ULIOPELEKWA` ni anwani ya mkataba-erevu wako uliotumwa kwenye mtandao wa majaribio wa Goerli. Pia, hoja ya mwisho (`'Hello World!'`) lazima iwe thamani sawa ya mfuatano iliyotumiwa [wakati wa hatua ya kupeleka katika sehemu ya 1](#write-our-deploy-script).

Ikiwa yote yatakwenda sawa, utaona ujumbe ufuatao kwenye terminal yako:

```text
Msimbo chanzo umewasilishwa kwa mafanikio kwa mkataba
contracts/HelloWorld.sol:HelloWorld kwenye 0xdeployed-contract-address
kwa uthibitisho kwenye Etherscan. Inasubiri matokeo ya uthibitisho...


Mkataba wa HelloWorld umethibitishwa kwa mafanikio kwenye Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Hongera! Msimbo wako wa mkataba-erevu uko kwenye Etherscan!

### Angalia mkataba-erevu wako kwenye Etherscan! {#check-out-your-smart-contract-on-etherscan}

Unapoelekea kwenye kiungo kilichotolewa kwenye terminal yako, unapaswa kuwa na uwezo wa kuona msimbo wako wa mkataba-erevu na ABI zilizochapishwa kwenye Etherscan!

**Wahooo - umefanikiwa bingwa! Sasa mtu yeyote anaweza kuita au kuandika kwa mkataba-erevu wako! Tunatarajia kuona utakachojenga baadaye!**

## Sehemu ya 4 - Kuunganisha mkataba-erevu wako na sehemu ya mbele {#part-4-integrating-your-smart-contract-with-the-frontend}

Mwishoni mwa mafunzo haya, utajua jinsi ya:

- Unganisha mkoba wa MetaMask kwenye mfumo mtawanyo wa kimamlaka wako
- Soma data kutoka kwa mkataba-erevu wako kwa kutumia API ya [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Saini miamala ya Ethereum kwa kutumia MetaMask

Kwa mfumo mtawanyo wa kimamlaka huu, tutatumia [React](https://react.dev/) kama mfumo wetu wa mbele; hata hivyo, ni muhimu kutambua kwamba hatutatumia muda mwingi kuchanganua misingi yake, kwani tutazingatia zaidi kuleta utendaji wa Web3 kwenye mradi wetu.

Kama sharti, unapaswa kuwa na uelewa wa kiwango cha mwanzo cha React. Ikiwa sivyo, tunapendekeza ukamilishe [mafunzo rasmi ya Utangulizi wa React](https://react.dev/learn).

### Nakili faili za kuanzia {#clone-the-starter-files}

Kwanza, nenda kwenye [hazina ya GitHub ya hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) ili kupata faili za kuanzia za mradi huu na unakili hazina hii kwenye mashine yako ya ndani.

Fungua hazina iliyonakiliwa ndani ya nchi. Angalia kuwa ina folda mbili: `starter-files` na `completed`.

- `starter-files`- **tutafanya kazi katika saraka hii**, tutaunganisha UI na mkoba wako wa Ethereum na mkataba-erevu tuliouchapisha kwenye Etherscan katika [Sehemu ya 3](#part-3).
- `completed` ina mafunzo yote yaliyokamilika na inapaswa kutumika tu kama rejea ukikwama.

Kisha, fungua nakala yako ya `starter-files` kwenye kihariri chako cha msimbo unachokipenda, na kisha nenda kwenye folda ya `src`.

Msimbo wote tutakaouandika utakuwa chini ya folda ya `src`. Tutakuwa tukihariri kijenzi cha `HelloWorld.js` na faili za JavaScript za `util/interact.js` ili kuupa mradi wetu utendaji wa Web3.

### Angalia faili za kuanzia {#check-out-the-starter-files}

Kabla ya kuanza kuandika msimbo, hebu tuchunguze tulichopewa katika faili za kuanzia.

#### Fanya mradi wako wa react uendeshwe {#get-your-react-project-running}

Tuanze kwa kuendesha mradi wa React katika kivinjari chetu. Uzuri wa React ni kwamba mara tu mradi wetu unapokuwa ukifanya kazi katika kivinjari chetu, mabadiliko yoyote tunayohifadhi yatasasishwa moja kwa moja kwenye kivinjari chetu.

Ili kuendesha mradi, nenda kwenye saraka kuu ya folda ya `starter-files`, na kisha endesha `npm install` kwenye terminal yako ili kusakinisha vitegemezi vya mradi:

```bash
cd starter-files
npm install
```

Mara tu hizo zikimaliza kusakinisha, endesha `npm start` kwenye terminal yako:

```bash
npm start
```

Kufanya hivyo kunapaswa kufungua [http://localhost:3000/](http://localhost:3000/) kwenye kivinjari chako, ambapo utaona sehemu ya mbele ya mradi wetu. Inapaswa kuwa na sehemu moja (mahali pa kusasisha ujumbe uliohifadhiwa katika mkataba-erevu wako), kitufe cha "Unganisha Mkoba", na kitufe cha "Sasisha".

Ukijaribu kubofya kitufe chochote, utagundua kuwa havifanyi kazi—hiyo ni kwa sababu bado tunahitaji kupanga utendaji wao.

#### Kijenzi cha `HelloWorld.js` {#the-helloworld-js-component}

Hebu turudi kwenye folda ya `src` kwenye kihariri chetu na tufungue faili ya `HelloWorld.js`. Ni muhimu sana tuelewe kila kitu katika faili hii, kwani ndicho kijenzi kikuu cha React tutakachokuwa tukifanyia kazi.

Juu ya faili hii, utaona tuna taarifa kadhaa za uingizaji ambazo ni muhimu ili mradi wetu uendeshwe, ikiwa ni pamoja na maktaba ya React, hook za useEffect na useState, baadhi ya vitu kutoka `./util/interact.js` (tutaelezea kwa undani zaidi hivi karibuni!), na nembo ya Alchemy.

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

Kisha, tuna vigezo vyetu vya hali ambavyo tutasasisha baada ya matukio maalum.

```javascript
// HelloWorld.js

//Vigezo vya hali
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Hakuna muunganisho na mtandao.")
const [newMessage, setNewMessage] = useState("")
```

Hivi ndivyo kila kigezo kinavyowakilisha:

- `walletAddress` - mfuatano unaohifadhi anwani ya pochi ya mtumiaji
- `status`- mfuatano unaohifadhi ujumbe muhimu unaomwongoza mtumiaji jinsi ya kuingiliana na mfumo mtawanyo wa kimamlaka
- `message` - mfuatano unaohifadhi ujumbe wa sasa katika mkataba-erevu
- `newMessage` - mfuatano unaohifadhi ujumbe mpya utakaondikwa kwenye mkataba-erevu

Baada ya vigezo vya hali, utaona kazi tano ambazo hazijatekelezwa: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, na `onUpdatePressed`. Tutaeleza wanachofanya hapa chini:

```javascript
// HelloWorld.js

//inayoitwa mara moja tu
useEffect(async () => {
  //TODO: tekeleza
}, [])

function addSmartContractListener() {
  //TODO: tekeleza
}

function addWalletListener() {
  //TODO: tekeleza
}

const connectWalletPressed = async () => {
  //TODO: tekeleza
}

const onUpdatePressed = async () => {
  //TODO: tekeleza
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- hii ni hook ya React inayoitwa baada ya kijenzi chako kutolewa. Kwa sababu ina propu ya safu tupu `[]` iliyopitishwa ndani yake (tazama mstari wa 4), itaitwa tu kwenye utoaji wa _kwanza_ wa kijenzi. Hapa tutapakia ujumbe wa sasa uliohifadhiwa katika mkataba-erevu wetu, tuite wasikilizaji wetu wa mkataba-erevu na mkoba, na tusasishe UI yetu ili kuonyesha ikiwa mkoba tayari umeunganishwa.
- `addSmartContractListener`- kazi hii inaweka msikilizaji ambaye atatazama tukio la `UpdatedMessages` la mkataba wetu wa HelloWorld na kusasisha UI yetu ujumbe unapobadilishwa katika mkataba-erevu wetu.
- `addWalletListener`- kazi hii inaweka msikilizaji anayegundua mabadiliko katika hali ya mkoba wa MetaMask wa mtumiaji, kama vile mtumiaji anapotenganisha mkoba wake au kubadilisha anwani.
- `connectWalletPressed`- kazi hii itaitwa ili kuunganisha mkoba wa MetaMask wa mtumiaji kwenye mfumo mtawanyo wa kimamlaka wetu.
- `onUpdatePressed` - kazi hii itaitwa wakati mtumiaji anataka kusasisha ujumbe uliohifadhiwa katika mkataba-erevu.

Karibu na mwisho wa faili hii, tuna UI ya kijenzi chetu.

```javascript
// HelloWorld.js

//UI ya kijenzi chetu
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Imeunganishwa: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Unganisha Mkoba</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Ujumbe wa Sasa:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Ujumbe Mpya:</h2>

    <div>
      <input
        type="text"
        placeholder="Sasisha ujumbe katika mkataba-erevu wako."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Sasisha
      </button>
</div>
 
</div>
)
```

Ukichunguza msimbo huu kwa makini, utaona wapi tunatumia vigezo vyetu mbalimbali vya hali katika UI yetu:

- Kwenye mistari 6-12, ikiwa mkoba wa mtumiaji umeunganishwa (yaani, `walletAddress.length > 0`), tunaonyesha toleo lililofupishwa la `anwani ya mkoba` wa mtumiaji katika kitufe chenye ID "walletButton;" vinginevyo inasema tu "Unganisha Mkoba".
- Kwenye mstari wa 17, tunaonyesha ujumbe wa sasa uliohifadhiwa katika mkataba-erevu, ambao unanaswa katika mfuatano wa `ujumbe`.
- Kwenye mistari 23-26, tunatumia [kijenzi kinachodhibitiwa](https://legacy.reactjs.org/docs/forms.html#controlled-components) kusasisha kigezo chetu cha hali cha `newMessage` wakati ingizo katika sehemu ya maandishi linapobadilika.

Mbali na vigezo vyetu vya hali, utaona pia kwamba kazi za `connectWalletPressed` na `onUpdatePressed` huitwa wakati vitufe vyenye ID `publishButton` na `walletButton` vinapobofywa mtawalia.

Mwisho, hebu tushughulikie wapi kijenzi hiki cha `HelloWorld.js` kinaongezwa.

Ukienda kwenye faili ya `App.js`, ambayo ni kijenzi kikuu katika React kinachofanya kazi kama chombo cha vijenzi vingine vyote, utaona kwamba kijenzi chetu cha `HelloWorld.js` kinaingizwa kwenye mstari wa 7.

Mwisho lakini sio uchache, hebu tuangalie faili moja zaidi uliyopewa, faili ya `interact.js`.

#### Faili ya `interact.js` {#the-interact-js-file}

Kwa sababu tunataka kufuata dhana ya [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), tutataka faili tofauti ambayo ina kazi zetu zote za kudhibiti mantiki, data, na sheria za mfumo mtawanyo wa kimamlaka wetu, na kisha tuweze kuhamisha kazi hizo kwenye sehemu yetu ya mbele (kijenzi chetu cha `HelloWorld.js`).

👆🏽Hii ndiyo hasa madhumuni ya faili yetu ya `interact.js`!

Nenda kwenye folda ya `util` katika saraka yako ya `src`, na utaona tumejumuisha faili inayoitwa `interact.js` ambayo itakuwa na kazi zetu zote za mwingiliano wa mkataba-erevu na mkoba na vigezo.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Utaona juu ya faili kwamba tumeacha maoni kwenye kitu cha `helloWorldContract`. Baadaye katika mafunzo haya, tutaondoa maoni kwenye kitu hiki na kuanzisha mkataba-erevu wetu katika kigezo hiki, ambacho kisha tutakihamisha kwenye kijenzi chetu cha `HelloWorld.js`.

Kazi nne ambazo hazijatekelezwa baada ya kitu chetu cha `helloWorldContract` hufanya yafuatayo:

- `loadCurrentMessage` - kazi hii inashughulikia mantiki ya kupakia ujumbe wa sasa uliohifadhiwa katika mkataba-erevu. Itafanya wito wa _kusoma_ kwa mkataba-erevu wa Hello World kwa kutumia [API ya Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - kazi hii itaunganisha MetaMask ya mtumiaji kwenye mfumo mtawanyo wa kimamlaka wetu.
- `getCurrentWalletConnected` - kazi hii itaangalia ikiwa akaunti ya Ethereum tayari imeunganishwa na mfumo mtawanyo wa kimamlaka wetu wakati wa upakiaji wa ukurasa na kusasisha UI yetu ipasavyo.
- `updateMessage` - kazi hii itasasisha ujumbe uliohifadhiwa katika mkataba-erevu. Itafanya mwito wa _kuandika_ kwa mkataba-erevu wa Hello World, hivyo mkoba wa MetaMask wa mtumiaji utalazimika kusaini muamala wa Ethereum ili kusasisha ujumbe.

Sasa kwa kuwa tunaelewa tunachofanya kazi nacho, hebu tujue jinsi ya kusoma kutoka kwa mkataba-erevu wetu!

### Hatua ya 3: Soma kutoka kwa mkataba-erevu wako {#step-3-read-from-your-smart-contract}

Ili kusoma kutoka kwa mkataba-erevu wako, utahitaji kusanidi kwa mafanikio:

- Muunganisho wa API kwenye mnyororo wa Ethereum
- Mfano uliopakiwa wa mkataba-erevu wako
- Kazi ya kuita kazi ya mkataba-erevu wako
- Msikilizaji wa kutazama masasisho wakati data unayosoma kutoka kwa mkataba-erevu inapobadilika

Hii inaweza kuonekana kama hatua nyingi, lakini usijali! Tutakuongoza jinsi ya kufanya kila moja hatua kwa hatua! :\)

#### Anzisha muunganisho wa API kwenye mnyororo wa Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Kwa hiyo unakumbuka jinsi katika Sehemu ya 2 ya mafunzo haya, tulitumia ufunguo wetu wa [Alchemy Web3 kusoma kutoka kwa mkataba-erevu wetu](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Utahitaji pia ufunguo wa Alchemy Web3 katika mfumo mtawanyo wa kimamlaka wako ili kusoma kutoka kwenye mnyororo.

Ikiwa huna tayari, kwanza sakinisha [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kwa kwenda kwenye saraka kuu ya `starter-files` yako na kuendesha yafuatayo kwenye terminal yako:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ni kifuniko karibu na [Web3.js](https://docs.web3js.org/), inayotoa mbinu za API zilizoboreshwa na manufaa mengine muhimu ili kurahisisha maisha yako kama msanidi programu wa web3. Imeundwa kuhitaji usanidi mdogo ili uweze kuanza kuitumia katika programu yako mara moja!

Kisha, sakinisha kifurushi cha [dotenv](https://www.npmjs.com/package/dotenv) katika saraka ya mradi wako, ili tuwe na mahali salama pa kuhifadhi ufunguo wetu wa API baada ya kuupata.

```text
npm install dotenv --save
```

Kwa mfumo mtawanyo wa kimamlaka wetu, **tutatumia ufunguo wetu wa API wa Websockets** badala ya ufunguo wetu wa API wa HTTP, kwani utaturuhusu kuweka msikilizaji anayegundua wakati ujumbe uliohifadhiwa katika mkataba-erevu unapobadilika.

Baada ya kupata ufunguo wako wa API, unda faili ya `.env` katika saraka yako kuu na uongeze url yako ya Websockets ya Alchemy. Baadaye, faili yako ya `.env` inapaswa kuonekana hivi:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Sasa, tuko tayari kusanidi kituo chetu cha Alchemy Web3 katika mfumo mtawanyo wa kimamlaka wetu! Hebu turudi kwenye `interact.js` yetu, ambayo iko ndani ya folda yetu ya `util` na tuongeze msimbo ufuatao juu ya faili:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Hapo juu, kwanza tuliingiza ufunguo wa Alchemy kutoka kwa faili yetu ya `.env` na kisha tukapitisha `alchemyKey` yetu kwa `createAlchemyWeb3` ili kuanzisha kituo chetu cha Alchemy Web3.

Na kituo hiki kikiwa tayari, ni wakati wa kupakia mkataba-erevu wetu!

#### Inapakia mkataba-erevu wako wa Hello World {#loading-your-hello-world-smart-contract}

Ili kupakia mkataba-erevu wako wa Hello World, utahitaji anwani yake ya mkataba na ABI, zote mbili zinaweza kupatikana kwenye Etherscan ikiwa ulikamilisha [Sehemu ya 3 ya mafunzo haya.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Jinsi ya kupata ABI ya mkataba wako kutoka Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Ikiwa uliruka Sehemu ya 3 ya mafunzo haya, unaweza kutumia mkataba wa HelloWorld na anwani [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). ABI yake inaweza kupatikana [hapa](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI ya mkataba ni muhimu kwa kubainisha ni kazi gani mkataba utaita na pia kuhakikisha kuwa kazi hiyo itarudisha data katika umbizo unalotarajia. Baada ya kunakili ABI yetu ya mkataba, hebu tuihifadhi kama faili ya JSON inayoitwa `contract-abi.json` katika saraka yako ya `src`.

Faili yako ya contract-abi.json inapaswa kuhifadhiwa katika folda yako ya src.

Tukiwa na anwani ya mkataba wetu, ABI, na kituo cha Alchemy Web3, tunaweza kutumia [mbinu ya mkataba](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kupakia mfano wa mkataba-erevu wetu. Ingiza ABI ya mkataba wako kwenye faili ya `interact.js` na uongeze anwani ya mkataba wako.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Sasa tunaweza hatimaye kuondoa maoni kwenye kigezo chetu cha `helloWorldContract`, na kupakia mkataba-erevu kwa kutumia kituo chetu cha AlchemyWeb3:

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

Sasa kwa kuwa mkataba wetu umepakiwa, tunaweza kutekeleza kazi yetu ya `loadCurrentMessage`!

#### Kutekeleza `loadCurrentMessage` katika faili yako ya `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Kazi hii ni rahisi sana. Tutafanya wito rahisi wa asinkroni wa web3 kusoma kutoka kwa mkataba wetu. Kazi yetu itarudisha ujumbe uliohifadhiwa katika mkataba-erevu:

Sasisha `loadCurrentMessage` katika faili yako ya `interact.js` kuwa ifuatavyo:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Kwa kuwa tunataka kuonyesha mkataba-erevu huu katika UI yetu, hebu tusasishe kazi ya `useEffect` katika kijenzi chetu cha `HelloWorld.js` kuwa ifuatavyo:

```javascript
// HelloWorld.js

//inayoitwa mara moja tu
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Kumbuka, tunataka tu `loadCurrentMessage` iitwe mara moja wakati wa utoaji wa kwanza wa kijenzi. Hivi karibuni tutatekeleza `addSmartContractListener` ili kusasisha UI kiotomatiki baada ya ujumbe katika mkataba-erevu kubadilika.

Kabla ya kuingia kwenye msikilizaji wetu, hebu tuangalie tulichonacho hadi sasa! Hifadhi faili zako za `HelloWorld.js` na `interact.js`, na kisha nenda kwenye [http://localhost:3000/](http://localhost:3000/)

Utaona kwamba ujumbe wa sasa hausomi tena "Hakuna muunganisho na mtandao." Badala yake unaonyesha ujumbe uliohifadhiwa katika mkataba-erevu. Safi!

#### UI yako sasa inapaswa kuonyesha ujumbe uliohifadhiwa katika mkataba-erevu {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Sasa tukizungumzia msikilizaji huyo...

#### Tekeleza `addSmartContractListener` {#implement-addsmartcontractlistener}

Ukikumbuka faili ya `HelloWorld.sol` tuliyoandika katika [Sehemu ya 1 ya mfululizo huu wa mafunzo](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), utakumbuka kuwa kuna tukio la mkataba-erevu linaloitwa `UpdatedMessages` ambalo hutolewa baada ya kazi ya `update` ya mkataba-erevu wetu kuitwa (tazama mistari 9 na 27):

```javascript
// HelloWorld.sol

// Inabainisha toleo la Solidity, kwa kutumia matoleo ya kimantiki.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Inafafanua mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa kazi na data (hali yake). Baada ya kupelekwa, mkataba hukaa kwenye anwani maalum kwenye mnyororo wa bloku wa Ethereum. Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Hutolewa wakati kazi ya sasisho inapoitwa
   // Matukio ya mkataba-erevu ni njia ya mkataba wako kuwasiliana kwamba kitu kilitokea kwenye mnyororo wa bloku kwa programu yako ya mbele, ambayo inaweza kuwa 'inasikiliza' matukio fulani na kuchukua hatua yanapotokea.
   event UpdatedMessages(string oldStr, string newStr);

   // Inatangaza kigezo cha hali `message` cha aina ya `string`.
   // Vigezo vya hali ni vigezo ambavyo thamani zake huhifadhiwa kabisa katika hifadhi ya mkataba. Neno muhimu `public` hufanya vigezo kupatikana kutoka nje ya mkataba na huunda kazi ambayo mikataba mingine au wateja wanaweza kuita ili kupata thamani.
   string public message;

   // Sawa na lugha nyingi za upangaji zinazotegemea darasa, konstruka ni kazi maalum ambayo hutekelezwa tu wakati wa uundaji wa mkataba.
   // Konstruka hutumiwa kuanzisha data ya mkataba. Jifunze zaidi:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Inakubali hoja ya mfuatano `initMessage` na kuweka thamani katika kigezo cha hifadhi cha mkataba `message`).
      message = initMessage;
   }

   // Kazi ya umma inayokubali hoja ya mfuatano na kusasisha kigezo cha hifadhi `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Matukio ya mkataba-erevu ni njia ya mkataba wako kuwasiliana kwamba kitu kilitokea (yaani, kulikuwa na _tukio_) kwenye mnyororo wa bloku kwa programu yako ya mbele, ambayo inaweza kuwa 'inasikiliza' matukio maalum na kuchukua hatua yanapotokea.

Kazi ya `addSmartContractListener` itasikiliza hasa tukio la `UpdatedMessages` la mkataba-erevu wetu wa Hello World, na kusasisha UI yetu ili kuonyesha ujumbe mpya.

Badilisha `addSmartContractListener` kuwa ifuatavyo:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Ujumbe wako umesasishwa!")
    }
  })
}
```

Hebu tuchanganue kinachotokea wakati msikilizaji anapogundua tukio:

- Ikiwa kosa litatokea wakati tukio linapotolewa, litaonyeshwa kwenye UI kupitia kigezo chetu cha hali cha `hali`.
- Vinginevyo, tutatumia kitu cha `data` kilichorudishwa. `data.returnValues` ni safu iliyopangwa kuanzia sifuri ambapo kipengele cha kwanza katika safu huhifadhi ujumbe wa awali na kipengele cha pili huhifadhi ule uliosasishwa. Kwa ujumla, kwenye tukio lililofanikiwa tutaweka mfuatano wetu wa `ujumbe` kuwa ujumbe uliosasishwa, tufute mfuatano wa `ujumbeMpya`, na tusasishe kigezo chetu cha hali cha `hali` ili kuonyesha kwamba ujumbe mpya umechapishwa kwenye mkataba-erevu wetu.

Mwisho, hebu tuite msikilizaji wetu katika kazi yetu ya `useEffect` ili ianzishwe kwenye utoaji wa kwanza wa kijenzi cha `HelloWorld.js`. Kwa ujumla, kazi yako ya `useEffect` inapaswa kuonekana hivi:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Sasa kwa kuwa tunaweza kusoma kutoka kwa mkataba-erevu wetu, ingekuwa vizuri kujua jinsi ya kuandika ndani yake pia! Hata hivyo, ili kuandika kwenye mfumo mtawanyo wa kimamlaka wetu, lazima kwanza tuwe na mkoba wa Ethereum uliounganishwa nao.

Kwa hiyo, baadaye tutashughulikia kusanidi mkoba wetu wa Ethereum (MetaMask) na kisha kuunganisha na mfumo mtawanyo wa kimamlaka wetu!

### Hatua ya 4: Sanidi mkoba wako wa Ethereum {#step-4-set-up-your-ethereum-wallet}

Ili kuandika chochote kwenye mnyororo wa Ethereum, watumiaji lazima wasaini miamala kwa kutumia funguo zao za faragha za mkoba halisi. Kwa mafunzo haya, tutatumia [MetaMask](https://metamask.io/), mkoba halisi kwenye kivinjari unaotumiwa kudhibiti anwani ya akaunti yako ya Ethereum, kwani hurahisisha sana utiaji saini wa muamala huu kwa mtumiaji wa mwisho.

Ikiwa unataka kuelewa zaidi jinsi miamala kwenye Ethereum inavyofanya kazi, angalia [ukurasa huu](/developers/docs/transactions/) kutoka kwa Msingi wa Ethereum.

#### Pakua MetaMask {#download-metamask}

Unaweza kupakua na kuunda akaunti ya MetaMask bure [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha umebadili na kuweka "Mtandao wa Majaribio wa Goerli" juu kulia (ili tusitumie pesa halisi).

#### Ongeza ether kutoka kwa Bomba {#add-ether-from-a-faucet}

Ili kusaini muamala kwenye mnyororo wa bloku wa Ethereum, tutahitaji Eth bandia. Ili kupata Eth unaweza kwenda kwenye [FaucETH](https://fauceth.komputing.org) na uweke anwani ya akaunti yako ya Goerli, bofya "Omba fedha", kisha uchague "Ethereum Testnet Goerli" katika menyu kunjuzi na hatimaye bofya kitufe cha "Omba fedha" tena. Unapaswa kuona Eth katika akaunti yako ya MetaMask muda mfupi baadaye!

#### Angalia Salio lako {#check-your-balance}

Ili kuhakikisha salio letu lipo, hebu tufanye ombi la [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) kwa kutumia [zana ya mtunzi ya Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Hii itarudisha kiasi cha Eth katika pochi yetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Tuma Ombi”, unapaswa kuona jibu kama hili:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**KUMBUKA:** Matokeo haya yako katika wei si eth. Wei hutumika kama denomina ndogo zaidi ya ether. Ubadilishaji kutoka wei hadi eth ni: 1 eth = 10¹⁸ wei. Kwa hivyo, tukibadilisha 0xde0b6b3a7640000 hadi desimali tunapata 1\*10¹⁸ ambayo ni sawa na eth 1.

Phew! Pesa zetu bandia zote zipo! 🤑

### Hatua ya 5: Unganisha MetaMask na UI yako {#step-5-connect-metamask-to-your-UI}

Sasa kwa kuwa pochi yetu ya MetaMask imesanidiwa, hebu tuunganishe mfumo wetu uliotawanywa nayo!

#### Kazi ya `connectWallet` {#the-connectWallet-function}

Katika faili yetu ya `interact.js`, hebu tutekeleze kazi ya `connectWallet`, ambayo tunaweza kuiita katika kijenzi chetu cha `HelloWorld.js`.

Hebu tubadilishe `connectWallet` kuwa ifuatavyo:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Andika ujumbe kwenye sehemu ya maandishi hapo juu.",
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
              Lazima usakinishe MetaMask, mkoba halisi wa Ethereum, katika kivinjari chako.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Kwa hiyo, je, kizuizi hiki kikubwa cha msimbo kinafanya nini hasa?

Naam, kwanza, huangalia ikiwa `window.ethereum` imewezeshwa katika kivinjari chako.

`window.ethereum` ni API ya kimataifa inayoingizwa na MetaMask na watoa huduma wengine wa pochi ambayo inaruhusu tovuti kuomba akaunti za Ethereum za watumiaji. Ikiwa imeidhinishwa, inaweza kusoma data kutoka kwa minyororo ya bloku ambayo mtumiaji ameunganishwa nayo, na kupendekeza mtumiaji asaini ujumbe na miamala. Angalia [hati za MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) kwa maelezo zaidi!

Ikiwa `window.ethereum` _haipo_, basi hiyo inamaanisha kuwa MetaMask haijasakinishwa. Hii inasababisha kurudishwa kwa kitu cha JSON, ambapo `anwani` iliyorudishwa ni mfuatano tupu, na kitu cha `status` cha JSX kinaeleza kuwa mtumiaji lazima asakinishe MetaMask.

Sasa ikiwa `window.ethereum` _ipo_, hapo ndipo mambo yanapopendeza.

Kwa kutumia kitanzi cha kujaribu/kukamatwa, tutajaribu kuunganisha kwenye MetaMask kwa kuita [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Kuita kazi hii kutafungua MetaMask kwenye kivinjari, ambapo mtumiaji ataombwa kuunganisha pochi yake kwenye mfumo wako uliotawanywa.

- Ikiwa mtumiaji atachagua kuunganisha, `method: "eth_requestAccounts"` itarudisha safu iliyo na anwani zote za akaunti za mtumiaji zilizounganishwa na mfumo mtawanyo wa kimamlaka. Kwa pamoja, kazi yetu ya `connectWallet` itarudisha kitu cha JSON kilicho na `anwani` ya _kwanza_ katika safu hii (tazama mstari wa 9) na ujumbe wa `status` unaomwomba mtumiaji aandike ujumbe kwenye mkataba erevu.
- Ikiwa mtumiaji atakataa muunganisho, basi kitu cha JSON kitakuwa na mfuatano tupu kwa `anwani` iliyorudishwa na ujumbe wa `status` unaoonyesha kuwa mtumiaji alikataa muunganisho.

Sasa kwa kuwa tumeandika kazi hii ya `connectWallet`, hatua inayofuata ni kuiita kwenye kijenzi chetu cha `HelloWorld.js`.

#### Ongeza kazi ya `connectWallet` kwenye Kijenzi chako cha UI cha `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Nenda kwenye kazi ya `connectWalletPressed` katika `HelloWorld.js`, na uisasishe kuwa ifuatavyo:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Je, unaona jinsi utendaji wetu mwingi umefichwa kutoka kwa kijenzi chetu cha `HelloWorld.js` kutoka kwa faili ya `interact.js`? Hii ni ili tuendane na dhana ya M-V-C!

Katika `connectWalletPressed`, tunafanya tu wito wa kusubiri kwa kazi yetu iliyoingizwa ya `connectWallet`, na kwa kutumia jibu lake, tunasasisha vigezo vyetu vya `status` na `walletAddress` kupitia ndoana zao za hali.

Sasa, hebu tuhifadhi faili zote mbili (`HelloWorld.js` na `interact.js`) na tujaribu UI yetu hadi sasa.

Fungua kivinjari chako kwenye ukurasa wa [http://localhost:3000/](http://localhost:3000/), na ubonyeze kitufe cha "Unganisha Mkoba" juu kulia mwa ukurasa.

Ikiwa umesakinisha MetaMask, unapaswa kuombwa kuunganisha pochi yako kwenye mfumo wako uliotawanywa. Kubali mwaliko wa kuunganisha.

Unapaswa kuona kwamba kitufe cha mkoba sasa kinaonyesha kwamba anwani yako imeunganishwa! Yasssss 🔥

Kisha, jaribu kuonyesha upya ukurasa... hii ni ajabu. Kitufe chetu cha pochi kinatuomba tuunganishe MetaMask, ingawa tayari imeunganishwa...

Hata hivyo, usiogope! Tunaweza kushughulikia hilo kwa urahisi (umeipata?) kwa kutekeleza `getCurrentWalletConnected`, ambayo itaangalia ikiwa anwani tayari imeunganishwa na mfumo mtawanyo wa kimamlaka wetu na kusasisha UI yetu ipasavyo!

#### Kazi ya `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Sasisha kazi yako ya `getCurrentWalletConnected` katika faili ya `interact.js` kuwa ifuatavyo:

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
          status: "👆🏽 Andika ujumbe kwenye sehemu ya maandishi hapo juu.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Unganisha na MetaMask ukitumia kitufe cha juu kulia.",
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
              Lazima usakinishe MetaMask, mkoba halisi wa Ethereum, katika kivinjari chako.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Msimbo huu _unafanana sana_ na kazi ya `connectWallet` tuliyoandika katika hatua iliyopita.

Tofauti kuu ni kwamba badala ya kuita mbinu ya `eth_requestAccounts`, ambayo inafungua MetaMask kwa mtumiaji kuunganisha pochi yake, hapa tunaita mbinu ya `eth_accounts`, ambayo inarudisha tu safu iliyo na anwani za MetaMask zilizounganishwa kwa sasa kwenye mfumo wetu uliotawanywa.

Ili kuona kazi hii ikifanya kazi, hebu tuiite katika kazi yetu ya `useEffect` ya kijenzi chetu cha `HelloWorld.js`:

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

Sasa kwa kuwa umeongeza msimbo huu, hebu tujaribu kuonyesha upya dirisha la kivinjari chetu.

Safi sana! Kitufe kinapaswa kusema kuwa umeunganishwa, na kuonyesha hakikisho la anwani ya pochi yako iliyounganishwa - hata baada ya kuonyesha upya!

#### Tekeleza `addWalletListener` {#implement-addwalletlistener}

Hatua ya mwisho katika usanidi wa pochi ya mfumo wetu uliotawanywa ni kutekeleza msikilizaji wa pochi ili UI yetu isasishwe wakati hali ya pochi yetu inabadilika, kama vile mtumiaji anapokatisha muunganisho au kubadilisha akaunti.

Katika faili yako ya `HelloWorld.js`, badilisha kazi yako ya `addWalletListener` kama ifuatavyo:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Andika ujumbe kwenye sehemu ya maandishi hapo juu.")
      } else {
        setWallet("")
        setStatus("🦊 Unganisha na MetaMask ukitumia kitufe cha juu kulia.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Lazima usakinishe MetaMask, mkoba halisi wa Ethereum, katika kivinjari chako.
        </a>
      </p>
    )
  }
}
```

Nina hakika hauhitaji hata msaada wetu kuelewa kinachoendelea hapa kwa sasa, lakini kwa madhumuni ya ukamilifu, hebu tuchanganue haraka:

- Kwanza, kazi yetu inakagua ikiwa `window.ethereum` imewezeshwa (yaani, MetaMask imesakinishwa).
  - Ikiwa sivyo, tunaweka tu kigezo chetu cha hali cha `status` kuwa mfuatano wa JSX unaomwomba mtumiaji asakinishe MetaMask.
  - Ikiwa imewezeshwa, tunaweka msikilizaji `window.ethereum.on("accountsChanged")` kwenye mstari wa 3 anayesikiliza mabadiliko ya hali katika pochi ya MetaMask, ambayo ni pamoja na wakati mtumiaji anapounganisha akaunti ya ziada kwenye mfumo uliotawanywa, anapobadilisha akaunti, au anapokatisha muunganisho wa akaunti. Ikiwa kuna angalau akaunti moja iliyounganishwa, kigezo cha hali cha `walletAddress` kinasasishwa kama akaunti ya kwanza katika safu ya `accounts` iliyorudishwa na msikilizaji. Vinginevyo, `walletAddress` huwekwa kama mfuatano tupu.

Mwisho lakini sio uchache, lazima tuiite katika kazi yetu ya `useEffect`:

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

Na ndivyo hivyo! Tumefanikiwa kukamilisha upangaji wote wa utendaji wetu wa mkoba! Sasa kwenye kazi yetu ya mwisho: kusasisha ujumbe uliohifadhiwa katika mkataba-erevu wetu!

### Hatua ya 6: Tekeleza kazi ya `updateMessage` {#step-6-implement-the-updateMessage-function}

Sawa jamani, tumefika mwisho! Katika `updateMessage` ya faili yako ya `interact.js`, tutafanya yafuatayo:

1. Hakikisha ujumbe tunaotaka kuchapisha katika mkataba wetu mahiri ni halali
2. Saini muamala wetu kwa kutumia MetaMask
3. Ita kazi hii kutoka kwa kijenzi chetu cha mbele cha `HelloWorld.js`

Hii haitachukua muda mrefu; hebu tumalize mfumo mtawanyo wa kimamlaka huu!

#### Ushughulikiaji wa hitilafu ya ingizo {#input-error-handling}

Kwa kawaida, inaleta maana kuwa na aina fulani ya utunzaji wa makosa ya ingizo mwanzoni mwa kazi.

Tutataka kazi yetu irudi mapema ikiwa hakuna kiendelezi cha MetaMask kilichosakinishwa, hakuna mkoba uliounganishwa (yaani, `anwani` iliyopitishwa ni mfuatano tupu), au `ujumbe` ni mfuatano tupu. Hebu tuongeze utunzaji wa makosa ufuatao kwenye `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Unganisha mkoba wako wa MetaMask ili kusasisha ujumbe kwenye mnyororo wa bloku.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ujumbe wako hauwezi kuwa mfuatano tupu.",
    }
  }
}
```

Sasa kwa kuwa ina utunzaji sahihi wa makosa ya ingizo, ni wakati wa kusaini muamala kupitia MetaMask!

#### Kusaini muamala wetu {#signing-our-transaction}

Ikiwa tayari una uzoefu na miamala ya jadi ya web3 Ethereum, msimbo tutakaouandika baadaye utakuwa unafahamika sana. Chini ya msimbo wako wa kushughulikia makosa ya ingizo, ongeza yafuatayo kwenye `updateMessage`:

```javascript
// interact.js

//weka vigezo vya muamala
const transactionParameters = {
  to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
  from: address, // lazima ifanane na anwani inayotumika ya mtumiaji.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//saini muamala
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
          Tazama hali ya muamala wako kwenye Etherscan!
        </a>
        <br />
        ℹ️ Mara tu muamala utakapothibitishwa na mtandao, ujumbe utasasishwa kiotomatiki.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Hebu tuchanganue kinachoendelea. Kwanza, tunaweka vigezo vyetu vya miamala, ambapo:

- `to` inabainisha anwani ya mpokeaji (mkataba wetu erevu)
- `kutoka` inabainisha mtia saini wa muamala, kigezo cha `anwani` tulichopitisha kwenye kazi yetu
- `data` ina wito kwa mbinu ya `update` ya mkataba-erevu wetu wa Hello World, ikipokea kigezo chetu cha mfuatano wa `ujumbe` kama ingizo

Kisha, tunafanya mwito wa kusubiri, `window.ethereum.request`, ambapo tunaiomba MetaMask kusaini muamala. Angalia, kwenye mistari 11 na 12, tunabainisha mbinu yetu ya eth, `eth_sendTransaction` na kupitisha `transactionParameters` zetu.

Katika hatua hii, MetaMask itafunguka kwenye kivinjari, na kumwomba mtumiaji asaini au kukataa muamala.

- Ikiwa muamala utafanikiwa, kazi itarudisha kitu cha JSON ambapo mfuatano wa `hali` wa JSX unamshawishi mtumiaji kuangalia Etherscan kwa taarifa zaidi kuhusu muamala wake.
- Ikiwa muamala utashindwa, kazi itarudisha kitu cha JSON ambapo mfuatano wa `hali` unapeleka ujumbe wa kosa.

Kwa ujumla, kazi yetu ya `updateMessage` inapaswa kuonekana hivi:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //ushughulikiaji wa makosa ya ingizo
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Unganisha mkoba wako wa MetaMask ili kusasisha ujumbe kwenye mnyororo wa bloku.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ujumbe wako hauwezi kuwa mfuatano tupu.",
    }
  }

  //weka vigezo vya muamala
  const transactionParameters = {
    to: contractAddress, // Inahitajika isipokuwa wakati wa uchapishaji wa mkataba.
    from: address, // lazima ifanane na anwani inayotumika ya mtumiaji.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //saini muamala
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
            Tazama hali ya muamala wako kwenye Etherscan!
          </a>
          <br />
          ℹ️ Mara tu muamala utakapothibitishwa na mtandao, ujumbe utasasishwa kiotomatiki.
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

Mwisho lakini sio uchache, tunahitaji kuunganisha kazi yetu ya `updateMessage` na kijenzi chetu cha `HelloWorld.js`.

#### Unganisha `updateMessage` na sehemu ya mbele ya `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Kazi yetu ya `onUpdatePressed` inapaswa kufanya mwito wa kusubiri kwa kazi iliyoingizwa ya `updateMessage` na kubadilisha kigezo cha hali cha `hali` ili kuonyesha ikiwa muamala wetu ulifanikiwa au ulishindwa:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Ni safi sana na rahisi. Na nadhani nini... MFUMO MTAWANYO WA KIMAMLAKA WAKO UMEKAMILIKA!!!

Endelea na ujaribu kitufe cha **Sasisha**!

### Tengeneza mfumo mtawanyo wa kimamlaka wako mwenyewe {#make-your-own-custom-dapp}

Wooooo, umefika mwisho wa mafunzo! Kwa muhtasari, umejifunza jinsi ya:

- Unganisha mkoba wa MetaMask na mradi wako wa mfumo mtawanyo wa kimamlaka
- Soma data kutoka kwa mkataba-erevu wako kwa kutumia API ya [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Saini miamala ya Ethereum kwa kutumia MetaMask

Sasa una vifaa kamili vya kutumia ujuzi kutoka kwa mafunzo haya ili kujenga mradi wako mwenyewe wa mfumo mtawanyo wa kimamlaka! Kama kawaida, ikiwa una maswali yoyote, usisite kuwasiliana nasi kwa msaada katika [Alchemy Discord](https://discord.gg/gWuC7zB). 🧙‍♂️

Baada ya kukamilisha mafunzo haya, tujulishe jinsi uzoefu wako ulivyokuwa au ikiwa una maoni yoyote kwa kututagi kwenye Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
