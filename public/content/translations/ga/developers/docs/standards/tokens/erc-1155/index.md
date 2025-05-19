---
title: ERC-1155 Caighdeán Ilchomhartha
description:
lang: ga
---

## Réamhrá {#introduction}

Comhéadan caighdeánach do chonarthaí a bhainistíonn cineálacha éagsúla comharthaí. Féadfar a áireamh i gconradh imlonnaithe aonair aon teaglam de chomharthaí inmhalartacha, de chomharthaí neamh-idirmhalartacha nó de chumraíochtaí eile (m.sh. comharthaí leath-idirmhalartacha).

**Cad is brí le Caighdeán Ilchomhartha?**

Is smaoineamh simplí é a fhéachann le comhéadan conartha cliste a chruthú a fhéadfaidh ionadaíocht agus rialú a dhéanamh ar líon ar bith de chineálacha comharthaí idirmhalartacha agus neamh-inmhalartacha. Ar an mbealach seo, is féidir le comhartha ERC-1155 na feidhmeanna céanna a dhéanamh le [ERC-20](/developers/docs/standards/tokens/erc-20/) agus comhartha [ERC-721](/developers/docs/standards/tokens/erc-721/), agus fiú an dá cheann ag an am céanna. Feabhsaíonn sé feidhmiúlacht na gcaighdeán ERC-20 agus ERC-721 araon, rud a fhágann go bhfuil sé níos éifeachtaí agus ag ceartú earráidí cur chun feidhme soiléir.

Tá cur síos iomlán ar an chomhartha ERC-1155 i [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar dtús faoi [caighdeáin chomharthaí](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), agus [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Feidhmeanna agus Gnéithe ERC-1155: {#body}

- [Aistriú Baisc](#batch_transfers): Aistrigh roinnt sócmhainní in aon ghlao amháin.
- [Iarmhéid Baisc](#batch_balance): Faigh iarmhéideanna na sócmhainní iolracha in aon ghlao amháin.
- [Baisccheadú](#batch_approval): Ceadaigh gach comhartha chuig seoladh.
- [Crúcaí](#receive_hook): Faigh crúca comharthaí.
- [Tacaíocht NFT](#nft_support): Mura bhfuil sa soláthar ach 1, cuir mar NFT é.
- [Rialacha um Aistriú Sábháilte](#safe_transfer_rule): Sraith rialacha maidir le haistriú slán.

### Aistrithe Baisc {#batch-transfers}

Oibríonn an t-aistriú baisc an-chosúil le haistrithe rialta ERC-20. Breathnaímid ar an bhfeidhm rialta `transferFrom` ERC-20:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Is é an t-aon difríocht atá in ERC-1155 ná go n-aimsímid na luachanna mar eagar agus go dtugaimid raon aitheantais freisin. Mar shampla nuair a thugtar `ids=[3, 6, 13]` agus `luacha=[100, 200, 5]`, is iad na haistrithe a bheidh mar thoradh orthu

1. Aistrigh 100 comhartha le haitheantas 3 ó `_from` go `_to`.
2. Aistrigh 200 comhartha le haitheantas 6 ó `_from` go `_to`.
3. Aistrigh 5 chomhartha le haitheantas 13 ó `_from` go `_to`.

In ERC-1155 níl againn ach `transferFrom`, gan `transfer`. Chun é a úsáid mar `transfer` rialta, socraigh an seoladh ón seoladh go dtí an seoladh atá ag glaoch ar an bhfeidhm.

### Iarmhéid Baisc {#batch-balance}

Tá feidhm chomhpháirtíochta ag an nglao ERC-20 `balanceOf` faoi seach le tacaíocht bhaisc. Mar mheabhrúchán, seo é an leagan ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Níos simplí fós don ghlao iarmhéid, is féidir linn iarmhéideanna iolracha a aisghabháil in aon ghlao amháin. Gabhaimid thar raon na n-úinéirí, agus ina dhiaidh sin an raon de chomharthaí aitheantais.

Mar shampla nuair a thugtar `_ids=[3, 6, 13]` agus `_owners=[0xbeef..., 0x1337..., 0x1111...]`, is é an luach tuairisceáin

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Faomhadh Baisc {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Tá na formheasanna beagán difriúil ná ERC-20. In ionad méideanna sonracha a fhormheas, socraíonn tú oibreoir atá ceadaithe nó neamhcheadaithe trí `setApprovalForAll`.

Is féidir an stádas reatha a léamh trí `isApprovedForAll`. Mar a fheiceann tú, is oibríocht uile-nó-rada ar bith é. Ní féidir leat a shainiú cé mhéad comharthaí atá le formheas nó fiú cén aicme chomharthaí.

Tá sé seo deartha d'aon ghnó ar mhaithe le simplíocht. Ní féidir leat gach rud a fhormheas ach le haghaidh aon seoladh amháin.

### Faigh Crúca {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

I bhfianaise na tacaíochta [EIP-165](https://eips.ethereum.org/EIPS/eip-165), faigheann tacaíochtaí ERC-1155 crúcaí le haghaidh conarthaí cliste amháin. Ní mór don fheidhm crúca luach draíochta beart4 réamhshainithe a thabhairt ar ais a thugtar mar:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Nuair a thugann an conradh fála an luach seo ar ais, glactar leis go nglacann an conradh leis an aistriú agus go bhfuil a fhios aige conas na comharthaí ERC-1155 a láimhseáil. Go hiontach, níl a thuilleadh comharthaí greamaithe i gconradh!

### Tacaíocht NFT {#nft-support}

Nuair nach bhfuil sa soláthar ach ceann amháin, is chomhartha neamh-inmhalartach (NFT) an comhartha go bunúsach. Agus mar atá caighdeánach do ERC-721, is féidir leat URL meiteashonraí a shainiú. Is féidir le cliaint an URL a léamh agus a mhodhnú, féach [anseo](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Riail Aistrithe Sábháilte {#safe-transfer-rule}

Táimid tar éis tagairt a dhéanamh do roinnt rialacha maidir le haistriú sábháilte cheana sna mínithe roimhe seo. Ach féachaimis ar na rialacha is tábhachtaí:

1. Ní mór don ghlaoiteoir a bheith formheasta chun na comharthaí don seoladh `_from` a chaitheamh nó caithfidh an glaoiteoir a bheith cothrom le `_from`.
2. Caithfidh an glao aistrithe dul ar ais má
   1. Is é 0 an seoladh `_to`.
   2. mura bhfuil fad `_ids` mar an gcéanna le fad `_values`.
   3. tá aon iarmhéid(í) den sealbhóir(í) do chomhartha(í) in `_ids` níos ísle ná an méid(í) faoi seach in `_values` a seoladh chuig an bhfaighteoir.
   4. má tharlaíonn aon earráid eile.

_Nóta_: Tá gach feidhm bhaisc lena n-áirítear an crúca ann freisin mar leaganacha gan bhaisc. Déantar é seo ar mhaithe le héifeachtacht gáis, agus is dócha gurb é an bealach is coitianta a úsáidtear go fóill má táthar ag smaoineamh ar shócmhainn amháin a aistriú. Táimid tar éis iad a fhágáil amach ar mhaithe le simplíocht sna míniúcháin, lena n-áirítear rialacha um aistriú sábháilte. Tá na hainmneacha comhionann, ach bain an 'Batch'.

## Tuilleadh léitheoireachta {#further-reading}

- [EIP-1155: Caighdeán Ilchomhartha](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Doiciméid Openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: GitHub Stóras](https://github.com/enjin/erc-1155)
- [Ailceimic NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
