---
title: Mi az a becsomagolt ether (WETH)
description: A becsomagolt ether (WETH) bemutatása, ami egy ERC-20 kompatibilis burkolata az ethernek (ETH).
lang: hu
---

# Becsomagolt ether (WETH) {#intro-to-weth}

Az Ether (ETH) az Ethereum fő valutája. Számos célra használják, mint letétbe helyezéshez, valutaként, illetve a számolási kapacitás kifizetésére gázdíjakban. **A WETH egy továbbfejlesztett formája az ETH-nek néhány új funkcionalitással, melyek az alkalmazásokhoz és az [ERC-20 tokenekhez](/glossary/#erc-20)** szükségesek, amelyek az Ethereumon található más digitális eszközök. Ahhoz, hogy ezekkel a tokenekkel kapcsolódni lehessen, az ETH-nak is ugyanazokat a szabályokat kell követnie, vagyis az ERC-20 szabványt.

Ennek áthidalására jött létre a becsomagolt ETH (WETH). **A becsomagolt ETH egy okosszerződés, amely lehetővé teszi, hogy bármilyen összeget beletegyen a szerződésbe, és ugyanazt megkapja WETH-ben**, amely megfelel az ERC-20 tokenszabványnak. A WETH az ETH reprezentációja, mellyel lehetségessé válik, hogy ne natív eszközként, hanem ERC-20 tokenként lehessen interakciót végezni vele. A natív ETH-re még mindig szükség van a gázdíjak kifizetéséhez, ezért a letétbe helyezésnél tartson meg valamekkora összeget.

A WETH ETH-re való kicsomagolásához WETH-okosszerződést használhat. Bármekkora összeget átválthat WETH-ről a WETH okosszerződéssel, és ugyanazt megkapja ETH-ben. Ekkor a letétbe helyezett WETH elég és kikerül az elérhető WETH kínálatból.

**Nagyjából az ETH kinálat kb. 3%-a van lekötve a WETH tokenszerződésben**, melynek következtében ez a leginkább használt [okosszerződés](/glossary/#smart-contract). A WETH különösen fontos azoknak a felhasználóknak, akik a decentralizált pénzügyek (DeFi) alkalmazásait használják.

## Miért kell az ETH-t becsomagolni ERC-20 tokenként? {#why-do-we-need-to-wrap-eth}

Az [ERC-20](/developers/docs/standards/tokens/erc-20/) egy sztenderd interfészt határoz meg az átváltható tokenekhez, így bárki létrehozhat olyan tokent, mely gond nélkül interaktál az Ethereum ökoszisztémában ezen szabvány által működő alkalmazásokkal és tokenekkel. Mivel az **ETH korábban keletkezett, mint az ERC-20 szabvány**, ezért nem felel meg ennek a specifikációnak. Emiatt **nem lehet egyszerűen** átváltani az ETH-t más ERC-20 tokenre vagy **ETH-t használni olyan alkalmazásokban, melyek ERC-20 szabványt használnak**. A becsomagolt ETH a következőket teszi lehetővé:

- **ETH átváltása ERC-20 tokenekre**: közvetlen módon nem lehet ETH-t váltani ERC-20 tokenekre. A WETH az ether reprezentációja, amely megfelel az ERC-20 helyettesíthető tokenszabványnak, így átváltható más ERC-20 tokenekre.

- **ETH használata dappokban**: mivel az ETH nem ERC-20-kompatibilis, ezért a fejlesztőknek külön interfészeket kell építeniük (egyet az ETH-hez, egy másikat az ERC-20 tokenekhez) az alkalmazásokban. A becsomagolt ETH átugorja ezt az akadályt, így a fejlesztők ugyanabban a dappban tudják kezelni az ETH-t és a többi tokent. Számos decentralizált pénzügyi alkalmazás használja ezt a szabványt, és piacokat hoz létre e tokenek átváltására.

## A becsomagolt ether (WETH) és az ether (ETH) közötti különbség {#weth-vs-eth-differences}

|             | **Ether (ETH)**                                                                                                                                                                                            | **Becsomagolt ether (WETH)**                                                                                                                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kínálat     | Az ETH kínálatát az Ethereum-protokoll kezeli. Az ETH [kibocsátását](/roadmap/merge/issuance) az Ethereum validátorok kezelik, amikor tranzakciókat hajtanak végre és blokkokat hoznak létre. | A WETH egy ERC-20 token, melynek kínálatát egy okosszerződés kezeli. A WETH új egységeit a szerződés bocsátja ki, miután ETH-letétet kapott a felhasználóktól, vagy a WETH egységek elégnek, amikor a felhasználó vissza akarja azt váltani ETH-re. |
| Tulajdonlás | A tulajdonjogot az Ethereum-protokoll által van kezelve a számlaegyenleg révén.                                                                                                                               | A WETH tulajdonjogát a WETH token okosszerződés kezeli, melyet az Ethereum protokoll biztosít.                                                                                                                                                                      |
| Gáz         | Az ether (ETH) az elfogadott fizetés a számítási kapacitásért az Ethereum hálózaton. A gázdíjakat gwei-ben (az ether egyik egységében) fejezik ki.      | A WETH tokennel való gázfizetés alapvetően nem támogatott.                                                                                                                                                                                                          |

## Gyakran ismételt kérdések {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Gázdíjat kell fizetni az ETH be- vagy kicsomagolásáért, amikor a WETH szerződést használja.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

A WETH általánossában biztonságosnak tekinthető, mert egy egyszerű, harcedzett okosszerződésen alapul. A WETH szerződést formálisan is ellenőrizték, mely az Ethereum okosszerződések legmagasabb biztonsági sztenderdje.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

[A WETH kanonikus bevezetése](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) mellett, melyet ezen az oldalon részleteznek, más változatok is léteznek. Ezek lehetnek személyreszabott tokenek, melyeket az alkalmazásfejlesztők hoztak létre, vagy más blokkláncokon kiadott változatok, illetve máshogy viselkedhetnek vagy más biztonsági beállításokkal bírhatnak. **Mindig ellenőrizze le a tokeninformációt, hogy melyik WETH implementációval végez interakciót.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum főhálózat](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## További olvasnivaló {#further-reading}

- [Mi az a WETH?](https://weth.tkn.eth.limo/)
- [WETH tokeninformáció az Etherscan oldalon](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [A WETH formális ellenőrzése](https://zellic.io/blog/formal-verification-weth)
