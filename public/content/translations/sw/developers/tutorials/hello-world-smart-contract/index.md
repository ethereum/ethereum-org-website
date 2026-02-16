---
title: Mkataba-erevu wa Hello World kwa Wanaoanza
description: Mafunzo ya utangulizi kuhusu kuandika na kusambaza mkataba-erevu rahisi kwenye Ethereum.
author: "elanh"
tags:
  [
    "uimara",
    "hardhat",
    "alchemy",
    "mikataba erevu",
    "upelekaji"
  ]
skill: beginner
lang: sw
published: 2021-03-31
---

Ikiwa wewe ni mgeni katika usanidi wa mnyororo wa bloku na hujui pa kuanzia, au ikiwa unataka tu kuelewa jinsi ya kusambaza na kuingiliana na mikataba-erevu, mwongozo huu ni kwa ajili yako. Tutapitia hatua za kuunda na kusambaza mkataba-erevu rahisi kwenye testnet ya Sepolia kwa kutumia pochi pepe [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), na [Alchemy](https://www.alchemy.com/eth) (usijali kama huelewi maana ya yoyote kati ya haya bado, tutaelezea).

Katika [sehemu ya 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) ya mafunzo haya tutapitia jinsi tunavyoweza kuingiliana na mkataba wetu-erevu mara tu utakapokuwa umesambazwa, na katika [sehemu ya 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) tutaangazia jinsi ya kuuchapisha kwenye Etherscan.

Ikiwa una maswali wakati wowote jisikie huru kuuliza kwenye [Alchemy Discord](https://discord.gg/gWuC7zB)!

## Hatua ya 1: Unganisha na mtandao wa Ethereum {#step-1}

Kuna njia nyingi za kufanya maombi kwa mnyororo wa Ethereum. Ili kurahisisha, tutatumia akaunti ya bure kwenye Alchemy, jukwaa la wasanidi programu wa mnyororo wa bloku na API ambayo inaturuhusu kuwasiliana na mnyororo wa Ethereum bila kulazimika kuendesha nodi zetu wenyewe. Jukwaa hilo pia lina zana za wasanidi programu kwa ajili ya ufuatiliaji na uchambuzi ambazo tutazitumia katika mafunzo haya ili kuelewa kinachoendelea nyuma ya pazia katika usambazaji wa mkataba-erevu wetu. Ikiwa bado huna akaunti ya Alchemy, [unaweza kujisajili bure hapa](https://dashboard.alchemy.com/signup).

## Hatua ya 2: Unda programu yako (na ufunguo wa API) {#step-2}

Mara tu unapounda akaunti ya Alchemy, unaweza kutengeneza ufunguo wa API kwa kuunda programu. Hii itaturuhusu kufanya maombi kwa mtandao wa majaribio wa Sepolia. Ikiwa hufahamu testnets, angalia [ukurasa huu](/developers/docs/networks/).

1. Nenda kwenye ukurasa wa "Unda programu mpya" katika Dashibodi yako ya Alchemy kwa kuchagua "Chagua programu" kwenye upau wa uelekezaji na kubofya "Unda programu mpya"

![Programu ya uundaji wa Hello world](./hello-world-create-app.png)

2. Ipe programu yako jina “Hello World”, toa maelezo mafupi, na uchague kisa cha matumizi, k.m., "Miundombinu na Zana." Ifuatayo, tafuta "Ethereum" na uchague mtandao.

![mwonekano wa programu ya kuunda hello world](./create-app-view-hello-world.png)

3. Bofya "Inayofuata" ili kuendelea, kisha “Unda programu” na ndivyo hivyo! Programu yako inapaswa kuonekana kwenye menyu kunjuzi ya upau wa uelekezaji, na Ufunguo wa API ukiwa tayari kunakiliwa.

## Hatua ya 3: Fungua akaunti ya Ethereum (anwani) {#step-3}

Tunahitaji akaunti ya Ethereum ili kutuma na kupokea miamala. Kwa mafunzo haya, tutatumia MetaMask, mkoba wa mtandaoni katika kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Zaidi kuhusu [miamala](/developers/docs/transactions/).

Unaweza kupakua MetaMask na kufungua akaunti ya Ethereum bure [hapa](https://metamask.io/download). Unapofungua akaunti, au ikiwa tayari unayo akaunti, hakikisha umebadilisha kwenda kwenye testnet ya "Sepolia" kwa kutumia menyu kunjuzi ya mtandao (ili tusitumie pesa halisi).

Ikiwa huoni Sepolia ikiwa imeorodheshwa, nenda kwenye menyu, kisha kwenye Kina na usogeze chini ili kuwasha "Onyesha testnets". Katika menyu ya uteuzi wa mtandao, chagua kichupo cha "Maalum" ili kupata orodha ya testnets na uchague "Sepolia."

![mfano wa metamask sepolia](./metamask-sepolia-example.png)

## Hatua ya 4: Ongeza ether kutoka kwenye bomba {#step-4}

Ili kusambaza mkataba-erevu wetu kwenye testnet, tutahitaji ETH bandia. Ili kupata ETH ya Sepolia unaweza kwenda kwenye [maelezo ya mtandao wa Sepolia](/developers/docs/networks/#sepolia) ili kuona orodha ya mabomba mbalimbali. Ikiwa moja haifanyi kazi, jaribu nyingine kwani wakati mwingine zinaweza kuishiwa. Inaweza kuchukua muda kupokea ETH yako bandia kutokana na msongamano wa mtandao. Unapaswa kuona ETH katika akaunti yako ya Metamask muda mfupi baadaye!

## Hatua ya 5: Angalia Salio lako {#step-5}

Ili kuhakikisha mara mbili kuwa salio letu lipo, hebu tufanye ombi la [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) kwa kutumia [zana ya mtunzi ya Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Hii itarudisha kiasi cha ETH katika mkoba wetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Tuma Ombi”, unapaswa kuona jibu kama hili:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **KUMBUKA:** Matokeo haya ni katika wei si ETH. Wei hutumika kama denomina ndogo zaidi ya ether. Ubadilishaji kutoka wei kwenda ETH ni: 1 eth = 10<sup>18</sup> wei. Kwa hiyo tukibadilisha 0x2B5E3AF16B1880000 kwenda desimali tunapata 5\*10¹⁸ ambayo ni sawa na ETH 5.
>
> Phew! Pesa zetu bandia zote zipo <Emoji text=":money_mouth_face:" size={1} />.

## Hatua ya 6: Anzisha mradi wetu {#step-6}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uandike:

```
mkdir hello-world
cd hello-world
```

Sasa kwa kuwa tuko ndani ya folda ya mradi wetu, tutatumia `npm init` kuanzisha mradi. Ikiwa bado hujasakinisha npm, fuata [maelekezo haya](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (tutahitaji pia Node.js kwa hivyo pakua hiyo pia!).

```
npm init
```

Haijalishi sana jinsi unavyojibu maswali ya usakinishaji, hivi ndivyo tulivyofanya kwa marejeleo:

```
jina la kifurushi: (hello-world)
toleo: (1.0.0)
maelezo: mkataba-erevu wa hello world
sehemu ya kuingilia: (index.js)
amri ya jaribio:
hazina ya git:
maneno muhimu:
mwandishi:
leseni: (ISC)
Karibu kuandika kwenye /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "mkataba-erevu wa hello world",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Thibitisha package.json na tuko tayari kwenda!

## Hatua ya 7: Pakua [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat ni mazingira ya usanidi wa kuandaa, kupeleka, kupima, na kutatua programu yako ya Ethereum. Inasaidia wasanidi programu wanapojenga mikataba-erevu na dApps ndani ya nchi kabla ya kupeleka kwenye mnyororo hai.

Ndani ya mradi wetu wa `hello-world` endesha:

```
npm install --save-dev hardhat
```

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/getting-started/#overview).

## Hatua ya 8: Unda mradi wa Hardhat {#step-8}

Ndani ya folda yetu ya mradi, endesha:

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

👷 Karibu kwenye Hardhat v2.0.11 👷‍?

Unataka kufanya nini? …
Unda mradi wa mfano
❯ Unda hardhat.config.js tupu
Acha
```

Hii itatutengenezea faili la `hardhat.config.js` ambapo tutaainisha usanidi wote wa mradi wetu (katika hatua ya 13).

## Hatua ya 9: Ongeza folda za mradi {#step-9}

Ili kuweka mradi wetu ukiwa umepangwa tutaunda folda mbili mpya. Nenda kwenye saraka ya mizizi ya mradi wako katika mstari wako wa amri na uandike:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ni mahali ambapo tutaweka faili la msimbo wa mkataba-erevu wetu wa hello world
- `scripts/` ni mahali ambapo tutaweka hati za kusambaza na kuingiliana na mkataba wetu

## Hatua ya 10: Andika mkataba wetu {#step-10}

Huenda unajiuliza, ni lini hasa tutaandika msimbo?? Naam, tumefika, hatua ya 10.

Fungua mradi wa hello-world katika kihariri chako unachopenda (tunapenda [VSCode](https://code.visualstudio.com/)). Mikataba-erevu huandikwa kwa lugha iitwayo Solidity ambayo ndiyo tutakayotumia kuandika mkataba-erevu wetu wa HelloWorld.sol.‌

1. Nenda kwenye folda ya “contracts” na uunde faili mpya liitwalo HelloWorld.sol
2. Hapo chini kuna sampuli ya mkataba-erevu wa Hello World kutoka Msingi wa Ethereum ambao tutautumia kwa ajili ya mafunzo haya. Nakili na ubandike yaliyomo hapa chini kwenye faili lako la HelloWorld.sol, na uhakikishe unasoma maoni ili kuelewa mkataba huu unafanya nini:

```solidity
// Hubainisha toleo la Solidity, kwa kutumia matoleo ya kimantiki.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Hubainisha mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa vitendaji na data (hali yake). Mara tu unaposambazwa, mkataba hukaa kwenye anwani maalum kwenye mnyororo wa bloku wa Ethereum. Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Hutangaza kigezo cha hali `message` cha aina ya `string`.
   // Vigezo vya hali ni vigezo ambavyo thamani zake huhifadhiwa kabisa kwenye hifadhi ya mkataba. Neno kuu `public` hufanya vigezo viweze kufikiwa kutoka nje ya mkataba na huunda kitendaji ambacho mikataba mingine au wateja wanaweza kuita ili kufikia thamani.
   string public message;

   // Sawa na lugha nyingi za upangaji programu zinazozingatia matabaka na vitu, kiunda ni kitendaji maalum ambacho hutekelezwa tu wakati wa uundaji wa mkataba.
   // Viunda hutumika kuanzisha data ya mkataba. Jifunze zaidi:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Hukubali hoja ya string `initMessage` na kuweka thamani kwenye kigezo cha hifadhi cha `message` cha mkataba).
      message = initMessage;
   }

   // Kitendaji cha umma kinachokubali hoja ya string na kusasisha kigezo cha hifadhi cha `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Huu ni mkataba-erevu rahisi sana ambao huhifadhi ujumbe wakati wa uundaji na unaweza kusasishwa kwa kuita kitendaji cha `update`.

## Hatua ya 11: Unganisha MetaMask na Alchemy kwenye mradi wako {#step-11}

Tumeunda pochi ya MetaMask, akaunti ya Alchemy, na kuandika mkataba-erevu wetu, sasa ni wakati wa kuunganisha vitu hivi vitatu.

Kila muamala unaotumwa kutoka kwa mkoba wako wa mtandaoni unahitaji sahihi kwa kutumia ufunguo wako binafsi wa kipekee. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi kwa usalama ufunguo wetu binafsi (na ufunguo wa API wa Alchemy) katika faili ya mazingira.

> Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo haya](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) kuhusu kutuma miamala kwa kutumia web3.

Kwanza, sakinisha kifurushi cha dotenv katika saraka ya mradi wako:

```
npm install dotenv --save
```

Kisha, unda faili ya `.env` katika saraka ya mizizi ya mradi wetu, na uongeze ufunguo wako binafsi wa MetaMask na URL ya HTTP ya API ya Alchemy.

- Fuata [maelekezo haya](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) ili kuhamisha ufunguo wako binafsi
- Angalia hapa chini ili kupata URL ya API ya HTTP ya Alchemy

![pata ufunguo wa api wa alchemy](./get-alchemy-api-key.png)

Nakili URL ya API ya Alchemy

Faili lako la `.env` linapaswa kuonekana hivi:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/ufunguo-wako-wa-api"
PRIVATE_KEY = "ufunguo-wako-binafsi-wa-metamask"
```

Ili kuunganisha hivi kwenye msimbo wetu, tutarejelea vigezo hivi katika faili letu la `hardhat.config.js` kwenye hatua ya 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Usitume <code>.env</code>! Tafadhali hakikisha kamwe hushiriki au kufichua faili yako ya <code>.env</code> na mtu yeyote, kwani unahatarisha siri zako kwa kufanya hivyo. Ikiwa unatumia udhibiti wa toleo, ongeza <code>.env</code> yako kwenye faili ya <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Hatua ya 12: Sakinisha Ethers.js {#step-12-install-ethersjs}

Ethers.js ni maktaba inayorahisisha kuingiliana na kufanya maombi kwa Ethereum kwa kufunika [mbinu za kawaida za JSON-RPC](/developers/docs/apis/json-rpc/) kwa mbinu ambazo ni rahisi zaidi kwa mtumiaji.

Hardhat hurahisisha sana kuunganisha [Plugins](https://hardhat.org/plugins/) kwa zana za ziada na utendakazi uliopanuliwa. Tutatumia fursa ya [programu-jalizi ya Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) kwa usambazaji wa mkataba ([Ethers.js](https://github.com/ethers-io/ethers.js/) ina mbinu safi sana za usambazaji wa mkataba).

Katika saraka yako ya mradi, andika:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Pia tutahitaji ethers katika `hardhat.config.js` yetu katika hatua inayofuata.

## Hatua ya 13: Sasisha hardhat.config.js {#step-13-update-hardhatconfigjs}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha `hardhat.config.js` ili mradi wetu uvifahamu vyote.

Sasisha `hardhat.config.js` yako ili ionekane hivi:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Hatua ya 14: Kusanya mkataba wetu {#step-14-compile-our-contracts}

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tuandae mkataba wetu. Jukumu la `compile` ni mojawapo ya majukumu yaliyojengewa ndani ya hardhat.

Kutoka kwenye mstari wa amri, endesha:

```
npx hardhat compile
```

Unaweza kupata onyo kuhusu `kitambulisho cha leseni ya SPDX hakijatolewa kwenye faili chanzo`, lakini hakuna haja ya kuwa na wasiwasi kuhusu hilo — tunatumai kila kitu kingine kinaonekana vizuri! Ikiwa sivyo, unaweza kutuma ujumbe kila wakati katika [discord ya Alchemy](https://discord.gg/u72VCg3).

## Hatua ya 15: Andika hati yetu ya usambazaji {#step-15-write-our-deploy-scripts}

Sasa kwa kuwa mkataba wetu umeandikwa na faili yetu ya usanidi iko tayari, ni wakati wa kuandika hati ya kupeleka mkataba wetu.

Nenda kwenye folda ya `scripts/` na uunde faili jipya liitwalo `deploy.js`, na uongeze yaliyomo yafuatayo ndani yake:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Anza usambazaji, ukirejesha ahadi inayotatuliwa kuwa kitu cha mkataba
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Mkataba umesambazwa kwa anwani:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat hufanya kazi nzuri ya kuelezea kile kila mstari wa msimbo huu unafanya katika [mafunzo yao ya Mikataba](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), tumechukua maelezo yao hapa.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` katika ethers.js ni dhana inayotumika kusambaza mikataba-erevu mipya, kwa hivyo `HelloWorld` hapa ni kiwanda cha vielelezo vya mkataba wetu wa hello world. Unapotumia programu-jalizi ya `hardhat-ethers`, vielelezo vya `ContractFactory` na `Contract` huunganishwa kwa mtia saini wa kwanza kwa chaguo-msingi.

```
const hello_world = await HelloWorld.deploy();
```

Kuita `deploy()` kwenye `ContractFactory` kutaanzisha usambazaji, na kurudisha `Promise` inayotatuliwa kuwa `Contract`. Hiki ndicho kitu ambacho kina mbinu kwa kila moja ya kazi zetu za mkataba-erevu.

## Hatua ya 16: Sambaza mkataba wetu {#step-16-deploy-our-contract}

Hatimaye tuko tayari kupeleka mkataba-erevu wetu! Nenda kwenye mstari wa amri na uendeshe:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Unapaswa kisha kuona kitu kama:

```
Mkataba umesambazwa kwa anwani: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Tukienda kwenye [Etherscan ya Sepolia](https://sepolia.etherscan.io/) na tutafute anwani ya mkataba wetu tunapaswa kuona kuwa umesambazwa kwa mafanikio. Muamala utaonekana kitu kama hiki:

![mkataba wa etherscan](./etherscan-contract.png)

Anwani ya `From` inapaswa kulingana na anwani ya akaunti yako ya MetaMask na anwani ya `To` itasema “Uundaji wa Mkataba” lakini tukibofya kwenye muamala tutaona anwani ya mkataba wetu katika sehemu ya `To`:

![muamala wa etherscan](./etherscan-transaction.png)

Hongera! Umesambaza mkataba-erevu kwenye mnyororo wa Ethereum 🎉

Ili kuelewa kinachoendelea chinichini, hebu tuende kwenye kichupo cha Mvumbuzi katika [dashibodi yetu ya Alchemy](https://dashboard.alchemyapi.io/explorer). Ikiwa una programu nyingi za Alchemy hakikisha unachuja kwa programu na uchague “Hello World”.
![kivinjari cha hello world](./hello-world-explorer.png)

Hapa utaona miito michache ya JSON-RPC ambayo Hardhat/Ethers ilitufanyia nyuma ya pazia tulipoiita kitendaji cha `.deploy()`. Miito miwili muhimu ya kutaja hapa ni [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), ambalo ni ombi la kuandika mkataba wetu kwenye mnyororo wa Sepolia, na [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kutokana na hashi (muundo wa kawaida wakati wa
miamala). Ili kujifunza zaidi kuhusu kutuma miamala, angalia mafunzo haya kuhusu [kutuma miamala kwa kutumia Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Hayo ni yote kwa sehemu ya 1 ya mafunzo haya, katika sehemu ya 2 [tutaingiliana na mkataba-erevu wetu](https://www.alchemy.com/docs/interacting-with-a-smart-contract) kwa kusasisha ujumbe wetu wa awali, na katika sehemu ya 3 [tutachapisha mkataba-erevu wetu kwenye Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) ili kila mtu ajue jinsi ya kuingiliana nao.

**Unataka kujifunza zaidi kuhusu Alchemy?** Angalia [tovuti](https://www.alchemy.com/eth) yetu. Hutaki kamwe kukosa sasisho? Jisajili kwa jarida letu [hapa](https://www.alchemy.com/newsletter)! Hakikisha pia unajiunga na [Discord](https://discord.gg/u72VCg3) yetu.\*\*.
