---
title: Cuntais Ethereum
description: Míniú ar chuntais Ethereum - a struchtúir sonraí agus a gcaidreamh le cripteagrafaíocht péire eochair-luach.
lang: ga
---

Is aonán é cuntas Ethereum le iarmhéid éitear (ETH) ar féidir leis idirbhearta a sheoladh ar Ethereum. Is féidir cuntais a rialú ag an úsáideoir nó iad a imscaradh mar chonarthaí cliste.

## Réamhriachtanais {#prerequisites}

Chun cabhrú leat an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar dtús trínár [réamhrá do Ethereum](/developers/docs/intro-to-ethereum/).

## Cineálacha cuntais {#types-of-account}

Tá dhá chineál cuntais ag Ethereum:

- Cuntas faoi úinéireacht sheachtrach (EOA) – arna rialú ag aon duine a bhfuil na heochracha príobháideacha aige
- Cuntas conartha – conradh cliste arna imscaradh chuig an líonra, arna rialú ag cód. Foghlaim faoi [conarthaí cliste](/developers/docs/smart-contracts/)

Tá an cumas ag an dá chineál cuntais:

- ETH agus comharthaí a fháil, a choinneáil agus a sheoladh
- Idirghníomhú le conarthaí cliste imscartha

### Difríochtaí tábhachtacha {#key-differences}

**Faoi úinéireacht sheachtrach**

- Ní chosnaíonn aon rud cuntas a chruthú
- Is féidir idirbhearta a thionscnamh
- Ní féidir le hidirbhearta idir cuntais faoi úinéireacht eachtrach ach a bheith ina n-aistrithe ETH/dearbhán
- Comhdhéanta de phéire eochracha cripteagrafacha: eochracha poiblí agus príobháideacha a rialaíonn gníomhaíochtaí cuntais

**Conradh**

- Tá costas ag baint le conradh a chruthú toisc go bhfuil stóras líonra á úsáid agat
- Ní féidir idirbhearta a sheoladh ach mar fhreagra ar idirbheart a fuarthas
- Is féidir le hidirbhearta ó chuntas seachtrach go cuntas conartha cód a spreagadh ar féidir leo go leor gníomhartha éagsúla a rith, mar shampla comharthaí a aistriú nó fiú conradh nua a chruthú
- Níl eochracha príobháideacha ag cuntais chonartha. Ina áit sin, tá siad á rialú ag loighic an chóid chonartha cliste

## Scrúdú cuntas {#an-account-examined}

Tá ceithre réimse ag cuntais Ethereum:

- `nonce` – Cuntar a léiríonn líon na n-idirbhearta arna seoladh ó chuntas faoi úinéireacht sheachtrach nó líon na gconarthaí arna gcruthú ag cuntas conartha. Ní féidir ach idirbheart amháin le nonce ar leith a dhéanamh do gach cuntas, rud a thugann cosaint in aghaidh ionsaithe athimeartha nuair a chraoltar agus a athritear idirbhearta sínithe arís agus arís eile.
- `iarmhéid` – Líon na wei ar leis an seoladh seo iad. Is ainmníocht ETH é Wei agus tá 1e+18 wei in aghaidh an ETH.
- `codeHash` – Tagraíonn an hais seo do _chód_ chuntais ar mheaisín fíorúil Ethereum (EVM). Tá blúirí de chód cláraithe i gcuntais chonartha ar féidir leo oibríochtaí éagsúla a dhéanamh. Ritear an cód EVM seo má fhaigheann an cuntas glao teachtaireachta. Ní féidir é a athrú, murab ionann agus na réimsí cuntais eile. Tá gach blúirí cód den sórt sin i mbunachar sonraí na staide faoina haiseanna comhfhreagracha le haisghabháil níos déanaí. CódHash a thugtar ar an luach haise seo. I gcás cuntais faoi úinéireacht sheachtrach, is hais de theaghrán folamh é an réimse codeHash.
- `storageRoot` – Uaireanta tugtar hais stórála air. Hais 256-giotán d'fhréamhnód Merkle Patricia trie a ionchódaíonn inneachar stórála an chuntais (mapáil idir luachanna slánuimhir 256-giotán), atá ionchódaithe isteach sa trie mar léarscáiliú ón hash Keccak 256-giotán den 256 -eochracha slánuimhir giotán do na luachanna slánuimhir 256-giotán RLP-ionchódaithe. Ionchódaíonn an trie seo hash ábhar stórála an chuntais seo, agus tá sé folamh de réir réamhshocraithe.

![Léaráid a thaispeánann comhdhéanamh cuntais](./accounts.png) _Léaráid oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cuntais faoi úinéireacht eachtrach agus péirí eochair {#externally-owned-accounts-and-key-pairs}

Tá cuntas comhdhéanta de phéire eochracha cripteagrafacha: poiblí agus príobháideach. Cuidíonn siad le cruthú gur shínigh an seoltóir idirbheart i ndáiríre agus cuireann siad cosc ​​​​ar bhrionnú. Is í an eochair phríobháideach a úsáideann tú chun idirbhearta a shíniú, mar sin deonaíonn sí cumhdach duit ar na cistí a bhaineann le do chuntas. Ní shealbhaíonn tú criptea-airgeadra i ndáiríre, bíonn eochracha príobháideacha agat - bíonn na cistí ar mhórleabhar Ethereum i gcónaí.

Cuireann sé seo cosc ​​ar ghníomhaithe mailíseacha idirbhearta falsa a chraoladh mar is féidir leat seoltóir idirbhirt a fhíorú i gcónaí.

Más mian le Alice éitear a sheoladh óna cuntas féin chuig cuntas Bob, ní mór do Alice iarratas idirbhirt a chruthú agus é a sheoladh chuig an líonra lena fhíorú. Cinntíonn úsáid cripteagrafaíocht eochair phoiblí ag Ethereum gur féidir leh Alice a chruthú gur chuir sí tús leis an iarratas idirbhirt ar dtús. Gan meicníochtaí cripteagrafacha, d’fhéadfadh namhaid mailíseach Eve iarratas a chraoladh go poiblí ar nós “5 ETH a sheoladh ó chuntas Alice chuig cuntas Eve,” agus ní bheadh ​​aon duine in ann a fhíorú nár tháinig sé ó Alice.

## Cruthú cuntais {#account-creation}

Nuair is mian leat cuntas a chruthú, ginfidh formhór na leabharlann eochair phríobháideach randamach duit.

Tá eochair phríobháideach comhdhéanta de 64 carachtar heicsidheachúlach agus is féidir í a chriptiú le pasfhocal.

Sampla:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Gintear an eochair phoiblí ón eochair phríobháideach trí úsáid a bhaint as an [Algartam Síniú Digiteach an Chuair Eiliptic](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Gheobhaidh tú seoladh poiblí do do chuntas tríd an 20 beart deiridh den hais Keccak-256 den eochair phoiblí a ghlacadh agus `0x` a chur leis an tús.

Ciallaíonn sé seo go bhfuil seoladh 42 carachtar ag cuntas faoi úinéireacht eachtrach (EOA) (mírín 20 beart arb ionann é agus 40 carachtar heicsidheachúlach móide an réimír `0x`).

Sampla:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Léiríonn an sampla seo a leanas conas uirlis sínithe dar teideal [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) a úsáid chun cuntas nua a ghiniúint. Uirlis bhainistíochta agus sínithe cuntas is ea Clef a thagann i gcuachta leis an gcliant Ethereum, [Geth](https://geth.ethereum.org). Cruthaíonn an t-ordú `clef newaccount` péire nua eochrach agus sábhálann sé iad i stór eochrach criptithe.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Doiciméadú Getth](https://geth.ethereum.org/docs)

Is féidir eochracha poiblí nua a dhíorthú ó d'eochair phríobháideach, ach ní féidir eochair phríobháideach a dhíorthú ó eochracha poiblí. Tá sé ríthábhachtach do chuid eochracha príobháideacha a choinneáil slán agus, mar a thugann an t-ainm le fios, **PRÍOBHÁIDEACH**.

Teastaíonn eochair phríobháideach uait chun teachtaireachtaí agus idirbhearta a shíniú a aschuireann síniú. Féadfaidh daoine eile an síniú a ghlacadh ansin chun d’eochair phoiblí a dhíorthú, rud a dheimhníonn údar na teachtaireachta. I d’iarratas, is féidir leat leabharlann JavaScript a úsáid chun idirbhearta a sheoladh chuig an líonra.

## Cuntais chonartha {#contract-accounts}

Tá seoladh heicsidheachúil 42 carachtar ag cuntais chonartha freisin:

Sampla:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

De ghnáth tugtar seoladh an chonartha nuair a dhéantar conradh a imscaradh chuig Blocshlabhra Ethereum. Tagann an seoladh ó sheoladh an chruthaitheora agus líon na n-idirbheart a seoladh ón seoladh sin (an “nonce”).

## Eochracha bailíochtaithe {#validators-keys}

Tá eochair de chineál eile in Ethereum freisin, a tugadh isteach nuair a d’athraigh Ethereum ó chruthúnas oibre go comhthoil bunaithe ar chruthúnas. Is eochracha 'BLS' iad seo agus úsáidtear iad chun bailíochtóirí a aithint. Is féidir na heochracha seo a chomhiomlánú go héifeachtach chun an bandaleithead a theastaíonn le comhthoil a chruthú sa líonra a laghdú. Gan an eochair-chomhiomlánú seo bheadh ​​an t-íosmhéid geall le haghaidh bailíochtaithe i bhfad níos airde.

[Tuilleadh ar eochracha bailíochtaithe](/developers/docs/consensus-mechanisms/pos/keys/).

## Nóta ar sparáin {#a-note-on-wallets}

Ní sparán é cuntas. Is comhéadan nó feidhmchlár é sparán a ligeann duit idirghníomhú le do chuntas Ethereum, cuntas faoi úinéireacht sheachtrach nó cuntas conartha.

## Léiriú físe {#a-visual-demo}

Féach ar Austin do do threorú trí fheidhmeanna hais, agus péirí eochair.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Tuilleadh léitheoireachta {#further-reading}

- [Cuntas Ethereum a Thuiscint](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

## Ábhair ghaolmhara {#related-topics}

- [Conarthaí cliste](/developers/docs/smart-contracts/)
- [Idirbhearta](/developers/docs/transactions/)
