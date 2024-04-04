---
title: ERC-777 tokenszabvány
description:
lang: hu
---

## Figyelmeztetés {#warning}

**ERC-777-et nehéz megfelelően megvalósítani, mivel [érzékeny a támadások különböző formáira](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Helyette ajánlott az [ERC-20](/developers/docs/standards/tokens/erc-20/) használata.** Ez az oldal historikus okokból van itt.

## Bevezetés? {#introduction}

Az ERC-777 egy helyettesíthető tokenszabvány, amely a meglévő [ERC-20](/developers/docs/standards/tokens/erc-20/) szabványt javítja.

## Előfeltételek {#prerequisites}

Az oldal könnyebb megértéséhez javasoljuk, hogy tekintse át az [ERC-20](/developers/docs/standards/tokens/erc-20/)-ról szóló cikket.

## Milyen fejlesztéseket javasol az ERC-777 az ERC-20-hoz képest? {#-erc-777-vs-erc-20}

Az ERC-777 a következő fejlesztéseket nyújtja az ERC-20-hoz képest.

### Hookok {#hooks}

A hook vagy horog az okosszerződés kódjában leírt funkciót jelent. Akkor kerülnek meghívásra, amikor a szerződésen keresztül tokeneket küldenek vagy fogadnak. Ez lehetővé teszi, hogy az okosszerződés reagáljon a bejövő vagy kimenő tokenekre.

A horgokat az [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)-as szabvány segítségével regisztrálják és fedezik fel.

#### Miért nagyszerűek a hookok? {#why-are-hooks-great}

1. A hookok lehetővé teszik a tokenek szerződésbe küldését és a szerződés értesítését egyetlen tranzakcióban, ellentétben az [ERC-20](https://eips.ethereum.org/EIPS/eip-20)-szal, amely kettős hívást igényel (`approve`/`transferFrom`) ennek eléréséhez.
2. Azok a szerződések, amelyek nem regisztrálták a hookokat, nem kompatibilisek az ERC-777-tel. A küldő szerződés megszakítja a tranzakciót, ha a fogadó szerződés nem regisztrált ilyet. Ez megakadályozza a nem ERC-777-es okosszerződésekre történő véletlen átutalásokat.
3. A hookok elutasíthatják a tranzakciókat.

### Decimálisok {#decimals}

A szabvány megoldja az ERC-20-ban a `decimals` körül kialakult zavart is. Ez az egyértelműség javítja a fejlesztői élményt.

### Visszamenőleges kompatibilitás az ERC-20-szal {#backwards-compatibility-with-erc-20}

Az ERC-777-es szerződésekkel úgy lehet interakcióba lépni, mintha ERC-20-as szerződések lennének.

## További olvasnivaló {#further-reading}

[ERC-777: tokenszabvány](https://eips.ethereum.org/EIPS/eip-777)
