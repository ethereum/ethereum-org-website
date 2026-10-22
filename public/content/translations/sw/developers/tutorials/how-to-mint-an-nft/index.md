---
title: Jinsi ya Kufua NFT (Sehemu ya 2/3 ya Mfululizo wa Mafunzo ya NFT)
description: Mafunzo haya yanaelezea jinsi ya kufua NFT kwenye mtandao wa blockchain wa Ethereum kwa kutumia mkataba wetu mahiri, Hardhat na ethers.js.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "mikataba mahiri"]
skill: beginner
breadcrumb: Fua NFT
lang: sw
published: 2021-04-22
---

"Kufua NFT" ni kitendo cha kuchapisha mfano wa kipekee wa tokeni yako ya ERC-721 kwenye blockchain. Kwa kutumia mkataba wetu mahiri kutoka [Sehemu ya 1 ya mfululizo huu wa mafunzo ya NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), hebu tuonyeshe ujuzi wetu wa Web3 na tufue NFT. Mwishoni mwa mafunzo haya, utaweza kufua NFT nyingi kadri moyo wako (na mkoba wako) unavyotaka!

Hebu tuanze!

## Hatua ya 1: Angalia usanidi wako {#install-web3}

Ikiwa ulifuata mafunzo ya kwanza kuhusu kuunda mkataba wako mahiri wa NFT, tayari unayo kila kitu unachohitaji: mradi wa Hardhat 3 wenye [Ethers plugin](https://hardhat.org/docs/plugins/hardhat-ethers) na [ethers.js](https://docs.ethers.org/v6/), maktaba inayotumika kurahisisha uundaji wa maombi kwenye blockchain ya [Ethereum](/). Tutaandika msimbo wetu wa kufua kama hati ya Hardhat, kwa hivyo inatumia tena mipangilio ya mtandao wa Sepolia na thamani za `API_URL` na `PRIVATE_KEY` kutoka Sehemu ya 1 — hakuna kipya cha kusakinisha.

## Hatua ya 2: Unda faili ya `mint-nft.js` {#create-mintnftjs}

Ndani ya saraka yako ya hati, unda faili ya `mint-nft.js` na uongeze mistari ifuatayo ya msimbo:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Kama ilivyo kwenye hati yetu ya kusambaza, `network.create()` inaunganisha kwenye mtandao unaochagua na `--network` unapoendesha hati, na inatupa kipengee cha `ethers` kwa ajili yake.

## Hatua ya 3: Chukua ABI ya mkataba wako {#contract-abi}

ABI (Application Binary Interface) ya mkataba wetu ni kiolesura cha kuingiliana na mkataba wetu mahiri. Unaweza kujifunza zaidi kuhusu [ABI za mkataba](/glossary/#abi). Hardhat inatutengenezea ABI kiotomatiki inapotafsiri mkataba na kuihifadhi katika faili ya `artifacts/contracts/MyNFT.sol/MyNFT.json`. Programu-jalizi ya Hardhat Ethers inaisoma kutoka hapo kwa ajili yetu tunapounda mfano wa mkataba wetu katika hatua ya 5, kwa hivyo hatuhitaji kuipakia wenyewe.

Ikiwa unataka kuona ABI unaweza kuichapisha kwenye kiweko chako. Kutoka kwenye saraka ya mzizi ya mradi wako, endesha:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Hatua ya 4: Sanidi metadata ya NFT yako kwa kutumia IPFS {#config-meta}

Ikiwa unakumbuka kutoka kwenye mafunzo yetu katika Sehemu ya 1, kipengele chetu cha mkataba mahiri cha `mintNFT` kinachukua kigezo cha tokenURI ambacho kinapaswa kutatua kwenye hati ya JSON inayoelezea metadata ya NFT— ambayo ndiyo hasa inayoipa NFT uhai, na kuiruhusu kuwa na sifa zinazoweza kusanidiwa, kama vile jina, maelezo, picha, na sifa nyingine.

> _Interplanetary File System (IPFS) ni itifaki iliyogatuliwa na mtandao wa rika-kwa-rika kwa ajili ya kuhifadhi na kushiriki data katika mfumo wa faili uliosambazwa._

Tutatumia Pinata, API na zana rahisi ya IPFS, kuhifadhi rasilimali na metadata ya NFT yetu ili kuhakikisha NFT yetu imegatuliwa kweli. Ikiwa huna akaunti ya Pinata, jisajili kwa akaunti ya bure [hapa](https://app.pinata.cloud) na ukamilishe hatua za kuthibitisha barua pepe yako.

Baada ya kuunda akaunti:

- Nenda kwenye [Ukurasa wa Faili](https://app.pinata.cloud/ipfs/files) na ubofye kitufe cha "Add" kwenye kona ya juu kulia ya ukurasa.

- Pakia picha kwenye Pinata — hii itakuwa rasilimali ya picha kwa ajili ya NFT yako. Jisikie huru kuipa rasilimali jina lolote upendalo. Hakikisha unaipakia kwenye IPFS ya umma: faili kwenye [IPFS ya Kibinafsi](https://docs.pinata.cloud/files/private-ipfs) haziwezi kuletwa na mikoba na masoko yanayoonyesha NFT yako.

- Baada ya kupakia, utaona faili likiorodheshwa kwenye ukurasa wa Faili pamoja na CID yake (kitambulisho cha maudhui). Nakili CID. Unaweza kutazama upakiaji wako kwenye: `https://gateway.pinata.cloud/ipfs/<CID>`, au kupitia lango maalum lililoorodheshwa chini ya "Gateways" kwenye upau wa kando wa Pinata. Unaweza kupata picha tuliyotumia kwenye IPFS [hapa](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), kwa mfano.

Sasa, tutataka kupakia hati moja zaidi kwenye Pinata. Lakini kabla ya kufanya hivyo, tunahitaji kuiunda!

Katika saraka yako ya mzizi, tengeneza faili mpya inayoitwa `nft-metadata.json` na uongeze msimbo ufuatao wa json:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Jisikie huru kubadilisha data kwenye json. Unaweza kuondoa au kuongeza kwenye sehemu ya sifa. Muhimu zaidi, hakikisha sehemu ya picha inaelekeza kwenye eneo la picha yako ya IPFS, katika muundo wa `ipfs://<image-CID>` — vinginevyo, NFT yako itajumuisha picha ya mbwa (mzuri sana!).

Ukimaliza kuhariri faili ya JSON, ihifadhi na uipakie kwenye Pinata, ukifuata hatua zilezile tulizofanya kwa kupakia picha. Nakili CID ya `nft-metadata.json` pia; tutaihitaji katika hatua ya 9.

## Hatua ya 5: Unda mfano wa mkataba wako {#instance-contract}

Sasa, ili kuingiliana na mkataba wetu, tunahitaji kuunda mfano wake katika msimbo wetu. Ili kufanya hivyo tutahitaji anwani ya mkataba wetu, ambayo hati yetu ya kusambaza ilichapisha katika Sehemu ya 1. Unaweza pia kuipata kwenye [Etherscan](https://sepolia.etherscan.io/) au [Blockscout](https://eth-sepolia.blockscout.com/) kwa kutafuta anwani uliyotumia kusambaza mkataba.

![Tazama anwani ya mkataba wako kwenye Etherscan](./view-contract-etherscan.png)

Katika mfano hapo juu, anwani ya mkataba wetu ni 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Kisha tutatumia mbinu ya `getContractAt` ya programu-jalizi ya Hardhat Ethers kuunda mkataba wetu kwa kutumia jina lake (ambalo linaiambia itumie ABI gani) na anwani yake. Katika faili yako ya `mint-nft.js`, ongeza yafuatayo, ukibadilisha anwani na yako mwenyewe:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Hatua ya 6: Angalia faili ya `.env` {#update-env}

Kila muamala tunaotuma lazima utiwe saini na ufunguo wa faragha wa akaunti yako. Ikiwa ulikamilisha sehemu ya 1 ya mafunzo, faili yetu ya `.env` inapaswa tayari kuonekana hivi:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Hakuna haja ya kuongeza anwani yako ya umma: ethers inaitambua kutoka kwenye ufunguo wa faragha.

## Hatua ya 7: Unda muamala wako {#create-txn}

Kwanza, hebu tufafanue kipengele kinachoitwa `mintNFT(tokenURI)` na tuunde muamala wetu kwa kufanya yafuatayo:

1. Pata akaunti tunayotuma muamala kutoka kwayo. `ethers.getSigners()` inarejesha akaunti zilizosanidiwa kwa ajili ya mtandao, ambazo kwenye Sepolia ni akaunti ambayo ufunguo wake wa faragha upo kwenye `.env`. Kwa kuwa `mintNFT` ni `onlyOwner`, hii lazima iwe akaunti ileile iliyosambaza mkataba.

1. Ita kipengele cha `mintNFT` kwenye mfano wa mkataba wetu, na anwani yetu wenyewe kama mpokeaji na URI ya metadata. Huu ndio ukokotoaji tunaotaka kufanya katika muamala huu — ambao katika kesi hii ni kufua NFT.

Huhitaji kutafuta nonce (idadi ya miamala iliyotumwa kutoka kwenye anwani yako, ambayo inazuia mashambulizi ya kurudia), kikomo cha gesi, au ada wewe mwenyewe: ethers inazileta au kuzikadiria kabla ya kutuma muamala.

Faili yako ya `mint-nft.js` inapaswa kuonekana hivi sasa:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Tuma muamala. ethers inajaza nonce, kikomo cha gesi na ada kwa ajili yetu.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Hatua ya 8: Tia saini muamala {#sign-txn}

Kwa sababu mtandao umesanidiwa na ufunguo wetu wa faragha, ethers inatia saini muamala nao kiotomatiki kabla ya kuutuma.

Kuita `mintNFT` kunarejesha mara tu muamala unapokuwa umetumwa, na inatupa heshi ya muamala, ambayo tunaweza kuitumia kuhakikisha muamala wetu ulichimbwa na haukudondoshwa na mtandao. `tx.wait()` kisha inasubiri hadi muamala ujumuishwe kwenye kizuizi. Tumeongeza pia ukaguzi wa makosa ili tujue ikiwa muamala wetu ulifanikiwa kupita.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Tuma muamala. ethers inajaza nonce, kikomo cha gesi na ada kwa ajili yetu.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Subiri muamala ujumuishwe kwenye kitalu.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Hatua ya 9: Ita `mintNFT` na uendeshe `mint-nft.js` {#call-mintnft-fn}

Unakumbuka `nft-metadata.json` uliyopakia kwenye Pinata? Pata CID yake kutoka Pinata na upitishe `ipfs://<metadata-CID>` kama kigezo kwenye kipengele cha `mintNFT`. Mikoba na masoko hutatua URI za `ipfs://` kupitia lango la IPFS wanalochagua, kwa hivyo NFT yako haitegemei lango lolote moja.

> Hakikisha mara mbili kwamba CID uliyonakili inaunganisha kwenye **nft-metadata.json** yako kwa kupakia `https://gateway.pinata.cloud/ipfs/<metadata-CID>` kwenye dirisha tofauti. Ukurasa unapaswa kuonekana sawa na picha ya skrini hapa chini:

![Ukurasa wako unapaswa kuonyesha metadata ya json](./metadataJSON.png)_Ukurasa wako unapaswa kuonyesha metadata ya json_

Kwa ujumla, msimbo wako unapaswa kuonekana kama hivi:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Tuma muamala. ethers inajaza nonce, kikomo cha gesi na ada kwa ajili yetu.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Subiri muamala ujumuishwe kwenye kitalu.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Sasa, endesha hati dhidi ya Sepolia ili kufua NFT yako:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Baada ya sekunde chache, unapaswa kuona jibu kama hili kwenye kituo chako:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Ili kuona maelezo ya muamala wako, tafuta heshi yake kwenye [Etherscan](https://sepolia.etherscan.io/) au [Blockscout](https://eth-sepolia.blockscout.com/).

![Tazama heshi ya muamala wako wa NFT kwenye Etherscan](./view-nft-etherscan.png)_Tazama heshi ya muamala wako wa NFT kwenye Etherscan_

Na ndivyo hivyo! Sasa umesambaza NA kufua NFT kwenye blockchain ya Ethereum <Emoji text=":money_mouth_face:" size={1} />

Kwa kutumia `mint-nft.js` unaweza kufua NFT nyingi kadri moyo wako (na mkoba wako) unavyotaka! Hakikisha tu unapitisha tokenURI mpya inayoelezea metadata ya NFT (vinginevyo, utaishia tu kutengeneza nyingi zinazofanana zenye vitambulisho tofauti).

Inawezekana, ungependa kuweza kuonyesha NFT yako kwenye mkoba wako — kwa hivyo hakikisha unaangalia [Sehemu ya 3: Jinsi ya Kutazama NFT Yako Kwenye Mkoba Wako](/developers/tutorials/how-to-view-nft-in-metamask/)!
