---
title: Dapp Fejlesztői Keretrendszerek
description: Fedezd fel a keretrendszerek tulajdonságait és hasonlítsd össze az elérhető lehetőségeket.
lang: hu
---

## Bevezetés a keretrendszerekbe {#introduction-to-frameworks}

Egy teljes értékű dapp fejlesztése több technológiát is igényel. A szoftver keretrendszerek sok szükséges funkciót tartalmaznak, vagy egyszerű plugin rendszereket biztosítanak, melyek segítenek kiválasztani a kívánt eszközt.

A keretrendszerek olyan dobozon-kívüli funkciókat kínálnak, melyekkel:

- Felállíthatsz vele egy helyi blokkláncot.
- Eszközök az okos szerződéseid fordítására és tesztelésére.
- Kliens fejlesztési addonok, hogy ugyanabban a projektben/repóban fejleszthess felhasználói alkalmazásokat.
- Ethereum hálózatokhoz és szerződések telepítésére való konfiguráció, legyen az helyileg futó instance vagy valamelyik publikus Ethereum hálózat.
- Decentralizált app elosztás - IPFS-hez hasonló tárhely integrációk.

## Előfeltételek {#prerequisites}

Mielőtt elmerülne a keretrendszerekben, javasoljuk, hogy olvassa át a bevezetés a [dappokba](/developers/docs/dapps/) és a [Ethereum stack](/developers/docs/ethereum-stack/) cikkeket.

## Elérhető keretrendszerek {#available-frameworks}

**Foundry** – **_A Foundry egy gyors, hordozható és moduláris eszközrendszer az Ethereum alkalmazásfejlesztésre._**

- [Foundry telepítése](https://book.getfoundry.sh/)
- [Foundry könyv](https://book.getfoundry.sh/)
- [Foundry közösségi csevegés Telegramon](https://t.me/foundry_support)
- [Lenyűgöző Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_Ethereum fejlesztői környezet profiknak._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Az okosszerződés-fejlesztői eszköz a pythonisták, adattudósok és biztonsági szakértők számára._**

- [Dokumentáció](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_Platform a blokklánc alkalmazások fejlesztésére a JVM-n._**

- [Honlap](https://www.web3labs.com/web3j-sdk)
- [Dokumentáció](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt –** **_Async, nagy teljesítményű Kotlin/Java/Android könyvtár EVM-alapú blokkláncokhoz._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Példák](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_Készítsen Ethereum-alapú appokat egy paranccsal. UI-keretrendszerek és DeFi-sablonok széles választék._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [Sablonok](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + React komponensek és hook-ok web3-hoz: minden, amire szükség van, hogy el tudjon kezdeni okosszerződések által működtetett decentralizált alkalmazásokat fejleszteni._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 fejlesztői platform, amely lehetővé teszi a blokklánc-fejlesztőknek, hogy okosszerződéseket építsenek, teszteljenek, debuggoljanak, felügyeljenek és üzemeltessenek, illetve fejlesszék a dapp UX-t._**

- [Honlap](https://tenderly.co/)
- [Dokumentáció](https://docs.tenderly.co/ethereum-development-practices)

**The Graph -** **_Blokkláncadatok hatékony lekérdezése a The Graph segítségével._**

- [Honlap](https://thegraph.com/)
- [Útmutató](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Ethereum Fejlesztési Platform._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Ethereum fejlesztői platform._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_Építsen web3 alkalmazásokat, amelyek interakcióba lépnek az okosszerződésével az erőteljes SDK-kat és CLI-t használva._**

- [Dokumentáció](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (Ethereum és egyéb) fejlesztői platform._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_Vállalat szintű web3 fejlesztési platform, amely lehetővé teszi, hogy NFT alkalmazásokat építsen minden nagyobb EVM (és más) láncra._**

- [Honlap](https://www.crossmint.com)
- [Dokumentáció](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Python-alapú fejlesztői környezet és tesztelési keretrendszer._**

- [Dokumentáció](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **A Brownie karbantartása jelenleg szünetel**

**OpenZeppelin SDK -** **_The Ultimate Smart Contract Toolkit: egy eszköztár okosszerződések fejlesztéséhez, összeállításához, továbbfejlesztéséhez, telepítéséhez és az okosszerződésekkel való interakciókhoz._**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Közösségi Fórum](https://forum.openzeppelin.com/c/support/17)
- **Az OpenZeppelin SDK fejlesztése befejeződött**

**Catapulta -** **_Több láncos okosszerződések telepítési eszköze, automatizálja az ellenőrzéseket a blokkfelfedezőkben, nyomon követi a telepített okosszerződéseket és megosztja a telepítési jelentéseket, plug-n-play a Foundry és Hardhat projektekhez._**

- [Honlap](https://catapulta.sh/)
- [Dokumentáció](https://catapulta.sh/docs)
- [Github](https://github.com/catapulta-sh)

**Covalent –** **_Gazdagított blokklánc API-ok 200+ lánchoz._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokumentáció](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_Minden az egyben Python keretrendszer a szerződéseknek a teszteléshez, fuzzinghoz, telepítéshez, sebezhetőségi vizsgálathoz és kódnavigációhoz._**

- [Honlap](https://getwake.io/)
- [Dokumentáció](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [Helyi fejlesztői környezet felállítása](/developers/local-environment/)
