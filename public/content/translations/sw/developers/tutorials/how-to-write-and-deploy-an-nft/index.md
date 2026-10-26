---
title: Jinsi ya Kuandika na Kusambaza NFT (Sehemu ya 1/3 ya Mfululizo wa Mafunzo ya NFT)
description: Mafunzo haya ni Sehemu ya 1 ya mfululizo kuhusu NFT ambayo itakupeleka hatua kwa hatua kuhusu jinsi ya kuandika na kusambaza mkataba mahiri wa Tokeni Isiyoweza Kubadilishwa (tokeni ya ERC-721) kwa kutumia Ethereum na Mfumo wa Faili wa Sayari Mbalimbali (IPFS).
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "mikataba mahiri"]
skill: beginner
breadcrumb: Andika na usambaze NFT
lang: sw
published: 2021-04-22
---

Kwa kuwa tokani zisizobadilishika (NFTs) zinaleta mnyororo wa vitalu kwenye macho ya umma, sasa ni fursa nzuri ya kuelewa umaarufu huu wewe mwenyewe kwa kuchapisha mkataba wako mwenyewe wa NFT (Tokeni ya ERC-721) kwenye mnyororo wa vitalu wa Ethereum!

Katika mafunzo haya, tutapitia hatua za kuunda na kusambaza mkataba mahiri wa ERC-721 kwenye mtandao wa majaribio wa Sepolia kwa kutumia [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) na [Alchemy](https://alchemy.com/signup/eth) (usijali ikiwa bado huelewi maana ya haya yote — tutaelezea!).

Katika Sehemu ya 2 ya mafunzo haya tutapitia jinsi tunavyoweza kutumia mkataba mahiri wetu kufua NFT, na katika Sehemu ya 3 tutaelezea jinsi ya kutazama NFT yako kwenye MetaMask.

Na bila shaka, ikiwa una maswali wakati wowote, usisite kuwasiliana kwenye [Discord ya Alchemy](https://discord.gg/gWuC7zB) au tembelea [nyaraka za Kiolesura cha Kupanga Programu Tumizi (API) cha NFT cha Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Hatua ya 1: Unganisha kwenye mtandao wa Ethereum {#connect-to-ethereum}

Kuna njia nyingi za kufanya maombi kwenye mnyororo wa vitalu wa Ethereum, lakini ili kurahisisha mambo, tutatumia akaunti ya bure kwenye [Alchemy](https://alchemy.com/signup/eth), jukwaa la msanidi wa mnyororo wa vitalu na API ambayo inaturuhusu kuwasiliana na mnyororo wa Ethereum bila kulazimika kuendesha nodi zetu wenyewe.

Katika mafunzo haya, pia tutatumia zana za msanidi wa Alchemy kwa ufuatiliaji na uchanganuzi ili kuelewa jinsi inavyofanya kazi kiufundi katika usambazaji wa mkataba mahiri wetu. Ikiwa bado huna akaunti ya Alchemy, unaweza kujisajili bila malipo [hapa](https://alchemy.com/signup/eth).

## Hatua ya 2: Unda programu yako (na ufunguo wa API) {#make-api-key}

Baada ya kuunda akaunti ya Alchemy, unaweza kuzalisha ufunguo wa Kiolesura cha Kupanga Programu Tumizi (API) kwa kuunda programu. Hii itaturuhusu kufanya maombi kwenye mtandao wa majaribio wa Sepolia. Angalia [mwongozo huu](https://www.alchemy.com/docs/choosing-a-web3-network) ikiwa una hamu ya kujifunza zaidi kuhusu mitandao ya majaribio.

1. Nenda kwenye ukurasa wa "Create new app" (Unda programu mpya) katika Dashibodi yako ya Alchemy kwa kuchagua "Select an app" (Chagua programu) kwenye upau wa kusogeza na kubofya "Create new app"

![Unda programu yako](./alchemy-create-new-app.png)

2. Ipe programu yako jina (tulichagua “My First NFT!”), toa maelezo mafupi, na uchague matumizi. Kisha, tafuta "Ethereum" na uchague mtandao. Tutatumia Sepolia, mtandao wa majaribio unaopendekezwa kwa uundaji wa programu (tazama [mitandao ya Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Bofya "Next" (Inayofuata) ili kuendelea, kisha “Create app” (Unda programu) na ndivyo hivyo! Programu yako inapaswa kuonekana kwenye menyu kunjuzi ya upau wa kusogeza, ikiwa na Ufunguo wa API unaopatikana kwa kunakili.

## Hatua ya 3: Unda akaunti ya Ethereum (anwani) {#create-eth-address}

Tunahitaji akaunti ya Ethereum kutuma na kupokea miamala. Kwa mafunzo haya, tutatumia MetaMask, mkoba wa mtandaoni kwenye kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Ikiwa unataka kuelewa zaidi kuhusu jinsi miamala kwenye Ethereum inavyofanya kazi, angalia [ukurasa huu](/developers/docs/transactions/) kutoka kwa Taasisi ya Ethereum.

Unaweza kupakua na kuunda akaunti ya MetaMask bila malipo [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha unabadilisha kwenda kwenye mtandao wa majaribio wa "Sepolia" kwa kutumia menyu ya kuchagua mtandao (ili tusiwe tunashughulika na pesa halisi). Ikiwa huoni Sepolia kwenye orodha, fungua menyu kwenye kona ya juu kulia, chagua "Networks" (Mitandao), na uwashe "Show test networks" (Onyesha mitandao ya majaribio) (tazama [mwongozo wa MetaMask wa kutazama mitandao ya majaribio](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Weka Sepolia kama mtandao wako](./metamask-sepolia.png)

## Hatua ya 4: Ongeza Etha kutoka kwenye Bomba {#step-4-add-ether-from-a-faucet}

Ili kusambaza mkataba mahiri wetu kwenye mtandao wa majaribio, tutahitaji ETH bandia. Ili kupata ETH ya Sepolia, chagua moja ya mabomba yaliyoorodheshwa katika [maelezo ya mtandao wa Sepolia](/developers/docs/networks/#sepolia) na uweke anwani ya akaunti yako. Ikiwa moja haifanyi kazi, jaribu nyingine kwani wakati mwingine zinaweza kukauka, na baadhi zina sheria za kustahiki: kwa mfano, [bomba la Sepolia la Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) linahitaji anwani inayopokea kuwa na angalau 0.001 ETH kwenye Mtandao Mkuu wa Ethereum. Unapaswa kuona ETH kwenye akaunti yako ya MetaMask muda mfupi baadaye!

## Hatua ya 5: Angalia Salio lako {#check-balance}

Ili kuhakikisha salio letu lipo, hebu tufanye ombi la [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) kwa kutumia [zana ya sandbox ya Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Hii itarudisha kiasi cha ETH kwenye mkoba wetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Tuma Ombi” (“Send Request”), unapaswa kuona jibu kama hili:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Kumbuka** Matokeo haya yapo katika Wei, si ETH. Wei inatumika kama kiasi kidogo zaidi cha Etha. Ubadilishaji kutoka Wei hadi ETH ni 1 eth = 10<sup>18</sup> Wei. Kwa hivyo tukibadilisha 0xde0b6b3a7640000 kuwa desimali tunapata 1\*10<sup>18</sup> Wei, ambayo ni sawa na 1 ETH.

Phew! Pesa zetu za majaribio zote zipo.

## Hatua ya 6: Anzisha mradi wetu {#initialize-project}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uandike:

```sh
mkdir my-nft
cd my-nft
```

Kwa kuwa sasa tuko ndani ya folda ya mradi wetu, tutatumia npm init kuanzisha mradi. Ikiwa bado hujasakinisha npm, fuata [maagizo ya usakinishaji wa Node.js](https://nodejs.org/en/download/) (tutahitaji Node.js na npm kwa mafunzo haya).

```sh
npm init
```

Haijalishi sana jinsi unavyojibu maswali ya usakinishaji; hivi ndivyo tulivyofanya kwa marejeleo:

```console
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Idhinisha package.json. Hardhat 3, ambayo tutasakinisha baadaye, inasaidia tu miradi ya moduli ya ES, kwa hivyo weka alama mradi kama mmoja:

```sh
npm pkg set type=module
```

Na tuko tayari kuendelea!

## Hatua ya 7: Sakinisha [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat ni mazingira ya uundaji ya kukusanya, kusambaza, kujaribu, na kutatua programu yako ya Ethereum. Inasaidia wasanidi programu wanapounda mikataba mahiri na programu tumizi zilizogatuliwa (dapps) ndani ya kompyuta zao kabla ya kusambaza kwenye mnyororo wa moja kwa moja.

Hardhat 3 inahitaji Node.js v22.13.0 au toleo jipya zaidi. Ndani ya mradi wetu wa my-nft endesha:

```sh
npm install --save-dev hardhat
```

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/docs/getting-started).

## Hatua ya 8: Unda mradi wa Hardhat {#create-hardhat-project}

Kuendesha `npx hardhat --init` kungezalisha mradi kamili wa mfano, lakini kwa mafunzo haya tutaweka mambo kwa mikono ili uweze kuona kila kipande. Katika mzizi wa folda yako ya mradi, unda faili inayoitwa `hardhat.config.js` yenye yaliyomo yafuatayo:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Hapa ndipo tutakapobainisha mipangilio yote ya mradi wetu (katika hatua ya 13). Kwa sasa, inaiambia tu Hardhat ni toleo gani la kikusanyaji cha Solidity la kutumia.

## Hatua ya 9: Ongeza folda za mradi {#add-project-folders}

Ili kuweka mradi wetu ukiwa umepangwa, tutaunda folda mbili mpya. Nenda kwenye saraka ya mzizi ya mradi wako katika mstari wako wa amri na uandike:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ ni mahali tutakapoweka msimbo wetu wa mkataba mahiri wa NFT

- scripts/ ni mahali tutakapoweka hati za kusambaza na kuingiliana na mkataba mahiri wetu

## Hatua ya 10: Andika mkataba wetu {#write-contract}

Kwa kuwa sasa mazingira yetu yamewekwa, twende kwenye mambo ya kusisimua zaidi: _kuandika msimbo wetu wa mkataba mahiri!_

Fungua mradi wa my-nft katika kihariri chako unachokipenda (tunapenda [VSCode](https://code.visualstudio.com/)). Mikataba mahiri imeandikwa katika lugha inayoitwa Solidity ambayo ndiyo tutakayotumia kuandika mkataba mahiri wetu wa MyNFT.sol.‌

1. Nenda kwenye folda ya `contracts` na uunde faili mpya inayoitwa MyNFT.sol

2. Hapa chini kuna msimbo wetu wa mkataba mahiri wa NFT, ambao tumeutegemeza kwenye utekelezaji wa ERC-721 wa maktaba ya [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Nakili na ubandike yaliyomo hapa chini kwenye faili yako ya MyNFT.sol.

   ```solidity
   // Mkataba unaotokana na https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Kwa sababu tunarithi madarasa kutoka kwenye maktaba ya mikataba ya OpenZeppelin, katika mstari wako wa amri endesha `npm install @openzeppelin/contracts` ili kusakinisha maktaba kwenye folda yetu. Mafunzo haya yanatumia Mikataba ya OpenZeppelin 5.x, ambayo inahitaji Solidity 0.8.24 au toleo jipya zaidi.

Kwa hivyo, msimbo huu _unafanya_ nini hasa? Hebu tuuchambue, mstari kwa mstari.

Juu ya mkataba mahiri wetu, tunaingiza madarasa matatu ya mkataba mahiri wa [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol ina utekelezaji wa kiwango cha ERC-721, ambacho mkataba mahiri wetu wa NFT utarithi. (Ili kuwa NFT halali, mkataba mahiri wako lazima utekeleze mbinu zote za kiwango cha ERC-721.) Ili kujifunza zaidi kuhusu vipengele vilivyorithiwa vya ERC-721, angalia ufafanuzi wa kiolesura [hapa](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol inaweka [udhibiti wa ufikiaji](https://docs.openzeppelin.com/contracts/5.x/access-control) kwenye mkataba mahiri wetu, kwa hivyo ni mmiliki tu wa mkataba mahiri (wewe) anayeweza kufua tokani zisizobadilishika (NFTs). Mmiliki ni anwani ya `initialOwner` iliyopitishwa kwa konstrukta. (Kumbuka, kujumuisha udhibiti wa ufikiaji ni upendeleo kabisa. Ikiwa ungependa mtu yeyote aweze kufua NFT kwa kutumia mkataba mahiri wako, ondoa `Ownable` na `Ownable(initialOwner)` kutoka kwenye ufafanuzi wa mkataba na konstrukta, na `onlyOwner` kutoka kwenye kipengele cha `mintNFT`.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol inapanua ERC-721 ili kila tokeni iweze kuhifadhi URI yake ya data fafanuzi, ambayo tunaiweka wakati wa ufuzi.

Baada ya taarifa zetu za kuingiza, tuna mkataba mahiri wetu maalum wa NFT, ambao ni mfupi kwa kushangaza — una kaunta tu, konstrukta, na kipengele kimoja! Hii ni shukrani kwa mikataba yetu iliyorithiwa ya OpenZeppelin, ambayo inatekeleza mbinu nyingi tunazohitaji kuunda NFT, kama vile `ownerOf` ambayo inarudisha mmiliki wa NFT, na `transferFrom`, ambayo inahamisha umiliki wa NFT kutoka akaunti moja hadi nyingine.

Kaunta, `_nextTokenId`, inafuatilia jumla ya idadi ya tokani zisizobadilishika (NFTs) zilizofuliwa na kuweka kitambulisho cha kipekee kwenye NFT yetu mpya. (Kila NFT iliyofuliwa kwa kutumia mkataba mahiri lazima ipewe kitambulisho cha kipekee—hapa kitambulisho chetu cha kipekee kinatambuliwa tu na jumla ya idadi ya tokani zisizobadilishika (NFTs) zilizopo. `++_nextTokenId` inaongeza kaunta kabla haijatumika, kwa hivyo NFT ya kwanza tunayofua na mkataba mahiri wetu ina kitambulisho cha "1," NFT yetu ya pili ina kitambulisho cha "2," n.k.)

Katika konstrukta yetu ya ERC-721, utagundua tunapitisha nyuzi 2, “MyNFT” na “NFT.” Kigezo cha kwanza ni jina la mkataba mahiri, na cha pili ni alama yake. Unaweza kutaja kila moja ya vigezo hivi chochote unachotaka!

Hatimaye, tuna kipengele chetu cha `mintNFT(address recipient, string memory tokenURI)` ambacho kinaturuhusu kufua NFT! Utagundua kipengele hiki kinachukua vigezo viwili:

- `address recipient` inabainisha anwani itakayopokea NFT yako iliyofuliwa hivi punde

- `string memory tokenURI` ni uzi ambao unapaswa kutatua kwenye hati ya JSON inayoelezea data fafanuzi ya NFT. Data fafanuzi ya NFT ndiyo inayoifanya iwe hai, ikiruhusu kuwa na sifa zinazoweza kusanidiwa, kama vile jina, maelezo, picha, na sifa nyingine. Katika sehemu ya 2 ya mafunzo haya, tutaelezea jinsi ya kusanidi data fafanuzi hii.

`mintNFT` inaita baadhi ya mbinu kutoka kwenye maktaba iliyorithiwa ya ERC-721, na hatimaye inarudisha nambari inayowakilisha kitambulisho cha NFT iliyofuliwa hivi punde.

## Hatua ya 11: Unganisha MetaMask na Alchemy kwenye mradi wako {#connect-metamask-and-alchemy}

Kwa kuwa sasa tumeunda mkoba wa MetaMask, akaunti ya Alchemy, na kuandika mkataba mahiri wetu, ni wakati wa kuunganisha vyote vitatu.

Kila muamala unaotumwa kutoka kwenye mkoba wako wa mtandaoni unahitaji sahihi kwa kutumia ufunguo wa siri wako wa kipekee. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi kwa usalama ufunguo wa siri wetu (na ufunguo wa Kiolesura cha Kupanga Programu Tumizi (API) cha Alchemy) katika faili ya mazingira.

Ili kujifunza zaidi kuhusu kutuma miamala, angalia [nyaraka za miamala](/developers/docs/transactions/).

Unda faili ya `.env` katika saraka ya mzizi ya mradi wetu, na uongeze ufunguo wa siri wako wa MetaMask na URL ya API ya HTTP ya Alchemy ndani yake.

- Fuata [maagizo haya](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) ili kuhamisha ufunguo wa siri wako kutoka MetaMask

- Tazama hapa chini ili kupata URL ya API ya HTTP ya Alchemy na uinakili kwenye ubao wako wa kunakili

![Nakili URL yako ya API ya Alchemy](./copy-alchemy-api-url.mp4#842x480)

Faili yako ya `.env` sasa inapaswa kuonekana hivi:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Ili kuunganisha hizi kwenye msimbo wetu, tutarejelea vigezo hivi katika faili yetu ya hardhat.config.js katika hatua ya 13. Node.js inaweza kusoma faili za `.env` yenyewe, kwa hivyo hakuna kifurushi cha ziada cha kusakinisha.

<EnvWarningBanner />

## Hatua ya 12: Sakinisha Ethers.js {#install-ethers}

Ethers.js ni maktaba inayorahisisha kuingiliana na kufanya maombi kwa Ethereum kwa kufunika [mbinu za kawaida za JSON-RPC](/developers/docs/apis/json-rpc/) na mbinu zinazofaa zaidi kwa mtumiaji.

Hardhat inafanya iwe rahisi sana kuunganisha [Programu-jalizi](https://hardhat.org/docs/plugins/official-plugins) kwa zana za ziada na utendaji uliopanuliwa. Tutakuwa tunatumia [Programu-jalizi ya Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) kwa usambazaji wa mkataba ([Ethers.js](https://docs.ethers.org/v6/) ina mbinu safi sana za usambazaji wa mkataba).

Katika saraka yako ya mradi andika:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Pia tutaongeza programu-jalizi kwenye hardhat.config.js yetu katika hatua inayofuata.

## Hatua ya 13: Sasisha hardhat.config.js {#update-hardhat-config}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha hardhat.config.js ili mradi wetu ujue kuzihusu zote.

Sasisha hardhat.config.js yako ili ionekane hivi:

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

`configVariable` inaiambia Hardhat kusoma kila thamani kutoka kwenye kigezo cha mazingira tu inapohitajika, kwa hivyo amri kama `compile` zinafanya kazi hata kabla ya maadili kuwekwa. Ikiwa hupendelei kuweka ufunguo wa siri wako katika faili ya maandishi wazi, Hardhat pia inaweza kusoma [vigezo vya usanidi kutoka kwenye hifadhi ya funguo iliyosimbwa kwa njia fiche](https://hardhat.org/docs/guides/configuration-variables).

## Hatua ya 14: Kusanya mkataba wetu {#compile-contract}

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tukusanye mkataba wetu. Kazi ya kukusanya ni mojawapo ya kazi zilizojengewa ndani za hardhat.

Kutoka kwenye mstari wa amri endesha:

```sh
npx hardhat compile
```

Mara ya kwanza unapokusanya, Hardhat inapakua kikusanyaji cha Solidity. Unapaswa kisha kuona kitu kama `Compiled 1 Solidity file with solc 0.8.34`. Ikiwa sivyo, unaweza kutuma ujumbe kila wakati kwenye [Discord ya Alchemy](https://discord.gg/gWuC7zB).

## Hatua ya 15: Andika hati yetu ya usambazaji {#write-deploy}

Kwa kuwa sasa mkataba wetu umeandikwa na faili yetu ya usanidi iko tayari, ni wakati wa kuandika hati yetu ya usambazaji wa mkataba.

Nenda kwenye folda ya `scripts/` na uunde faili mpya inayoitwa `deploy.js`, ukiongeza yaliyomo yafuatayo ndani yake:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Anza usambazaji, ukirejesha ahadi inayotatuliwa kuwa obijekti ya mkataba
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Hebu tupitie kile ambacho kila moja ya mistari hii ya msimbo inafanya.

```js
const { ethers } = await network.create()
```

Katika Hardhat 3, hati inafungua muunganisho kwenye mtandao waziwazi. `network.create()` inaunganisha kwenye mtandao unaochagua na chaguo la `--network` unapoendesha hati, na programu-jalizi ya `hardhat-ethers` inaongeza kipengee cha `ethers` kwenye muunganisho huo.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` inarudisha akaunti zilizosanidiwa kwa ajili ya mtandao. Kwenye Sepolia, hiyo ni akaunti ambayo ufunguo wa siri wake uliuweka kwenye `.env`. Tunapitisha anwani yake kwa konstrukta ili uwe mmiliki wa mkataba.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

ContractFactory katika ethers.js ni dhana inayotumika kusambaza mikataba mahiri mipya, kwa hivyo MyNFT hapa ni kiwanda cha matukio ya mkataba wetu wa NFT. Unapotumia programu-jalizi ya hardhat-ethers matukio ya ContractFactory na Contract yanaunganishwa kwa mtia saini wa kwanza kwa chaguo-msingi.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Kuita deploy() kwenye ContractFactory kutaanzisha usambazaji, na kurudisha Ahadi (Promise) inayotatua kwenye Mkataba (Contract). Hiki ni kipengee ambacho kina mbinu kwa kila moja ya vipengele vyetu vya mkataba mahiri. Hoja unazopitisha kwa deploy() zinaenda kwenye konstrukta ya mkataba, hapa anwani ya `initialOwner`.

`waitForDeployment()` inasubiri hadi muamala wa usambazaji ujumuishwe kwenye kitalu, na `getAddress()` inarudisha anwani ya mkataba mpya. Tazama [nyaraka za mkataba za ethers.js](https://docs.ethers.org/v6/api/contract/) kwa maelezo zaidi.

## Hatua ya 16: Sambaza mkataba wetu {#deploy-contract}

Hatimaye tuko tayari kusambaza mkataba mahiri wetu! Nenda nyuma kwenye mzizi wa saraka yako ya mradi, na katika mstari wa amri endesha:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Unapaswa kisha kuona kitu kama:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Tukienda kwenye [Etherscan ya Sepolia](https://sepolia.etherscan.io/) na kutafuta anwani ya mkataba wetu tunapaswa kuweza kuona kwamba umesambazwa kwa ufanisi. Ikiwa huwezi kuiona mara moja, tafadhali subiri kidogo kwani inaweza kuchukua muda. Muamala utaonekana kama hivi:

![Tazama anwani yako ya muamala kwenye Etherscan](./etherscan-sepoila-contract-creation.png)

Anwani ya Kutoka (From) inapaswa kulingana na anwani ya akaunti yako ya MetaMask na anwani ya Kwenda (To) itasema “Contract Creation” (Uundaji wa Mkataba). Tukibofya kwenye muamala, tutaona anwani ya mkataba wetu katika sehemu ya Kwenda (To):

![Tazama anwani yako ya mkataba kwenye Etherscan](./etherscan-sepolia-tx-details.png)

Ndiooooo! Umesambaza mkataba mahiri wako wa NFT kwenye mnyororo wa Ethereum (mtandao wa majaribio)!

Ili kuelewa jinsi inavyofanya kazi kiufundi, unaweza kuangalia maombi ambayo programu yako ilipokea katika [dashibodi yako ya Alchemy](https://dashboard.alchemy.com/).

Hapo utaona simu chache za JSON-RPC ambazo Hardhat/Ethers ilitufanyia kiufundi tulipopiga kipengele cha .deploy(). Mbili muhimu za kutaja hapa ni [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), ambalo ni ombi la kuandika mkataba mahiri wetu kwenye mnyororo wa Sepolia, na [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kutokana na heshi (mtindo wa kawaida wakati wa kutuma miamala). Ili kujifunza zaidi kuhusu kutuma miamala, angalia [nyaraka za miamala](/developers/docs/transactions/).

Hayo ndiyo yote kwa Sehemu ya 1 ya mafunzo haya. Katika [Sehemu ya 2, tutaingiliana na mkataba mahiri wetu kwa kufua NFT](/developers/tutorials/how-to-mint-an-nft/), na katika [Sehemu ya 3 tutakuonyesha jinsi ya kutazama NFT yako kwenye mkoba wako wa Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
