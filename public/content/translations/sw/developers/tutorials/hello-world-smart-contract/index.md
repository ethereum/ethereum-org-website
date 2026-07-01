---
title: Mkataba Mahiri wa Hello World kwa Wanaoanza
description: Mafunzo ya utangulizi kuhusu kuandika na kusambaza mkataba mahiri rahisi kwenye Ethereum.
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "mikataba mahiri", "kusambaza"]
skill: beginner
breadcrumb: Mkataba wa Hello World
lang: sw
published: 2021-03-31
---

Ikiwa wewe ni mgeni katika uundaji wa mnyororo wa vitalu na hujui pa kuanzia, au ikiwa unataka tu kuelewa jinsi ya kusambaza na kuingiliana na mikataba mahiri, mwongozo huu ni kwa ajili yako. Tutapitia hatua za kuunda na kusambaza mkataba mahiri rahisi kwenye mtandao wa majaribio wa Sepolia kwa kutumia mkoba wa mtandaoni wa [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), na [Alchemy](https://www.alchemy.com/eth) (usijali ikiwa bado huelewi maana ya haya yote, tutayaeleza).

Katika [sehemu ya 2](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract) ya mafunzo haya tutapitia jinsi tunavyoweza kuingiliana na mkataba wetu mahiri pindi utakapokuwa umesambazwa hapa, na katika [sehemu ya 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan) tutaangazia jinsi ya kuuchapisha kwenye Etherscan.

Ikiwa una maswali wakati wowote jisikie huru kuwasiliana nasi kwenye [Discord ya Alchemy](https://discord.gg/gWuC7zB)!

## Hatua ya 1: Unganisha kwenye mtandao wa Ethereum {#step-1}

Kuna njia nyingi za kutuma maombi kwenye mnyororo wa Ethereum. Ili kurahisisha, tutatumia akaunti ya bure kwenye Alchemy, jukwaa la wasanidi wa mnyororo wa vitalu na API inayoturuhusu kuwasiliana na mnyororo wa Ethereum bila kulazimika kuendesha nodi zetu wenyewe. Jukwaa hili pia lina zana za wasanidi za ufuatiliaji na uchanganuzi ambazo tutazitumia katika mafunzo haya ili kuelewa kinachoendelea kiufundi katika usambazaji wa mkataba wetu mahiri. Ikiwa bado huna akaunti ya Alchemy, [unaweza kujisajili bila malipo hapa](https://dashboard.alchemy.com/signup).

## Hatua ya 2: Unda programu yako (na ufunguo wa API) {#step-2}

Pindi utakapounda akaunti ya Alchemy, unaweza kuzalisha ufunguo wa API kwa kuunda programu. Hii itaturuhusu kutuma maombi kwenye mtandao wa majaribio wa Sepolia. Ikiwa hufahamu mitandao ya majaribio, angalia [ukurasa huu](/developers/docs/networks/).

1.  Nenda kwenye ukurasa wa "Create new app" (Unda programu mpya) katika Dashibodi yako ya Alchemy kwa kuchagua "Select an app" (Chagua programu) kwenye upau wa kusogeza na kubofya "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Ipe programu yako jina la “Hello World”, toa maelezo mafupi, na uchague matumizi, k.m., "Infra & Tooling." Kisha, tafuta "Ethereum" na uchague mtandao.

![create app view hello world](./create-app-view-hello-world.png)

3. Bofya "Next" (Inayofuata) ili kuendelea, kisha “Create app” (Unda programu) na ndivyo hivyo! Programu yako inapaswa kuonekana kwenye menyu kunjuzi ya upau wa kusogeza, ikiwa na Ufunguo wa API unaopatikana kwa ajili ya kunakiliwa.

## Hatua ya 3: Unda akaunti ya Ethereum (anwani) {#step-3}

Tunahitaji akaunti ya Ethereum ili kutuma na kupokea miamala. Kwa mafunzo haya, tutatumia MetaMask, mkoba wa mtandaoni kwenye kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Pata maelezo zaidi kuhusu [miamala](/developers/docs/transactions/).

Unaweza kupakua MetaMask na kuunda akaunti ya Ethereum bila malipo [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha umebadilisha kwenda kwenye mtandao wa majaribio wa "Sepolia" ukitumia menyu kunjuzi ya mtandao (ili tusiwe tunashughulika na pesa halisi).

Ikiwa huoni Sepolia kwenye orodha, nenda kwenye menyu, kisha Advanced (Kina) na usogeze chini ili kuwasha "Show test networks" (Onyesha mitandao ya majaribio). Katika menyu ya kuchagua mtandao, chagua kichupo cha "Custom" (Maalum) ili kupata orodha ya mitandao ya majaribio na uchague "Sepolia."

![metamask sepolia example](./metamask-sepolia-example.png)

## Hatua ya 4: Ongeza Etha kutoka kwenye bomba {#step-4}

Ili kusambaza mkataba wetu mahiri kwenye mtandao wa majaribio, tutahitaji ETH bandia. Ili kupata ETH ya Sepolia unaweza kwenda kwenye [maelezo ya mtandao wa Sepolia](/developers/docs/networks/#sepolia) ili kutazama orodha ya mabomba mbalimbali. Ikiwa moja haifanyi kazi, jaribu nyingine kwani wakati mwingine zinaweza kukauka. Inaweza kuchukua muda kupokea ETH yako bandia kutokana na msongamano wa mtandao. Unapaswa kuona ETH kwenye akaunti yako ya MetaMask muda mfupi baadaye!

## Hatua ya 5: Angalia Salio lako {#step-5}

Ili kuhakikisha salio letu lipo, hebu tutume ombi la [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) kwa kutumia [zana ya kutunga ya Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Hii itarejesha kiasi cha ETH kwenye mkoba wetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Send Request” (Tuma Ombi), unapaswa kuona jibu kama hili:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **KUMBUKA:** Matokeo haya yapo katika Wei na si ETH. Wei inatumika kama kiasi kidogo zaidi cha Etha. Ubadilishaji kutoka Wei hadi ETH ni: 1 eth = 10<sup>18</sup> Wei. Kwa hivyo tukibadilisha 0x2B5E3AF16B1880000 kuwa desimali tunapata 5\*10¹⁸ ambayo ni sawa na 5 ETH.
>
> Phew! Pesa zetu bandia zote zipo <Emoji text=":money_mouth_face:" size={1} />.

## Hatua ya 6: Anzisha mradi wetu {#step-6}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uandike:

```
mkdir hello-world
cd hello-world
```

Kwa kuwa sasa tuko ndani ya folda ya mradi wetu, tutatumia `npm init` kuanzisha mradi. Ikiwa bado hujasakinisha npm, fuata [maagizo ya usakinishaji wa Node.js](https://nodejs.org/en/download/) (tutahitaji Node.js na npm kwa mafunzo haya).

```
npm init
```

Haijalishi sana jinsi unavyojibu maswali ya usakinishaji, hivi ndivyo tulivyofanya kwa marejeleo:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Idhinisha package.json na tuko tayari kuendelea!
## Hatua ya 7: Pakua [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat ni mazingira ya uundaji ya kukusanya, kusambaza, kujaribu, na kutatua programu yako ya Ethereum. Inasaidia wasanidi wanapounda mikataba mahiri na programu tumizi zilizogatuliwa (dapps) kwenye kompyuta zao kabla ya kusambaza kwenye mnyororo wa moja kwa moja.

Ndani ya mradi wetu wa `hello-world` endesha:

```
npm install --save-dev hardhat
```

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/getting-started/#overview).

## Hatua ya 8: Unda mradi wa Hardhat {#step-8}

Ndani ya folda ya mradi wetu endesha:

```
npx hardhat
```

Kisha unapaswa kuona ujumbe wa kukaribisha na chaguo la kuchagua unachotaka kufanya. Chagua “create an empty hardhat.config.js” (unda hardhat.config.js tupu):

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Hii itazalisha faili la `hardhat.config.js` kwa ajili yetu ambapo tutabainisha mipangilio yote ya mradi wetu (katika hatua ya 13).

## Hatua ya 9: Ongeza folda za mradi {#step-9}

Ili kuweka mradi wetu ukiwa umepangiliwa tutaunda folda mbili mpya. Nenda kwenye saraka kuu ya mradi wako katika mstari wako wa amri na uandike:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ni mahali ambapo tutaweka faili la msimbo wa mkataba wetu mahiri wa hello world
- `scripts/` ni mahali ambapo tutaweka hati za kusambaza na kuingiliana na mkataba wetu

## Hatua ya 10: Andika mkataba wetu {#step-10}

Unaweza kuwa unajiuliza, ni lini hasa tutaandika msimbo?? Kweli, tuko hapa, katika hatua ya 10.

Fungua mradi wa hello-world katika kihariri chako unachokipenda (sisi tunapenda [VSCode](https://code.visualstudio.com/)). Mikataba mahiri huandikwa katika lugha inayoitwa Solidity ambayo ndiyo tutakayotumia kuandika mkataba wetu mahiri wa HelloWorld.sol.‌

1.  Nenda kwenye folda ya “contracts” na uunde faili jipya linaloitwa HelloWorld.sol
2.  Hapa chini kuna sampuli ya mkataba mahiri wa Hello World kutoka Taasisi ya Ethereum ambao tutautumia kwa mafunzo haya. Nakili na ubandike yaliyomo hapa chini kwenye faili lako la HelloWorld.sol, na uhakikishe unasoma maoni ili kuelewa kile mkataba huu unafanya:

```solidity
// Hubainisha toleo la Solidity, kwa kutumia uwekaji matoleo wa kisemantiki.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Hufafanua mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa vitendaji na data (hali yake). Baada ya kusambazwa, mkataba hukaa kwenye anwani maalum kwenye mnyororo wa vitalu wa Ethereum. Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Hutangaza kigezo cha hali `message` cha aina ya `string`.
   // Vigezo vya hali ni vigezo ambavyo thamani zake huhifadhiwa kabisa kwenye hifadhi ya mkataba. Neno kuu `public` hufanya vigezo viweze kufikiwa kutoka nje ya mkataba na huunda kitendaji ambacho mikataba mingine au wateja wanaweza kuita ili kufikia thamani hiyo.
   string public message;

   // Sawa na lugha nyingi zinazoelekezwa kwa vitu zinazotegemea darasa, kiunda ni kitendaji maalum ambacho hutekelezwa tu wakati wa kuunda mkataba.
   // Viunda hutumika kuanzisha data ya mkataba. Jifunze zaidi:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Hukubali hoja ya mfuatano `initMessage` na kuweka thamani kwenye kigezo cha hifadhi cha `message` cha mkataba).
      message = initMessage;
   }

   // Kitendaji cha umma ambacho hukubali hoja ya mfuatano na kusasisha kigezo cha hifadhi cha `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Huu ni mkataba mahiri rahisi sana ambao huhifadhi ujumbe unapoundwa na unaweza kusasishwa kwa kuita chaguo la kukokotoa la `update`.

## Hatua ya 11: Unganisha MetaMask na Alchemy kwenye mradi wako {#step-11}

Tumeunda mkoba wa MetaMask, akaunti ya Alchemy, na kuandika mkataba wetu mahiri, sasa ni wakati wa kuunganisha vyote vitatu.

Kila muamala unaotumwa kutoka kwenye mkoba wako wa mtandaoni unahitaji sahihi kwa kutumia ufunguo wako wa siri wa kipekee. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi kwa usalama ufunguo wetu wa siri (na ufunguo wa API wa Alchemy) katika faili la mazingira.

> Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo haya](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) kuhusu kutuma miamala kwa kutumia Web3.

Kwanza, sakinisha kifurushi cha dotenv katika saraka ya mradi wako:

```
npm install dotenv --save
```

Kisha, unda faili la `.env` katika saraka kuu ya mradi wetu, na uongeze ufunguo wako wa siri wa MetaMask na URL ya API ya HTTP ya Alchemy ndani yake.

- Fuata [maagizo haya](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) ili kuhamisha ufunguo wako wa siri
- Tazama hapa chini ili kupata URL ya API ya HTTP ya Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Nakili URL ya API ya Alchemy

Faili lako la `.env` linapaswa kuonekana hivi:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Ili kuunganisha haya kwenye msimbo wetu, tutarejelea vigeu hivi katika faili letu la `hardhat.config.js` katika hatua ya 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Usifanye commit ya <code>.env</code>! Tafadhali hakikisha kamwe hushiriki au kufichua faili lako la <code>.env</code> kwa mtu yeyote, kwani unaweka siri zako hatarini kwa kufanya hivyo. Ikiwa unatumia udhibiti wa matoleo, ongeza <code>.env</code> yako kwenye faili la <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Hatua ya 12: Sakinisha Ethers.js {#step-12-install-ethersjs}

Ethers.js ni maktaba inayorahisisha kuingiliana na kutuma maombi kwenye Ethereum kwa kufunga [mbinu za kawaida za JSON-RPC](/developers/docs/apis/json-rpc/) na mbinu zinazofaa zaidi kwa mtumiaji.

Hardhat inafanya iwe rahisi sana kujumuisha [Programu-jalizi](https://hardhat.org/plugins/) kwa zana za ziada na utendaji uliopanuliwa. Tutatumia [programu-jalizi ya Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) kwa usambazaji wa mkataba ([Ethers.js](https://github.com/ethers-io/ethers.js/) ina mbinu safi sana za usambazaji wa mkataba).

Katika saraka ya mradi wako andika:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Pia tutahitaji ethers katika `hardhat.config.js` yetu katika hatua inayofuata.

## Hatua ya 13: Sasisha hardhat.config.js {#step-13-update-hardhatconfigjs}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha `hardhat.config.js` ili mradi wetu uzitambue zote.

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

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tukusanye mkataba wetu. Kazi ya `compile` ni mojawapo ya kazi zilizojengewa ndani za hardhat.

Kutoka kwenye mstari wa amri endesha:

```
npx hardhat compile
```

Unaweza kupata onyo kuhusu `SPDX license identifier not provided in source file` , lakini hakuna haja ya kuwa na wasiwasi kuhusu hilo — tunatumai kila kitu kingine kinaonekana vizuri! Ikiwa sivyo, unaweza kutuma ujumbe kila wakati kwenye [Discord ya Alchemy](https://discord.gg/u72VCg3).

## Hatua ya 15: Andika hati yetu ya kusambaza {#step-15-write-our-deploy-scripts}

Kwa kuwa sasa mkataba wetu umeandikwa na faili letu la usanidi liko tayari, ni wakati wa kuandika hati yetu ya kusambaza mkataba.

Nenda kwenye folda ya `scripts/` na uunde faili jipya linaloitwa `deploy.js` , ukiongeza yaliyomo yafuatayo ndani yake:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Anza usambazaji, ikirejesha ahadi inayotatuliwa kuwa kipengee cha mkataba
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat inafanya kazi nzuri sana ya kueleza kile ambacho kila moja ya mistari hii ya msimbo inafanya katika [mafunzo yao ya Mikataba](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), tumetumia maelezo yao hapa.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` katika ethers.js ni dhana inayotumika kusambaza mikataba mahiri mipya, kwa hivyo `HelloWorld` hapa ni kiwanda cha matukio ya mkataba wetu wa hello world. Unapotumia programu-jalizi ya `hardhat-ethers`, matukio ya `ContractFactory` na `Contract` huunganishwa kwa mtia saini wa kwanza kwa chaguomsingi.

```
const hello_world = await HelloWorld.deploy();
```

Kuita `deploy()` kwenye `ContractFactory` kutaanzisha usambazaji, na kurejesha `Promise` inayotatuliwa kuwa `Contract`. Hiki ni kipengee ambacho kina mbinu kwa kila moja ya chaguo za kukokotoa za mkataba wetu mahiri.

## Hatua ya 16: Sambaza mkataba wetu {#step-16-deploy-our-contract}

Hatimaye tuko tayari kusambaza mkataba wetu mahiri! Nenda kwenye mstari wa amri na uendeshe:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Kisha unapaswa kuona kitu kama:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Tukienda kwenye [Etherscan ya Sepolia](https://sepolia.etherscan.io/) na kutafuta anwani ya mkataba wetu tunapaswa kuweza kuona kwamba umesambazwa kwa ufanisi. Muamala utaonekana kama hivi:

![etherscan contract](./etherscan-contract.png)

Anwani ya `From` inapaswa kulingana na anwani ya akaunti yako ya MetaMask na anwani ya To (Kwenda) itasema “Contract Creation” (Uundaji wa Mkataba) lakini tukibofya kwenye muamala tutaona anwani ya mkataba wetu katika sehemu ya `To`:

![etherscan transaction](./etherscan-transaction.png)

Hongera! Umetoka tu kusambaza mkataba mahiri kwenye mnyororo wa Ethereum 🎉

Ili kuelewa kinachoendelea kiufundi, hebu twende kwenye kichupo cha Explorer (Kichunguzi) katika [dashibodi yetu ya Alchemy](https://dashboard.alchemy.com/explorer). Ikiwa una programu nyingi za Alchemy hakikisha unachuja kulingana na programu na uchague “Hello World”.
![hello world explorer](./hello-world-explorer.png)

Hapa utaona simu chache za JSON-RPC ambazo Hardhat/Ethers ilitufanyia kiufundi tulipopiga simu kwenye chaguo la kukokotoa la `.deploy()`. Mbili muhimu za kutaja hapa ni [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), ambalo ni ombi la kuandika mkataba wetu kwenye mnyororo wa Sepolia, na [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash) ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kwa kutumia heshi (mtindo wa kawaida wakati wa miamala). Ili kujifunza zaidi kuhusu kutuma miamala, angalia mafunzo haya kuhusu [kutuma miamala kwa kutumia Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Hiyo ndiyo yote kwa sehemu ya 1 ya mafunzo haya, katika sehemu ya 2 tutaingiliana [na mkataba wetu mahiri](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract) kwa kusasisha ujumbe wetu wa awali, na katika sehemu ya 3 [tutachapisha mkataba wetu mahiri kwenye Etherscan](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan) ili kila mtu ajue jinsi ya kuingiliana nao.

**Unataka kujifunza zaidi kuhusu Alchemy? Angalia [tovuti](https://www.alchemy.com/eth) yetu. Hutaki kamwe kukosa sasisho? Jisajili kwa jarida letu [hapa](https://www.alchemy.com/newsletter)! Hakikisha pia unajiunga na [Discord](https://discord.gg/u72VCg3) yetu.**.
