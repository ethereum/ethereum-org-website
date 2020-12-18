---
title: Ethereum fejlesztőknek
description: Útmutatók, anyagok és eszközök fejlesztőknek, akik Ethereum-on építenek.
lang: hu
sidebar: true
sidebarDepth: 2
---

# Fejlesztői Anyagok {#developer-resources}

<div class="featured">Útmutatók, anyagok és eszközök fejlesztőknek, akik Ethereum-on építenek.</div>

## Első lépések {#getting-started}

**Ha neked még új az Ethereum, akkor jó helyen jársz.** Ezek az Ethereum közösség által írt útmutatók bevezetnek az Ethereum stack alapjaiba és olyan alapvető koncepciókat mutatnak be, amelyek különbözőek lehetnek az általad ismert app fejlesztői ismeretektől.

Szeretnél azonnal elkezdeni programozni? [Kezdj el építeni itt](/hu/developers/learning-tools/).

Szűkséged van egy alapozóra? Tekintsd meg [a tanulási anyagainkat](/hu/learn/).

**Hasznos Anyagok**

- [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _Aug 7, 2017 - Matt Condon_
- [Ethereum In Depth, Part 1](https://blog.openzeppelin.com/ethereum-in-depth-part-1-968981e6f833/) _May 11, 2018 - Facu Spagnuolo_
- [Ethereum In Depth, Part 2](https://blog.openzeppelin.com/ethereum-in-depth-part-2-6339cf6bddb9/) _July 24, 2018 - Facu Spagnuolo_
- [Ethereum Development Walkthrough, Parts 1-5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _Jan 14, 2018 - dev_zl_
- [Ethereum 101, Parts 1-7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _Feb 13, 2019 - Wil Barnes_
- [Full Stack Hello World Voting Ethereum Dapp Tutorial](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)  _Feb 2019 - Mahesh Murthy_
- [Mastering Ethereum - A comprehensive textbook available for free online](https://github.com/ethereumbook/ethereumbook) _Dec 1, 2018 - Andreas Antonopoulos & Gavin Wood_
- [Ethereum Developer Portal - Everything you need to get started building on Ethereum](https://ethereum.consensys.net/ethereum-dev-portal) _Gyakran frissítve - ConsenSys_
- [Deconstructing a Solidity Contract](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/) _Aug 13, 2018 - Alejandro Santander & Leo Arias_
- [Full Stack Dapp Tutorial Series](https://kauri.io/collection/5b8e401ee727370001c942e3)  _Updated Often - Joshua Cassidy_

## Okos Szerződés Nyelvek {#smart-contract-languages}

Gyakran hivatkozunk "okos szerződésként" bármely olyan programra, mely az Ethereum Virtuális Gépen (EVM) fut. A legnépszerűbb nyelvek okos szerződés íráshoz Ethereum-on a **Solidity** és **Vyper**, habár [több másik nyelv áll fejlesztés alatt](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages).

**Solidity -** **_A legnépszerűbb Ethereum-on használt nyelv, melyet a C++, Python és JavaScript inspirált._**

- [Dokumentáció](https://solidity.readthedocs.io)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatszoba](https://gitter.im/ethereum/solidity/)

**Vyper -** **_Egy biztonságra fókuszált nyelv Ethereum-ra, Python alapú._**

- [Dokumentáció](https://vyper.readthedocs.io)
- [GitHub](https://github.com/ethereum/vyper)
- [Vyper Gitter Chatszoba](https://gitter.im/ethereum/vyper)

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszköz Lista #SmartContractLanguages](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## Nyelv Specifikus Anyagok {#language-specific-resources}

Egy nyelv specifikus nyitóoldalak sorozatát építjük olyan fejlesztőknek, akik az általuk preferált nyelven szeretnének az Ethereum-mal megismerkedni.

- [Ethereum Java fejlesztőknek](/hu/java/)
- [Ethereum Python fejlesztőknek](/hu/python/)
- [Ethereum JavaScript fejlesztőknek](/hu/javascript/)
- [Ethereum Go fejlesztőknek](/hu/golang/)
- [Ethereum Rust fejlesztőknek](/hu/rust/)
- [Ethereum .NET fejlesztőknek](/hu/dot-net/)
- Hamarosan még több jön! Nem látod itt a nyelvedet? [Nyiss egy ticketet](https://github.com/ethereum/ethereum-org-website/issues/new/choose)!

## Fejlesztői eszközök {#developer-tools}

Az Ethereum egy nagy és egyre növekvő eszköztárral rendelkezik, hogy elősegítsék a fejlesztők számára az alkalmazásuk építését, tesztelését és telepítését. Alább megtalálod a legnépszerűbb eszközöket, melyek segítenek a kezdéshez. Ha mélyebbre akarsz ásni, akkor tekintsd meg ezt az [átfogó listát](https://github.com/ConsenSys/ethereum-developer-tools-list).

### Keretrendszerek {#frameworks}

**Truffle -** **_Egy fejlesztői környezet, testing keretrendszer, build pipeline, és további eszközök tartoznak bele._**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

**Embark -** **_Egy fejlesztői környezet, testing keretrendszer, és más eszközök integrálva az Ethereum-mal, IPFS-sel, és Whisper-rel._**

- [Dokumentáció](https://embark.status.im/docs/)
- [GitHub](https://github.com/embark-framework/embark)

**Waffle -** **_Egy keretrendszer haladó okos szerződés fejlesztéshez és teszteléshez (ethers.js alapján)._**

- [getwaffle.io](https://getwaffle.io/)
- [GitHub](https://github.com/EthWorks/Waffle)

**Etherlime -** **_Ethers.js alapú keretrendszer dapp fejlesztéshez (Solidity & Vyper), telepítés, debugging, tesztelés és egyebek._**

- [Dokumentáció](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### Egyéb eszközök {#other-tools}

**Hardhat -** **_Egy task runner Ethereum okos szerződés fejlesztőknek._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**OpenZeppelin SDK -** **_The Ultimate Smart Contract Toolkit: Eszközök sorozata, okos szerződések fejlesztéséhez, fordításához, tovább fejlesztéséhez, telepítéséhez és az azokkal való interakciókhoz._**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Közösségi Fórum](https://forum.openzeppelin.com/c/sdk)

**The Graph -** **_Egy Ethereum és IPFS adat indexing és lekérdezés protokoll GraphQL-t használva._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Dokumentáció](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**Tenderly -** **_Egy platform, ahol könnyen monitorozhatod az okos szerződéseidet hiba nyomon követéssel, riasztással, teljesítmény mutatókkal és részletes szerződés analízissel_**

- [tenderly.dev](https://tenderly.dev/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Python Tooling -** **_Különféle Ethereum library-k Python-nal való interakciókhoz_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Brownie -** **_Python alapú fejlesztői környezet és testing keretrendszer._**

- [Dokumentáció](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/iamdefinitelyahuman/brownie)

**web3j -** **_Egy Java/Android/Kotlin/Scala integráció library Ethereum-ra._**

- [web3j.io](https://web3j.io)
- [GitHub](https://github.com/web3j/web3j)
- [Dokumentáció](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**One Click Dapp -** **_Generájl egy frontend-et közvetlenül ABI-ból gyors fejlesztéshez és teszteléshez._**

- [OneClickDapp.com](https://oneclickdapp.com)
- [Truffle Plugin](https://npmjs.org/package/oneclick)
- [Remix Plugin](https://github.com/pi0neerpat/remix-plugin-one-click-dapp)
- [GitHub](https://github.com/pi0neerpat/one-click-dapp)

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszközök Lista #Frameworks](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## Integrált Fejlesztői Környezetek (IDE-k) {#integrated-development-environments-ides}

**Ethereum Studio -** **_Web alapú IDE, mely ideális új fejlesztők számára, akik szeretének okos szerződésekkel kísérletezni. Az Ethereum Studio több sablonnal, MetaMask integrációval, tranzakció loggerrel és egy beépített böngészős Ethereum virtuális géppel (EVM) rendelkezik, hogy a lehető leggyorsabban tudj belekezdeni az Ethereum-on való építésbe._**

- [studio.ethereum.org](/en/studio/)
- [superblocks.com/ethereum-studio](https://superblocks.com/ethereum-studio)
- [GitHub](https://github.com/SuperblocksHQ/ethereum-studio)

**Visual Studio Code -** **_Professzionális cross-platform IDE hivatalos Ethereum támogatással._**

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Blockchain Development Kit for Ethereum](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain)
- [Azure Blockchain Workbench plugin](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [Kód minták](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)
- [GitHub](https://github.com/microsoft/vscode)

**Remix -** **_Web alapú IDE beépített statikus analízissel, és egy teszt blokklánc virtuális géppel._**

- [remix.ethereum.org](https://remix.ethereum.org/)

**EthFiddle -** **_Web alapú IDE, amivel megírhatod, fordíthatod és debuggolhatod az okos szerződéseidet._**

- [ethfiddle.com](https://ethfiddle.com/)
- [Gitter](https://gitter.im/loomnetwork/ethfiddle)

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszközök Lista #IDEs](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## Frontend Javascript API-ok {#frontend-javascript-apis}

**Web3.js -** **_Ethereum JavaScript API._**

- [Dokumentáció](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Teljes Ethereum tárca implementáció és segédprogramok JavaScript-ben és TypeScript-ben._**

- [Dokumentáció](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**light.js -** **_Egy magas szintű, reaktív JS library light client-ekre optimalizálva._**

- [Dokumentáció](https://paritytech.github.io/js-libs/light.js/)
- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Typescript Web3.js alternatíva._**

- [Dokumentáció](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszközök Lista #Frontend-Ethereum-APIs](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## Backend API-ok {#backend-apis}

**Infura -** **_Az Ethereum API, mint szolgáltatás._**

- [infura.io](https://infura.io)
- [Dokumentáció](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_JSON-RPC API hozzáférés az Etherum mainnet-hez és testnet-ekhez._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Dokumentáció](https://nodesmith.io/docs/#/ethereum/apiRef)

**Chainstack -** **_Elosztott és dedikált Ethereum csomópontok, mint szolgáltatás._**

- [chainstack.com](https://chainstack.com)
- [Dokumentáció](https://docs.chainstack.com)

## Tárhely {#storage}

**IPFS -** **_InterPlanetary File System egy decentralizált tárhely és fájl referencia rendszer Ethereum-ra._**

- [ipfs.io](https://ipfs.io/)
- [Dokumentáció](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Swarm -** **_Egy elosztott tárhely platform és tartalom elosztó szolgáltatás az Ethereum web3 stack-hez._**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [GitHub](https://github.com/ethersphere/swarm)

**OrbitDB -** **_Egy decentralizált peer-to-peer adatbázis IPFS-re építve._**

- [Dokumentáció](https://github.com/orbitdb/field-manual)
- [GitHub](https://github.com/orbitdb/orbit-db)

## Biztonsági eszközök {#security-tools}

### Okos szerződés Biztonság {#smart-contract-security}

**Slither -** **_Solidity statikus analízis keretrendszer Python 3-ban írva._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_Biztonsági analízis API Ethereum okos szerződéseknek_**

- [mythx.io](https://mythx.io/)
- [Dokumentáció](https://docs.mythx.io/en/latest/)

**Mythril -** **_Biztonsági analitika eszköz EVM bájt-kódra._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Dokumentáció](https://mythril-classic.readthedocs.io/en/master/about.html)

**SmartContract.Codes -** **_Ellenőrzött Solidity forráskódok kereső motora_**

- [smartcontract.codes (alpha)](https://smartcontract.codes/)
- [Dokumentáció](https://github.com/ethereum-play/smartcontract.codes/blob/master/README.md)

**Manticore -** **_Egy CLI, ami egy szimbolikus futtató eszközt használ okos szerződésekre és binary-ikre._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentáció](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Biztonsági szkenner Ethereum okos szerződésekre._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Egy ellenőrző eszköz arra, hogy egy szerződés megfelel-e az ERC20 sztenderdnek._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Fórum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Formális Ellenőrzés {#formal-verification}

**Formális Ellenőrzés információ**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _July 20, 2018 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _Jan 29, 2018 - Bernard Mueller_

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszköz Lista #Security-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## Tesztelési eszközök {#testing-tools}

**Solidity-Coverage -** **_Alternatív Solidity kód lefedettségi eszköz._**

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**hevm -** **_EVM implementáció kifejezetten okos szerződés unit test-re és debugging-ra._**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)
- [DappHub Chat](https://dapphub.chat/)

**Whiteblock Genesis -** **_Egy end-to-end fejlesztői sandbox és blokklánc teszt platform._**

- [Whiteblock.io](https://whiteblock.io)
- [Dokumentáció](https://docs.whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszköz Lista #Testing-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## Blokk felfedezők {#block-explorers}

A blokk felfedezők olyan szolgáltatások, melyek lehetővé teszik, hogy az Ethereum blokkláncot (és testnet-eit) böngészd azáltal, hogy információkat találnak specifikus tranzakciókról, blokkokról, szerződésekről és más a láncon történő aktivitásról.

- [Etherscan](https://etherscan.io/)
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)

## Testnet-ek és Csapok {#testnets-and-faucets}

Az Ethereum közösség több testnet-et is fenntart. Ezeket fejlesztők használják, hogy teszteljék alkalmazásaikat különböző körülmények mellett, mielőtt telepítenék őket az Ethereum mainnet-re.

**Ropsten -** **_proof-of-work blokklánc, teszt-ether bányászható._**

- [Test-ether csap](https://faucet.ropsten.be/)

**Rinkeby -** **_proof-of-authority blokklánc, a Geth fejlesztői csapat támogatásával._**

- [Test-ether csap](https://faucet.rinkeby.io/)
- [Univerzális csap](https://faucets.blockxlabs.com)

**Goerli -** **_Cross-client proof-of-authority blokklánc, a Goerli közösség által építve és támogatva_**

- [Test-ether csap](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)
- [Univerzális csap](https://faucets.blockxlabs.com)

## Kliensek & saját node üzemeltetése {#clients--running-your-own-node}

Az Ethereum hálózat rengeteg node-ból áll, melyek kompatibilis kliens szoftvereket futtatnak. Ezen node-ok többsége [Geth-et](https://geth.ethereum.org/) vagy [Parity-t](https://www.parity.io/ethereum/) futtat, melyek a saját ízlésed szerint konfigurálhatóak.

### Kliensek {#clients}

**Geth -** **_Ethereum kliens Go-ban írva._**

- [GitHub](https://github.com/ethereum/go-ethereum)
- [Discord chat](https://discordapp.com/invite/nthXNEv)

**Parity -** **_Ethereum kliens Rust-ban írva._**

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

**Pantheon -** **_Ethereum kliens Java-ban írva._**

- [pegasys.tech](http://pegasys.tech)
- [GitHub](https://github.com/PegaSysEng/pantheon/)

**Nethermind -** **_Ethereum kliens C# .NET Core-ban írva._**

- [Nethermind.io](http://nethermind.io/)
- [GitHub](https://github.com/NethermindEth/nethermind)
- [Gitter](https://gitter.im/nethermindeth/nethermind)

### Saját node üzemeltetése {#running-your-own-node}

**Ethnode -** **_Üzemeltess egy Ethereum node-ot (Geth or Parity) lokális fejlesztéshez._**

- [GitHub](https://github.com/vrde/ethnode)

**Ethereum Node Anyagok**

- [Node Configuration Cheat Sheet](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _Jan 5, 2019 - Afri Schoeden_

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszközök Lista #Ethereum-clients](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## Bevált gyakorlatok, példák és ellenpéldák {#best-practices-patterns-and-anti-patterns}

### Okos szerződések {#smart-contracts}

**DappSys -** **_Biztonságos, egyszerű, flexibilis okos szerződés építőelemek._**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

**OpenZeppelin Contracts -** **_Library biztonságos okos szerződés fejlesztéshez._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Közösségi Fórum](https://forum.openzeppelin.com/c/contracts)

**aragonOS -** **_Fejleszthetőségi & engedélykezelési minták._**

- [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html#aragonos-provides-the-following-functionality)
- [Dokumentáció](https://wiki.aragon.org/)

**Okos Szerződés Gyengeségi Jegyzék**

- [SWC registry](https://smartcontractsecurity.github.io/SWC-registry/)
- [GitHub](https://github.com/SmartContractSecurity/SWC-registry)

### Biztonság {#security}

**Okos Szerződés Biztonság Bevált Gyakorlatok Útmutató**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [A biztonsági ajánlások és a bevált gyakorlatok összesített gyűjteménye](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Smart Contract Security Verification Standard (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

**Más opciókat keresel?**

- [Ethereum Fejlesztői Eszköz Lista #Patterns—best-practices](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## Támogatás & tréning fejlesztőknek {#developer-support--training}

### Általános tudásszerzés {#general-learning}

**Ethereum Stackexchange**

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)

**ConsenSys Academy -** **_Egy end-to-end Ethereum fejlesztői tanfolyam, ahol saját ütemben haladhatsz és egész évben nyitva áll._**

- [consensys.academy](https://consensys.net/academy/ondemand/)

**Solidity Gitter Chatszoba**

- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)

**Összes Ethereum Gitter chatszoba**

- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)

**Chainshot -** **_Web alapú dapp programozási útmutatók._**

- [chainshot.com](https://www.chainshot.com/)

**Blockgeeks -** **_Online kurzusok blokklánc technológiáról._**

- [courses.blockgeeks.com](https://courses.blockgeeks.com/)

**DappUniversity -** **_Tanulj meg decentralizált alkalmazásokat programozni az Ethereum blokkláncon._**

- [DappUniversity.com](http://www.dappuniversity.com/)

**B9lab Academy -** **_A legidősebb professzionális Ethereum dapp fejlesztői kurzusnak ad otthont, valamint további tanulási lehetőséget biztosít auditorok és QA személyek számára. Beletartozik még: mentorálás és kód felülvizsgálat is._**

- [academy.b9lab.com](https://academy.b9lab.com)

### Játék alapú tanulás {#game-based-learning}

**Cryptozombies -** **_Tanulj meg játékokat programozni Ethereumon._**

- [Cryptozombies.io](https://cryptozombies.io/)

**Ethernaut -** **_Solidity alapú háborús játék, ahol minden szint egy szerződés, melyet meg kell hackelni_**

- [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)

**Capture the Ether -** **_Az Ethereum okos szerződés biztonság játéka._**

- [capturetheether.com](https://capturetheether.com/)

## UI/UX Design {#uiux-design}

- [Challenge of UX in Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _June 25, 2018 - Anna Rose_
- [Designing for blockchain: what’s different and what’s at stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _March 22, 2018 - Sarah Baker Mills_

**Rimble UI** **_- Decentralizált alkalmazások alkalmazkodó komponensei és tervezési sztenderdjei._**

- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

## Sztenderdek {#standards}

Az Ethereum közösség többi sztenderdet is elfogadott, melyek a fejlesztőket segítik. Tipikusan ezek [Ethereum Improvement Proposals-ként](http://eips.ethereum.org/) (EIPs) vannak bevezetve, melyeket a közösség tagjai vitatnak meg egy [sztenderd folyamaton](http://eips.ethereum.org/EIPS/eip-1) keresztül.

- [EIP-k listája](http://eips.ethereum.org/)
- [EIP github repo](https://github.com/ethereum/EIPs)
- [EIP vita fórum](https://ethereum-magicians.org/c/eips)
- [Ethereum Governance Overview](https://blog.bmannconsulting.com/ethereum-governance/) _March 31, 2019 - Boris Mann_
- [Playlist of all Ethereum Core Dev Meetings](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(YouTube Playlist)_

Bizonyos EIP-k alkalmazás szintű sztenderdekhez kapcsolódnak (pl.: egy sztenderd okos szerződés formátum), melyeket [Ethereum Requests for Comment-ként (ERC)](https://eips.ethereum.org/erc) vezetnek be. Számos ERC kritikus sztenderd, melyeket szerte az Ethereum ökoszisztémán belül használnak.

- [ERC-k listája](http://eips.ethereum.org/erc)
- [ERC20 - Egy sztenderd token interfész](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - Egy sztenderd interfész nem helyettesíthető tokeneknek](https://eips.ethereum.org/EIPS/eip-721)
