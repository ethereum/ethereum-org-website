---
title: Jinsi ya Kuandika & Kupeleka NFT (Sehemu ya 1/3 ya Mfululizo wa Mafunzo ya NFT)
description: Mafunzo haya ni Sehemu ya 1 ya mfululizo kuhusu NFTs ambayo itakuongoza hatua kwa hatua jinsi ya kuandika na kupeleka mkataba-erevu wa Tokeni Isiyoweza Kugawanyika (tokeni ya ERC-721) kwa kutumia Ethereum na Mfumo wa Faili wa Inter Planetary (IPFS).
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Uimara", "mikataba erevu" ]
skill: beginner
lang: sw
published: 2021-04-22
---

Huku NFTs zikiweka mnyororo wa bloku mbele ya umma, sasa ni fursa nzuri ya kuelewa mwenyewe msisimko huu kwa kuchapisha mkataba wako wa NFT (Tokeni ya ERC-721) kwenye mnyororo wa bloku wa Ethereum!

Alchemy inajivunia sana kuwezesha majina makubwa katika nafasi ya NFT, ikiwa ni pamoja na Makersplace (hivi karibuni iliweka rekodi ya mauzo ya sanaa ya kidijitali Christie's kwa Dola Milioni 69), Dapper Labs (watayarishi wa NBA Top Shot & Crypto Kitties), OpenSea (soko kubwa zaidi la NFT duniani), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, na zaidi.

Katika mafunzo haya, tutapitia hatua za kuunda na kupeleka mkataba-erevu wa ERC-721 kwenye mtandao wa majaribio wa Sepolia kwa kutumia [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) na [Alchemy](https://alchemy.com/signup/eth) (usisumbuke ikiwa bado huelewi maana ya yoyote kati ya haya — tutayaelezea!).

Katika Sehemu ya 2 ya mafunzo haya, tutapitia jinsi tunavyoweza kutumia mkataba-erevu wetu kutoa NFT, na katika Sehemu ya 3, tutaelezea jinsi ya kutazama NFT yako kwenye MetaMask.

Na bila shaka, ikiwa una maswali wakati wowote, usisite kuwasiliana nasi katika [Alchemy Discord](https://discord.gg/gWuC7zB) au tembelea [hati za API za NFT za Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Hatua ya 1: Unganisha na mtandao wa Ethereum {#connect-to-ethereum}

Kuna njia nyingi za kufanya maombi kwa mnyororo wa bloku wa Ethereum, lakini ili kurahisisha mambo, tutatumia akaunti ya bure kwenye [Alchemy](https://alchemy.com/signup/eth), jukwaa la wasanidi wa mnyororo wa bloku na API inayotuwezesha kuwasiliana na mnyororo wa Ethereum bila kulazimika kuendesha nodi zetu wenyewe.

Katika mafunzo haya, tutatumia pia zana za msanidi programu za Alchemy za ufuatiliaji na uchanganuzi ili kuelewa kinachoendelea chinichini katika upelekaji wa mkataba-erevu wetu. Ikiwa huna tayari akaunti ya Alchemy, unaweza kujisajili bure [hapa](https://alchemy.com/signup/eth).

## Hatua ya 2: Unda programu yako (na ufunguo wa API) {#make-api-key}

Mara tu unapounda akaunti ya Alchemy, unaweza kutengeneza ufunguo wa API kwa kuunda programu. Hii itaturuhusu kufanya maombi kwa mtandao wa majaribio wa Sepolia. Angalia [mwongozo huu](https://docs.alchemyapi.io/guides/choosing-a-network) ikiwa unataka kujifunza zaidi kuhusu mitandao ya majaribio.

1. Nenda kwenye ukurasa wa “Unda Programu” katika Dashibodi yako ya Alchemy kwa kuelea juu ya “Programu” katika upau wa kusogeza na kubofya “Unda Programu”

![Unda programu yako](./create-your-app.png)

2. Ipe programu yako jina (tulichagua “NFT Yangu ya Kwanza!”), toa maelezo mafupi, chagua “Ethereum” kwa ajili ya Mnyororo, na chagua “Sepolia” kwa ajili ya mtandao wako. Tangu muungano, testnets nyingine zimeacha kutumika.

![Sanidi na uchapishe programu yako](./alchemy-explorer-sepolia.png)

3. Bofya “Unda programu” na ndivyo hivyo! Programu yako inapaswa kuonekana kwenye jedwali lililo hapa chini.

## Hatua ya 3: Unda akaunti ya Ethereum (anwani) {#create-eth-address}

Tunahitaji akaunti ya Ethereum ili kutuma na kupokea miamala. Kwa mafunzo haya, tutatumia MetaMask, mkoba wa mtandaoni katika kivinjari unaotumika kudhibiti anwani ya akaunti yako ya Ethereum. Ikiwa unataka kuelewa zaidi jinsi miamala kwenye Ethereum inavyofanya kazi, angalia [ukurasa huu](/developers/docs/transactions/) kutoka kwa Msingi wa Ethereum.

Unaweza kupakua na kuunda akaunti ya MetaMask bure [hapa](https://metamask.io/download). Unapounda akaunti, au ikiwa tayari una akaunti, hakikisha umebadilisha hadi kwenye “Mtandao wa Majaribio wa Sepolia” upande wa juu kulia (ili tusishughulike na pesa halisi).

![Weka Sepolia kama mtandao wako](./metamask-goerli.png)

## Hatua ya 4: Ongeza ether kutoka kwa Bomba {#step-4-add-ether-from-a-faucet}

Ili kupeleka mkataba-erevu wetu kwenye mtandao wa majaribio, tutahitaji ETH bandia. Ili kupata ETH unaweza kwenda kwenye [Bomba la Sepolia](https://sepoliafaucet.com/) linalosimamiwa na Alchemy, ingia na uweke anwani ya akaunti yako, kisha bofya “Nitumie ETH”. Unapaswa kuona ETH katika akaunti yako ya MetaMask punde tu!

## Hatua ya 5: Angalia Salio lako {#check-balance}

Ili kuhakikisha salio letu lipo, hebu tufanye ombi la [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) kwa kutumia [zana ya mtunzi ya Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Hii itarudisha kiasi cha ETH katika mkoba wetu. Baada ya kuweka anwani ya akaunti yako ya MetaMask na kubofya “Tuma Ombi”, unapaswa kuona jibu kama hili:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **Kumbuka** Matokeo haya yako katika wei, sio ETH. Wei hutumika kama denomina ndogo zaidi ya ether. Ubadilishaji kutoka wei kwenda ETH ni 1 eth = 10<sup>18</sup> wei. Kwa hivyo, tukibadilisha 0xde0b6b3a7640000 kuwa desimali tunapata wei 1\*10<sup>18</sup>, ambayo ni sawa na ETH 1.

Phew! Pesa zetu bandia zote zipo.

## Hatua ya 6: Anzisha mradi wetu {#initialize-project}

Kwanza, tutahitaji kuunda folda kwa ajili ya mradi wetu. Nenda kwenye mstari wako wa amri na uandike:

    ```
    mkdir my-nft
    cd my-nft
    ```

Sasa kwa kuwa tuko ndani ya folda yetu ya mradi, tutatumia npm init kuanzisha mradi. Ikiwa huna tayari npm iliyosakinishwa, fuata [maagizo haya](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (tutahitaji pia [Node.js](https://nodejs.org/en/download/), kwa hiyo pakua hiyo pia!).

    ```
    npm init
    ```

Haijalishi sana jinsi unavyojibu maswali ya usakinishaji; hivi ndivyo tulivyofanya kwa ajili ya marejeleo:

```json
    jina la kifurushi: (my-nft)
    toleo: (1.0.0)
    maelezo: NFT yangu ya kwanza!
    mahali pa kuingilia: (index.js)
    amri ya majaribio:
    hifadhi ya git:
    maneno muhimu:
    mwandishi:
    leseni: (ISC)
    Karibu kuandika kwa /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "NFT yangu ya kwanza!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Idhinisha package.json, na tuko tayari kwenda!

## Hatua ya 7: Sakinisha [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat ni mazingira ya usanidi wa kuandaa, kupeleka, kupima, na kutatua programu yako ya Ethereum. Inasaidia wasanidi programu wanapojenga mikataba-erevu na dApps ndani ya nchi kabla ya kupeleka kwenye mnyororo hai.

Ndani ya mradi wetu wa my-nft, endesha:

    ```
    npm install --save-dev hardhat
    ```

Angalia ukurasa huu kwa maelezo zaidi kuhusu [maagizo ya usakinishaji](https://hardhat.org/getting-started/#overview).

## Hatua ya 8: Unda mradi wa Hardhat {#create-hardhat-project}

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
    👷 Karibu Hardhat v2.0.11 👷‍
    ? Unataka kufanya nini? …
    Unda mradi wa sampuli
    ❯ Unda hardhat.config.js tupu
    Acha
    ```

Hii itatutengenezea faili ya hardhat.config.js ambapo tutabainisha mipangilio yote ya mradi wetu (katika hatua ya 13).

## Hatua ya 9: Ongeza folda za mradi {#add-project-folders}

Ili kuweka mradi wetu ukiwa umepangiliwa, tutaunda folda mbili mpya. Nenda kwenye saraka ya mizizi ya mradi wako katika mstari wako wa amri na uandike:

    ```
    mkdir contracts
    mkdir scripts
    ```

- mikataba/ ni mahali ambapo tutaweka msimbo wetu wa mkataba-erevu wa NFT

- scripts/ ni mahali ambapo tutaweka hati za kupeleka na kuingiliana na mkataba-erevu wetu

## Hatua ya 10: Andika mkataba wetu {#write-contract}

Sasa kwa kuwa mazingira yetu yamewekwa, tuendelee na mambo ya kusisimua zaidi: _kuandika msimbo wetu wa mkataba-erevu!_

Fungua mradi wa my-nft katika kihariri chako unachopenda (tunapenda [VSCode](https://code.visualstudio.com/)). Mikataba-erevu huandikwa kwa lugha inayoitwa Solidity ambayo ndiyo tutakayotumia kuandika mkataba-erevu wetu wa MyNFT.sol.‌

1. Nenda kwenye folda ya `contracts` na uunde faili mpya inayoitwa MyNFT.sol

2. Hapa chini kuna msimbo wetu wa mkataba-erevu wa NFT, ambao tumeutegemea kwenye utekelezaji wa ERC-721 wa maktaba ya [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Nakili na ubandike yaliyomo hapa chini kwenye faili yako ya MyNFT.sol.

   ```solidity
   //Mkataba unategemea [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Kwa sababu tunarithi madarasa kutoka kwa maktaba ya mikataba ya OpenZeppelin, katika mstari wako wa amri endesha `npm install @openzeppelin/contracts^4.0.0` ili kusakinisha maktaba kwenye folda yetu.

Kwa hiyo, msimbo huu _hufanya_ nini hasa? Hebu tuuchambue, mstari kwa mstari.

Juu ya mkataba-erevu wetu, tunaagiza madarasa matatu ya mkataba-erevu ya [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol ina utekelezaji wa kiwango cha ERC-721, ambacho mkataba-erevu wetu wa NFT utarithi. (Ili kuwa NFT halali, mkataba-erevu wako lazima utekeleze mbinu zote za kiwango cha ERC-721.) Ili kujifunza zaidi kuhusu kazi zilizorithiwa za ERC-721, angalia ufafanuzi wa kiolesura [hapa](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol hutoa vihesabio vinavyoweza kuongezwa au kupunguzwa kwa moja tu. Mkataba-erevu wetu unatumia kihesabio kufuatilia idadi jumla ya NFT zilizotolewa na kuweka kitambulisho cha kipekee kwenye NFT yetu mpya. (Kila NFT inayotolewa kwa kutumia mkataba-erevu lazima ipewe kitambulisho cha kipekee—hapa kitambulisho chetu cha kipekee kinabainishwa tu na jumla ya idadi ya NFT zilizopo. Kwa mfano, NFT ya kwanza tunayotoa kwa mkataba-erevu wetu ina kitambulisho cha "1," NFT yetu ya pili ina kitambulisho cha "2," na kadhalika.)

- @openzeppelin/contracts/access/Ownable.sol huweka [udhibiti wa ufikiaji](https://docs.openzeppelin.com/contracts/3.x/access-control) kwenye mkataba-erevu wetu, ili mmiliki pekee wa mkataba-erevu (wewe) aweze kutoa NFT. (Kumbuka, kujumuisha udhibiti wa ufikiaji ni upendeleo kabisa. Ikiwa ungependa mtu yeyote aweze kutoa NFT kwa kutumia mkataba-erevu wako, ondoa neno Ownable kwenye mstari wa 10 na onlyOwner kwenye mstari wa 17.)

Baada ya taarifa zetu za kuagiza, tuna mkataba-erevu wetu maalum wa NFT, ambao ni mfupi kwa kushangaza — una kihesabio tu, kiunda, na kazi moja! Hii ni shukrani kwa mikataba yetu tuliyorithi ya OpenZeppelin, ambayo hutekeleza mbinu nyingi tunazohitaji kuunda NFT, kama vile `ownerOf` ambayo inarudisha mmiliki wa NFT, na `transferFrom`, ambayo huhamisha umiliki wa NFT kutoka akaunti moja hadi nyingine.

Katika kiunda chetu cha ERC-721, utaona tunapisha mifuatano 2, “MyNFT” na “NFT.” Kigezo cha kwanza ni jina la mkataba-erevu, na cha pili ni alama yake. Unaweza kupa kila moja ya vigezo hivi jina lolote unalotaka!

Mwishowe, tuna kazi yetu `mintNFT(address recipient, string memory tokenURI)` inayoturuhusu kutoa NFT! Utaona kazi hii inachukua vigezo viwili:

- `address recipient` inabainisha anwani itakayopokea NFT yako mpya iliyotolewa

- `string memory tokenURI` ni mfuatano unaopaswa kuelekeza kwenye hati ya JSON inayoelezea metadata ya NFT. Metadata ya NFT ndiyo hasa inayoipa uhai, ikiruhusu kuwa na sifa zinazoweza kusanidiwa, kama vile jina, maelezo, picha, na sifa zingine. Katika sehemu ya 2 ya mafunzo haya, tutaelezea jinsi ya kusanidi metadata hii.

`mintNFT` huita baadhi ya mbinu kutoka kwa maktaba ya ERC-721 iliyorithiwa, na hatimaye inarudisha nambari inayowakilisha kitambulisho cha NFT mpya iliyotolewa.

## Hatua ya 11: Unganisha MetaMask na Alchemy na mradi wako {#connect-metamask-and-alchemy}

Sasa kwa kuwa tumeunda mkoba wa MetaMask, akaunti ya Alchemy, na kuandika mkataba-erevu wetu, ni wakati wa kuunganisha vitu hivi vitatu.

Kila muamala unaotumwa kutoka kwa mkoba wako wa mtandaoni unahitaji sahihi kwa kutumia ufunguo wako binafsi wa kipekee. Ili kuipa programu yetu ruhusa hii, tunaweza kuhifadhi kwa usalama ufunguo wetu binafsi (na ufunguo wa API wa Alchemy) katika faili ya mazingira.

Ili kujifunza zaidi kuhusu kutuma miamala, angalia [mafunzo haya](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) kuhusu kutuma miamala kwa kutumia web3.

Kwanza, sakinisha kifurushi cha dotenv katika saraka ya mradi wako:

    ```
    npm install dotenv --save
    ```

Kisha, unda faili ya `.env` katika saraka ya mizizi ya mradi wetu, na uongeze ufunguo wako binafsi wa MetaMask na URL ya HTTP ya API ya Alchemy.

- Fuata [maagizo haya](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) ili kuhamisha ufunguo wako binafsi kutoka MetaMask

- Angalia hapa chini ili kupata URL ya API ya HTTP ya Alchemy na uinakili kwenye ubao wako wa kunakili

![Nakili URL yako ya API ya Alchemy](./copy-alchemy-api-url.gif)

Faili yako ya `.env` inapaswa sasa kuonekana hivi:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Ili kuunganisha hivi na msimbo wetu, tutarejelea vigezo hivi katika faili yetu ya hardhat.config.js katika hatua ya 13.

<EnvWarningBanner />

## Hatua ya 12: Sakinisha Ethers.js {#install-ethers}

Ethers.js ni maktaba inayorahisisha kuingiliana na kufanya maombi kwa Ethereum kwa kufunika [mbinu za kawaida za JSON-RPC](/developers/docs/apis/json-rpc/) kwa mbinu ambazo ni rahisi zaidi kwa mtumiaji.

Hardhat hurahisisha sana kuunganisha [Plugins](https://hardhat.org/plugins/) kwa zana za ziada na utendakazi uliopanuliwa. Tutatumia fursa ya [programu-jalizi ya Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) kwa usambazaji wa mkataba ([Ethers.js](https://github.com/ethers-io/ethers.js/) ina mbinu safi sana za usambazaji wa mkataba).

Katika saraka yako ya mradi, andika:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Pia tutahitaji ethers katika hardhat.config.js yetu katika hatua inayofuata.

## Hatua ya 13: Sasisha hardhat.config.js {#update-hardhat-config}

Tumeongeza vitegemezi na programu-jalizi kadhaa hadi sasa, sasa tunahitaji kusasisha hardhat.config.js ili mradi wetu ujue kuhusu zote.

Sasisha hardhat.config.js yako ionekane hivi:

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

## Hatua ya 14: Andaa mkataba wetu {#compile-contract}

Ili kuhakikisha kila kitu kinafanya kazi hadi sasa, hebu tuandae mkataba wetu. Kazi ya kuandaa ni moja ya kazi zilizojengewa ndani za hardhat.

Kutoka kwenye mstari wa amri, endesha:

    ```
    npx hardhat compile
    ```

Unaweza kupata onyo kuhusu kitambulisho cha leseni cha SPDX hakijatolewa katika faili chanzo, lakini hakuna haja ya kuwa na wasiwasi kuhusu hilo — tunatumai kila kitu kingine kinaonekana vizuri! Ikiwa sivyo, unaweza kutuma ujumbe kila wakati katika [discord ya Alchemy](https://discord.gg/u72VCg3).

## Hatua ya 15: Andika hati yetu ya upelekaji {#write-deploy}

Sasa kwa kuwa mkataba wetu umeandikwa na faili yetu ya usanidi iko tayari, ni wakati wa kuandika hati ya kupeleka mkataba wetu.

Nenda kwenye folda ya `scripts/` na uunde faili mpya inayoitwa `deploy.js`, ukiongeza yaliyomo yafuatayo:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Anza upelekaji, ukirudisha ahadi inayotatuliwa kuwa kitu cha mkataba
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Mkataba umepelekwa kwa anwani:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat hufanya kazi nzuri ya kuelezea kile kila mstari wa msimbo huu unafanya katika [mafunzo yao ya Mikataba](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), tumechukua maelezo yao hapa.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

ContractFactory katika ethers.js ni dhana inayotumika kupeleka mikataba-erevu mipya, kwa hivyo MyNFT hapa ni kiwanda cha matukio ya mkataba wetu wa NFT. Unapotumia programu-jalizi ya hardhat-ethers, matukio ya ContractFactory na Mkataba huunganishwa na mtia saini wa kwanza kwa chaguo-msingi.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Kuita deploy() kwenye ContractFactory kutaanza upelekaji, na kurudisha Ahadi inayotatuliwa kuwa Mkataba. Hiki ndicho kitu ambacho kina mbinu kwa kila moja ya kazi zetu za mkataba-erevu.

## Hatua ya 16: Peleka mkataba wetu {#deploy-contract}

Hatimaye tuko tayari kupeleka mkataba-erevu wetu! Rudi kwenye mzizi wa saraka ya mradi wako, na kwenye mstari wa amri, endesha:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Unapaswa kisha kuona kitu kama:

    ```
    Mkataba umepelekwa kwa anwani: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Tukienda kwenye [Sepolia etherscan](https://sepolia.etherscan.io/) na kutafuta anwani ya mkataba wetu, tunapaswa kuona kwamba umepelekwa kwa mafanikio. Ikiwa huwezi kuiona mara moja, tafadhali subiri kidogo kwani inaweza kuchukua muda. Muamala utaonekana kitu kama hiki:

![Tazama anwani yako ya muamala kwenye Etherscan](./etherscan-sepoila-contract-creation.png)

Anwani ya `Kutoka` inapaswa kulingana na anwani ya akaunti yako ya MetaMask na anwani ya `Kwa` itasema “Uundaji wa Mkataba”. Tukibofya kwenye muamala, tutaona anwani ya mkataba wetu katika sehemu ya `Kwa`:

![Tazama anwani yako ya mkataba kwenye Etherscan](./etherscan-sepolia-tx-details.png)

Yasssss! Umepeleka mkataba-erevu wako wa NFT kwenye mnyororo wa Ethereum (testnet)!

Ili kuelewa kinachoendelea chinichini, hebu tuende kwenye kichupo cha Mvumbuzi katika [dashibodi yetu ya Alchemy](https://dashboard.alchemyapi.io/explorer). Ikiwa una programu nyingi za Alchemy hakikisha unachuja kwa programu na uchague “MyNFT”.

![Tazama simu zilizopigwa "chinichini" na Dashibodi ya Mvumbuzi ya Alchemy](./alchemy-explorer-goerli.png)

Hapa utaona simu chache za JSON-RPC ambazo Hardhat/Ethers zilifanya chinichini kwa ajili yetu tulipoiita kazi ya .deploy(). Mbili muhimu za kutaja hapa ni [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), ambayo ni ombi la kuandika mkataba-erevu wetu kwenye mnyororo wa Sepolia, na [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) ambalo ni ombi la kusoma taarifa kuhusu muamala wetu kutokana na hashi (muundo wa kawaida wakati wa kutuma miamala). Ili kujifunza zaidi kuhusu kutuma miamala, angalia mafunzo haya kuhusu [kutuma miamala kwa kutumia Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Hayo ni yote kwa Sehemu ya 1 ya mafunzo haya. Katika [Sehemu ya 2, tutaingiliana na mkataba-erevu wetu kwa kutoa NFT](/developers/tutorials/how-to-mint-an-nft/), na katika [Sehemu ya 3 tutakuonyesha jinsi ya kutazama NFT yako katika mkoba wako wa Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
