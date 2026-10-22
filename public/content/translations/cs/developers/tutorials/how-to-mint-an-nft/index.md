---
title: "Jak razit NFT (Část 2/3 ze série tutoriálů o NFT)"
description: "Tento tutoriál popisuje, jak razit nezaměnitelný token (NFT) na blockchainu Etherea pomocí našeho chytrého kontraktu, nástroje Hardhat a knihovny ethers.js."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "chytré kontrakty"]
skill: beginner
breadcrumb: "Ražení NFT"
lang: cs
published: 2021-04-22
---

„Ražení nezaměnitelného tokenu (NFT)“ je akt publikování jedinečné instance vašeho tokenu ERC-721 na blockchainu. Pomocí našeho chytrého kontraktu z [1. části této série tutoriálů o NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/) procvičíme naše dovednosti v oblasti Web3 a vyrazíme NFT. Na konci tohoto tutoriálu budete schopni razit tolik NFT, kolik si jen vaše srdce (a peněženka) bude přát!

Začněme!

## Krok 1: Instalace Web3 {#install-web3}

Pokud jste postupovali podle prvního tutoriálu o vytváření vašeho chytrého kontraktu pro nezaměnitelný token (NFT), už máte vše, co potřebujete: projekt Hardhat 3 s [pluginem Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) a [ethers.js](https://docs.ethers.org/v6/), což je knihovna, která usnadňuje vytváření požadavků na blockchain [Etherea](/). Náš kód pro ražení napíšeme jako skript pro Hardhat, takže znovu použije nastavení sítě Sepolia a hodnoty `API_URL` a `PRIVATE_KEY` z 1. části — není třeba instalovat nic nového.

## Krok 2: Vytvoření souboru `mint-nft.js` {#create-mintnftjs}

Ve svém adresáři scripts vytvořte soubor `mint-nft.js` a přidejte následující řádky kódu:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Stejně jako v našem skriptu pro nasazení se `network.create()` připojí k síti, kterou zvolíte pomocí `--network` při spuštění skriptu, a poskytne nám pro ni objekt `ethers`.

## Krok 3: Získání ABI vašeho kontraktu {#contract-abi}

Naše aplikační binární rozhraní (ABI) kontraktu je rozhraní pro interakci s naším chytrým kontraktem. Více se o [ABI kontraktů](/glossary/#abi) můžete dozvědět v glosáři. Hardhat pro nás automaticky vygeneruje ABI při kompilaci kontraktu a uloží jej do souboru `artifacts/contracts/MyNFT.sol/MyNFT.json`. Plugin Hardhat Ethers jej odtud pro nás přečte, když v kroku 5 vytvoříme instanci našeho kontraktu, takže jej nemusíme načítat sami.

Pokud chcete ABI vidět, můžete si jej vypsat do konzole. Z kořenového adresáře vašeho projektu spusťte:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Krok 4: Konfigurace metadat pro vaše NFT pomocí IPFS {#config-meta}

Pokud si pamatujete z našeho tutoriálu v 1. části, funkce našeho chytrého kontraktu `mintNFT` přijímá parametr tokenURI, který by měl odkazovat na dokument JSON popisující metadata nezaměnitelného tokenu (NFT) — což je to, co NFT skutečně oživuje a umožňuje mu mít konfigurovatelné vlastnosti, jako je název, popis, obrázek a další atributy.

> _Interplanetary File System (IPFS) je decentralizovaný protokol a peer-to-peer síť pro ukládání a sdílení dat v distribuovaném souborovém systému._

K uložení našeho aktiva NFT a metadat použijeme Pinata, pohodlné rozhraní pro programování aplikací (API) a sadu nástrojů pro IPFS, abychom zajistili, že naše NFT bude skutečně decentralizované. Pokud nemáte účet na Pinata, zaregistrujte si bezplatný účet [zde](https://app.pinata.cloud) a dokončete kroky k ověření vašeho e-mailu.

Jakmile si vytvoříte účet:

- Přejděte na [stránku Files](https://app.pinata.cloud/ipfs/files) a klikněte na tlačítko „Add“ v pravém horním rohu stránky.

- Nahrajte obrázek na Pinata — to bude obrazové aktivum pro vaše NFT. Aktivum si můžete pojmenovat, jak chcete. Ujistěte se, že jej nahráváte na veřejné IPFS: soubory na [Private IPFS](https://docs.pinata.cloud/files/private-ipfs) nemohou být načteny peněženkami a tržišti, která vaše NFT zobrazují.

- Po nahrání uvidíte soubor v seznamu na stránce Files spolu s jeho CID (identifikátor obsahu). Zkopírujte si CID. Své nahrané soubory si můžete prohlédnout na adrese: `https://gateway.pinata.cloud/ipfs/<CID>`, nebo prostřednictvím vyhrazené brány uvedené v postranním panelu Pinata pod „Gateways“. Obrázek, který jsme použili na IPFS, najdete například [zde](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Nyní budeme chtít na Pinata nahrát ještě jeden dokument. Ale než to uděláme, musíme ho vytvořit!

Ve svém kořenovém adresáři vytvořte nový soubor s názvem `nft-metadata.json` a přidejte následující kód ve formátu JSON:

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

Data v JSON můžete libovolně měnit. Můžete odebírat nebo přidávat položky do sekce atributů. Nejdůležitější je ujistit se, že pole image ukazuje na umístění vašeho obrázku na IPFS ve formátu `ipfs://<image-CID>` — jinak bude vaše NFT obsahovat fotku (velmi roztomilého!) psa.

Jakmile dokončíte úpravy souboru JSON, uložte jej a nahrajte na Pinata podle stejných kroků, jaké jsme udělali při nahrávání obrázku. Zkopírujte si také CID souboru `nft-metadata.json`; budeme ho potřebovat v kroku 9.

## Krok 5: Vytvoření instance vašeho kontraktu {#instance-contract}

Nyní, abychom mohli s naším kontraktem interagovat, musíme v našem kódu vytvořit jeho instanci. K tomu budeme potřebovat adresu našeho kontraktu, kterou náš skript pro nasazení vypsal v 1. části. Můžete ji také najít na [Etherscan](https://sepolia.etherscan.io/) nebo [Blockscout](https://eth-sepolia.blockscout.com/) vyhledáním adresy, kterou jste použili k nasazení kontraktu.

![Zobrazení adresy vašeho kontraktu na Etherscan](./view-contract-etherscan.png)

Ve výše uvedeném příkladu je adresa našeho kontraktu 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Dále použijeme metodu `getContractAt` z pluginu Hardhat Ethers k vytvoření našeho kontraktu pomocí jeho názvu (což mu řekne, které aplikační binární rozhraní (ABI) má použít) a jeho adresy. Do souboru `mint-nft.js` přidejte následující kód a nahraďte adresu svou vlastní:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Krok 6: Aktualizace souboru `.env` {#update-env}

Každá transakce, kterou odešleme, musí být podepsána soukromým klíčem vašeho účtu. Pokud jste dokončili 1. část tutoriálu, náš soubor `.env` by už měl vypadat takto:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Není třeba přidávat vaši veřejnou adresu: ethers ji zjistí ze soukromého klíče.

## Krok 7: Vytvoření vaší transakce {#create-txn}

Nejprve definujme funkci s názvem `mintNFT(tokenURI)` a vytvořme naši transakci provedením následujícího:

1. Získejte účet, ze kterého transakci odesíláme. `ethers.getSigners()` vrací účty nakonfigurované pro síť, což je na síti Sepolia účet, jehož soukromý klíč je v `.env`. Vzhledem k tomu, že `mintNFT` je `onlyOwner`, musí to být stejný účet, který kontrakt nasadil.

1. Zavolejte funkci `mintNFT` na instanci našeho kontraktu s naší vlastní adresou jako příjemcem a URI metadat. Toto je výpočet, který chceme v této transakci provést — což je v tomto případě ražení nezaměnitelného tokenu (NFT).

Nemusíte sami zjišťovat nonce (počet transakcí odeslaných z vaší adresy, což zabraňuje útokům typu replay), limit plynu ani poplatky: ethers je před odesláním transakce načte nebo odhadne.

Váš soubor `mint-nft.js` by nyní měl vypadat takto:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Odeslat transakci. ethers za nás vyplní nonce, limit plynu a poplatky.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Krok 8: Podepsání transakce {#sign-txn}

Protože je síť nakonfigurována s naším soukromým klíčem, ethers jím transakci před odesláním automaticky podepíše.

Volání `mintNFT` se vrátí, jakmile je transakce odeslána, a poskytne nám hash transakce, který můžeme použít k ověření, že naše transakce byla vytěžena a nebyla sítí zahozena. `tx.wait()` pak čeká, dokud není transakce zahrnuta do bloku. Přidali jsme také určitou kontrolu chyb, abychom věděli, zda naše transakce úspěšně prošla.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Odeslat transakci. ethers za nás vyplní nonce, limit plynu a poplatky.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Počkat, až bude transakce zahrnuta do bloku
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Krok 9: Zavolání `mintNFT` a spuštění node `mint-nft.js` {#call-mintnft-fn}

Pamatujete si na soubor `nft-metadata.json`, který jste nahráli na Pinata? Získejte jeho CID z Pinata a předejte `ipfs://<metadata-CID>` jako parametr funkci `mintNFT`. Peněženky a tržiště překládají URI `ipfs://` prostřednictvím brány IPFS podle vlastního výběru, takže váš nezaměnitelný token (NFT) nezávisí na žádné jediné bráně.

> Dvakrát zkontrolujte, že zkopírované CID odkazuje na váš **nft-metadata.json**, načtením `https://gateway.pinata.cloud/ipfs/<metadata-CID>` do samostatného okna. Stránka by měla vypadat podobně jako na snímku obrazovky níže:

![Vaše stránka by měla zobrazovat metadata ve formátu json](./metadataJSON.png)_Vaše stránka by měla zobrazovat metadata ve formátu json_

Celkově by váš kód měl vypadat nějak takto:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Odeslat transakci. ethers za nás vyplní nonce, limit plynu a poplatky.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Počkat, až bude transakce zahrnuta do bloku
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Nyní spusťte skript proti síti Sepolia, abyste vyrazili své NFT:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Po několika sekundách byste měli ve svém terminálu vidět odpověď podobnou této:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Chcete-li zobrazit podrobnosti o vaší transakci, vyhledejte její hash na [Etherscan](https://sepolia.etherscan.io/) nebo [Blockscout](https://eth-sepolia.blockscout.com/).

![Zobrazení hashe vaší transakce NFT na Etherscan](./view-nft-etherscan.png)_Zobrazení hashe vaší transakce NFT na Etherscan_

A to je vše! Nyní jste nasadili A vyrazili NFT na blockchainu Etherea <Emoji text=":money_mouth_face:" size={1} />

Pomocí `mint-nft.js` můžete razit tolik NFT, kolik si jen vaše srdce (a peněženka) bude přát! Jen se ujistěte, že předáváte nové tokenURI popisující metadata NFT (jinak nakonec vytvoříte spoustu identických s různými ID).

Pravděpodobně byste se chtěli svým NFT pochlubit ve své peněžence — takže se určitě podívejte na [3. část: Jak zobrazit své NFT ve vaší peněžence](/developers/tutorials/how-to-view-nft-in-metamask/)!
