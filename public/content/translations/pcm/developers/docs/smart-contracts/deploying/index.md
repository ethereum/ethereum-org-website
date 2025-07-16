---
title: Arranging Smart Kontrakts
description:
lang: pcm
---

Yu nid to diploy yor smart kontract for am to dey afailabol to users of one Ethereum netwok.

To deply one smart kontract, yu fit send one Ethereum trabsakshon wey dey kontain di code of di smart kontract wey dem gada witout showin any pesin wey go risiv am.

## Prerequisites {#prerequisites}

Yu suppose ondastand [Ethereum netwoks](/developers/docs/networks/), [transakshons](/developers/docs/transactions/) and di [ strukshure of di smart kontract](/developers/docs/smart-contracts/anatomy/) bifor dem run di smart kontracts.

To dey run one kontract dey also kost ether (ETH) bikos dem don store am inside di blockchain, so yu suppose sabi [gas and fees](/developers/docs/gas/) on top Ethereum.

Las las, yu go nid gada yor kontract bifor yu run am, so make sure sey yu don read about [hau to dey gada smart kontracts](/developers/docs/smart-contracts/compiling/).

## Hau to deploy one smart kontract {#how-to-deploy-a-smart-contract}

### Wetin yu go nid {#what-youll-need}

- Di kontract's bytecode– dem dey generate dis thru [kompilashon](/developers/docs/smart-contracts/compiling/)
- ETH for gas - yu go set yor gas linit laik oda transakshons so make yu dey awia sey kontract deployment nid plenti gas pass one simpol ETH transfa
- one deployment skript abi plugin
- Access to one [Ethereum node](/developers/docs/nodes-and-clients/), weda tu dey run yor own, dey konet to publik node, abi thru one API key as yu dey yus one [node savis](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Steps to dey deploy one smart kontract {#steps-to-deploy}

Di spesifik steps wey involve go dipend on di divelopment framewok wi tok about. For eksampol, yu fit shek out [Hardhat dokumentashon to dey yus deploy yor kontracts](https://hardhat.org/guides/deploying.html) abi [Foundry dokumentashon to dey yus deploy and verify one smart kontract](https://book.getfoundry.sh/forge/deploying). Wons dem don deploy am, yor kontract go get Ethereum address laik oda [akants](/developers/docs/accounts/) and yu verify am as yu dey yus [sorse code verifikashon tools](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Tools resembol {#related-tools}

**Remix - _ Remix IDE dey divelop, deploy and administa smart kontracts for Ethereum laik blockchains_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 divelopment platfom wey dey provide debuggin, observability, and infrastrukshure buildin blocks to dey divelop, test, monitor, and operate smart kontracts _**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _One divelopment environment to dey gada, deploy, test, and debug yor Ethereum softwia_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Docs wey dem dey yus deploy yor kontracts](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Im dey deploy any kontract izy to any EVEM kompatibol chain, as im dey yus one singol komand_**

- [Dokumentashon](https://portal.thirdweb.com/deploy/)

**Crossmint - _Enterprise web3 divelopment platfom wey dey on grade to dey deploy smart kontracts, enabol kredit-kard and kross chain payments, and dey yus APIs to kreate, distribute, sell, store, and edit NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentashon](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Related tutorials {#related-tutorials}

- [To dey deploy yor first smart kontract](/developers/tutorials/deploying-your-first-smart-contract/) _– One introdukshon to dey deploy yor first smart kontract on one Ethereum test netwok._
- [Hello World | smart kontract tutorial](/developers/tutorials/hello-world-smart-contract/) _– One izy-to-follow tutorial to kreate & deploy one basik smart kontract on Ethereum._
- [Interact wit oda kontracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Hau to dey show one smart kontract from kontract wey dey exist and interact wit am._
- [ Hau yu fit ridus yor kontract size](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Hau yu fit ridus yor kontract size to kip am onda di limit and save on gas_

## Further reading {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [To dey divelop yor kontracts wit Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Know a community resource wey fit helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Building container](/developers/docs/frameworks/)
- [Run an Ethereum node](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes-as-a-savis](/developers/docs/nodes-and-clients/nodes-as-a-service)
