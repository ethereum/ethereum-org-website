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

Ikiwa wewe ni mgeni katika ukuzaji wa mnyororo wa vitalu na hujui pa kuanzia, au ikiwa unataka tu kuelewa jinsi ya kusambaza na kuingiliana na mikataba mahiri, mwongozo huu ni kwa ajili yako. Tutapitia hatua za kuunda na kusambaza mkataba mahiri rahisi kwenye mtandao wa majaribio wa Sepolia kwa kutumia mkoba wa mtandaoni [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), na [Alchemy](https://www.alchemy.com/eth) (usijali ikiwa bado huelewi maana ya haya yote, tutayaelezea).

Pindi mkataba wako utakapokuwa umesambazwa, unaweza [kuunda kiolesura cha mtumiaji kwa ajili yake](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Ikiwa una maswali wakati wowote jisikie huru kuwasiliana kwenye [Discord ya Alchemy](https://discord.gg/gWuC7zB)!

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

Tunahitaji akaunti ya Ethereum ili kutuma na kupokea miamala. Kwa mafunzo haya, tutatumia MetaMask, mkoba wa mtandaoni kwenye kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Zaidi kuhusu [miamala](/developers/docs/transactions/).

Unaweza kupakua MetaMask na kuunda akaunti ya Ethereum bila malipo [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha umebadilisha hadi kwenye mtandao wa majaribio wa "Sepolia" kwa kutumia menyu kunjuzi ya mtandao (ili tusiwe tunashughulika na pesa halisi).

Ikiwa huoni Sepolia kwenye orodha, fungua menyu kwenye kona ya juu kulia, chagua "Networks" (Mitandao), na uwashe "Show test networks" (Onyesha mitandao ya majaribio) chini ya orodha ya mtandao (tazama [mwongozo wa MetaMask wa kutazama mitandao ya majaribio](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Kisha chagua "Sepolia" kwenye menyu ya kuchagua mtandao.

![metamask sepolia example](./metamask-sepolia-example.png)

## Hatua ya 4: Ongeza Etha kutoka kwenye bomba {#step-4}

Ili kusambaza mkataba wetu mahiri kwenye mtandao wa majaribio, tutahitaji ETH bandia. Ili kupata ETH ya Sepolia unaweza kwenda kwenye [maelezo ya mtandao wa Sepolia](/developers/docs/networks/#sepolia) ili kutazama orodha ya mabomba mbalimbali. Ikiwa moja haifanyi kazi, jaribu nyingine kwani wakati mwingine zinaweza kukauka. Baadhi ya mabomba yana sheria za kustahiki; kwa mfano, bomba la Sepolia la Alchemy linahitaji anwani inayopokea kuwa na angalau 0.001 ETH kwenye Mtandao Mkuu wa Ethereum. Inaweza kuchukua muda kupokea ETH yako bandia kutokana na msongamano wa mtandao. Unapaswa kuona ETH kwenye akaunti yako ya MetaMask muda mfupi baadaye!

## Hatua ya 5: Angalia Salio lako {#step-5}

Ili kuhakikisha salio letu lipo, hebu tutume ombi la [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) kwa kutumia [zana ya kutunga ya Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Hii itarejesha kiasi cha ETH kwenye mkoba wetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Send Request” (Tuma Ombi), unapaswa kuona jibu kama hili:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **KUMBUKA:** Matokeo haya yapo katika Wei na si ETH. Wei inatumika kama kiasi kidogo zaidi cha Etha. Ubadilishaji kutoka Wei hadi ETH ni: 1 eth = 10<sup>18</sup> Wei. Kwa hivyo tukibadilisha 0x2B5E3AF16B1880000 kuwa desimali tunapata 5\*10¹⁸ ambayo ni sawa na 5 ETH.
>
> Phew! Pesa zetu bandia zote zipo <Emoji text=":money_mouth_face:" size={1} />.

## Hatua ya 6: Anzisha mradi wetu {#step-6}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uandike:

```sh
mkdir hello-world
cd hello-world
```

Sasa kwa kuwa tuko ndani ya folda yetu ya mradi, tutatumia `npm init` kuanzisha mradi. Ikiwa bado huna npm iliyosakinishwa, fuata [maagizo ya usakinishaji wa Node.js](https://nodejs.org/en/download/) (tutahitaji Node.js na npm kwa mafunzo haya).

```sh
npm init
```

Haijalishi sana jinsi unavyojibu maswali ya usakinishaji, hivi ndivyo tulivyofanya kwa marejeleo:

```text
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

Idhinisha package.json. Hardhat 3, ambayo tutaisakinisha baadaye, inasaidia tu miradi ya moduli ya ES, kwa hivyo weka alama mradi kama mmoja:

```sh
npm pkg set type=module
```

Na tuko tayari kuendelea!

## Hatua ya 7: Pakua [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat ni mazingira ya ukuzaji ya kukusanya, kusambaza, kujaribu, na kutatua programu yako ya Ethereum. Inasaidia wasanidi wanapounda mikataba mahiri na programu tumizi zilizogatuliwa (dapps) ndani ya kompyuta zao kabla ya kusambaza kwenye mnyororo wa moja kwa moja.

Hardhat 3 inahitaji Node.js v22.13.0 au matoleo mapya zaidi. Ndani ya mradi wetu wa `hello-world` endesha:

```sh
npm install --save-dev hardhat
```

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/docs/getting-started).

## Hatua ya 8: Unda mradi wa Hardhat {#step-8}

Kuendesha `npx hardhat --init` kungezalisha mradi kamili wa mfano, lakini kwa mafunzo haya tutaweka mambo kwa mikono ili uweze kuona kila kipande. Kwenye mzizi wa folda yako ya mradi, unda faili inayoitwa `hardhat.config.js` yenye yaliyomo yafuatayo:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Hapa ndipo tutakapobainisha mipangilio yote ya mradi wetu (kwenye hatua ya 13). Kwa sasa, inaiambia tu Hardhat ni toleo gani la kikusanyaji cha Solidity la kutumia.

## Hatua ya 9: Ongeza folda za mradi {#step-9}

Ili kuweka mradi wetu ukiwa umepangiliwa tutaunda folda mbili mpya. Nenda kwenye saraka kuu ya mradi wako katika mstari wako wa amri na uandike:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ni mahali ambapo tutaweka faili la msimbo wa mkataba wetu mahiri wa hello world
- `scripts/` ni mahali ambapo tutaweka hati za kusambaza na kuingiliana na mkataba wetu

## Hatua ya 10: Andika mkataba wetu {#step-10}

Unaweza kuwa unajiuliza, ni lini hasa tutaandika msimbo?? Kweli, tuko hapa, kwenye hatua ya 10.

Fungua mradi wa hello-world kwenye kihariri chako unachokipenda (tunapenda [VSCode](https://code.visualstudio.com/)). Mikataba mahiri imeandikwa kwa lugha inayoitwa Solidity ambayo ndiyo tutakayotumia kuandika mkataba wetu mahiri wa HelloWorld.sol.‌

1.  Nenda kwenye folda ya “contracts” na uunde faili mpya inayoitwa HelloWorld.sol
2.  Hapa chini kuna mfano wa mkataba mahiri wa Hello World kutoka Taasisi ya Ethereum ambao tutautumia kwa mafunzo haya. Nakili na ubandike yaliyomo hapa chini kwenye faili yako ya HelloWorld.sol, na uhakikishe unasoma maoni ili kuelewa kile mkataba huu unafanya:

```solidity
// SPDX-License-Identifier: MIT
// Inabainisha toleo la Solidity, kwa kutumia uwekaji matoleo wa kisemantiki.
// Jifunze zaidi: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Inafafanua mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa vitendaji na data (hali yake). Baada ya kusambazwa, mkataba hukaa kwenye anwani maalum kwenye mnyororo wa vitalu wa Ethereum. Jifunze zaidi: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Inatangaza kigezo cha hali `message` cha aina ya `string`.
   // Vigezo vya hali ni vigezo ambavyo thamani zake huhifadhiwa kabisa kwenye hifadhi ya mkataba. Neno kuu `public` hufanya vigezo kufikiwa kutoka nje ya mkataba na kuunda kitendaji ambacho mikataba mingine au wateja wanaweza kuita ili kufikia thamani.
   string public message;

   // Sawa na lugha nyingi zinazoelekezwa kwa vitu kulingana na darasa, kiunda ni kitendaji maalum ambacho hutekelezwa tu wakati wa kuunda mkataba.
   // Viunda hutumika kuanzisha data ya mkataba. Jifunze zaidi: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Inakubali hoja ya mfuatano `initMessage` na kuweka thamani kwenye kigezo cha hifadhi cha `message` cha mkataba).
      message = initMessage;
   }

   // Kitendaji cha umma ambacho kinakubali hoja ya mfuatano na kusasisha kigezo cha hifadhi cha `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Huu ni mkataba mahiri rahisi sana ambao huhifadhi ujumbe unapoundwa na unaweza kusasishwa kwa kuita utendakazi wa `update`.

## Hatua ya 11: Unganisha MetaMask na Alchemy kwenye mradi wako {#step-11}

Tumeunda mkoba wa MetaMask, akaunti ya Alchemy, na kuandika mkataba wetu mahiri, sasa ni wakati wa kuunganisha vyote vitatu.

Kila muamala unaotumwa kutoka kwenye mkoba wako wa mtandaoni unahitaji sahihi kwa kutumia ufunguo wa siri wako wa kipekee. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi kwa usalama ufunguo wa siri wetu (na ufunguo wa API wa Alchemy) kwenye faili la mazingira.

> Ili kujifunza zaidi kuhusu kutuma miamala, angalia [nyaraka za miamala](/developers/docs/transactions/).

Unda faili la `.env` kwenye saraka kuu ya mradi wetu, na uongeze ufunguo wa siri wako wa MetaMask na URL ya API ya HTTP ya Alchemy ndani yake.

- Fuata [maagizo haya](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) ili kuhamisha ufunguo wa siri wako
- Tazama hapa chini ili kupata URL ya API ya HTTP ya Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Nakili URL ya API ya Alchemy

Faili lako la `.env` linapaswa kuonekana hivi:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Ili kuunganisha hizi kwenye msimbo wetu, tutarejelea vigeu hivi kwenye faili letu la `hardhat.config.js` kwenye hatua ya 13. Node.js inaweza kusoma faili za `.env` yenyewe, kwa hivyo hakuna kifurushi cha ziada cha kusakinisha.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Usifanye commit ya <code>.env</code>! Tafadhali hakikisha kamwe hushiriki au kufichua faili lako la <code>.env</code> kwa mtu yeyote, kwani unaweka siri zako hatarini kwa kufanya hivyo. Ikiwa unatumia udhibiti wa toleo, ongeza <code>.env</code> yako kwenye faili la <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Hatua ya 12: Sakinisha Ethers.js {#step-12-install-ethersjs}

Ethers.js ni maktaba inayorahisisha kuingiliana na kutuma maombi kwenye Ethereum kwa kufunika [mbinu za kawaida za JSON-RPC](/developers/docs/apis/json-rpc/) na mbinu zinazofaa zaidi kwa mtumiaji.

Hardhat inarahisisha sana kujumuisha [Programu-jalizi](https://hardhat.org/docs/plugins/official-plugins) kwa zana za ziada na utendakazi uliopanuliwa. Tutatumia [Programu-jalizi ya Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) kwa usambazaji wa mkataba ([Ethers.js](https://docs.ethers.org/v6/) ina mbinu safi sana za usambazaji wa mkataba).

Kwenye saraka yako ya mradi andika:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Pia tutaongeza programu-jalizi kwenye `hardhat.config.js` yetu katika hatua inayofuata.

## Hatua ya 13: Sasisha hardhat.config.js {#step-13-update-hardhatconfigjs}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha `hardhat.config.js` ili mradi wetu uzitambue zote.

Sasisha `hardhat.config.js` yako ili ionekane hivi:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Pakia API_URL na PRIVATE_KEY kutoka kwenye faili la .env kwenda kwenye process.env, ikiwa lipo
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` inaiambia Hardhat kusoma kila thamani kutoka kwenye kigeu cha mazingira tu inapohitajika, kwa hivyo amri kama `compile` hufanya kazi hata kabla ya thamani kuwekwa. Ikiwa ungependa kutoweka ufunguo wa siri wako kwenye faili la maandishi wazi, Hardhat pia inaweza kusoma [vigeu vya usanidi kutoka kwenye hifadhi ya funguo iliyosimbwa kwa njia fiche](https://hardhat.org/docs/guides/configuration-variables).

## Hatua ya 14: Kusanya mkataba wetu {#step-14-compile-our-contracts}

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tukusanye mkataba wetu. Kazi ya `compile` ni mojawapo ya kazi zilizojengewa ndani za hardhat.

Kutoka kwenye mstari wa amri endesha:

```sh
npx hardhat compile
```

Mara ya kwanza unapokusanya, Hardhat hupakua kikusanyaji cha Solidity. Unapaswa kisha kuona kitu kama `Compiled 1 Solidity file with solc 0.8.34`. Ikiwa sivyo, unaweza kutuma ujumbe kwenye [Discord ya Alchemy](https://discord.gg/gWuC7zB) kila wakati.

## Hatua ya 15: Andika hati yetu ya kusambaza {#step-15-write-our-deploy-scripts}

Sasa kwa kuwa mkataba wetu umeandikwa na faili letu la usanidi liko tayari, ni wakati wa kuandika hati yetu ya kusambaza mkataba.

Nenda kwenye folda ya `scripts/` na uunde faili mpya inayoitwa `deploy.js` , ukiongeza yaliyomo yafuatayo ndani yake:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Anza usambazaji, ukirudisha ahadi inayosuluhisha kwenye kipengee cha mkataba
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Hebu tupitie kile ambacho kila moja ya mistari hii ya msimbo inafanya.

```js
const { ethers } = await network.create()
```

Katika Hardhat 3, hati hufungua muunganisho kwenye mtandao waziwazi. `network.create()` huunganisha kwenye mtandao unaochagua na chaguo la `--network` unapoendesha hati, na programu-jalizi ya `hardhat-ethers` huongeza kipengee cha `ethers` kwenye muunganisho huo.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` katika ethers.js ni dhana inayotumika kusambaza mikataba mahiri mipya, kwa hivyo `HelloWorld` hapa ni kiwanda cha matukio ya mkataba wetu wa hello world. Unapotumia programu-jalizi ya `hardhat-ethers` matukio ya `ContractFactory` na `Contract` huunganishwa kwa mtia saini wa kwanza kwa chaguomsingi.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Kuita `deploy()` kwenye `ContractFactory` kutaanzisha usambazaji, na kurejesha `Promise` ambayo hutatuliwa kuwa `Contract`. Hiki ni kipengee ambacho kina mbinu kwa kila utendakazi wa mkataba wetu mahiri. Hoja unazopitisha kwa `deploy()` huenda kwenye konstrukta ya mkataba, hapa ni ujumbe wa awali.

`waitForDeployment()` husubiri hadi muamala wa usambazaji ujumuishwe kwenye kitalu, na `getAddress()` hurejesha anwani ya mkataba mpya. Tazama [nyaraka za mkataba za ethers.js](https://docs.ethers.org/v6/api/contract/) kwa maelezo zaidi.

## Hatua ya 16: Sambaza mkataba wetu {#step-16-deploy-our-contract}

Hatimaye tuko tayari kusambaza mkataba wetu mahiri! Nenda kwenye mstari wa amri na uendeshe:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Unapaswa kisha kuona kitu kama:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Tukienda kwenye [Etherscan ya Sepolia](https://sepolia.etherscan.io/) na kutafuta anwani ya mkataba wetu tunapaswa kuweza kuona kwamba umesambazwa kwa ufanisi. Muamala utaonekana kama hivi:

![etherscan contract](./etherscan-contract.png)

Anwani ya `From` inapaswa kulingana na anwani ya akaunti yako ya MetaMask na anwani ya To itasema “Contract Creation” lakini tukibofya kwenye muamala tutaona anwani ya mkataba wetu kwenye sehemu ya `To`:

![etherscan transaction](./etherscan-transaction.png)

Hongera! Umetoka tu kusambaza mkataba mahiri kwenye mnyororo wa Ethereum 🎉

Ili kuelewa kinachoendelea kiufundi, unaweza kuangalia maombi ambayo programu yako ya "Hello World" ilipokea kwenye [dashibodi yako ya Alchemy](https://dashboard.alchemy.com/).

Hapo utaona simu chache za JSON-RPC ambazo Hardhat/Ethers ilifanya kiufundi kwa ajili yetu tulipopiga simu kwa utendakazi wa `.deploy()`. Mbili muhimu za kutaja hapa ni [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), ambalo ni ombi la kuandika mkataba wetu kwenye mnyororo wa Sepolia, na [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kwa kupewa heshi (mtindo wa kawaida wakati wa kutuma miamala). Ili kujifunza zaidi kuhusu kutuma miamala, angalia [nyaraka za miamala](/developers/docs/transactions/).

Hayo ndiyo yote kwa mafunzo haya. Kisha, unaweza [kuunda kiolesura cha mtumiaji kwa ajili ya mkataba wako](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
