---
title: ERC-4626 Caighdeán Boghta Comharthaithe
description: Caighdeán le haghaidh boghtaí a bhfuil toradh orthu.
lang: ga
---

## Réamhrá {#introduction}

Is caighdeán é ERC-4626 chun paraiméadair theicniúla boghtaí a bhfuil toradh orthu a bharrfheabhsú agus a aontú. Soláthraíonn sé API caighdeánach do bhoghtaí comharthaithe a bhfuil toradh orthu a léiríonn scaireanna de bhunchomhartha amháin ERC-20. Tugann ERC-4626 breac-chuntas freisin ar shíneadh roghnach le haghaidh boghtaí comharthaithe ag baint úsáide as ERC-20, ag tairiscint feidhmiúlacht bhunúsach chun taisceadh, comharthaí a tharraingt siar agus iarmhéideanna léitheoireachta.

**Ról ERC-4626 i mboghtaí a bhfuil toradh orthu**

Cuidíonn margaí iasachtaithe, comhbhailitheoirí, agus comharthaí úsmhara go bunúsach le húsáideoirí an toradh is fearr a fháil ar a gcuid comharthaí cripte trí straitéisí éagsúla a chur i bhfeidhm. Déantar na straitéisí seo le héagsúlacht neafaiseach, a d’fhéadfadh a bheith i mbaol earráidí nó acmhainní forbartha a chur amú.

Laghdóidh ERC-4626 i mboghtaí a bhfuil toradh orthu an iarracht chomhtháthaithe agus scaoilfidh sé rochtain ar thorthaí in iarratais éagsúla gan mórán iarracht speisialaithe ó fhorbróirí trí phatrúin feidhmithe níos comhsheasmhaí agus níos láidre a chruthú.

Tá cur síos iomlán ar an chomhartha ERC-4626 i [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Síneadh boghta asincrónach (ERC-7540)**

Tá ERC-4626 optamaithe le haghaidh taiscí adamhacha agus fuascailtí go teorainn áirithe. Má shroichtear an teorainn, ní féidir aon taiscí ná fuascailtí nua a chur isteach. Ní oibríonn an teorannú seo go maith d’aon chóras conartha cliste a bhfuil gníomhartha nó moilleanna asincrónacha ina réamhriachtanas chun comhéadan a dhéanamh leis an Cruinneachán (m.sh. prótacail sócmhainní fíor-dhomhain, prótacail iasachta neamh-chomhthaobhaithe, prótacail iasachtaithe trasshlabhra, comharthaí greamaithe leachta, nó modúil sábháilteachta árachais).

Leathnaíonn ERC-7540 áirgiúlacht Boghtaí ERC-4626 le haghaidh cásanna úsáide asincrónacha. Baintear úsáid iomlán as an gcomhéadan Boghta atá ann cheana (`deposit`/`withdraw`/`mint`/`redeem`) chun Iarratais asincrónacha a éileamh.

Tá cur síos iomlán ar an mbreiseán ERC-7540 in [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Breiseán boghta il-sócmhainne (ERC-7575)**

Cás úsáide amháin atá ar iarraidh nach dtacaíonn ERC-4626 leis is ea Boghtaí a bhfuil sócmhainní iolracha nó pointí iontrála acu, mar shampla Comharthaí soláthraí leachtachta (LP). Go ginearálta bíonn siad seo ciontach nó neamh-chomhlíontach mar gheall ar riachtanas ERC-4626 a bheith ina ERC-20 féin.

Cuireann ERC-7575 tacaíocht le Boghtaí a bhfuil sócmhainní iolracha acu trí fheidhmiú chomharthaí ERC-20 a sheachtrú ó chur chun feidhme ERC-4626.

Tá cur síos iomlán ar an mbreiseán ERC-7575 in [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar dtús faoi [caighdeáin chomharthaí](/developers/docs/standards/tokens/) agus [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Feidhmeanna agus Gnéithe ERC-4626: {#body}

### Modhanna {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Tugann an fheidhm seo ar ais seoladh an chomhartha bhunúsach a úsáidtear don bhoghta le haghaidh cuntasaíocht, taisceadh, aistarraingt.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Tugann an fheidhm seo ar ais méid iomlán na sócmhainní bunúsacha atá i seilbh na mboghtaí.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Tugann an fheidhm seo ar ais an méid `scaireanna` a d'athródh an boghta ar an méid `sócmhainní` a cuireadh ar fáil.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Tugann an fheidhm seo ar ais an méid `sócmhainní` a d'athródh an cruinneachán ar an méid `scaireanna` a cuireadh ar fáil.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Tugann an fheidhm seo ar ais uasmhéid na sócmhainní bunúsacha is féidir a chur i dtaisce i nglao amháin [`taisce`](#deposit) glaoch ón `fhaighteoir`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Ligeann an fheidhm seo d'úsáideoirí éifeachtaí a n-éarlais a insamhail ag an mbloc reatha.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Déanann an fheidhm seo `sócmhainní` de bhunchomharthaí a thaisceadh isteach sa bhoghta agus tugann sí úinéireacht `scaireanna` don `fhaighteoir`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Tugann an fheidhm seo ar ais uasmhéid na scaireanna is féidir a bhualadh i nglao amháin [`buail`](#mint) glaoch ón `fhaighteoir`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Ligeann an fheidhm seo d'úsáideoirí insamhlú a dhéanamh ar éifeachtaí a mbuailte ag an mbloc reatha.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Bualann an fheidhm seo go díreach scaireanna boghta `shares` chuig `faighteora` trí `shócmhainní` de na comharthaí bunúsacha a thaisceadh.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Tugann an fheidhm seo ar ais uasmhéid na sócmhainní bunúsacha is féidir a aistarraingt ón iarmhéid `úinéir` le glao amháin [`aistarraing`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Ligeann an fheidhm seo d'úsáideoirí insamhlú a dhéanamh ar thionchair a n-aistarraingt ag an mbloc reatha.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Déanann an fheidhm seo `shares` a dhó ó `úinéir` agus seol comhartha díreach `sócmhainní` ón cruinneachán chuig `faighteoir`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Tugann an fheidhm seo ar ais uasmhéid na scaireanna is féidir a fhuascailt ón iarmhéid `úinéir` trí ghlao [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Ligeann an fheidhm seo d'úsáideoirí insamhlú a dhéanamh ar éifeachtaí a bhfuascailte ag an mbloc reatha.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Fuasclaíonn an fheidhm seo líon sonrach `scaireanna` ó `úinéir` agus seolann `sócmhainní` den bhunchomhartha ón mboghta chuig an `fhaighteoir`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Tugann sé ar ais líon iomlán na scaireanna cruinneachán neamhfhuascailte atá i gcúrsaíocht.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Filleann sé seo méid iomlán na scaireanna cruinneachán atá ag an `úinéir` faoi láthair.

### Léarscáil an chomhéadain {#mapOfTheInterface}

![Léarscáil den chomhéadan ERC-4626](./map-of-erc-4626.png)

### Imeachtaí {#events}

#### Imeacht Taisce

NÍ MÓR ** a bheith astaithe** nuair a thaisctear comharthaí isteach sa bhoghta trí na modhanna [`buail`](#mint) agus [`taisce`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Sa chás gurb é `seoltóir` an t-úsáideoir a mhalartóidh `sócmhainní` le haghaidh `scaireanna`, agus a d'aistrigh na `scaireanna` sin chuig `úinéir`.

#### Imeacht Aistarraingthe

NÍ MÓR **Astú** nuair a tharraingíonn taisceoir scaireanna as an mboghta sna modhanna [`fuascail`](#redeem) nó [`aistarraing`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

I gcás gurb é `seoltóir` an t-úsáideoir a spreag an aistarraingt agus a mhalartaigh `scaireanna`, ar le `húinéir` é, le haghaidh `sócmhainní`. Is é `faigheoir` an t-úsáideoir a fuair na `sócmhainní` aistarraingthe.

## Tuilleadh léitheoireachta {#further-reading}

- [EIP-4626: Caighdeán boghta comharthaithe](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Stóras GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
