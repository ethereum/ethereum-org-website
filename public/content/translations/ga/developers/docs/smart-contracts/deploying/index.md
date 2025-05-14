---
title: Conarthaí cliste a imscaradh
description:
lang: ga
---

Ní mór duit do chonradh cliste a imscaradh le go mbeidh sé ar fáil d’úsáideoirí líonra Ethereum.

Chun conradh cliste a imscaradh, ní sheolann tú ach idirbheart Ethereum ina bhfuil cód tiomsaithe an chonartha cliste gan aon fhaighteoir a shonrú.

## Réamhriachtanais {#prerequisites}

Ba cheart go dtuigfeá [Líonraí Ethereum](/developers/docs/networks/), [idirbhearta](/developers/docs/transactions/) agus na [ conarthaí anatamaíochta cliste](/developers/docs/smart-contracts/anatomy/) sula n-imscarfar conarthaí cliste.

Cosnaíonn imscaradh conartha éitear (ETH) freisin ós rud é go bhfuil siad stóráilte ar an blocshlabhra, mar sin ba chóir duit a bheith eolach ar [gás agus táillí](/developers/docs/gas/) ar Ethereum.

Ar deireadh, beidh ort do chonradh a thiomsú sula n-imscarfar é, mar sin bí cinnte go bhfuil tú tar éis léamh faoi [conarthaí cliste a thiomsú](/developers/docs/smart-contracts/compiling/).

## Conas conradh cliste a imscaradh {#how-to-deploy-a-smart-contract}

### Cad a bheidh uait {#what-youll-need}

- Beartchód do chonartha – gintear é seo trí [tiomsú](/developers/docs/smart-contracts/compiling/)
- ETH don ghás – socróidh tú do theorainn gháis cosúil le hidirbhearta eile agus mar sin bí ar an eolas go bhfuil i bhfad níos mó gáis ag teastáil ó imscaradh conartha ná aistriú simplí ETH
- script imscartha nó breiseán
- rochtain ar [nóid Ethereum](/developers/docs/nodes-and-clients/), trí do cheann féin a rith, trí nascadh le nód poiblí, nó trí eochair API ag baint úsáid as [seirbhís nód](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Céimeanna chun conradh cliste a imscaradh {#steps-to-deploy}

Braithfidh na céimeanna sonracha ar an gcreat forbartha atá i gceist. Mar shampla, is féidir leat [doiciméid Hardhat a sheiceáil maidir le do chonarthaí a imscaradh](https://hardhat.org/guides/deploying.html) nó [Doiciméid an Teilgcheárta maidir le conradh cliste a imscaradh agus a fhíorú](https://book.getfoundry.sh/forge/deploying). Nuair a bheidh do chonradh imlonnaithe, beidh seoladh Ethereum cosúil le [cuntais eile](/developers/docs/accounts/) ar do chonradh agus is féidir é a fhíorú trí úsáid a bhaint as [uirlisí fíoraithe cód foinse](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Uirlisí gaolmhara {#related-tools}

**Remix - _ Ceadaíonn Remix IDE conarthaí cliste a fhorbairt, a imscaradh agus a riar le haghaidh Ethereum cosúil le blocshlabhra_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _ardán forbartha Web3 a sholáthraíonn dífhabhtaithe, inbhraiteacht, agus bloic thógála bonneagair chun tástáil agus monatóireacht a dhéanamh ar chonarthaí cliste agus iad a oibriú_**

- [tenderly.co](https://tenderly.co/)
- [Doiciméid](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Timpeallacht forbartha chun do bhogearraí Ethereum a thiomsú, a imscaradh, a thástáil agus a dhífhabhtú_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Doiciméid maidir le do chonarthaí a imscaradh](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _aon chonradh a Imscaradh go héasca chuig aon slabhra atá comhoiriúnach le EVM, ag baint úsáide as ordú amháin_**

- [Doiciméadúchán](https://portal.thirdweb.com/deploy/)

**Crossmint - _ardán forbartha web3 de ghrád fiontair chun conarthaí cliste a imscaradh, íocaíochtaí cárta creidmheasa agus tras-slabhra a chumasú, agus APIanna a úsáid chun NFTanna a chruthú, a dháileadh, a dhíol, a stóráil agus a chur in eagar._**

- [crossmint.com](https://www.crossmint.com)
- [Doiciméadúchán](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blag](https://blog.crossmint.com)

## Ranganna teagaisc a bhaineann leo {#related-tutorials}

- [Do chéad chonradh cliste a imscaradh](/developers/tutorials/deploying-your-first-smart-contract/) _- Réamheolas ar imscaradh do chéad chonradh cliste ar líonra tástála Ethereum._
- [Hello World | teagaisc conartha cliste](/developers/tutorials/hello-world-smart-contract/) _– Teagaisc éasca le leanúint chun & conradh cliste bunúsach a imscaradh ar Ethereum._
- [Idirghníomhaíocht le conarthaí eile ó Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- Conas conradh cliste a imscaradh ó chonradh atá ann cheana féin agus idirghníomhú leis._
- [Conas méid do chonartha a laghdú](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Conas méid do chonartha a laghdú chun é a choinneáil faoin teorainn agus gás a choigilt_

## Tuilleadh léitheoireachta {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Do chonarthaí a imscaradh le Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

## Ábhair ghaolmhara {#related-topics}

- [Creataí forbartha](/developers/docs/frameworks/)
- [Rith nód Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nóid-mar-sheirbhís](/developers/docs/nodes-and-clients/nodes-as-a-service)
