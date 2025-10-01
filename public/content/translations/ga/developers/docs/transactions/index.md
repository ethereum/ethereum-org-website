---
title: Idirbhearta
description: Forbhreathnú ar idirbhearta Ethereum \u2013 conas a oibríonn siad, a struchtúr sonraí, agus conas iad a sheoladh trí fheidhmchlár.
lang: ga
---

Is treoracha sínithe go cripteagrafach ó chuntais iad idirbhearta. Cuirfidh cuntas tús le hidirbheart chun staid líonra Ethereum a nuashonrú. Is é an t-idirbheart is simplí ná ETH a aistriú ó chuntas amháin go ceann eile.

## Réamhriachtanais {#prerequisites}

Chun cabhrú leat an leathanach seo a thuiscint níos fearr, molaimid duit ar dtús léamh faoi [Cuntais](/developers/docs/accounts/) agus [réamhrá ar Ethereum](/developers/docs/intro-to-ethereum/).

## Cad is idirbheart ann? {#whats-a-transaction}

Tagraíonn idirbheart Ethereum do ghníomh arna thionscnamh ag cuntas faoi úinéireacht sheachtrach, i bhfocail eile cuntas arna bhainistiú ag duine, ní conradh. Mar shampla, má sheolann Bob 1 ETH chuig Alice, ní mór cuntas Bob a chur chun dochair agus cuntas Alice a chur chun sochair. Tarlaíonn an gníomh seo a athraíonn an stát laistigh d’idirbheart.

![Léaráid a thaispeánann idirbheart is cúis le hathrú stáit](./tx.png) _Léaráid oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Is gá idirbhearta, a athraíonn staid an EVM, a chraoladh chuig an líonra iomlán. Is féidir le haon nód iarratas ar idirbheart a rith ar an EVM a chraoladh; tar éis dó seo a dhéanamh, déanfaidh bailíochtóir an t-idirbheart a rith agus cuirfidh sé an t-athrú staid mar thoradh air chuig an gcuid eile den líonra.

Teastaíonn táille le haghaidh idirbhearta agus ní mór iad a áireamh i mbloc bailíochtaithe. Chun an forbhreathnú seo a dhéanamh níos simplí clúdóimid táillí gáis agus bailíochtú in áiteanna eile.

Áirítear an fhaisnéis seo a leanas in idirbheart a cuireadh isteach:

- `ó` \u2013 seoladh an tseoltóra, a bheidh ag síniú an idirbhirt. Cuntas faoi úinéireacht sheachtrach a bheidh anseo mar ní féidir le cuntais chonartha idirbhearta a sheoladh
- `go` \u2013 an seoladh fála (más cuntas faoi úinéireacht sheachtrach é, aistreoidh an t-idirbheart luach. Más cuntas conartha é, déanfaidh an t-idirbheart cód an chonartha a fhorghníomhú)
- `síniú` \u2013 aitheantóir an tseoltóra. Gintear é seo nuair a shíníonn eochair phríobháideach an tseoltóra an t-idirbheart agus nuair a dheimhnítear go bhfuil an t-idirbheart seo údaraithe ag an seoltóir
- `nonce` - cuntar incriminteach seicheamhach a léiríonn uimhir an idirbhirt ón gcuntas
- `luach` \u2013 méid ETH le haistriú ón seoltóir go faighteoir (ainmnithe in WEI, áit a bhfuil 1ETH cothrom le 1e+18wei)
- `sonraí inchuir` \u2013 réimse roghnach chun sonraí treallacha a chur san áireamh
- `gasLimit` \u2013 uasmhéid na n-aonad gáis is féidir a ídiú ag an idirbheart. Sonraíonn an [EVM](/developers/docs/evm/opcodes) na haonaid gháis a theastaíonn do gach céim ríomhaireachtúil
- `maxPriorityFeePerGas` - uasphraghas an gháis ídithe le cur san áireamh mar leid don bhailitheoir
- `maxFeePerGas` - an táille uasta in aghaidh an aonaid gháis atá sásta a bheith íoctha as an idirbheart (lena n-áirítear `baseFeePerGas` agus `maxPriorityFeePerGas`)

Is tagairt é gás don ríomh a theastaíonn chun an t-idirbheart a phróiseáil ag bailíochtóir. Caithfidh úsáideoirí táille a íoc as an ríomh seo. Cinneann an `gasLimit`, agus an `maxPriorityFeePerGas` an táille uasta idirbhirt a íoctar leis an mbailitheoir. [Tuilleadh faoin nGás](/developers/docs/gas/).

Breathnóidh réad an idirbhirt beagán mar seo:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Ach ní mór réad idirbhirt a shíniú ag baint úsáide as eochair phríobháideach an tseoltóra. Cruthaíonn sé seo nach bhféadfadh an t-idirbheart teacht ach ón seoltóir agus nár seoladh go calaoiseach é.

Déanfaidh cliant Ethereum cosúil le Geth an próiseas sínithe seo a láimhseáil.

Sampla [JSON-RPC](/developers/docs/apis/json-rpc) glao:

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Freagra samplach:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- is é an `raw` an t-idirbheart sínithe san fhoirm ionchódaithe [Réimír Fad Athchúrsach (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- is é an `tx` an t-idirbheart sínithe i bhfoirm JSON

Leis an hais sínithe, is féidir an t-idirbheart a chruthú go cripteagrafaíoch gur tháinig sé ón seoltóir agus gur cuireadh faoi bhráid an líonra é.

### An réimse sonraí {#the-data-field}

Faigheann formhór mór na n-idirbheart rochtain ar chonradh ó chuntas faoi úinéireacht sheachtrach. Scríobhtar formhór na gconarthaí i Solidity agus léirmhíníonn siad a réimse sonraí i gcomhréir leis an [comhéadan dénártha feidhmchláir (ABI)](/glossary/#abi).

Sonraíonn na chéad cheithre bheart an fheidhm atá le glaoch, ag baint úsáide as hais ainm agus argóintí na feidhme. Uaireanta is féidir leat an fheidhm a aithint ón roghnóir trí úsáid a bhaint as [an bunachar sonraí seo](https://www.4byte.directory/signatures/).

Tá na hargóintí sa chuid eile de na sonraí glaonna, [ionchódaithe mar atá sonraithe sa Sonraíochtaí ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Mar shampla, breathnaímis ar [an t-idirbheart seo](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Úsáid **Cliceáil chun Tuilleadh a fheiceáil** chun na sonraí glaonna a fheiceáil.

Is é `0xa9059cbb` an roghnóir feidhme. Tá roinnt [feidhm aitheanta leis an síniú seo](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). Sa chás seo tá [cód foinse an chonartha](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) uaslódáilte chuig Etherscan, mar sin is eol dúinn gurb é `transfer(address,uint256)`.

Is é an chuid eile de na sonraí ná:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

De réir sonraíochtaí ABI, tá luachanna slánuimhir (cosúil le seoltaí, atá ina slánuimhreacha 20 beart) le feiceáil san ABI mar fhocail 32 beart, stuáilte le nialais sa tosaigh. Mar sin, tá a fhios againn go bhfuil an seoladh `to` [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). Is é an `value` 0x3b0559f4 = 990206452.

## Cineálacha idirbheart {#types-of-transactions}

Ar Ethereum tá roinnt cineálacha éagsúla idirbhearta:

- Idirbhearta rialta: idirbheart ó chuntas amháin go ceann eile.
- Idirbhearta imlonnaithe conartha: idirbheart gan seoladh 'chuig', ina n-úsáidtear an réimse sonraí don chód conartha.
- Conradh a rith: idirbheart a idirghníomhaíonn le conradh cliste imscartha. Sa chás seo, is é seoladh 'chun' an seoladh conartha cliste.

### Ar ghás {#on-gas}

Mar a luadh, gabhann costas le hidirbhearta [gas](/developers/docs/gas/) a rith. Éilíonn idirbhearta aistrithe simplí 21000 aonad Gáis.

Mar sin má sheolann Bob 1 ETH chuig Alice ag`baseFeePerGas` de 190 gwei agus `maxPriorityFeePerGas` de 10 gwei, beidh ar Bob an táille seo a leanas a íoc:

```
(190 + 10) * 21000 = 4,200,000 gwei
--nó--
0.0042 ETH
```

Cuirfear **-1.0042 ETH** do dhochar cuntas Bob (1 ETH le haghaidh Alice + 0.0042 ETH i dtáillí gáis)

Cuirfear **+1.0 ETH** chun sochair do chuntas Alice

Dóitear an buntáille **-0.00399 ETH**

Coinníonn bailíochtóir an leid **+0.000210 ETH**


![Léaráid a thaispeánann conas a dhéantar gás neamhúsáidte a aisíoc](./gas-tx.png) _Léaráid oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Aisíoctar leis an gcuntas úsáideora aon ghás nach n-úsáidtear in idirbheart.

### Idirghníomhaíochtaí conartha cliste {#smart-contract-interactions}

Tá gás riachtanach le haghaidh aon idirbheart a bhaineann le conradh cliste.

Féadfaidh feidhmeanna ar a dtugtar [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) nó <a bheith i gconarthaí cliste freisin a href="https://docs.soliditylang.org/en/latest/contracts.html#pure-functions">`pure`</a> feidhmeanna, nach n-athraíonn staid an chonartha. Mar sin, ní bheidh gá le haon ghás chun na feidhmeanna seo a ghlaoch ó EOA. Is é an glao RPC bunúsach don chás seo ná [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Murab ionann agus nuair a dhéantar rochtain orthu trí úsáid a bhaint as `eth_call`, is gnách go dtugtar go hinmheánach ar na feidhmeanna `view` nó `pure` seo (i.e. ón gconradh féin nó ó chonradh eile) a dhéanann costas gáis.

## Saolré idirbhirt {#transaction-lifecycle}

Nuair a chuirtear an t-idirbheart isteach tarlaíonn an méid seo a leanas:

1. Gintear hais idirbhirt go cripteagrafach: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Ansin déantar an t-idirbheart a chraoladh chuig an líonra agus a chur le linn idirbheart ina bhfuil gach idirbheart líonra eile ar feitheamh.
3. Ní mór do bhailíochtóir d'idirbheart a phiocadh agus é a áireamh i mbloc chun an t-idirbheart a fhíorú agus a mheas go bhfuil sé "rathúil".
4. Le himeachtaí ama, déanfar an bloc ina bhfuil d'idirbheart a uasghrádú go "dlisteanaithe" ansin "críochnaithe". Leis na huasghráduithe seo bíonn sé níos cinnte gur éirigh le d’idirbheart agus nach n-athrófar go deo é. Nuair a bhíonn bloc "críochnaithe" ní féidir é a athrú riamh ach trí ionsaí ar leibhéal an líonra a chosnódh na billiúin dollar.

## Léiriú físe {#a-visual-demo}

Féach ar Austin ag míniú idirbhearta, gás, agus mianadóireacht.

<YouTube id="er-0ihqFQB0" />

## Clúdach Idirbhirt Clóscríofa {#typed-transaction-envelope}

Ar dtús bhí formáid amháin ag Ethereum le haghaidh idirbhearta. Bhí nonce, praghas gáis, teorainn gháis, le seoladh, luach, sonraí, v, r, agus s i ngach idirbheart. Tá na réimsí seo [RLP-ionchódaithe](/developers/docs/data-structures-and-encoding/rlp/), chun breathnú ar rud éigin mar seo:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Tá Ethereum tagtha chun cinn chun tacú le cineálacha iomadúla idirbheart chun ligean do ghnéithe nua cosúil le liostaí rochtana agus [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) a bheith curtha i bhfeidhm gan cur isteach ar fhormáidí oidhreachta idirbhearta.

Is é [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) a cheadaíonn don iompar seo. Léirmhínítear idirbhearta mar:

`TransactionType || TransactionPayload`

I gcás ina sainítear na réimsí mar:

- `TransactionType` - uimhir idir 0 agus 0x7f, le haghaidh 128 cineál idirbheart féideartha san iomlán.
- `TransactionPayload` - eagar beart treallach arna shainiú ag an gcineál idirbhirt.

Bunaithe ar an luach `TransactionType`, is féidir idirbheart a rangú mar:

1. ** Idirbhearta Cineál 0 (Oidhreacht):** An bhunfhormáid idirbhirt a úsáideadh ó seoladh Ethereum. Ní áirítear leo gnéithe ó [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) amhail ríomh táillí gáis dinimiciúla nó liostaí rochtana le haghaidh conarthaí cliste. Tá réimír shainiúil in easnamh ar idirbhearta oidhreachta a chuireann a gcineál in iúl ina bhfoirm sraitheach, ag tosú leis an mbeart `0xf8` nuair a úsáidtear [Athchúrsach Ionchódú Réimír Fad (RLP)](/developers/docs/data-structures-and-encoding/rlp). Is é luach an Chineál Idirbheart do na hidirbhearta seo ná `0x0`.

2. ** Idirbhearta de Chineál 1:** Arna thabhairt isteach i [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) mar mar chuid de [Uasghrádú Beirlín](/history/#berlin) Ethereum, áirítear leis na hidirbhearta seo paraiméadar `accessList`. Sonraíonn an liosta seo seoltaí agus eochracha stórála a bhfuil súil ag an idirbheart a rochtain, rud a chabhraíonn le costais [gas](/developers/docs/gas/) a laghdú d’idirbhearta casta lena mbaineann conarthaí cliste. Níl athruithe margaidh táillí EIP-1559 san áireamh in idirbhearta Cineál 1. Áirítear le hidirbhearta de chineál 1 paraiméadar `yParity` freisin, ar féidir é a bheith `0x0` nó `0x1`, rud a léiríonn an phaireacht i luach y an tsínithe secp256k1. Aithnítear iad ag tosú leis an mbeart `0x01`, agus is é `0x1` a luach TransactionCype.

3. **Idirbhearta de Chineál 2**, ar a dtugtar idirbhearta EIP-1559 de ghnáth, is idirbhearta iad a thugtar isteach in [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), i [Uasghrádú Londain](/history/#london) Ethereum. Tá siad tar éis éirí mar an cineál caighdeánach idirbheart ar líonra Ethereum. Tugann na hidirbhearta seo isteach meicníocht nua um mhargadh táillí a fheabhsaíonn intuarthacht tríd an táille idirbhirt a scaradh ina bhuntáille agus ina táille tosaíochta. Tosaíonn siad leis an mbeart `0x02` agus áirítear leo réimsí mar `maxPriorityFeePerGas` agus `maxFeePerGas`. Is iad idirbhearta Chineál 2 an réamhshocrú anois mar gheall ar a solúbthacht agus a n-éifeachtúlacht, go háirithe i bhfabhar a gcumas chun cabhrú le húsáideoirí táillí idirbhirt a bhainistiú ar bhealach níos intuartha. Is é luach an Chineál Idirbheart do na hidirbhearta seo ná `0x2`.



## Tuilleadh léitheoireachta {#further-reading}

- [EIP-2718: Clúdach Idirbheart Clóscríofa](https://eips.ethereum.org/EIPS/eip-2718)

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_

## Ábhair ghaolmhara {#related-topics}

- [Cuntais](/developers/docs/accounts/)
- [Meaisín fíorúil Ethereum (EVM)](/developers/docs/evm/)
- [Gás](/developers/docs/gas/)
