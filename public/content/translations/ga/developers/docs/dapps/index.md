---
title: Réamhrá le dapps
description:
lang: ga
---

Is feidhmchlár díláraithe (dapp) é feidhmchlár atá bunaithe ar líonra díláraithe a chomhcheanglaíonn [conradh cliste](/developers/docs/smart-contracts/) agus comhéadan úsáideora tosaigh. Ar Ethereum, tá conarthaí cliste inrochtana agus trédhearcach - cosúil le APIs oscailte - mar sin is féidir le do dapp fiú conradh cliste a scríobh duine éigin eile a áireamh.

## Réamhriachtanais {#prerequisites}

Sula bhfoghlaimíonn tú faoi dapps, ba chóir duit na [bunphrionsabail an bhlocshlabhra](/developers/docs/intro-to-ethereum/) a chlúdach agus léamh faoi líonra Ethereum agus conas a dhéantar é a dhílárú.

## Sainmhíniú ar dapp {#definition-of-a-dapp}

Tá a chód cúil ag dapp ag rith ar líonra díláraithe piara go piara. Cuir é seo i gcodarsnacht le haip ina bhfuil an cód cúil ag rith ar fhreastalaithe láraithe.

Is féidir le dapp cód tosaigh agus comhéadain úsáideora a bheith scríofa i dteanga ar bith (cosúil le haip) chun glaonna a dhéanamh ar a chúl. Ina theannta sin, is féidir a thosach a óstáil ar stóras díláraithe mar [IPFS](https://ipfs.io/).

- **Díláraithe** - feidhmíonn dapps ar Ethereum, ardán poiblí díláraithe oscailte nach bhfuil smacht ag duine nó grúpa amháin air
- **cinntitheach** - feidhmíonn dapps an fheidhm chéanna is cuma cén timpeallacht ina gcuirtear i gcrích iad
- **Turing-iomlán** - is féidir le dapps aon ghníomh a dhéanamh nuair a bhíonn na h-acmhainní riachtanacha ar fáil
- **Scoite** - ritear dapps a i dtimpeallacht fhíorúil ar a dtugtar Meaisín Fíorúil Ethereum ionas má tá fabht ag an gconradh cliste, nach gcuirfear isteach ar ghnáthfheidhmiú an líonra blocshlabhra

### Maidir le conarthaí cliste {#on-smart-contracts}

Chun dapps a thabhairt isteach, ní mór dúinn conarthaí cliste a thabhairt isteach - cúl dapp nuair nach bhfuil téarma níos fearr ann. Le haghaidh forbhreathnú mionsonraithe, téigh chuig ár rannán ar [conarthaí cliste](/developers/docs/smart-contracts/).

Is éard atá i gconradh cliste ná cód a chónaíonn ar bhlocshlabhra Ethereum agus a ritheann go díreach mar atá cláraithe. Nuair a bhíonn conarthaí cliste imscartha ar an líonra ní féidir leat iad a athrú. Is féidir Dapps a dhílárú toisc go bhfuil siad á rialú ag an loighic atá scríofa sa chonradh, ní ag duine aonair nó ag cuideachta. Ciallaíonn sé seo freisin go gcaithfidh tú do chonarthaí a dhearadh go han-chúramach agus iad a thástáil go críochnúil.

## Buntáistí a bhaineann le forbairt dapp {#benefits-of-dapp-development}

- **Gan aga neamhfhónaimh** – Nuair a bhíonn an conradh cliste imscartha ar an mblocshlabhra, bíonn an líonra ina iomláine in ann i gcónaí freastal ar chliaint atá ag iarraidh idirghníomhú leis an gconradh. Ní féidir le gníomhaithe mailíseacha, dá bhrí sin, ionsaithe diúltú seirbhíse a sheoladh atá dírithe ar dhaps aonair.
- **Príobháideacht** – Ní gá duit aitheantas fíorshaoil ​​a sholáthar chun imscaradh nó idirghníomhú le dapp.
- **Friotaíocht in aghaidh na cinsireachta** – Ní féidir le haonán amháin ar an líonra bac a chur ar úsáideoirí idirbhearta a chur isteach, dapps a imscaradh nó sonraí a léamh ón mblocshlabhra.
- **Sláine iomlán na sonraí** - Tá sonraí atá stóráilte ar an mblocshlabhra do-athchurtha agus do-athraithe, a bhuí le primitives cripteagrafacha. Ní féidir le gníomhaithe mailíseacha idirbhearta nó sonraí eile atá poiblithe cheana féin a bhrionnú.
- **Ríomh gan iontaobh/iompraíocht infhíoraithe** – Is féidir anailís a dhéanamh ar chonarthaí cliste agus ráthaítear go ndéanfar iad a rith ar bhealaí intuartha, gan aon ghá le muinín a chur in údarás lárnach. Níl sé seo fíor i samhlacha traidisiúnta; mar shampla, nuair a bhainimid úsáid as córais bhaincéireachta ar líne, ní mór muinín a bheith againn nach mbainfidh institiúidí airgeadais mí-úsáid as ár gcuid sonraí airgeadais, nach gcuirfidh siad isteach ar thaifid, nó nach ndéanfar iad a haiceáil.

## Míbhuntáistí a bhaineann le forbairt dapp {#drawbacks-of-dapp-development}

- **Cothabháil** - Is féidir le Dapps a bheith níos deacra a chothabháil mar go bhfuil sé níos deacra na cóid agus na sonraí a fhoilsítear don bhlocshlabhra a mhodhnú. Bíonn sé deacair ar fhorbróirí nuashonruithe a dhéanamh ar a gcuid dapps (nó ar na sonraí bunúsacha arna stóráil ag dapp) a luaithe a imscartar iad, fiú má aithnítear fabhtanna nó rioscaí slándála i seanleagan.
- **Forchostas feidhmíochta** – Tá forchostas feidhmíochta ollmhór ann, agus tá an scálú thar a bheith deacair. Chun an leibhéal slándála, sláine, trédhearcachta agus iontaofachta a bhfuil Ethereum ag iarraidh a bhaint amach, ritheann agus stórálann gach nód gach idirbheart. Ina theannta sin, bíonn am ag teastáil le haghaidh comhthoil maidir le cruthúnas gill.
- **Plódú líonra** – Nuair a úsáideann dapp amháin an iomarca acmhainní ríomhaireachtúla, cuirtear cúltaca ar fáil don líonra iomlán. Faoi láthair, ní féidir leis an líonra ach thart ar 10-15 idirbheart in aghaidh an tsoicind a phróiseáil; má tá idirbhearta á seoladh isteach níos tapúla ná seo, is féidir leis an linn na n-idirbheart neamhdheimhnithe a bhailiú go tapa.
- **Eispéiris úsáideora** - D'fhéadfadh sé a bheith níos deacra eispéiris atá éasca le húsáid a innealtóireacht mar go bhféadfadh sé a bheith ródheacair don ghnáthúsáideoir deiridh chruach uirlisí a shocrú atá riachtanach chun idirghníomhú leis an mblocshlabhra ar bhealach fíor slán.
- **Lárú** - D'fhéadfadh go mbeadh cuma seirbhíse láraithe ar réitigh atá éasca le húsáid agus atá éasca le forbróir bunaithe ar bhunchiseal Ethereum ar aon nós. Mar shampla, féadfaidh seirbhísí den sórt sin eochracha nó faisnéis íogair eile a stóráil ar thaobh an fhreastalaí, freastal ar thosach ag baint úsáide as freastalaí láraithe, nó loighic ghnó tábhachtach a reáchtáil ar fhreastalaí láraithe roimh scríobh chuig an mblocshlabhra. Cuireann lárnú deireadh le mórán de na buntáistí a bhaineann le blocshlabhra ar an tsamhail thraidisiúnta (mura gcuireann sé deireadh leo go léir).

## An foghlaimeoir amhairc den chuid is mó tú? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Uirlisí chun dapps a chruthú {#dapp-tools}

**Scaffold-ETH _- Déan turgnamh go tapa le Solidity ag baint úsáide as éadain a théann in oiriúint do do chonradh cliste._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Sampla dapp](https://punkwallet.io/)

**Cruthaigh Aip Eth _- Cruthaigh aipeanna faoi thiomáint Ethereum le hordú amháin._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**Dapp aon-chlic _- uirlis FOSS chun tosaigh dapp a ghiniúint ó [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- uirlis FOSS d’fhorbróirí Ethereum chun a nód a thástáil, agus & glaonna RPC ón mbrabhsálaí a dhífhabhtú._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDKanna i ngach teanga, conarthaí cliste, uirlisí, agus bonneagar le haghaidh forbairt web3._**

- [Leathanach baile](https://thirdweb.com/)
- [Doiciméadúchán](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Ardán forbartha web3 de ghrád fiontair chun conarthaí cliste a imscaradh, íocaíochtaí cárta creidmheasa agus tras-shlabhra a chumasú, agus úsáidí APInna chun NFTanna a chruthú, a dháileadh, a dhíol, a stóráil agus a chur in eagar._**

- [crossmint.com](https://www.crossmint.com)
- [Doiciméadúchán](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Tuilleadh léitheoireachta {#further-reading}

- [Foghlaim faoi dhaipeanna](/dapps)
- [Ailtireacht feidhmchlár Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Treoir 2021 maidir le feidhmchláir dhíláraithe](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _ Slabhra Aoil_
- [Cad is Aipeanna Díláraithe ann?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps coitianta](https://www.alchemy.com/dapps) - _Alchemy_

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

## Ábhair Ghaolmhara {#related-topics}

- [Cur i láthair ar an stack Ethereum](/developers/docs/ethereum-stack/)
- [Creataí forbartha](/developers/docs/frameworks/)
