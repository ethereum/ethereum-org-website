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

Huku NFT zikileta mnyororo wa vitalu katika macho ya umma, sasa ni fursa nzuri ya kuelewa umaarufu wewe mwenyewe kwa kuchapisha mkataba wako mwenyewe wa NFT (Tokeni ya ERC-721) kwenye mnyororo wa vitalu wa Ethereum!

Alchemy inajivunia sana kuwezesha majina makubwa zaidi katika nafasi ya NFT, ikiwa ni pamoja na Makersplace (hivi karibuni iliweka rekodi ya mauzo ya sanaa ya kidijitali huko Christie's kwa Dola Milioni 69), Dapper Labs (waundaji wa NBA Top Shot & Crypto Kitties), OpenSea (soko kubwa zaidi la NFT duniani), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, na zaidi.

Katika mafunzo haya, tutapitia kuunda na kusambaza mkataba mahiri wa ERC-721 kwenye mtandao wa majaribio wa Sepolia kwa kutumia [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) na [Alchemy](https://alchemy.com/signup/eth) (usijali ikiwa bado huelewi maana ya haya yote — tutayaelezea!).

Katika Sehemu ya 2 ya mafunzo haya tutapitia jinsi tunavyoweza kutumia mkataba mahiri wetu kufua NFT, na katika Sehemu ya 3 tutaelezea jinsi ya kutazama NFT yako kwenye MetaMask.

Na bila shaka, ikiwa una maswali wakati wowote, usisite kuwasiliana katika [Discord ya Alchemy](https://discord.gg/gWuC7zB) au tembelea [nyaraka za API ya NFT ya Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Hatua ya 1: Unganisha kwenye mtandao wa Ethereum {#connect-to-ethereum}

Kuna njia nyingi za kufanya maombi kwenye mnyororo wa vitalu wa Ethereum, lakini ili kurahisisha mambo, tutatumia akaunti ya bure kwenye [Alchemy](https://alchemy.com/signup/eth), jukwaa la msanidi wa mnyororo wa vitalu na API ambayo inaturuhusu kuwasiliana na mnyororo wa Ethereum bila kulazimika kuendesha nodi zetu wenyewe.

Katika mafunzo haya, pia tutatumia zana za msanidi wa Alchemy kwa ufuatiliaji na uchanganuzi ili kuelewa jinsi inavyofanya kazi kiufundi katika usambazaji wa mkataba mahiri wetu. Ikiwa bado huna akaunti ya Alchemy, unaweza kujisajili bila malipo [hapa](https://alchemy.com/signup/eth).

## Hatua ya 2: Unda programu yako (na ufunguo wa API) {#make-api-key}

Mara tu unapounda akaunti ya Alchemy, unaweza kuzalisha ufunguo wa API kwa kuunda programu. Hii itaturuhusu kufanya maombi kwenye mtandao wa majaribio wa Sepolia. Angalia [mwongozo huu](https://docs.alchemyapi.io/guides/choosing-a-network) ikiwa una hamu ya kujifunza zaidi kuhusu mitandao ya majaribio.

1. Nenda kwenye ukurasa wa “Unda Programu” katika Dashibodi yako ya Alchemy kwa kuelea juu ya “Programu” kwenye upau wa kusogeza na kubofya “Unda Programu”

![Create your app](./create-your-app.png)

2. Ipe jina programu yako (tulichagua “NFT Yangu ya Kwanza!”), toa maelezo mafupi, chagua “Ethereum” kwa Mnyororo, na uchague “Sepolia” kwa mtandao wako. Tangu Unganisho mitandao mingine ya majaribio imeachwa kutumika.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Bofya “Unda programu” na ndivyo hivyo! Programu yako inapaswa kuonekana kwenye jedwali hapa chini.

## Hatua ya 3: Unda akaunti ya Ethereum (anwani) {#create-eth-address}

Tunahitaji akaunti ya Ethereum kutuma na kupokea miamala. Kwa mafunzo haya, tutatumia MetaMask, mkoba wa mtandaoni kwenye kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Ikiwa unataka kuelewa zaidi kuhusu jinsi miamala kwenye Ethereum inavyofanya kazi, angalia [ukurasa huu](/developers/docs/transactions/) kutoka kwa Taasisi ya Ethereum.

Unaweza kupakua na kuunda akaunti ya MetaMask bila malipo [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha unabadilisha hadi “Mtandao wa Majaribio wa Sepolia” upande wa juu kulia (ili tushughulike na pesa za majaribio).

![Set Sepolia as your network](./metamask-goerli.png)

## Hatua ya 4: Ongeza Etha kutoka kwenye Bomba {#step-4-add-ether-from-a-faucet}

Ili kusambaza mkataba mahiri wetu kwenye mtandao wa majaribio, tutahitaji ETH za majaribio. Ili kupata ETH unaweza kwenda kwenye [Bomba la Sepolia](https://sepoliafaucet.com/) linalopangishwa na Alchemy, ingia na uweke anwani ya akaunti yako, bofya “Nitumie ETH”. Unapaswa kuona ETH kwenye akaunti yako ya MetaMask muda mfupi baadaye!

## Hatua ya 5: Angalia Salio lako {#check-balance}

Ili kuhakikisha salio letu lipo, hebu tufanye ombi la [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) kwa kutumia [zana ya kutunga ya Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Hii itarudisha kiasi cha ETH kwenye mkoba wetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Tuma Ombi”, unapaswa kuona jibu kama hili:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Kumbuka** Matokeo haya yako katika Wei, si ETH. Wei inatumika kama kiasi kidogo zaidi cha Etha. Ubadilishaji kutoka Wei hadi ETH ni 1 eth = 10<sup>18</sup> Wei. Kwa hivyo tukibadilisha 0xde0b6b3a7640000 kuwa desimali tunapata 1\*10<sup>18</sup> Wei, ambayo ni sawa na 1 ETH.

Phew! Pesa zetu za majaribio zote zipo.

## Hatua ya 6: Anzisha mradi wetu {#initialize-project}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uandike:

    mkdir my-nft
    cd my-nft

Sasa kwa kuwa tuko ndani ya folda ya mradi wetu, tutatumia npm init kuanzisha mradi. Ikiwa bado huna npm iliyosakinishwa, fuata [maagizo haya](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (pia tutahitaji [Node.js](https://nodejs.org/en/download/), kwa hivyo pakua hiyo pia!).

    npm init

Haijalishi sana jinsi unavyojibu maswali ya usakinishaji; hivi ndivyo tulivyofanya kwa marejeleo:

```json
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

Idhinisha package.json, na tuko tayari kuendelea!

## Hatua ya 7: Sakinisha [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat ni mazingira ya usanidi ya kukusanya, kusambaza, kujaribu, na kutatua programu yako ya Ethereum. Inasaidia wasanidi wanapounda mikataba mahiri na programu tumizi zilizogatuliwa (dapps) ndani ya kompyuta zao kabla ya kusambaza kwenye mnyororo wa moja kwa moja.

Ndani ya mradi wetu wa my-nft endesha:

    npm install --save-dev hardhat

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/getting-started/#overview).

## Hatua ya 8: Unda mradi wa Hardhat {#create-hardhat-project}

Ndani ya folda ya mradi wetu endesha:

    npx hardhat

Kisha unapaswa kuona ujumbe wa kukaribisha na chaguo la kuchagua unachotaka kufanya. Chagua “create an empty hardhat.config.js”:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Hii itazalisha faili la hardhat.config.js kwa ajili yetu ambalo ndipo tutakapobainisha mipangilio yote ya mradi wetu (kwenye hatua ya 13).

## Hatua ya 9: Ongeza folda za mradi {#add-project-folders}

Ili kuweka mradi wetu ukiwa umepangwa, tutaunda folda mbili mpya. Nenda kwenye saraka kuu ya mradi wako katika mstari wako wa amri na uandike:

    mkdir contracts
    mkdir scripts

- contracts/ ni mahali tutakapoweka msimbo wa mkataba mahiri wetu wa NFT

- scripts/ ni mahali tutakapoweka hati za kusambaza na kuingiliana na mkataba mahiri wetu

## Hatua ya 10: Andika mkataba wetu {#write-contract}

Sasa kwa kuwa mazingira yetu yamewekwa, twende kwenye mambo ya kusisimua zaidi: _kuandika msimbo wa mkataba mahiri wetu!_

Fungua mradi wa my-nft katika kihariri chako unachokipenda (tunapenda [VSCode](https://code.visualstudio.com/)). Mikataba mahiri imeandikwa katika lugha inayoitwa Solidity ambayo ndiyo tutakayotumia kuandika mkataba mahiri wetu wa MyNFT.sol.‌

1. Nenda kwenye folda ya `contracts` na uunde faili jipya linaloitwa MyNFT.sol

2. Hapa chini kuna msimbo wa mkataba mahiri wetu wa NFT, ambao tumeutegemeza kwenye utekelezaji wa ERC-721 wa maktaba ya [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Nakili na ubandike yaliyomo hapa chini kwenye faili lako la MyNFT.sol.

   ```solidity
   //Mkataba unaotegemea [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Kwa sababu tunarithi madarasa kutoka kwenye maktaba ya mikataba ya OpenZeppelin, katika mstari wako wa amri endesha `npm install @openzeppelin/contracts^4.0.0` ili kusakinisha maktaba kwenye folda yetu.

Kwa hivyo, msimbo huu _unafanya_ nini hasa? Hebu tuuchambue, mstari kwa mstari.

Juu ya mkataba mahiri wetu, tunaingiza madarasa matatu ya mkataba mahiri wa [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol ina utekelezaji wa kiwango cha ERC-721, ambacho mkataba mahiri wetu wa NFT utarithi. (Ili kuwa NFT halali, mkataba mahiri wako lazima utekeleze mbinu zote za kiwango cha ERC-721.) Ili kujifunza zaidi kuhusu vipengele vilivyorithiwa vya ERC-721, angalia ufafanuzi wa kiolesura [hapa](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol hutoa vihesabio ambavyo vinaweza tu kuongezwa au kupunguzwa kwa moja. Mkataba mahiri wetu unatumia kihesabio kufuatilia jumla ya idadi ya NFT zilizofuliwa na kuweka kitambulisho cha kipekee kwenye NFT yetu mpya. (Kila NFT iliyofuliwa kwa kutumia mkataba mahiri lazima ipewe kitambulisho cha kipekee—hapa kitambulisho chetu cha kipekee kinatambuliwa tu by jumla ya idadi ya NFT zilizopo. Kwa mfano, NFT ya kwanza tunayofua kwa mkataba mahiri wetu ina kitambulisho cha "1," NFT yetu ya pili ina kitambulisho cha "2," n.k.)

- @openzeppelin/contracts/access/Ownable.sol huweka [udhibiti wa ufikiaji](https://docs.openzeppelin.com/contracts/3.x/access-control) kwenye mkataba mahiri wetu, kwa hivyo mmiliki wa mkataba mahiri pekee (wewe) ndiye anayeweza kufua NFT. (Kumbuka, kujumuisha udhibiti wa ufikiaji ni upendeleo kabisa. Ikiwa ungependa mtu yeyote aweze kufua NFT kwa kutumia mkataba mahiri wako, ondoa neno Ownable kwenye mstari wa 10 na onlyOwner kwenye mstari wa 17.)

Baada ya taarifa zetu za kuingiza, tuna mkataba mahiri wetu maalum wa NFT, ambao unashangaza kwa ufupi — una kihesabio tu, konstrukta, na kipengele kimoja! Hii ni shukrani kwa mikataba yetu iliyorithiwa ya OpenZeppelin, ambayo inatekeleza mbinu nyingi tunazohitaji kuunda NFT, kama vile `ownerOf` ambayo inarudisha mmiliki wa NFT, na `transferFrom`, ambayo inahamisha umiliki wa NFT kutoka akaunti moja hadi nyingine.

Katika konstrukta yetu ya ERC-721, utagundua tunapitisha mifuatano 2, “MyNFT” na “NFT.” Kigezo cha kwanza ni jina la mkataba mahiri, na cha pili ni alama yake. Unaweza kutaja kila moja ya vigezo hivi chochote unachotaka!

Hatimaye, tuna kipengele chetu `mintNFT(address recipient, string memory tokenURI)` ambacho kinaturuhusu kufua NFT! Utagundua kipengele hiki kinachukua vigezo viwili:

- `address recipient` inabainisha anwani itakayopokea NFT yako iliyofuliwa hivi punde

- `string memory tokenURI` ni mfuatano ambao unapaswa kutatua kwenye hati ya JSON inayoelezea data fafanuzi ya NFT. Data fafanuzi ya NFT ndiyo inayoipa uhai, na kuiruhusu kuwa na sifa zinazoweza kusanidiwa, kama vile jina, maelezo, picha, na sifa nyingine. Katika sehemu ya 2 ya mafunzo haya, tutaelezea jinsi ya kusanidi data fafanuzi hii.

`mintNFT` inaita baadhi ya mbinu kutoka kwenye maktaba iliyorithiwa ya ERC-721, na hatimaye inarudisha nambari inayowakilisha kitambulisho cha NFT iliyofuliwa hivi punde.

## Hatua ya 11: Unganisha MetaMask na Alchemy kwenye mradi wako {#connect-metamask-and-alchemy}

Sasa kwa kuwa tumeunda mkoba wa MetaMask, akaunti ya Alchemy, na kuandika mkataba mahiri wetu, ni wakati wa kuunganisha vyote vitatu.

Kila muamala unaotumwa kutoka kwenye mkoba wako wa mtandaoni unahitaji sahihi kwa kutumia ufunguo wa siri wako wa kipekee. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi kwa usalama ufunguo wa siri wetu (na ufunguo wa API wa Alchemy) katika faili la mazingira.

Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo haya](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) kuhusu kutuma miamala kwa kutumia Web3.

Kwanza, sakinisha kifurushi cha dotenv katika saraka ya mradi wako:

    npm install dotenv --save

Kisha, unda faili la `.env` katika saraka kuu ya mradi wetu, na uongeze ufunguo wa siri wako wa MetaMask na URL ya API ya HTTP ya Alchemy ndani yake.

- Fuata [maagizo haya](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) ili kuhamisha ufunguo wa siri wako kutoka MetaMask

- Tazama hapa chini ili kupata URL ya API ya HTTP ya Alchemy na uinakili kwenye ubao wako wa kunakili

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Faili lako la `.env` sasa linapaswa kuonekana hivi:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Ili kuunganisha haya kwenye msimbo wetu, tutarejelea vigezo hivi katika faili letu la hardhat.config.js katika hatua ya 13.

<EnvWarningBanner />

## Hatua ya 12: Sakinisha Ethers.js {#install-ethers}

Ethers.js ni maktaba inayorahisisha kuingiliana na kufanya maombi kwenye Ethereum kwa kufunga [mbinu za kawaida za JSON-RPC](/developers/docs/apis/json-rpc/) na mbinu zinazofaa zaidi kwa mtumiaji.

Hardhat inafanya iwe rahisi sana kuunganisha [Programu-jalizi](https://hardhat.org/plugins/) kwa zana za ziada na utendaji uliopanuliwa. Tutatumia [programu-jalizi ya Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) kwa usambazaji wa mkataba ([Ethers.js](https://github.com/ethers-io/ethers.js/) ina mbinu safi sana za usambazaji wa mkataba).

Katika saraka ya mradi wako andika:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Pia tutahitaji ethers katika hardhat.config.js yetu katika hatua inayofuata.

## Hatua ya 13: Sasisha hardhat.config.js {#update-hardhat-config}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha hardhat.config.js ili mradi wetu uzitambue zote.

Sasisha hardhat.config.js yako ili ionekane hivi:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## Hatua ya 14: Kusanya mkataba wetu {#compile-contract}

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tukusanye mkataba wetu. Kazi ya kukusanya ni mojawapo ya kazi zilizojengewa ndani za hardhat.

Kutoka kwenye mstari wa amri endesha:

    npx hardhat compile

Unaweza kupata onyo kuhusu kitambulisho cha leseni cha SPDX hakijatolewa katika faili la chanzo , lakini hakuna haja ya kuwa na wasiwasi kuhusu hilo — tunatumai kila kitu kingine kinaonekana vizuri! Ikiwa sivyo, unaweza kutuma ujumbe kila wakati katika [Discord ya Alchemy](https://discord.gg/u72VCg3).

## Hatua ya 15: Andika hati yetu ya kusambaza {#write-deploy}

Sasa kwa kuwa mkataba wetu umeandikwa na faili letu la usanidi liko tayari, ni wakati wa kuandika hati yetu ya kusambaza mkataba.

Nenda kwenye folda ya `scripts/` na uunde faili jipya linaloitwa `deploy.js`, ukiongeza yaliyomo yafuatayo ndani yake:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Anza usambazaji, ikirejesha ahadi inayokamilika kuwa obijekti ya mkataba
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat inafanya kazi nzuri sana ya kuelezea kile kila moja ya mistari hii ya msimbo inafanya katika [mafunzo yao ya Mikataba](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), tumepitisha maelezo yao hapa.

    const MyNFT = await ethers.getContractFactory("MyNFT");

ContractFactory katika ethers.js ni dhana inayotumika kusambaza mikataba mahiri mipya, kwa hivyo MyNFT hapa ni kiwanda cha matukio ya mkataba wetu wa NFT. Unapotumia programu-jalizi ya hardhat-ethers matukio ya ContractFactory na Contract yanaunganishwa kwa mtia saini wa kwanza kwa chaguo-msingi.

    const myNFT = await MyNFT.deploy();

Kuita deploy() kwenye ContractFactory kutaanzisha usambazaji, na kurudisha Ahadi (Promise) inayotatua kwenye Mkataba (Contract). Hiki ni kipengee ambacho kina mbinu kwa kila moja ya vipengele vya mkataba mahiri wetu.

## Hatua ya 16: Sambaza mkataba wetu {#deploy-contract}

Hatimaye tuko tayari kusambaza mkataba mahiri wetu! Nenda nyuma kwenye mzizi wa saraka ya mradi wako, na katika mstari wa amri endesha:

    npx hardhat --network sepolia run scripts/deploy.js

Kisha unapaswa kuona kitu kama:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Tukienda kwenye [Etherscan ya Sepolia](https://sepolia.etherscan.io/) na kutafuta anwani ya mkataba wetu tunapaswa kuweza kuona kwamba umesambazwa kwa ufanisi. Ikiwa huwezi kuiona mara moja, tafadhali subiri kidogo kwani inaweza kuchukua muda. Muamala utaonekana kama hivi:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

Anwani ya Kutoka (From) inapaswa kulingana na anwani ya akaunti yako ya MetaMask na anwani ya Kwenda (To) itasema “Uundaji wa Mkataba” (Contract Creation). Tukibofya kwenye muamala, tutaona anwani ya mkataba wetu katika sehemu ya Kwenda (To):

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Ndioooo! Umetoka tu kusambaza mkataba mahiri wako wa NFT kwenye mnyororo wa (mtandao wa majaribio wa) Ethereum!

Ili kuelewa jinsi inavyofanya kazi kiufundi, hebu twende kwenye kichupo cha Kichunguzi (Explorer) katika [dashibodi yetu ya Alchemy](https://dashboard.alchemyapi.io/explorer). Ikiwa una programu nyingi za Alchemy hakikisha unachuja kwa programu na uchague “MyNFT”.

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Hapa utaona simu chache za JSON-RPC ambazo Hardhat/Ethers ilitufanyia kiufundi tulipopiga simu kwenye kipengele cha .deploy(). Mbili muhimu za kutaja hapa ni [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), ambalo ni ombi la kuandika mkataba mahiri wetu kwenye mnyororo wa Sepolia, na [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kutokana na heshi (mtindo wa kawaida wakati wa kutuma miamala). Ili kujifunza zaidi kuhusu kutuma miamala, angalia mafunzo haya kuhusu [kutuma miamala kwa kutumia Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Hayo ndiyo yote kwa Sehemu ya 1 ya mafunzo haya. Katika [Sehemu ya 2, tutaingiliana na mkataba mahiri wetu kwa kufua NFT](/developers/tutorials/how-to-mint-an-nft/), na katika [Sehemu ya 3 tutakuonyesha jinsi ya kutazama NFT yako kwenye mkoba wako wa Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!