---
title: Ethereum Rust-fejlesztők számára
description: Tanuljon meg Ethereumra fejleszteni Rust alapú projektek és eszközök használatával
lang: hu
incomplete: true
---

<div class="featured">Tanuljon meg Ethereumra fejleszteni Rust alapú projektek és eszközök használatával</div>

Használj Ethereumot decentralizált alkalmazások (avagy "dappok") fejlesztésére, melyek kihasználják a kriptovaluta és a blokklánc technológia nyújtotta előnyöket. Ezek a dappok megbízhatóak, ami azt jelenti, hogyha egyszer telepítették az Ethereumba, akkor mindig úgy fognak futni, ahogy programozták őket. Digitális vagyontárgyakat irányíthatnak, lehetőséget teremtve ezzel újfajta pénzügyi alkalmazások létrejöveteléhez. Decentralizáltak lehetnek, mely azt jelenti, hogy semmilyen entitás vagy személy nem irányítja őket és közel lehetetlen őket cenzúrázni.

## Kezdő lépések az okosszerződésekkel és a Solidity nyelvvel {#getting-started-with-smart-contracts-and-solidity}

**Tegye meg az első lépést, hogy integrálja a Rust-ot az Ethereummal**

Szükséged van egy méginkább kezdőknek szóló alapozóra? Tekintse meg az [ethereum.org/learn](/learn/) vagy az [ethereum.org/developers](/developers/) oldalt.

- [Blokklánc ismertetése](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Okosszerződések értelmezése](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Írd meg az első Okosszerződésed](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tanuld meg a Solidity fordítását és telepítését](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Cikkek kezdőknek {#beginner-articles}

- [Ethereum kliens kiválasztása](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [A Rust Ethereum-kliens](https://openethereum.github.io/) \* **Felhívjuk figyelmét, hogy az OpenEthereum [támogatása megszűnt](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd), karbantartása nem biztosított.** Használja körültekintően, és inkább térjen át másik kliensimplementációra.
- [Tranzakció küldése Ethereumra Rust használatával](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Részletes útmutató arról, hogyan lehet szerződéseket írni Rust Wasm nyelven Kovanra](https://github.com/paritytech/pwasm-tutorial)

## Köztes cikkek {#intermediate-articles}

## Speciális használati minták {#advanced-use-patterns}

- [pwasm_ethereum externs könyvtár Ethereum-szerű hálózatokkal való interakciókhoz](https://github.com/openethereum/pwasm-ethereum)
- [Építsen egy decentralizált csevegőprogramot JavaScript és Rust használatával](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Építsen egy decentralizált teendők listája alkalmazást Vue.js-szel & Rust-tal](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Blokklánc építése Rust nyelven](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust-projektek és -eszközök {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) – _Külső elemek gyűjteménye az Ethereum-szerű hálózattal való interakcióhoz_
- [Lighthouse](https://github.com/sigp/lighthouse) – _Gyors Ethereum-konszenzusrétegkliens_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) – _Az Ethereum okosszerződés végrehajtási rétegének javasolt újratervezése a WebAssembly egy determinisztikus részét használva_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API hivatkozás_
- [Solaris](https://github.com/paritytech/sol-rs) – _Solidity okosszerződések egységtesztelésének irányítása a natív Parity kliens EVM használatával._
- [SputnikVM](https://github.com/rust-blockchain/evm) – _Rust Ethereum virtuálisgép-implementáció_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) – _Wavelet okosszerződés Rust-ban_
- [Foundry](https://github.com/gakonst/foundry) – _Eszközkészlet az Ethereum alkalmazások fejlesztéséhez_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) – _Ethereum könyvtár- és tárcaimplementáció_
- [SewUp](https://github.com/second-state/SewUp) – _Egy könyvtár, amely segít az Ethereum webassembly szerződés Rust-ban való megépítésében, mintha egy általános backend lenne_
- [Substreams](https://github.com/streamingfast/substreams) – _Párhuzamos blokkláncadat-indexálási technológia_
- [Reth](https://github.com/paradigmxyz/reth) A Rust Ethereum rövidítése, ami egy új teljescsomópont-implementáció az Ethereumon

Még több anyagot keresel? Tekintse meg az [ethereum.org/developers](/developers/) oldalt.

## Rust közösségi hozzájárulók {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
