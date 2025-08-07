---
title: ERC-777 Caighdeán Chomhartha
description:
lang: ga
---

## Rabhadh {#warning}

**Tá sé deacair ERC-777 a chur i bhfeidhm i gceart, mar gheall ar a [shoghabhálacht i leith cineálacha éagsúla ionsaí](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Moltar [ERC-20](/developers/docs/standards/tokens/erc-20/) a úsáid ina áit.** Fanann an leathanach seo mar chartlann stairiúil.

## Réamhrá? {#introduction}

Is caighdeán comharthach inbhraite é ERC-777 a fheabhsaíonn an caighdeán reatha [ERC-20] (/developers/docs/standards/tokens/erc-20/).

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar dtús faoi [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Cad iad na feabhsuithe atá beartaithe ag ERC-777 thar ERC-20? {#-erc-777-vs-erc-20}

Soláthraíonn an ERC-777 na feabhsuithe seo a leanas thar ERC-20.

### Crúcaí {#hooks}

Is feidhm é crúcaí a thuairiscítear i gcód conartha cliste. Glaoitear ar chrúcaí nuair a sheoltar nó nuair a fhaightear comharthaí tríd an gconradh. Ligeann sé seo do chonradh cliste freagairt do chomharthaí isteach nó amach.

Cláraítear na crúcaí agus aimsítear iad leis an gcaighdeán [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Cén fáth go bhfuil crúcaí iontach? {#why-are-hooks-great}

1. Ceadaíonn crúcaí comharthaí a sheoladh chuig conradh agus fógra a thabhairt don chonradh in aon idirbheart amháin, murab ionann agus [ERC-20](https://eips.ethereum.org/EIPS/eip-20), a éilíonn glao dúbailte (`approve`/`transferFrom`) chun é seo a bhaint amach.
2. Tá conarthaí nach bhfuil crúcaí cláraithe acu ar neamhréir le ERC-777. Toirmeascfaidh an conradh seolta an idirbhirt nuair nach bhfuil crúca cláraithe ag an gconradh fála. Cuireann sé seo cosc ​​ar aistrithe de thaisme chuig conarthaí cliste neamh-ERC-777.
3. Is féidir le crúcaí idirbhearta a dhiúltú.

### Deachúlacha {#decimals}

Réitíonn an caighdeán freisin an mearbhall maidir le `deachúlacha` a dhéantar in ERC-20. Feabhsaíonn an tsoiléireacht seo taithí an fhorbróra.

### Comhoiriúnacht cúil le ERC-20 {#backwards-compatibility-with-erc-20}

Is féidir idirghníomhú le conarthaí ERC-777 amhail is dá mba chonarthaí ERC-20 iad.

## Tuilleadh Léitheoireachta {#further-reading}

[EIP-777: Caighdeán Comhartha](https://eips.ethereum.org/EIPS/eip-777)
